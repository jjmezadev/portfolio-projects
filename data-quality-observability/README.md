# Data Quality Observability

Plataforma para monitorear calidad de datos, detectar anomalías y calcular health scores por tabla, pipeline y dominio.

## Problema

Los incidentes de datos se descubren tarde: dashboards rotos, reportes incorrectos y pérdida de confianza por ausencia de freshness, schema tracking y alertas accionables.

## Propuesta de valor

- Monitoreo continuo de freshness, volume, completeness, uniqueness, validity, consistency y schema drift.
- Alertas con contexto en Slack, email o webhook.
- Health score por activo de datos.
- Detección estadística y ML de anomalías.

## Arquitectura

- Conectores: PostgreSQL, BigQuery, S3/GCS y APIs externas.
- Core: rule engine + anomaly detection + scoring engine.
- Dashboard: Next.js con overview, tabla detalle, incident timeline y lineage.
- Orquestación: Airflow o Cloud Scheduler.
- Infra: PostgreSQL para metadata, BigQuery para métricas, Cloud Run y Terraform.

## Métricas objetivo

- Recall de anomalías: >= 90%
- Tiempo de detección: < 15 min
- Falsos positivos: < 10%
- Cobertura: 100% de tablas críticas

## Capacidades clave

- Checks declarativos y custom SQL.
- Health scoring 0-100 por tabla.
- Supresión inteligente de alertas repetidas.
- Lineage y seguimiento de cambios de schema.
- Resúmenes diarios asistidos por LLM.

## Stack destacado

`TypeScript` `Next.js` `Airflow` `BigQuery` `PostgreSQL` `dbt` `Terraform` `Cloud Run`

## Resultado esperado en portafolio

Proyecto ancla para ciencia de datos y datos end-to-end, con una narrativa fuerte de confiabilidad, operaciones y producto técnico.