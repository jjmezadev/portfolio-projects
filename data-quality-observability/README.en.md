# Data Quality Observability

Platform to monitor data quality, detect anomalies, and calculate health scores by table, pipeline, and domain.

## Problem

Data incidents are often discovered too late: broken dashboards, incorrect reports, and loss of trust caused by missing freshness checks, schema tracking, and actionable alerts.

## Value proposition

- Continuous monitoring of freshness, volume, completeness, uniqueness, validity, consistency, and schema drift.
- Context-rich alerts through Slack, email, or webhooks.
- Health score for every data asset.
- Statistical and ML-based anomaly detection.

## Architecture

- Connectors: PostgreSQL, BigQuery, S3/GCS, and external APIs.
- Core: rule engine + anomaly detection + scoring engine.
- Dashboard: Next.js with overview, table detail, incident timeline, and lineage.
- Orchestration: Airflow or Cloud Scheduler.
- Infrastructure: PostgreSQL for metadata, BigQuery for metrics, Cloud Run, and Terraform.

## Implementation included in this repo

- HTTP service in `src/server.mjs`.
- Rule engine and scoring logic in `src/quality-platform.mjs`.
- Table fixtures in `fixtures/sources.json`.
- Tests in `test/quality-platform.test.mjs`.
- OpenAPI spec in `docs/api/openapi.yaml`.
- Demo configuration in `.env.example`.

## Endpoints

- `GET /health`
- `GET /reports`

## Demo credentials

- `POSTGRES_DSN=postgres://dq_demo_user:dq_demo_password@demo-postgres.internal:5432/data_quality`
- `PAGERDUTY_ROUTING_KEY=pgr_demo_data_quality_0001`
- `SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T000000/B000000/demo-data-quality`

## Run

```bash
npm run dataq:start
```

## Portfolio impact

This is a core showcase for data work and end-to-end data reliability.