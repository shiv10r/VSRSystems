# Core Architecture Principles

Mandatory principles governing all VSR Systems service architectures. Every architecture decision must trace back to these.

---

## 1. Domain-Driven Design First

- **Bounded contexts** are explicit — each service owns a single ubiquitous language
- **Aggregates** enforce consistency boundaries; no cross-aggregate transactions
- **Domain events** are the integration contract — no shared databases
- **Anti-corruption layers** at every external integration point

## 2. API-First, Contract-Driven

- APIs are designed **before** implementation (OpenAPI 3.1 / Protobuf)
- **Consumer-driven contracts** (Pact) for all service-to-service communication
- **Versioning** via URL path (`/v1/`) + header negotiation; no breaking changes without 6-month deprecation
- **Schema registry** for event schemas (Avro/Protobuf)

## 3. Data Ownership & Sovereignty

- **Single writer** per data entity — no distributed writes
- **Eventual consistency** by default; strong consistency only where business requires
- **Data products** published via contracts — downstream consumers subscribe, never query directly
- **Tenant isolation** at the data layer (row-level security / schema-per-tenant / database-per-tenant)

## 4. Resilience by Design

- **Circuit breakers** on all external calls (resilience4j / Polly / Go-breaker)
- **Retry with exponential backoff + jitter** — configurable per dependency
- **Timeouts** on every outbound call (default 5s, configurable)
- **Bulkheads** — thread pool / connection pool isolation per dependency
- **Graceful degradation** — feature flags to disable non-critical paths

## 5. Observability as a First-Class Citizen

- **Structured logging** (JSON, correlation IDs, tenant IDs) — OpenTelemetry semantic conventions
- **Metrics**: RED (Rate, Errors, Duration) + USE (Utilization, Saturation, Errors) per service
- **Distributed tracing** — W3C TraceContext propagation; 100% sampling for errors, 10% for success
- **Health endpoints**: `/health/live`, `/health/ready`, `/health/startup` per Kubernetes probes

## 6. Security by Default

- **Zero Trust** — no implicit trust based on network location
- **Mutual TLS** for all service-to-service communication
- **Short-lived tokens** (JWT, 15-min access; refresh token rotation)
- **Least privilege** — RBAC/ABAC with deny-by-default
- **Secrets rotation** — automated, 30-day max lifetime for credentials
- **Supply chain security** — SLSA Level 3, signed artifacts, SBOM generation

## 7. Infrastructure as Code

- **All infrastructure** version-controlled (Terraform + Terragrunt)
- **Policy as Code** — OPA/Rego for admission control, cost guardrails, naming
- **GitOps** — ArgoCD/Flux for cluster reconciliation; no manual `kubectl apply`
- **Immutable infrastructure** — replace, don't patch; blue/green or canary deployments

## 8. Continuous Delivery

- **Trunk-based development** — short-lived branches, feature flags for incomplete work
- **Pipeline stages**: Build → Unit Test → Contract Test → Integration Test → Security Scan → Deploy to Staging → E2E → Promote to Production
- **Automated promotion gates**: SLO compliance, error budget, canary analysis
- **Rollback < 5 minutes** — automated on SLO breach

## 9. Cost Consciousness

- **Right-sizing** — VPA/HPA with custom metrics; quarterly rightsizing reviews
- **Serverless first** for variable workloads (Functions, Cloud Run, Lambda)
- **Data tiering** — hot/warm/cold storage with lifecycle policies
- **FinOps** — tagging strategy (service, environment, team, cost-center); monthly chargeback

## 10. Operational Excellence

- **Runbooks** for every alert — actionable, tested quarterly
- **Game days** — monthly chaos engineering (Gremlin/Chaos Mesh)
- **Postmortems** — blameless, timeline, root cause, action items with owners
- **On-call** — sustainable rotation, escalation policies, handoff procedures

---

## Decision Record Template

For any architectural decision not covered by principles:

```markdown
# ADR-<number>: <Title>

**Status**: Proposed | Accepted | Superseded
**Date**: YYYY-MM-DD
**Context**: What forces are at play?
**Decision**: What are we doing?
**Consequences**: Trade-offs, risks, mitigation
**Alternatives Considered**: Why not X?
**Links**: Related ADRs, docs, tickets
```

---

*Enforced via Architecture Review Board. Non-negotiable.*