# Infrastructure Architecture

## Landing Zone

### Account Structure (AWS Example)
```
Organization Root
├── Security (GuardDuty, Security Hub, Config, IAM Access Analyzer)
├── Log Archive (Centralized CloudTrail, Config, VPC Flow Logs → S3 + Athena)
├── Network Hub (Transit Gateway, Firewall Manager, Route 53, VPN/Direct Connect)
├── Shared Services
│   ├── Identity (IAM Identity Center, AD Connector, SCIM)
│   ├── Secrets (Secrets Manager, KMS, Certificate Manager)
│   ├── Registry (ECR, CodeArtifact)
│   ├── Monitoring (CloudWatch, Managed Grafana, X-Ray)
│   └── CI/CD (CodePipeline, CodeBuild, CodeDeploy)
└── Workload Accounts (per Environment: dev, staging, prod, sandbox)
    ├── Network (VPC, Subnets, NAT, Endpoints, TGW Attachment)
    ├── Compute (EKS Clusters via CAPI, EC2 Auto Scaling)
    ├── Data (RDS, ElastiCache, DocumentDB, S3 via Crossplane)
    └── Operations (Systems Manager, Backup, Config)
```

### Multi-Cloud Abstraction (Crossplane)
```yaml
# Universal VPC Composition
apiVersion: network.example.org/v1alpha1
kind: VPC
metadata:
  name: workload-vpc
spec:
  parameters:
    cidrBlock: "10.0.0.0/16"
    enableDnsHostnames: true
    enableDnsSupport: true
    natGateways: 3  # Per AZ
  compositionSelectors:
    - matchLabels:
        provider: aws
      providerConfigRef:
        name: aws-provider
    - matchLabels:
        provider: azure
      providerConfigRef:
        name: azure-provider
    - matchLabels:
        provider: gcp
      providerConfigRef:
        name: gcp-provider
```

---

## Kubernetes Platform

### Cluster Topology
```
Management Cluster (CAPI)
├── Cluster API Controllers
├── Crossplane
├── ArgoCD (Management)
└── Observability (Prometheus, Grafana, Loki, Tempo)

Workload Clusters (per Environment)
├── System Namespace
│   ├── ArgoCD (Workload)
│   ├── Cert-Manager
│   ├── ExternalDNS
│   ├── CSI Drivers
│   ├── Gatekeeper/Kyverno
│   ├── Falco/Tetragon
│   ├── SPIRE Agent
│   └── Monitoring Agents
├── Platform Namespace
│   ├── Ingress Controller (ALB/AGIC/GKE Ingress)
│   ├── Service Mesh (Istio Ambient / Linkerd)
│   ├── Developer Portal (Backstage)
│   └── GitOps Apps
└── Tenant Namespaces (per Team/Service)
    ├── Resource Quotas
    ├── Network Policies
    ├── Limit Ranges
    └── Service Accounts + RBAC
```

### Add-on Management (Helm + Kustomize)
```yaml
# ArgoCD ApplicationSet for Add-ons
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: cluster-addons
spec:
  generators:
  - clusters:
      selector:
        matchLabels:
          environment: production
  template:
    metadata:
      name: '{{name}}-addons'
    spec:
      project: platform
      source:
        repoURL: https://github.com/vsr/platform-gitops
        targetRevision: main
        path: addons/{{name}}
      destination:
        server: '{{server}}'
        namespace: platform
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
```

---

## Networking

### Service Mesh (Istio Ambient)
```yaml
# Waypoint Proxy per Namespace
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: waypoint
  namespace: platform
spec:
  gatewayClassName: istio-waypoint
  listeners:
  - name: http
    protocol: HTTP
    port: 80
---
# AuthorizationPolicy (Default Deny)
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: default-deny
  namespace: platform
spec:
  action: DENY
  rules:
  - from:
    - source:
        notNamespaces: ["istio-system", "kube-system"]
```

### Ingress & DNS
| Component | Implementation |
|-----------|----------------|
| **External Ingress** | ALB Controller (AWS) / AGIC (Azure) / GKE Ingress (GCP) |
| **Internal Ingress** | Istio IngressGateway / NGINX Ingress |
| **DNS** | ExternalDNS → Route53 / Azure DNS / Cloud DNS |
| **TLS** | cert-manager → Let's Encrypt (dev) / ACM / Azure Key Vault / Google CAS (prod) |
| **WAF** | AWS WAF / Azure Front Door WAF / Cloud Armor |

### Egress Control
```yaml
# EgressGateway for Controlled Outbound
apiVersion: networking.istio.io/v1beta1
kind: ServiceEntry
metadata:
  name: external-api
spec:
  hosts:
  - api.github.com
  - registry.npmjs.org
  location: MESH_EXTERNAL
  ports:
  - number: 443
    name: https
    protocol: TLS
  resolution: DNS
---
# EgressGateway Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: egressgateway
  namespace: istio-system
spec:
  replicas: 2
  template:
    spec:
      serviceAccountName: egressgateway
      containers:
      - name: istio-proxy
        image: istio/proxyv2:1.22
```

---

## CI/CD Pipelines

### Pipeline Architecture (Tekton + GitHub Actions)
```yaml
# .tekton/pipeline.yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: service-pipeline
spec:
  params:
  - name: GIT_REPO_URL
  - name: GIT_REVISION
  - name: IMAGE_REGISTRY
  - name: DEPLOY_ENV
  tasks:
  - name: fetch-source
    taskRef:
      name: git-clone
    params:
    - name: url
      value: $(params.GIT_REPO_URL)
    - name: revision
      value: $(params.GIT_REVISION)
  - name: lint-test
    taskRef:
      name: lint-and-test
    runAfter: [fetch-source]
  - name: build-image
    taskRef:
      name: buildah
    runAfter: [lint-test]
    params:
    - name: IMAGE
      value: $(params.IMAGE_REGISTRY)/$(context.pipelineRun.name):$(params.GIT_REVISION)
  - name: scan-image
    taskRef:
      name: trivy-scan
    runAfter: [build-image]
  - name: sign-image
    taskRef:
      name: cosign-sign
    runAfter: [scan-image]
  - name: generate-sbom
    taskRef:
      name: syft-sbom
    runAfter: [build-image]
  - name: deploy-staging
    taskRef:
      name: argocd-deploy
    runAfter: [sign-image, generate-sbom]
    params:
    - name: ENVIRONMENT
      value: staging
    when:
    - input: "$(params.DEPLOY_ENV)"
      operator: in
      values: ["staging", "all"]
  - name: e2e-test
    taskRef:
      name: playwright-e2e
    runAfter: [deploy-staging]
  - name: canary-promote
    taskRef:
      name: flagger-canary
    runAfter: [e2e-test]
    params:
    - name: ENVIRONMENT
      value: production
```

### GitHub Actions Reusable Workflows
```yaml
# .github/workflows/reusable-build-test.yaml
name: Reusable Build & Test
on:
  workflow_call:
    inputs:
      language:
        required: true
        type: string
    secrets:
      NPM_TOKEN:
        required: false
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup
      uses: ./.github/actions/setup-${{ inputs.language }}
    - name: Install
      run: ${{ inputs.language == 'go' && 'go mod download' || 'npm ci' }}
    - name: Lint
      run: ${{ inputs.language == 'go' && 'golangci-lint run' || 'npm run lint' }}
    - name: Typecheck
      run: ${{ inputs.language == 'go' && 'go vet ./...' || 'npm run typecheck' }}
    - name: Test
      run: ${{ inputs.language == 'go' && 'go test -race -coverprofile=coverage.out ./...' || 'npm run test:coverage' }}
    - name: Upload Coverage
      uses: codecov/codecov-action@v4
```

---

## Secrets Management

### Vault Architecture
```
Vault Cluster (3+5 nodes, Raft)
├── Seal: Auto-unseal (AWS KMS / Azure Key Vault / GCP KMS)
├── Auth Methods
│   ├── Kubernetes (per cluster, bound to SA)
│   ├── OIDC (Human, Keycloak)
│   ├── AWS IAM (EC2, Lambda, ECS)
│   └── AppRole (Legacy, CI/CD)
├── Secrets Engines
│   ├── KV v2 (Application Secrets, Versioned)
│   ├── Database (Dynamic Creds, Rotation)
│   ├── PKI (Intermediate CA, Cert Issuance)
│   ├── Transit (Encryption as a Service)
│   └── SSH (OTP, Signed Certs)
└── Policies
    ├── readonly-* (Read Only)
    ├── readwrite-* (Read/Write)
    ├── admin-* (Full Admin)
    └── rotation-* (Rotation Only)
```

### Kubernetes Integration (CSI Driver)
```yaml
# SecretProviderClass
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: app-secrets
spec:
  provider: vault
  parameters:
    vaultAddress: "https://vault.example.com"
    vaultAuthPath: "kubernetes"
    roleName: "app-role"
    objects: |
      - objectName: "database/password"
        objectAlias: "DB_PASSWORD"
        objectType: "secret"
      - objectName: "api/key"
        objectAlias: "API_KEY"
---
# Pod Using CSI
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: app-sa
  volumes:
  - name: secrets
    csi:
      driver: secrets-store.csi.k8s.io
      readOnly: true
      volumeAttributes:
        secretProviderClass: "app-secrets"
  containers:
  - name: app
    volumeMounts:
    - name: secrets
      mountPath: "/mnt/secrets"
      readOnly: true
```

---

## Disaster Recovery

### RPO/RTO Targets
| Tier | Services | RPO | RTO | Strategy |
|------|----------|-----|-----|----------|
| **Tier 0** | Identity, Vault, Control Plane | 0 | < 15 min | Multi-region Active-Active |
| **Tier 1** | Platform API, Pipeline, GitOps | < 5 min | < 30 min | Multi-region Active-Passive |
| **Tier 2** | Workload Clusters, Data Services | < 1 hr | < 2 hr | Cross-region Replication |
| **Tier 3** | Developer Portal, Documentation | < 24 hr | < 4 hr | Backup + Restore |

### Backup Strategy
| Component | Tool | Schedule | Retention | Test |
|-----------|------|----------|-----------|------|
| etcd (Management) | Velero | Hourly | 30 days | Weekly |
| etcd (Workload) | Velero | 6-hourly | 14 days | Monthly |
| PostgreSQL (Metadata) | PGBackRest | Continuous | 30 days | Weekly PITR |
| Object Store (Bronze/Silver/Gold) | Cross-region Replication | Continuous | 7 years | Quarterly |
| Vault | Raft Snapshots | Daily | 90 days | Quarterly |
| Git Repos | GitHub (Native) | Continuous | Forever | N/A |

### Failover Procedures
```markdown
# DR Runbook: Regional Outage (Tier 1)

## Detection
- Alert: `PlatformAPIHighErrorRate` + `KubernetesAPIUnreachable` in Region A
- Confirm: Cloud provider status page, DNS health checks

## Failover (Automated via ArgoCD + DNS)
1. ArgoCD ApplicationSet detects cluster unreachable
2. Flagger/Argo Rollouts promotes Region B canary to primary
3. ExternalDNS updates Route53/Azure DNS/Cloud DNS (TTL 60s)
4. ExternalDNS health checks verify Region B endpoints
5. Traffic shifts (typically < 5 min)

## Verification
- Synthetic checks pass (health, auth, critical API)
- Error rate < 1% for 10 min
- Latency P99 < 1s

## Failback
1. Region A restored, validated
2. Manual DNS switch back (or automated after 24h stability)
3. ArgoCD syncs Region A from GitOps
4. Post-incident review within 48h
```

---

*Architecture Review Board approved: 2026-08-16. Next review: 2026-11-16.*