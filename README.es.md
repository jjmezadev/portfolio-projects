# Portafolio de proyectos

Este repositorio agrupa trece proyectos de portafolio disenados para demostrar capacidad de entrega en IA aplicada, datos, arquitectura cloud y desarrollo de software listo para produccion.

## Estado actual

Actualmente los trece proyectos estan implementados como MVPs ejecutables.

El monorepo incluye:

- logica de dominio en Node.js ESM
- fixtures de ejemplo para demo
- servidor HTTP minimo por proyecto
- pruebas automaticas del core
- smoke check del monorepo
- workflow de CI para GitHub Actions
- Dockerfile y `.env.example` por proyecto
- OpenAPI y runbook operativo por proyecto

## Comandos

Desde la raiz del repo:

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

Puertos por defecto:

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

## Proyectos implementados

1. [enterprise-rag-guardrails](./enterprise-rag-guardrails/README.md)
   Asistente RAG empresarial con fuentes citadas, guardrails y observabilidad.

2. [data-quality-observability](./data-quality-observability/README.md)
   Plataforma de calidad y observabilidad de datos con scoring, alertas y anomalias.

3. [intelligent-document-processing](./intelligent-document-processing/README.md)
   Sistema de clasificacion, extraccion y validacion de documentos con Human-in-the-Loop.

4. [multitenant-api-analytics](./multitenant-api-analytics/README.md)
   SaaS multi-tenant para exponer APIs con rate limiting, analytics y billing por uso.

5. [llm-process-agents](./llm-process-agents/README.md)
   Motor de automatizacion de procesos con agentes LLM, herramientas y supervision humana.

6. [real-time-fraud-detection](./real-time-fraud-detection/README.md)
   Motor de deteccion de fraude en tiempo real con reglas, ML y explicabilidad asistida por IA.

7. [ai-code-review-platform](./ai-code-review-platform/README.md)
   Plataforma de code review con IA para bugs, seguridad, performance y DevEx.

8. [multicloud-cost-optimizer](./multicloud-cost-optimizer/README.md)
   Optimizador de costos multi-cloud con recomendaciones priorizadas y explicacion en lenguaje de negocio.

9. [real-time-support-copilot](./real-time-support-copilot/README.md)
   Copiloto de soporte en tiempo real con contexto de cliente, RAG y sugerencias para agentes.

10. [automated-compliance-audit](./automated-compliance-audit/README.md)
    Plataforma de compliance y auditoria automatizada con evidencia continua.

11. [visual-etl-builder-ai](./visual-etl-builder-ai/README.md)
    Constructor visual de pipelines ETL con IA, generacion SQL y monitoreo.

12. [feature-flags-experimentation](./feature-flags-experimentation/README.md)
    Sistema de feature flags y experimentacion A/B con analitica estadistica integrada.

13. [ml-model-monitoring-platform](./ml-model-monitoring-platform/README.md)
    Plataforma de monitoreo de modelos ML con drift, fairness e impacto de negocio.

## Cobertura implementada

### 1. Enterprise RAG Guardrails

- retrieval en memoria con scoring por overlap
- guardrails de input, grounding y masking de PII
- endpoint `/ask`
- endpoint `/documents`

### 2. Data Quality Observability

- checks de freshness, volume, completeness, uniqueness, validity, schema y consistency
- scoring 0-100 por tabla
- deteccion de anomalias por desvio de volumen y staleness
- endpoint `/reports`

### 3. Intelligent Document Processing

- clasificacion de documentos
- extraccion estructurada por tipo
- validacion de reglas de negocio
- confidence scoring y ruteo `auto` o `review`
- endpoint `/process`

### 4. Multitenant API Analytics

- auth por API key
- rate limiting por tenant
- aislamiento de analytics por tenant
- agregacion basica de metricas e insights
- endpoint `/simulate-request`

### 5. LLM Process Agents

- runtime secuencial de workflows
- tool registry para triage, scoring, reporting y compliance
- human approval gates
- endpoint `/workflows/run/:id`

### 6. Real-Time Fraud Detection

- scoring en tiempo real con reglas de velocity, geografia, device y blocklists
- decision `approve`, `review` o `decline`
- endpoint `/score`
- endpoint `/profiles`

### 7. AI Code Review Platform

- analisis de diffs para seguridad, performance, testing y mantenibilidad
- scoring de riesgo y recomendacion de merge
- endpoint `/review`
- endpoint `/samples`

### 8. Multi-Cloud Cost Optimizer

- oportunidades de rightsizing y commitments
- ranking de ahorro estimado por cuenta y recurso
- endpoint `/optimize`
- endpoint `/accounts`

### 9. Real-Time Support Copilot

- retrieval de conocimiento y contexto de cliente
- sugerencias de respuesta y escalamiento
- endpoint `/assist`
- endpoint `/knowledge`

### 10. Automated Compliance Audit

- scoring por control, evidencia vencida y excepciones
- reporte consolidado de riesgo y remediacion
- endpoint `/report`
- endpoint `/controls`

### 11. Visual ETL Builder AI

- sugerencia de pipelines desde lenguaje natural
- compilacion a SQL validado
- endpoint `/suggest`
- endpoint `/compile`

### 12. Feature Flags Experimentation

- evaluacion deterministica de flags
- analisis de lift y ganador experimental
- endpoint `/evaluate`
- endpoint `/experiments/:id`

### 13. ML Model Monitoring Platform

- monitoreo de drift, fairness y degradacion
- score de salud por modelo
- endpoint `/report`
- endpoint `/models`

## Mapa de capacidades

| Capacidad | Proyectos |
| --- | --- |
| LLMs / RAG | 1, 3, 5, 7, 9, 11 |
| Agentes | 5, 9 |
| Cloud / Infra | 1, 2, 4, 5, 8, 10, 12 |
| Data Engineering | 2, 4, 8, 11 |
| Backend / APIs | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 |
| Observabilidad | 1, 2, 4, 5, 6, 8, 10, 13 |
| Seguridad | 1, 3, 4, 5, 6, 7, 10, 12, 13 |

## Publicacion sugerida

La opcion elegida es un monorepo publico con este nombre sugerido:

- `portfolio-projects`

Estructura esperada en GitHub:

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

Los enlaces del sitio principal ya apuntan a esta estructura de monorepo.

## Despliegue demo

El repo incluye:

- `docker-compose.yml` para levantar los trece servicios juntos
- `Dockerfile` por proyecto
- `.env.example` por proyecto con credenciales ficticias consistentes
- `docs/api/openapi.yaml` por proyecto
- `docs/operations.md` por proyecto

Los ocho proyectos agregados en esta iteracion quedaron cerrados con la misma capa operativa que los cinco MVPs originales: core funcional, servidor HTTP, fixtures, tests, OpenAPI, runbook y despliegue Docker.