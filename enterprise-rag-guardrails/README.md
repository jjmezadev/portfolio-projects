# Enterprise RAG Guardrails

Asistente RAG empresarial orientado a producción para consultar documentación interna, tickets, políticas y conocimiento operativo con respuestas trazables, citadas y protegidas por guardrails.

## Problema

La información crítica suele estar dispersa entre PDFs, markdown, tickets, wikis y FAQs. Eso incrementa el tiempo de búsqueda, baja la consistencia de las respuestas y genera fricción entre equipos.

## Propuesta de valor

- Chat empresarial con fuentes citadas.
- Guardrails para PII, inyección de prompts, toxicidad y respuestas fuera de dominio.
- Métricas de costo, latencia, relevancia y satisfacción.
- Despliegue cloud con observabilidad y CI/CD.

## Arquitectura

- Frontend: Next.js con chat UI, panel admin y analytics.
- Backend: Node.js + TypeScript + Fastify.
- Retrieval: pgvector o Qdrant con PostgreSQL para metadata.
- Modelos: OpenAI, Claude, Gemini o alternativa local.
- Observabilidad: OpenTelemetry, Grafana y Sentry.
- Infra: Docker, Cloud Run, Terraform, Secret Manager.

## Métricas objetivo

- Relevancia útil: >= 85%
- Latencia P95: < 3s
- Tasa de alucinación: < 5%
- Costo por consulta: < 0.05 USD
- Uptime: 99.5%

## Roadmap

### Fase 1

- Ingesta documental y chunking adaptativo.
- Embeddings y vector store.
- Retrieval baseline y evaluación inicial.

### Fase 2

- Generación con guardrails de entrada y salida.
- Streaming en UI.
- Feedback thumbs up/down y evaluación automatizada.

### Fase 3

- CI/CD, security scanning y despliegue productivo.
- Dashboards de costo, latencia y calidad.
- Caching semántico y reranking.

## Stack destacado

`Next.js` `Fastify` `TypeScript` `PostgreSQL` `pgvector` `OpenTelemetry` `Terraform` `Cloud Run`

## Resultado esperado en portafolio

Proyecto fuerte para las categorías de LLMs/IA, nube y arquitectura, desarrollo de software y seguridad aplicada.