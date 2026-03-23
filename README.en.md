# Portfolio Projects

This repository groups five portfolio projects designed to demonstrate delivery capability across applied AI, data, cloud architecture, and production-ready software engineering.

## Current status

The five projects are implemented as runnable MVPs with:

- domain logic in Node.js ESM
- demo fixtures
- a minimal HTTP server per project
- automated core tests
- monorepo smoke checks
- a GitHub Actions CI workflow

## Commands

From the repository root:

- `npm test`
- `npm run check`
- `npm run rag:start`
- `npm run dataq:start`
- `npm run docproc:start`
- `npm run gateway:start`
- `npm run agents:start`
- `docker compose up --build`

Default ports:

- RAG: `4011`
- Data Quality: `4012`
- Document Processing: `4013`
- API Analytics: `4014`
- LLM Agents: `4015`

## Projects

1. [enterprise-rag-guardrails](./enterprise-rag-guardrails/README.md)
   Enterprise RAG assistant with cited sources, guardrails, and observability.

2. [data-quality-observability](./data-quality-observability/README.md)
   Data quality and observability platform with scoring, alerts, and anomaly detection.

3. [intelligent-document-processing](./intelligent-document-processing/README.md)
   Document classification, extraction, and validation system with human-in-the-loop review.

4. [multitenant-api-analytics](./multitenant-api-analytics/README.md)
   Multi-tenant SaaS platform for APIs with rate limiting, analytics, and usage-based billing.

5. [llm-process-agents](./llm-process-agents/README.md)
   Workflow automation engine powered by LLM agents, tools, and human supervision.

## Implemented coverage

### 1. Enterprise RAG Guardrails

- in-memory retrieval with overlap-based scoring
- input, grounding, and PII masking guardrails
- `/ask` endpoint
- `/documents` endpoint

### 2. Data Quality Observability

- freshness, volume, completeness, uniqueness, validity, schema, and consistency checks
- 0-100 health score per table
- anomaly detection for volume deviation and staleness
- `/reports` endpoint

### 3. Intelligent Document Processing

- document classification
- structured extraction by type
- business rule validation
- confidence scoring and `auto` or `review` routing
- `/process` endpoint

### 4. Multitenant API Analytics

- API key authentication
- rate limiting per tenant
- tenant analytics isolation
- basic metrics aggregation and insights
- `/simulate-request` endpoint

### 5. LLM Process Agents

- sequential workflow runtime
- tool registry for triage, scoring, reporting, and compliance
- human approval gates
- `/workflows/run/:id` endpoint

## Capability map

| Capability | Projects |
| --- | --- |
| LLMs / RAG | 1, 3, 5 |
| Agents | 5 |
| Cloud / Infra | 1, 2, 4, 5 |
| Data Engineering | 2, 4 |
| Backend / APIs | 1, 2, 3, 4, 5 |
| Observability | 1, 2, 4, 5 |
| Security | 1, 3, 4, 5 |

## Suggested publication

The chosen option is a public monorepo with this suggested name:

- `portfolio-projects`

Expected GitHub structure:

- `portfolio-projects/enterprise-rag-guardrails`
- `portfolio-projects/data-quality-observability`
- `portfolio-projects/intelligent-document-processing`
- `portfolio-projects/multitenant-api-analytics`
- `portfolio-projects/llm-process-agents`

The main portfolio website already points to this monorepo structure.

## Demo deployment

The repository includes:

- `docker-compose.yml` to run all five services together
- one `Dockerfile` per project
- one `.env.example` per project with consistent fake credentials
- one `docs/api/openapi.yaml` per project
- one `docs/operations.md` per project