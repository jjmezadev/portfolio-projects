# Enterprise RAG Guardrails

Asistente RAG empresarial orientado a produccion para consultar documentacion interna, tickets, politicas y conocimiento operativo con respuestas trazables, citadas y protegidas por guardrails.

## Problema

La informacion critica suele estar dispersa entre PDFs, markdown, tickets, wikis y FAQs. Eso incrementa el tiempo de busqueda, baja la consistencia de las respuestas y genera friccion entre equipos.

## Propuesta de valor

- Chat empresarial con fuentes citadas.
- Guardrails para PII, inyeccion de prompts, toxicidad y respuestas fuera de dominio.
- Metricas de costo, latencia, relevancia y satisfaccion.
- Despliegue cloud con observabilidad y CI/CD.

## Arquitectura

- Frontend: Next.js con chat UI, panel admin y analytics.
- Backend: Node.js + TypeScript + Fastify.
- Retrieval: pgvector o Qdrant con PostgreSQL para metadata.
- Modelos: OpenAI, Claude, Gemini o alternativa local.
- Observabilidad: OpenTelemetry, Grafana y Sentry.
- Infra: Docker, Cloud Run, Terraform y Secret Manager.

## Implementacion incluida en este repo

- Servicio HTTP en `src/server.mjs`.
- Retrieval y guardrails en `src/rag-service.mjs`.
- Fixtures de corpus en `fixtures/corpus.json`.
- Pruebas en `test/rag-service.test.mjs`.
- OpenAPI en `docs/api/openapi.yaml`.
- Configuracion demo en `.env.example`.

## Endpoints

- `GET /health`
- `GET /documents`
- `POST /ask`

## Credenciales demo

- `OPENAI_API_KEY=sk-demo-rag-0001-enterprise`
- `VECTOR_DB_URL=postgres://rag_demo_user:rag_demo_password@demo-pgvector.internal:5432/rag_platform`
- `REDIS_URL=redis://cache_demo_user:cache_demo_password@demo-redis.internal:6379/0`

## Ejecucion

```bash
npm run rag:start
```

## Resultado esperado en portafolio

Proyecto fuerte para LLMs/IA, nube y arquitectura, desarrollo de software y seguridad aplicada.