# Data Quality Observability

Plataforma para monitorear calidad de datos, detectar anomalias y calcular health scores por tabla, pipeline y dominio.

## Problema

Los incidentes de datos suelen descubrirse tarde: dashboards rotos, reportes incorrectos y perdida de confianza por falta de freshness, seguimiento de schema y alertas accionables.

## Propuesta de valor

- Monitoreo continuo de freshness, volume, completeness, uniqueness, validity, consistency y schema drift.
- Alertas con contexto por Slack, email o webhook.
- Health score por activo de datos.
- Deteccion estadistica y basada en ML de anomalias.

## Arquitectura

- Conectores: PostgreSQL, BigQuery, S3/GCS y APIs externas.
- Core: rule engine + anomaly detection + scoring engine.
- Dashboard: Next.js con overview, detalle por tabla, timeline e lineage.
- Orquestacion: Airflow o Cloud Scheduler.
- Infra: PostgreSQL para metadata, BigQuery para metricas, Cloud Run y Terraform.

## Implementacion incluida en este repo

- Servicio HTTP en `src/server.mjs`.
- Rule engine y scoring en `src/quality-platform.mjs`.
- Fixtures de tablas en `fixtures/sources.json`.
- Pruebas en `test/quality-platform.test.mjs`.
- OpenAPI en `docs/api/openapi.yaml`.
- Configuracion demo en `.env.example`.

## Endpoints

- `GET /health`
- `GET /reports`

## Credenciales demo

- `POSTGRES_DSN=postgres://dq_demo_user:dq_demo_password@demo-postgres.internal:5432/data_quality`
- `PAGERDUTY_ROUTING_KEY=pgr_demo_data_quality_0001`
- `SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T000000/B000000/demo-data-quality`

## Ejecucion

```bash
npm run dataq:start
```

## Resultado esperado en portafolio

Proyecto ancla para ciencia de datos y datos end-to-end con foco en confiabilidad operativa.