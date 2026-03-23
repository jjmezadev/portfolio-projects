# Portfolio Projects

This repository groups thirteen portfolio projects designed to demonstrate delivery capability across applied AI, data, cloud architecture, and production-ready software engineering.

## Current status

All thirteen projects are now implemented as runnable MVPs.

The monorepo includes:

- domain logic in Node.js ESM
- demo fixtures
- a minimal HTTP server per project
- automated core tests
- monorepo smoke checks
- a GitHub Actions CI workflow
- one Dockerfile and one `.env.example` per project
- one OpenAPI spec and one operations runbook per project

## Commands

From the repository root:

- `npm test`
- `npm run check`
- `npm run rag:start`
- `npm run dataq:start`
- `npm run docproc:start`
- `npm run gateway:start`
- `npm run agents:start`
- `npm run fraud:start`
- `npm run codereview:start`
- `npm run finops:start`
- `npm run support:start`
- `npm run compliance:start`
- `npm run etl:start`
- `npm run flags:start`
- `npm run mlmon:start`
- `docker compose up --build`

Default ports:

- RAG: `4011`
- Data Quality: `4012`
- Document Processing: `4013`
- API Analytics: `4014`
- LLM Agents: `4015`

- Fraud Detection: `4016`
- AI Code Review: `4017`
- Multi-Cloud Cost Optimizer: `4018`
- Support Copilot: `4019`
- Compliance Audit: `4020`
- Visual ETL Builder: `4021`
- Feature Flags: `4022`
- ML Monitoring: `4023`

## Implemented projects

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

6. [real-time-fraud-detection](./real-time-fraud-detection/README.md)
   Real-time fraud detection engine combining rules, ML, and AI-assisted explanations.

7. [ai-code-review-platform](./ai-code-review-platform/README.md)
   AI code review platform focused on bugs, security, performance, and developer experience.

8. [multicloud-cost-optimizer](./multicloud-cost-optimizer/README.md)
   Multi-cloud cost optimizer with prioritized savings recommendations and business-language explanations.

9. [real-time-support-copilot](./real-time-support-copilot/README.md)
   Real-time support copilot with customer context, RAG, and agent suggestions.

10. [automated-compliance-audit](./automated-compliance-audit/README.md)
    Automated compliance and audit platform with continuous evidence collection.

11. [visual-etl-builder-ai](./visual-etl-builder-ai/README.md)
    Visual ETL builder with AI-assisted SQL generation and monitoring.

12. [feature-flags-experimentation](./feature-flags-experimentation/README.md)
    Feature flags and A/B experimentation system with built-in statistical analytics.

13. [ml-model-monitoring-platform](./ml-model-monitoring-platform/README.md)
    ML model monitoring platform with drift, fairness, and business impact analysis.

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

### 6. Real-Time Fraud Detection

- real-time scoring for velocity, geolocation, device, and blocklist rules
- `approve`, `review`, and `decline` decisions
- `/score` endpoint
- `/profiles` endpoint

### 7. AI Code Review Platform

- diff analysis for security, performance, testing, and maintainability
- merge recommendation and risk scoring
- `/review` endpoint
- `/samples` endpoint

### 8. Multi-Cloud Cost Optimizer

- rightsizing and commitment optimization opportunities
- prioritized savings recommendations by account and resource
- `/optimize` endpoint
- `/accounts` endpoint

### 9. Real-Time Support Copilot

- knowledge retrieval and customer context grounding
- suggested replies and escalation actions
- `/assist` endpoint
- `/knowledge` endpoint

### 10. Automated Compliance Audit

- control scoring by evidence freshness, status, and exceptions
- consolidated remediation report
- `/report` endpoint
- `/controls` endpoint

### 11. Visual ETL Builder AI

- natural-language pipeline suggestion
- SQL compilation and validation
- `/suggest` endpoint
- `/compile` endpoint

### 12. Feature Flags and Experimentation

- deterministic flag evaluation
- experiment lift and winner analysis
- `/evaluate` endpoint
- `/experiments/:id` endpoint

### 13. ML Model Monitoring Platform

- drift, fairness, and degradation monitoring
- per-model health score
- `/report` endpoint
- `/models` endpoint

## Capability map

| Capability | Projects |
| --- | --- |
| LLMs / RAG | 1, 3, 5, 7, 9, 11 |
| Agents | 5, 9 |
| Cloud / Infra | 1, 2, 4, 5, 8, 10, 12 |
| Data Engineering | 2, 4, 8, 11 |
| Backend / APIs | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 |
| Observability | 1, 2, 4, 5, 6, 8, 10, 13 |
| Security | 1, 3, 4, 5, 6, 7, 10, 12, 13 |

## Suggested publication

The chosen option is a public monorepo with this suggested name:

- `portfolio-projects`

Expected GitHub structure:

- `portfolio-projects/enterprise-rag-guardrails`
- `portfolio-projects/data-quality-observability`
- `portfolio-projects/intelligent-document-processing`
- `portfolio-projects/multitenant-api-analytics`
- `portfolio-projects/llm-process-agents`
- `portfolio-projects/real-time-fraud-detection`
- `portfolio-projects/ai-code-review-platform`
- `portfolio-projects/multicloud-cost-optimizer`
- `portfolio-projects/real-time-support-copilot`
- `portfolio-projects/automated-compliance-audit`
- `portfolio-projects/visual-etl-builder-ai`
- `portfolio-projects/feature-flags-experimentation`
- `portfolio-projects/ml-model-monitoring-platform`

The main portfolio website already points to this monorepo structure.

## Demo deployment

The repository includes:

- `docker-compose.yml` to run all thirteen services together
- one `Dockerfile` per project
- one `.env.example` per project with consistent fake credentials
- one `docs/api/openapi.yaml` per project
- one `docs/operations.md` per project

The eight projects added in this iteration now match the closure level of the original five MVPs: runnable core logic, HTTP server, fixtures, tests, OpenAPI, runbook, and Docker deployment.