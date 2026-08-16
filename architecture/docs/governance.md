# Architecture Governance

Decision-making, review processes, and compliance enforcement for all VSR service architectures.

---

## 1. Architecture Review Board (ARB)

### Composition
| Role | Representation | Term |
|------|----------------|------|
| **Chair** | VP Engineering / CTO | Permanent |
| **Security Lead** | Security Platform | Permanent |
| **Platform Lead** | Platform Engineering | Permanent |
| **Data Lead** | Data Platform | Permanent |
| **Consulting Lead** | Technology Consulting | Permanent |
| **Rotating Members** | 2x Service Team Leads | 6 months |

### Authority
- **Approve/Reject** new service architectures
- **Approve/Reject** major architecture changes (new trust boundaries, data flows, protocols)
- **Mandate** refactoring for non-compliance
- **Escalate** unresolved disputes to CTO

### Meeting Cadence
| Meeting | Frequency | Duration | Attendees |
|---------|-----------|----------|-----------|
| **Full ARB** | Bi-weekly | 60 min | All members |
| **Emergency ARB** | On-demand | 30 min | Chair + Security + Affected Leads |
| **Annual Planning** | Yearly | Half-day | All + Stakeholders |

---

## 2. Architecture Decision Records (ADRs)

### Required for
- New service architecture
- Major protocol/data store change
- New trust boundary
- Security control addition/removal
- Deprecation of standard pattern

### ADR Lifecycle
```
Draft → Review (ARB) → Accepted → Implemented → Superseded/Deprecated
```

### ADR Template (Minimal)
```markdown
# ADR-<NNN>: <Title>

**Status**: Proposed | Accepted | Superseded | Deprecated
**Date**: YYYY-MM-DD
**Authors**: @handles
**Reviewers**: @handles
**Tags**: security | data | protocol | infra | pattern

## Context
What forces are at play? (Technical, Business, Regulatory, Organizational)

## Decision
What are we doing? Be specific and actionable.

## Consequences
### Positive
- ...
### Negative
- ...
### Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|

## Alternatives Considered
| Alternative | Why Rejected |
|-------------|--------------|

## Implementation Plan
- [ ] Task 1 (Owner, Due Date)
- [ ] Task 2 (Owner, Due Date)

## Links
- Related ADRs: ADR-<NNN>
- Tickets: JIRA-<NNN>
- Docs: Link
```

### ADR Repository
- **Location**: `architecture/adr/` (Markdown, numbered sequentially)
- **Index**: `architecture/adr/README.md` (Auto-generated)
- **Tooling**: `adr-tools` or `adr-log` for management

---

## 3. Compliance Enforcement

### Automated Gates (CI/CD)
| Gate | Tool | Policy | Blocking |
|------|------|--------|----------|
| **Architecture Lint** | Custom + Spectral | Naming, Structure, Required Sections | Yes |
| **Threat Model Check** | Custom | Required Sections Present | Yes |
| **ADR Presence** | Custom | ADR for Arch Changes | Yes |
| **Diagram Validation** | Mermaid CLI | Syntax, Required Diagrams | Yes |
| **Policy as Code** | OPA/Rego | Naming, Tags, Resources, Security | Yes |
| **Dependency Scan** | Trivy/Grype | Vulnerabilities, Licenses | Yes (Critical/High) |
| **Secret Scan** | TruffleHog/Gitleaks | No Secrets | Yes |
| **SBOM Generation** | Syft | CycloneDX/SPDX | Yes |
| **Signing Verification** | Cosign + Policy Controller | SLSA L3, Rekor | Yes |

### Policy as Code (Examples)
```rego
# Require all services to have threat model
package architecture

deny[msg] {
    input.kind == "ServiceArchitecture"
    not input.threatModel
    msg := "Service architecture must include threat model"
}

# Require ADR for protocol changes
deny[msg] {
    input.changeType == "protocol"
    not input.adr
    msg := "Protocol changes require ADR"
}

# Enforce naming conventions
deny[msg] {
    input.kind == "KubernetesResource"
    not startswith(input.metadata.name, "vsr-")
    msg := "All resources must be prefixed with 'vsr-'"
}
```

### Non-Compliance Handling
| Severity | Action | Timeline |
|----------|--------|----------|
| **Critical** (Security, Data Loss) | Block Deploy, Page On-Call | Immediate |
| **High** (Architecture Violation) | Block Deploy, Create Ticket | 24 hours |
| **Medium** (Standards Deviation) | Warn, Create Ticket | 1 week |
| **Low** (Documentation) | Warning Only | Next Sprint |

---

## 4. Technology Radar

### Quadrants
| Quadrant | Description |
|----------|-------------|
| **Adopt** | Proven, standard, recommended for new work |
| **Trial** | Promising, evaluate on low-risk project |
| **Assess** | Worth investigating, not ready for production |
| **Hold** | Deprecated, avoid for new work |

### Current Radar (2026-08-16)

#### Languages & Runtimes
| Technology | Ring | Notes |
|------------|------|-------|
| Go 1.22+ | Adopt | Primary for Platform, CLI, Operators |
| TypeScript 5+ | Adopt | Primary for Portal, BFF, Tooling |
| Python 3.11+ | Adopt | Primary for AI, Data, Assessment |
| .NET 8 LTS | Adopt | Primary for Enterprise Integration |
| Rust | Trial | High-perf components, WASM |
| Java 21 LTS | Hold | Legacy only, no new work |

#### Infrastructure
| Technology | Ring | Notes |
|------------|------|-------|
| Kubernetes 1.28+ | Adopt | EKS/AKS/GKE Managed |
| Crossplane | Adopt | Infra as CRDs |
| ArgoCD | Adopt | GitOps |
| Istio Ambient | Adopt | Service Mesh |
| Cilium | Adopt | CNI + NetworkPolicy |
| Terraform + Terragrunt | Adopt | Root Modules |
| OpenTofu | Trial | Terraform Fork |
| Pulumi | Assess | For Complex Logic |

#### Data & AI
| Technology | Ring | Notes |
|------------|------|-------|
| PostgreSQL 16 | Adopt | Primary OLTP |
| pgvector | Adopt | Vector Embeddings |
| Snowflake | Adopt | Data Warehouse |
| Databricks | Adopt | Lakehouse + ML |
| dbt + SQLMesh | Adopt | Transformation + Contracts |
| Dagster | Adopt | Orchestration |
| DataHub | Adopt | Catalog + Lineage |
| MLflow | Adopt | Model Registry |
| vLLM | Trial | Local LLM Serving |
| LangGraph | Adopt | Agent Workflows |

#### Security
| Technology | Ring | Notes |
|------------|------|-------|
| SPIRE/SPIFFE | Adopt | Workload Identity |
| OPA Gatekeeper | Admit | Policy Engine |
| Kyverno | Adopt | Mutation + Validation |
| Falco + Tetragon | Adopt | Runtime Security |
| Cosign + Rekor | Adopt | Supply Chain |
| Trivy | Adopt | Scanner |
| Vault | Adopt | Secrets |

### Radar Process
- **Quarterly Review** — ARB + Leads
- **Proposal** — Any engineer via GitHub Issue
- **Decision** — ARB majority vote
- **Publication** — `architecture/docs/technology-radar.md` (versioned)

---

## 5. Architecture Health Metrics

### Leading Indicators (Weekly)
| Metric | Target | Source |
|--------|--------|--------|
| ADR Cycle Time (Proposed → Accepted) | < 2 weeks | GitHub |
| Threat Model Coverage | 100% (Tier 0/1) | Architecture Repo |
| Policy Compliance Rate | > 99.5% | OPA Audit Logs |
| Dependency Freshness | < 30 days behind | Dependabot/Renovate |
| SBOM Coverage | 100% Deployed | Cosign Verify |

### Lagging Indicators (Monthly)
| Metric | Target | Source |
|--------|--------|--------|
| Architecture-Related Incidents | 0 | PagerDuty |
| Security Findings (Critical/High) | 0 | Trivy/CodeQL |
| Drift Events (Auto-Remediated) | 100% | Crossplane/ArgoCD |
| ADR Supersession Rate | < 10%/quarter | ADR Repo |
| Technology Radar Accuracy | > 80% | Retrospective Survey |

### Reporting
- **Weekly**: Slack #arch-health (Automated)
- **Monthly**: ARB Meeting Dashboard (Grafana)
- **Quarterly**: Architecture Health Report (PDF → Confluence)
- **Annual**: Architecture Retrospective (Workshop)

---

## 6. Escalation Paths

### Architecture Disputes
1. **Service Team Leads** — Attempt resolution (1 week)
2. **ARB** — Binding decision (Bi-weekly meeting)
3. **CTO** — Final authority (Rare)

### Security Exceptions
1. **Security Lead** — Risk Assessment (2 days)
2. **ARB** — Risk Acceptance (Bi-weekly)
3. **CTO** — Business Risk Acceptance (Rare)

### Technology Radar Disputes
1. **Proposal Author + ARB Member** — Discussion (1 week)
2. **ARB Vote** — Majority wins
3. **CTO Tie-break** — If deadlocked

---

*Architecture Review Board approved: 2026-08-16. Next review: 2026-11-16.*