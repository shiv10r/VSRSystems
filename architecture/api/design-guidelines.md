# API Design Guidelines

Mandatory standards for all VSR service APIs. Deviations require ARB approval with ADR.

---

## 1. Protocol Selection

| Use Case | Protocol | Rationale |
|----------|----------|-----------|
| **Service-to-Service (Internal)** | gRPC (Protobuf) | Performance, contracts, streaming |
| **Service-to-Service (Async)** | Kafka (Avro/Protobuf) | Durability, replay, decoupling |
| **External / Web / Mobile** | REST (JSON) + GraphQL (BFF) | Universality, caching, tooling |
| **Real-time / Streaming** | gRPC Streaming / SSE / WebSocket | Bidirectional, low latency |
| **High-throughput Ingestion** | gRPC / HTTP/2 + Protobuf | Throughput, schema evolution |

---

## 2. REST Standards

### Resource Naming
| Pattern | Example |
|---------|---------|
| Collection | `GET /v1/projects` |
| Single Resource | `GET /v1/projects/{projectId}` |
| Sub-resource | `GET /v1/projects/{projectId}/environments` |
| Sub-resource Item | `GET /v1/projects/{projectId}/environments/{envId}` |
| Custom Action (Avoid) | `POST /v1/projects/{id}:promote` → Use sub-resource `POST /v1/projects/{id}/promotions` |

### HTTP Methods
| Method | Use | Idempotent |
|--------|-----|------------|
| GET | Retrieve | Yes |
| POST | Create, Custom Actions | No |
| PUT | Full Replace | Yes |
| PATCH | Partial Update | Yes (prefer) |
| DELETE | Delete | Yes |

### Status Codes
| Code | Use |
|------|-----|
| 200 | Success (GET, PUT, PATCH) |
| 201 | Created (POST) — return `Location` header |
| 202 | Accepted (Async) — return `Location` for status polling |
| 204 | No Content (DELETE, Successful PUT/PATCH with no body) |
| 400 | Bad Request (Validation) |
| 401 | Unauthenticated |
| 403 | Forbidden (Authorized but insufficient permissions) |
| 404 | Not Found |
| 409 | Conflict (Version mismatch, Duplicate) |
| 422 | Unprocessable Entity (Semantic Validation) |
| 429 | Rate Limited — include `Retry-After` |
| 500 | Internal Error (Log with Request ID) |
| 503 | Unavailable (Maintenance, Circuit Open) |

### Versioning
- **URL Path**: `/v1/`, `/v2/` — Major versions only
- **Header Negotiation**: `Accept: application/vnd.vsr.v1+json` (Optional)
- **Deprecation**: `Sunset` header + `Deprecation: true` header + 6-month notice
- **Sunset**: Return 410 Gone after sunset date

---

## 3. Request/Response Conventions

### Standard Envelope (All Responses)
```json
{
  "data": {},           // Object or Array — Successful response
  "meta": {             // Optional pagination, timing, etc.
    "requestId": "req_abc123",
    "timestamp": "2026-08-16T10:30:00Z",
    "version": "1.0.0"
  },
  "links": {            // HATEOAS (Optional)
    "self": "/v1/projects/123",
    "next": "/v1/projects?cursor=abc"
  }
}
```

### Error Envelope
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      { "field": "email", "code": "INVALID_FORMAT", "message": "Invalid email format" }
    ],
    "requestId": "req_abc123",
    "timestamp": "2026-08-16T10:30:00Z"
  }
}
```

### Pagination (Cursor-Based)
```json
{
  "data": [...],
  "meta": {
    "requestId": "req_abc123",
    "page": { "cursor": "eyJpZCI6MTIzfQ==", "hasMore": true, "limit": 50 }
  },
  "links": {
    "next": "/v1/projects?cursor=eyJpZCI6MTIzfQ=="
  }
}
```

### Filtering, Sorting, Field Selection
```
GET /v1/projects?filter[status]=active&filter[owner]=team-a&sort=-createdAt&fields=id,name,status
```

---

## 4. gRPC Standards

### Protobuf Style
```protobuf
syntax = "proto3";

package vsr.platform.v1;

option go_package = "github.com/vsr/platform/gen/go/vsr/platform/v1";
option java_package = "com.vsr.platform.v1";
option csharp_namespace = "Vsr.Platform.V1";

// Service Definition
service ProjectService {
  rpc GetProject(GetProjectRequest) returns (Project);
  rpc ListProjects(ListProjectsRequest) returns (ListProjectsResponse);
  rpc CreateProject(CreateProjectRequest) returns (Project);
  rpc UpdateProject(UpdateProjectRequest) returns (Project);
  rpc DeleteProject(DeleteProjectRequest) returns (google.protobuf.Empty);
  rpc WatchProjects(WatchProjectsRequest) returns (stream ProjectEvent);
}

// Messages
message Project {
  string id = 1;
  string tenant_id = 2;
  string slug = 3;
  string name = 4;
  string owner_id = 5;
  ProjectQuota quota = 6;
  google.protobuf.Timestamp created_at = 7;
  google.protobuf.Timestamp updated_at = 8;
}

message ProjectQuota {
  int32 cpu = 1;
  int32 memory_gb = 2;
}
```

### gRPC Error Mapping
| gRPC Code | HTTP Equivalent | When |
|-----------|-----------------|------|
| OK | 200 | Success |
| INVALID_ARGUMENT | 400 | Validation |
| UNAUTHENTICATED | 401 | No/invalid credentials |
| PERMISSION_DENIED | 403 | Insufficient scope |
| NOT_FOUND | 404 | Resource missing |
| ALREADY_EXISTS | 409 | Duplicate |
| FAILED_PRECONDITION | 422 | Semantic validation |
| RESOURCE_EXHAUSTED | 429 | Rate limit |
| INTERNAL | 500 | Unexpected error |
| UNAVAILABLE | 503 | Service down, circuit open |

### Interceptors (Mandatory)
- **Auth**: Validate JWT/SVID, populate context
- **Logging**: Structured log with request ID, latency
- **Metrics**: RED metrics per method
- **Tracing**: Propagate W3C TraceContext
- **Timeout**: Default 5s, configurable per method
- **Retry**: Client-side only, idempotent methods

---

## 5. Async API (Kafka)

### Topic Naming
```
<domain>.<entity>.<action>.<version>
Examples:
  platform.project.created.v1
  platform.deployment.started.v1
  platform.deployment.completed.v1
  platform.pipeline.run.failed.v1
```

### Event Schema (Avro)
```json
{
  "type": "record",
  "name": "DeploymentStarted",
  "namespace": "vsr.platform.events.v1",
  "fields": [
    {"name": "eventId", "type": "string"},
    {"name": "eventType", "type": "string"},
    {"name": "timestamp", "type": {"type": "long", "logicalType": "timestamp-millis"}},
    {"name": "tenantId", "type": "string"},
    {"name": "correlationId", "type": ["null", "string"], "default": null},
    {"name": "payload", "type": {
      "type": "record",
      "name": "DeploymentStartedPayload",
      "fields": [
        {"name": "deploymentId", "type": "string"},
        {"name": "environmentId", "type": "string"},
        {"name": "artifactRef", "type": "string"},
        {"name": "triggeredBy", "type": "string"}
      ]
    }}
  ]
}
```

### Consumer Contracts
- **Exactly-once** semantics via transactional outbox + idempotent consumers
- **Schema Registry** (Confluent/Apicurio) — BACKWARD compatibility required
- **Dead Letter Queue** — Retry 3x → DLQ → Alert

---

## 6. GraphQL (BFF Only)

### Schema Design
```graphql
type Project {
  id: ID!
  tenantId: ID!
  slug: String!
  name: String!
  owner: User!
  quota: ProjectQuota!
  environments: [Environment!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Query {
  project(id: ID!): Project
  projects(filter: ProjectFilter, first: Int, after: String): ProjectConnection!
}

type Mutation {
  createProject(input: CreateProjectInput!): CreateProjectPayload!
  updateProject(input: UpdateProjectInput!): UpdateProjectPayload!
  deleteProject(id: ID!): DeleteProjectPayload!
}
```

### Rules
- **Only at BFF Layer** — Core services expose gRPC/REST
- **Relay Cursor Connections** — Standard pagination
- **DataLoader** — N+1 prevention
- **Complexity Limit** — Max depth 10, cost analysis
- **Persisted Queries** — Allowlist in production

---

## 7. Authentication & Authorization

### Headers
| Header | Value | Required |
|--------|-------|----------|
| `Authorization` | `Bearer <JWT/SVID>` | Yes (Authenticated endpoints) |
| `X-Request-ID` | UUID v4 | Yes (All requests) |
| `X-Tenant-ID` | UUID | Yes (Multi-tenant) |
| `Idempotency-Key` | UUID | Yes (Mutating POST/PUT/PATCH) |

### Token Claims (JWT/SVID)
```json
{
  "sub": "user:123",
  "tenant_id": "tenant:456",
  "scopes": ["projects:read", "projects:write", "deployments:write"],
  "roles": ["developer", "deployment-operator"],
  "exp": 1723845600,
  "iat": 1723842000,
  "jti": "req_abc123"
}
```

---

## 8. Rate Limiting

### Tiers
| Tier | Requests/Minute | Burst | Use Case |
|------|-----------------|-------|----------|
| **Free** | 60 | 10 | Public APIs, Trial |
| **Standard** | 600 | 100 | Default |
| **Premium** | 6000 | 1000 | High-volume |
| **Internal** | Unlimited | — | Service-to-Service (mTLS) |

### Headers
```
X-RateLimit-Limit: 600
X-RateLimit-Remaining: 599
X-RateLimit-Reset: 1723845600
Retry-After: 45  (on 429)
```

---

## 9. API Lifecycle

### Stages
| Stage | Criteria | Support |
|-------|----------|---------|
| **Alpha** | Internal only, breaking changes anytime | None |
| **Beta** | External preview, feedback invited | Best effort |
| **GA (v1)** | Stable, SLO-backed, 6-month deprecation | Full SLA |
| **Deprecated** | `Sunset` header set, migration guide published | Security fixes only |
| **Sunset** | 410 Gone, removed from docs | None |

### Migration Support
- **6-month notice** before deprecation
- **Migration guide** with code samples
- **Compatibility shim** (optional, 3-month overlap)
- **Direct support** for top 10 consumers

---

## 10. Documentation & Discovery

### OpenAPI 3.1 (Required)
- **File**: `openapi.yaml` at repo root
- **CI Gate**: `spectral lint` + `redocly bundle`
- **Published**: `/docs/api/v1/openapi.yaml` + Redoc UI

### API Catalog (Backstage)
- Auto-discovery from GitHub `openapi.yaml`
- Owner, Slack, Docs, Examples, Changelog
- Try-it-out (with mock server)

---

*Architecture Review Board approved: 2026-08-16. Next review: 2026-11-16.*