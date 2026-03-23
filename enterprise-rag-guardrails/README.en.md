# Enterprise RAG Guardrails

Production-oriented enterprise RAG assistant for querying internal documentation, tickets, policies, and operational knowledge with traceable, cited, and guardrail-protected answers.

## Problem

Critical knowledge is usually fragmented across PDFs, markdown pages, tickets, wikis, and FAQs. That increases search time, lowers answer consistency, and creates friction across teams.

## Value proposition

- Enterprise chat with cited sources.
- Guardrails for PII, prompt injection, toxicity, and out-of-domain answers.
- Cost, latency, relevance, and satisfaction metrics.
- Cloud deployment with observability and CI/CD.

## Architecture

- Frontend: Next.js with chat UI, admin panel, and analytics.
- Backend: Node.js + TypeScript + Fastify.
- Retrieval: pgvector or Qdrant with PostgreSQL metadata.
- Models: OpenAI, Claude, Gemini, or a local alternative.
- Observability: OpenTelemetry, Grafana, and Sentry.
- Infrastructure: Docker, Cloud Run, Terraform, and Secret Manager.

## Implementation included in this repo

- HTTP service in `src/server.mjs`.
- Retrieval and guardrails in `src/rag-service.mjs`.
- Demo corpus fixtures in `fixtures/corpus.json`.
- Tests in `test/rag-service.test.mjs`.
- OpenAPI spec in `docs/api/openapi.yaml`.
- Demo configuration in `.env.example`.

## Endpoints

- `GET /health`
- `GET /documents`
- `POST /ask`

## Demo credentials

- `OPENAI_API_KEY=sk-demo-rag-0001-enterprise`
- `VECTOR_DB_URL=postgres://rag_demo_user:rag_demo_password@demo-pgvector.internal:5432/rag_platform`
- `REDIS_URL=redis://cache_demo_user:cache_demo_password@demo-redis.internal:6379/0`

## Run

```bash
npm run rag:start
```

## Portfolio impact

This project is a strong showcase for LLMs/AI, cloud and architecture, software engineering, and applied security.