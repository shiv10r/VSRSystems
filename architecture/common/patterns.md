# Shared Architectural Patterns

Canonical patterns used across all VSR services. Implement exactly as specified — deviations require ARB approval.

---

## 1. CQRS + Event Sourcing (Core Domain)

### When to Use
- Complex business logic with audit requirements
- Multiple read models (queries) from single write model
- Temporal queries / replay capability needed

### Structure
```
Command Side (Write Model)          Query Side (Read Models)
┌─────────────────────────┐         ┌─────────────────────────┐
│  Command Handler        │         │  Projection 1 (SQL)     │
│    ↓ validates          │         │    ↓ materializes       │
│  Aggregate              │  Events │  Projection 2 (ES)      │
│    ↓ emits              │────────▶│    ↓ materializes       │
│  Domain Events          │         │  Projection N (Cache)   │
└─────────────────────────┘         └─────────────────────────┘
```

### Implementation Rules
- **Event store**: Append-only, immutable (EventStoreDB / Kafka / Cosmos DB change feed)
- **Snapshotting**: Every 100 events for aggregate reconstruction performance
- **Projections**: Idempotent, restartable, exactly-once semantics via checkpointing
- **Event schema**: Avro in Schema Registry; backward/forward compatibility required

---

## 2. Saga Pattern (Distributed Transactions)

### When to Use
- Cross-service operations requiring atomicity without 2PC
- Long-running business processes (hours/days)

### Choreography vs Orchestration
| Scenario | Pattern |
|----------|---------|
| 2-3 services, simple rollback | Choreography (domain events) |
| 4+ services, complex compensation | Orchestration (state machine) |

### Orchestration Implementation (Recommended)
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Orchestrator │────▶│  Service A  │────▶│  Service B  │
│  (state machine)     │  (do/compensate)   │  (do/compensate) │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       └───────────────────┴───────────────────┘
              Compensation on failure
```

### Requirements
- **Idempotency keys** on every command
- **Compensation actions** for every step (explicit in state machine)
- **Timeouts** with escalation to human operator
- **Observability** — saga state persisted, queryable

---

## 3. Outbox Pattern (Reliable Event Publishing)

### Problem
Dual write: database update + event publish must be atomic.

### Solution
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Transaction │────▶│  Outbox Table │────▶│  Relay       │
│  (DB + Outbox)     │  (same TX)    │     │  (CDC/Poller)│
└──────────────┘     └──────────────┘     └──────────────┘
```

### Implementation
- **Outbox table**: `id, aggregate_id, event_type, payload, created_at, published_at`
- **Relay**: Debezium CDC → Kafka, or transactional outbox poller (100ms intervals)
- **Idempotent consumers** — deduplicate via `event_id`

---

## 4. API Gateway + BFF (Backend for Frontend)

### Pattern
```
┌─────────┐     ┌──────────────┐     ┌──────────────┐
│  Web    │────▶│  BFF (Web)   │────▶│  Core Services │
│  Mobile │────▶│  BFF (Mobile)│────▶│  (shared)      │
└─────────┘     └──────────────┘     └──────────────┘
```

### Rules
- **One BFF per client type** (web, mobile, partner API)
- **BFF owns** aggregation, shaping, auth translation
- **Core services** never expose client-specific endpoints
- **GraphQL** at BFF layer; **REST/gRPC** at core service layer

---

## 5. Feature Flag Framework

### Structure
```json
{
  "flag_key": "new-checkout-flow",
  "variants": {
    "control": { "enabled": false },
    "treatment": { "enabled": true, "rollout": 10 }
  },
  "targeting": {
    "tenant_ids": ["tenant-123"],
    "user_segments": ["beta-users"]
  }
}
```

### Requirements
- **LaunchDarkly / Unleash / custom** — evaluated at edge (CDN) or service
- **Default OFF** — new features default to disabled
- **Gradual rollout** — 1% → 10% → 50% → 100% over days
- **Kill switch** — instant global disable via config map
- **Audit log** — every flag change logged with author, timestamp, reason

---

## 6. Multi-Tenancy Patterns

| Isolation Level | Use Case | Implementation |
|-----------------|----------|----------------|
| **Shared schema + RLS** | SaaS, low regulatory | Row-level security policies |
| **Schema per tenant** | Moderate isolation | Separate schemas, shared DB |
| **Database per tenant** | High isolation / compliance | Dedicated DB, connection pooling |
| **Cluster per tenant** | Maximum isolation | Dedicated K8s namespace/cluster |

### Decision Matrix
- Default: **Shared schema + RLS** (cost-effective, operational simplicity)
- Upgrade path: Schema → Database → Cluster as tenant grows / compliance demands

---

## 7. Configuration & Secrets

### Configuration (Non-Secret)
- **ConfigMap** for env-specific values (feature flags, timeouts, URLs)
- **Versioned** — ConfigMap per release; rollback = previous ConfigMap
- **Validation** — JSON Schema validation on apply

### Secrets
- **Never in ConfigMap** — Vault / Azure Key Vault / AWS Secrets Manager
- **Injection** — CSI driver (K8s) or sidecar at pod startup
- **Rotation** — automated, 30-day max; cert-manager for TLS
- **Access** — least privilege; service accounts per namespace

---

## 8. Error Handling Taxonomy

```typescript
// Standard error envelope
interface ApiError {
  code: string;           // "VALIDATION_ERROR", "NOT_FOUND", "UPSTREAM_TIMEOUT"
  message: string;        // Human-readable
  details?: Record<string, unknown>; // Field errors, retry-after, etc.
  requestId: string;      // Correlation ID
  timestamp: string;      // ISO8601
}

// HTTP status mapping
const ERROR_STATUS = {
  VALIDATION_ERROR: 400,
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  RATE_LIMITED: 429,
  INTERNAL: 500,
  UNAVAILABLE: 503,
} as const;
```

### Retry Policy (Default)
| Error Category | Retry | Backoff |
|----------------|-------|---------|
| Transient (5xx, timeout, network) | 3x | Exponential 100ms→1s→10s + jitter |
| Rate limited (429) | 5x | Respect `Retry-After` header |
| Client errors (4xx except 429) | Never | — |

---

## 9. Testing Strategy Pyramid

```
        ┌─────────────┐
        │  Contract   │  ← Pact (consumer-driven), Schema registry
        │  Tests      │
        ├─────────────┤
        │ Integration │  ← Testcontainers, real dependencies
        │ Tests       │
        ├─────────────┤
        │  Unit Tests │  ← Fast, isolated, >80% coverage
        │  (TDD)      │
        └─────────────┘
```

### Requirements
- **Contract tests** in CI for every provider/consumer pair
- **Integration tests** against real Postgres, Redis, Kafka (Testcontainers)
- **Mutation testing** (Stryker/PIT) for critical domain logic
- **Chaos tests** in staging (Gremlin/Chaos Mesh) — monthly

---

*All patterns are mandatory. Document deviations in service ADR.*