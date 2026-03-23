# LLM Process Agents

Motor de automatizacion de procesos con agentes LLM, herramientas conectables, runtime de workflows y aprobacion humana configurable.

## Problema

Muchas operaciones de soporte, ventas, compliance y reporting siguen reglas repetibles pero requieren contexto y decisiones. Un motor de agentes permite automatizar gran parte del flujo sin perder control operativo.

## Propuesta de valor

- Designer visual para workflows.
- Runtime con steps secuenciales, paralelos y condicionales.
- Ejecutor de agentes con tool registry y guardrails.
- Human approval gates y observabilidad por ejecucion.

## Arquitectura

- Frontend: React/Next.js con workflow builder y execution viewer.
- Backend: runtime basado en state machine.
- Agent executor: loop reason-act-observe con limites y politicas.
- Herramientas: HTTP, DB, email, Slack, busqueda RAG, archivos y calendarios.
- Infra: Cloud Run, Redis, PostgreSQL, Pub/Sub y OpenTelemetry.

## Implementacion incluida en este repo

- Servicio HTTP en `src/server.mjs`.
- Runtime y tool registry en `src/automation-platform.mjs`.
- Catalogo de workflows en `fixtures/workflows.json`.
- Pruebas en `test/automation-platform.test.mjs`.
- OpenAPI en `docs/api/openapi.yaml`.
- Configuracion demo en `.env.example`.

## Endpoints

- `GET /health`
- `GET /workflows`
- `POST /workflows/run/:workflowId`

## Credenciales demo

- `OPENAI_API_KEY=sk-demo-agents-0001`
- `SLACK_BOT_TOKEN=xoxb-demo-agents-0001`
- `GOOGLE_CALENDAR_SERVICE_ACCOUNT=agents-calendar-demo@example.iam.gserviceaccount.com`

## Ejecucion

```bash
npm run agents:start
```

## Resultado esperado en portafolio

Proyecto diferenciador para LLMs/IA y software porque combina agentes, herramientas, seguridad operativa y producto.