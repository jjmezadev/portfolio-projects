# Portafolio de proyectos

Este repositorio agrupa cinco proyectos de portafolio diseñados para demostrar capacidad de entrega en IA aplicada, datos, arquitectura cloud y desarrollo de software listo para producción.

## Estado actual

Los cinco proyectos están desarrollados como MVPs ejecutables con:

- lógica de dominio en Node.js ESM
- fixtures de ejemplo para demo
- servidor HTTP mínimo por proyecto
- pruebas automáticas del core
- smoke check del monorepo
- workflow de CI para GitHub Actions

## Comandos

Desde la raíz del repo:

- `npm test`
- `npm run check`
- `npm run rag:start`
- `npm run dataq:start`
- `npm run docproc:start`
- `npm run gateway:start`
- `npm run agents:start`
- `docker compose up --build`

Puertos por defecto:

- RAG: `4011`
- Data Quality: `4012`
- Document Processing: `4013`
- API Analytics: `4014`
- LLM Agents: `4015`

## Proyectos

1. [enterprise-rag-guardrails](./enterprise-rag-guardrails/README.md)
   Asistente RAG empresarial con fuentes citadas, guardrails y observabilidad.

2. [data-quality-observability](./data-quality-observability/README.md)
   Plataforma de calidad y observabilidad de datos con scoring, alertas y anomalías.

3. [intelligent-document-processing](./intelligent-document-processing/README.md)
   Sistema de clasificación, extracción y validación de documentos con Human-in-the-Loop.

4. [multitenant-api-analytics](./multitenant-api-analytics/README.md)
   SaaS multi-tenant para exponer APIs con rate limiting, analytics y billing por uso.

5. [llm-process-agents](./llm-process-agents/README.md)
   Motor de automatización de procesos con agentes LLM, herramientas y supervisión humana.

## Cobertura implementada

### 1. Enterprise RAG Guardrails

- retrieval en memoria con scoring por overlap
- guardrails de input, grounding y masking de PII
- endpoint `/ask`
- endpoint `/documents`

### 2. Data Quality Observability

- checks de freshness, volume, completeness, uniqueness, validity, schema y consistency
- scoring 0-100 por tabla
- detección de anomalías por desvío de volumen y staleness
- endpoint `/reports`

### 3. Intelligent Document Processing

- clasificación de documentos
- extracción estructurada por tipo
- validación de reglas de negocio
- confidence scoring y ruteo `auto` o `review`
- endpoint `/process`

### 4. Multitenant API Analytics

- auth por API key
- rate limiting por tenant
- aislamiento de analytics por tenant
- agregación básica de métricas e insights
- endpoint `/simulate-request`

### 5. LLM Process Agents

- runtime secuencial de workflows
- tool registry para triage, scoring, reporting y compliance
- human approval gates
- endpoint `/workflows/run/:id`

## Mapa de capacidades

| Capacidad | Proyectos |
| --- | --- |
| LLMs / RAG | 1, 3, 5 |
| Agentes | 5 |
| Cloud / Infra | 1, 2, 4, 5 |
| Data Engineering | 2, 4 |
| Backend / APIs | 1, 2, 3, 4, 5 |
| Observabilidad | 1, 2, 4, 5 |
| Seguridad | 1, 3, 4, 5 |

## Publicación sugerida

La opción elegida es un monorepo público con este nombre sugerido:

- `portfolio-projects`

Estructura esperada en GitHub:

- `portfolio-projects/enterprise-rag-guardrails`
- `portfolio-projects/data-quality-observability`
- `portfolio-projects/intelligent-document-processing`
- `portfolio-projects/multitenant-api-analytics`
- `portfolio-projects/llm-process-agents`

Los enlaces del sitio principal ya apuntan a esta estructura de monorepo.

## Despliegue demo

El repo incluye:

- `docker-compose.yml` para levantar los cinco servicios juntos
- `Dockerfile` por proyecto
- `.env.example` por proyecto con credenciales ficticias consistentes
- `docs/api/openapi.yaml` por proyecto
- `docs/operations.md` por proyecto