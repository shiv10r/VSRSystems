# Service Architecture: Technology Consulting

**Slug**: `technology-consulting`
**Primary Stack**: TypeScript/React (Portal), Python (Assessment Tools), PostgreSQL, Markdown/ADR Tooling, GitOps
**Team**: Consulting Delivery + Platform Engineering

---

## 1. Domain Context

### Business Problem
Transformation stalls when priorities, architecture, and delivery plans are disconnected. We turn complex choices into an actionable sequence with accountable outcomes.

### Target Personas
- **CTO/VP Engineering** — needs strategy, roadmap, risk reduction
- **Architecture Review Board** — needs standardized assessments, decisions
- **Delivery Leads** — needs plans, governance, metrics
- **Platform Teams** — needs reference architectures, patterns

### Success Metrics
- Assessment-to-plan cycle: < 4 weeks
- Architecture decision latency: < 1 week (ADR process)
- Roadmap adherence: > 80% on-track milestones
- Client NPS: > 50

---

## 2. System Context (C4 Level 1)

```mermaid
C4Context
title System Context — Technology Consulting Service

Person(client_lead, "Client Tech Lead", "Requests assessment, owns roadmap")
Person(consultant, "VSR Consultant", "Runs assessments, writes ADRs, plans")
Person(arch_review, "Architecture Review Board", "Approves ADRs, governs standards")
Person(delivery_lead, "Delivery Lead", "Executes plan, tracks metrics)
System_Boundary(boundary, "Technology Consulting Service") {
    System(portal, "Consulting Portal", "React + TypeScript — Client-facing workspace")
    System(assessment, "Assessment Engine", "Python + Questionnaires — Maturity, Architecture, Risk")
    System(adr, "ADR Platform", "Markdown + Git + Tooling — Decisions, Reviews, Templates")
    System(roadmap, "Roadmap Planner", "TypeScript + D3 — Visual Roadmaps, Dependencies, Tracking")
    System(patterns, "Pattern Library", "Markdown + Diagrams — Reference Architectures, Patterns")
    System(governance, "Governance Engine", "TypeScript + OPA — Gates, Compliance, Metrics)
}
System_Ext(github, "GitHub", "ADR Repo, Templates, Pattern Library Source")
System_Ext(confluence, "Confluence / Notion", "Long-form Documentation")
System_Ext(jira, "Jira / Linear", "Delivery Tracking, Epics, Stories)
System_Ext(miro, "Miro / FigJam", "Collaborative Architecture Diagrams)
System_Ext(otel, "OTel Collector", "Telemetry)

Rel(client_lead, portal, "HTTPS — Request, Review, Approve)
Rel(consultant, portal, "HTTPS — Run Assessments, Write ADRs)
Rel(consultant, assessment, "CLI / API — Run Questionnaires)
Rel(consultant, adr, "Git + CLI — Propose, Review, Merge)
Rel(consultant, roadmap, "HTTPS — Build, Share, Track)
Rel(consultant, patterns, "HTTPS — Browse, Contribute)
Rel(delivery_lead, governance, "HTTPS — Gates, Metrics, Reports)
Rel(adr, github, "Git — ADR Repo, Templates)
Rel(patterns, github, "Git — Pattern Source, Diagrams)
Rel(governance, jira, "API — Sync Epics, Gates)
```

---

## 3. Container Architecture (C4 Level 2)

```mermaid
C4Container
title Container Architecture — Technology Consulting Service

Container_Boundary(tc, "Technology Consulting Service") {
    Container(portal, "Consulting Portal", "Next.js + React + TypeScript", "Client Workspace: Engagements, Assessments, ADRs, Roadmaps, Reports")
    Container(assessment, "Assessment Engine", "FastAPI + Python", "Questionnaires, Scoring, Maturity Models, Report Generation")
    Container(adr_platform, "ADR Platform", "Next.js + ProseMirror + Git", "ADR Lifecycle: Draft → Review → Accepted → Superseded")
    Container(roadmap, "Roadmap Planner", "Next.js + D3.js + Dagre", "Visual Roadmaps, Dependency Graphs, Milestone Tracking")
    Container(patterns, "Pattern Library", "Next.js + Mermaid + Docusaurus", "Reference Architectures, Patterns, Diagrams, Code Samples)
    Container(governance, "Governance Engine", "FastAPI + OPA + Temporal", "Architecture Gates, Compliance Checks, Metrics Dashboard)
    ContainerDb(postgres, "PostgreSQL", "Primary", "Engagements, Assessments, ADRs, Roadmaps, Metrics)
    ContainerDb(redis, "Redis", "Cache", "Sessions, Assessment Cache, Rate Limit)
    ContainerQueue(kafka, "Kafka", "Events", "Assessment Events, ADR Events, Gate Events)
}

Container_Ext(github, "GitHub", "ADR Repo, Pattern Library, Templates)
Container_Ext(jira, "Jira / Linear", "Delivery Tracking)
Container_Ext(confluence, "Confluence / Notion", "Long-form Docs)
Container_Ext(miro, "Miro / FigJam", "Collab Diagrams)
Container_Ext(otel, "OTel Collector", "Telemetry)
```

---

## 4. Component Design — Assessment Engine

```mermaid
C4Component
title Component Diagram — Assessment Engine

Container_Boundary(assessment, "Assessment Engine") {
    Component(questionnaire, "Questionnaire Engine", "Domain", "Schema-driven, Conditional Logic, Weighted Scoring")
    Component(maturity, "Maturity Models", "Domain", "CMMI, Cloud Adoption, Data Maturity, Security, DevOps")
    Component(scoring, "Scoring Engine", "Domain", "Weighted Aggregation, Benchmarking, Trend Analysis")
    Component(report_gen, "Report Generator", "Domain", "PDF/HTML/Markdown, Executive + Technical, Branded)
    Component(benchmarking, "Benchmarking", "Domain", "Anonymous Peer Comparison, Industry Verticals)
    Component(evidence, "Evidence Collection", "Domain", "Artifact Upload, Linking, Verification, Versioning)
}
```

### Assessment Types
| Assessment | Model | Dimensions | Output |
|------------|-------|------------|--------|
| **Architecture Review** | Custom (Quality Attributes) | Scalability, Reliability, Security, Maintainability, Performance | ADR Backlog, Risk Register |
| **Cloud Adoption** | CAF / AWS Well-Architected | Strategy, Plan, Ready, Migrate, Innovate, Operate | Migration Roadmap |
| **Data Maturity** | DAMA-DMBOK / Custom | Governance, Quality, Architecture, Operations, Culture | Data Strategy |
| **Security Posture** | NIST CSF / ISO 27001 | Identify, Protect, Detect, Respond, Recover | Remediation Plan |
| **DevOps Maturity** | CALMS / DORA | Culture, Automation, Lean, Measurement, Sharing | Pipeline Improvements |
| **Technical Due Diligence** | Custom (M&A) | Architecture, Code, Team, Process, Risk | Investment Memo |

---

## 5. Component Design — ADR Platform

```mermaid
C4Component
title Component Diagram — ADR Platform

Container_Boundary(adr_platform, "ADR Platform") {
    Component(editor, "ADR Editor", "ProseMirror + Markdown", "Structured Editing, Template, Diagrams (Mermaid), Links")
    Component(lifecycle, "Lifecycle Engine", "Domain", "States: Draft → Review → Accepted → Superseded → Deprecated")
    Component(review, "Review Workflow", "Domain", "Reviewers, Comments, Approvals, SLA, Escalation")
    Component(template_lib, "Template Library", "Domain", "Templates: Decision, Architecture, Security, Data, Process)
    Component(search, "Search & Discovery", "Domain", "Full-text, Tags, Status, Author, Date, Cross-refs)
    Component(visualizer, "Dependency Visualizer", "D3 + Dagre", "ADR Graph, Impact Analysis, Supersession Chains)
    Component(github_sync, "GitHub Sync", "Integration", "Bidirectional: ADR ↔ Markdown in Repo, PR ↔ Review)
}
```

### ADR Template (Minimal)
```markdown
# ADR-<number>: <Title>

**Status**: Draft | Review | Accepted | Superseded | Deprecated
**Date**: YYYY-MM-DD
**Authors**: @github-handles
**Reviewers**: @github-handles
**Supersedes**: ADR-<number> (if applicable)

## Context
What is the issue? What forces are at play? (Technical, Business, Organizational)

## Decision
What are we doing? Be specific.

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
- [ ] Task 1
- [ ] Task 2

## Links
- Related ADRs: ADR-<number>
- Tickets: JIRA-<number>
- Diagrams: Miro/FigJam link
```

---

## 6. Component Design — Roadmap Planner

```mermaid
C4Component
title Component Diagram — Roadmap Planner

Container_Boundary(roadmap, "Roadmap Planner") {
    Component(timeline, "Timeline Engine", "D3.js", "Swimlanes, Time Horizons (Now/Next/Later), Zoom/Pan")
    Component(dependencies, "Dependency Graph", "Dagre + D3", "Critical Path, Blockers, Parallel Tracks")
    Component(milestones, "Milestone Tracker", "Domain", "Gates, Deliverables, Owners, Status, Health")
    Component(scenario, "Scenario Modeling", "Domain", "What-if: Scope Change, Resource Shift, Risk Event")
    Component(capacity, "Capacity Planner", "Domain", "Team Velocity, Skill Mix, Hiring Plan, Budget)
    Component(export, "Export & Share", "Domain", "PDF, PNG, PowerPoint, Embed Link, Live View)
}
```

### Roadmap Horizons
| Horizon | Timeframe | Certainty | Detail Level |
|---------|-----------|-----------|--------------|
| **Now** | 0-3 months | High | Epic-level, Sprint-ready |
| **Next** | 3-12 months | Medium | Feature-level, Team-assigned |
| **Later** | 12-36 months | Low | Theme-level, Investment Case |

---

## 6. Data Architecture

### Core Entities
```sql
-- Engagements
CREATE TABLE engagements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL, -- assessment, advisory, transformation
    status VARCHAR(30) NOT NULL, -- active, paused, completed, archived
    lead_consultant_id UUID NOT NULL,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Assessments
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    engagement_id UUID NOT NULL REFERENCES engagements(id),
    type VARCHAR(50) NOT NULL, -- architecture, cloud, security, data, devops, due_diligence
    model_version VARCHAR(20) NOT NULL,
    status VARCHAR(30) NOT NULL, -- draft, in_progress, review, completed
    score JSONB, -- {dimension: score}
    findings JSONB, -- {dimension: {strengths, gaps, recommendations}}
    report_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ
);

-- ADRs
CREATE TABLE adrs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    engagement_id UUID REFERENCES engagements(id), -- nullable for global ADRs
    number INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    status VARCHAR(20) NOT NULL, -- draft, review, accepted, superseded, deprecated
    markdown TEXT NOT NULL,
    tags TEXT[],
    supersedes_id UUID REFERENCES adrs(id),
    github_pr_number INT,
    created_at TIMESTAMPTZ DEFAULT now(),
    decided_at TIMESTAMPTZ
);

-- Roadmap Items
CREATE TABLE roadmap_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    engagement_id UUID NOT NULL REFERENCES engagements(id),
    title VARCHAR(300) NOT NULL,
    description TEXT,
    horizon VARCHAR(20) NOT NULL, -- now, next, later
    status VARCHAR(30) NOT NULL, -- proposed, planned, in_progress, done, blocked
    dependencies UUID[], -- self-referential
    owner_team VARCHAR(100),
    start_date DATE,
    target_date DATE,
    health VARCHAR(20), -- green, yellow, red
    adr_ids UUID[], -- linked decisions
    created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 7. Infrastructure Requirements

### Compute
| Component | Profile | Scaling |
|-----------|---------|---------|
| Portal (Next.js) | 2 vCPU / 4 GiB | HPA: CPU > 70% |
| Assessment API (FastAPI) | 2 vCPU / 4 GiB | HPA: RPS > 50 |
| ADR Platform (Next.js) | 2 vCPU / 4 GiB | HPA: CPU > 70% |
| Roadmap API | 2 vCPU / 4 GiB | HPA: RPS > 50 |
| Pattern Library (Docusaurus) | 1 vCPU / 2 GiB | Static (CDN) |
| Governance Engine | 2 vCPU / 4 GiB | HPA: Queue depth |

### Storage
| Data | Store | Backup |
|------|-------|--------|
| Engagement/Assessment/ADR/Roadmap Data | PostgreSQL (Managed) | Daily + PITR |
| ADR Markdown Source | GitHub (Git) | Git History |
| Pattern Library Source | GitHub (Git) | Git History |
| Assessment Templates | PostgreSQL + Git (versioned) | Daily |
| Generated Reports (PDF) | S3 / Blob Storage | Versioned, 7yr |
| Diagrams (Mermaid/Draw.io) | GitHub + Confluence | Synced |

### Integration
| System | Method | Purpose |
|--------|--------|---------|
| GitHub | App + Webhooks | ADR Repo Sync, Pattern Library, Templates |
| Jira/Linear | REST + Webhooks | Epic/Story Sync, Gate Tracking |
| Confluence/Notion | REST | Long-form Documentation |
| Miro/FigJam | REST + Embed | Collaborative Architecture Diagrams |
| Slack/Teams | Webhooks + Bot | Notifications, Approvals, Daily Digest |

---

## 8. Security & Compliance

### Data Classification
| Data | Classification | Controls |
|------|----------------|----------|
| Client Engagement Details | Confidential | Encryption, Access Logging, Tenant Isolation |
| Assessment Findings | Confidential | RLS by Engagement, Role-Based Access |
| ADRs | Internal | Version Control, Audit Trail |
| Roadmaps | Internal | Tenant Isolation |
| Benchmarking Data | Aggregated/Anonymized | No PII, Statistical Disclosure Control |

### Access Control
| Role | Engagements | Assessments | ADRs | Roadmaps | Patterns |
|------|-------------|-------------|------|----------|----------|
| **Partner/Principal** | All (Owned) | All | All | All | Contribute |
| **Consultant** | Assigned | Assigned (Owned) | Propose/Review | Edit (Assigned) | Browse |
| **Client Lead** | Own | View (Own) | View (Own) | View (Own) | Browse |
| **Delivery Lead** | All (Delivery) | View (Delivery) | View | View/Edit (Delivery) | Browse |

### Compliance
- **SOC2** — Engagement data confidentiality, access logging, quarterly access review
- **ISO 27001** — Information classification, access control, incident management
- **Client Contractual** — Data residency, retention, deletion on contract end

---

## 9. CI/CD & Delivery

### Portal/Platform Deployment
```yaml
# ArgoCD Application (App of Apps)
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: consulting-platform
spec:
  project: consulting
  source:
    repoURL: https://github.com/vsr/consulting-platform-gitops
    targetRevision: main
    path: overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: consulting-platform
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
```

### Content Pipeline (ADRs, Patterns, Templates)
```
Git Push (main) → GitHub Actions → 
  1. Lint (markdownlint, Mermaid CLI validate)
  2. Build (Docusaurus for Patterns, Next.js for Portal)
  3. Test (Link check, Mermaid render, ADR cross-ref validation)
  4. Deploy Preview (Vercel/Netlify per PR)
  5. Merge → Auto-deploy Production
```

---

## 10. Operational Runbooks

| Incident | Runbook |
|----------|---------|
| Portal unavailable | `runbook-portal-down` — check Next.js pods, CDN, DNS, database connectivity |
| Assessment report generation failed | `runbook-report-failed` — check Assessment API logs, template rendering, file storage |
| ADR GitHub sync broken | `runbook-adr-sync-broken` — check GitHub App permissions, webhook delivery, PR status |
| Roadmap visualization broken | `runbook-roadmap-viz-broken` — check D3/Dagre data format, browser console errors |
| Pattern library build failed | `runbook-patterns-build-failed` — check Mermaid diagrams, Mermaid CLI version, Docusaurus config |

### Consulting Delivery Operations
| Activity | Cadence | Owner |
|----------|---------|-------|
| Engagement Kickoff | Per engagement | Consultant + Client Lead |
| Weekly Status | Weekly | Consultant |
| Architecture Review | Per ADR | ARB |
| Milestone Gate | Per Roadmap | Delivery Lead + Client |
| Retrospective | Per Phase | Consultant + Team |
| Quarterly Business Review | Quarterly | Partner + Client Executive |

---

*Architecture Review Board approved: 2026-08-16. Next review: 2026-11-16.*