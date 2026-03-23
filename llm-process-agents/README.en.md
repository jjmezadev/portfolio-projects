# LLM Process Agents

Workflow automation engine powered by LLM agents, connectable tools, a workflow runtime, and configurable human approval gates.

## Problem

Many support, sales, compliance, and reporting operations follow repeatable patterns but still require context and decisions. An agent engine can automate much of that flow without losing operational control.

## Value proposition

- Visual workflow designer.
- Runtime with sequential, parallel, and conditional steps.
- Agent executor with tool registry and guardrails.
- Human approval gates and execution observability.

## Architecture

- Frontend: React/Next.js with workflow builder and execution viewer.
- Backend: state-machine-based runtime.
- Agent executor: reason-act-observe loop with limits and policies.
- Tools: HTTP, DB, email, Slack, RAG search, files, and calendars.
- Infrastructure: Cloud Run, Redis, PostgreSQL, Pub/Sub, and OpenTelemetry.

## Implementation included in this repo

- HTTP service in `src/server.mjs`.
- Runtime and tool registry in `src/automation-platform.mjs`.
- Workflow catalog in `fixtures/workflows.json`.
- Tests in `test/automation-platform.test.mjs`.
- OpenAPI spec in `docs/api/openapi.yaml`.
- Demo configuration in `.env.example`.

## Endpoints

- `GET /health`
- `GET /workflows`
- `POST /workflows/run/:workflowId`

## Demo credentials

- `OPENAI_API_KEY=sk-demo-agents-0001`
- `SLACK_BOT_TOKEN=xoxb-demo-agents-0001`
- `GOOGLE_CALENDAR_SERVICE_ACCOUNT=agents-calendar-demo@example.iam.gserviceaccount.com`

## Run

```bash
npm run agents:start
```

## Portfolio impact

This project is a strong differentiator for LLM/AI and software engineering because it combines agents, tools, operational safety, and product thinking.