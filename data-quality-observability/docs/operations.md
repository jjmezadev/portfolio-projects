# Operations

## Demo credentials

- Postgres user: `dq_demo_user`
- Postgres password: `dq_demo_password`
- PagerDuty routing key: `pgr_demo_data_quality_0001`
- Slack webhook: `https://hooks.slack.com/services/T000000/B000000/demo-data-quality`

## Run locally

```bash
npm run dataq:start
curl -s http://localhost:4012/reports
```

## Runbook

- If a table drops below score 60, inspect volume and schema checks first.
- If false positives are frequent, widen the volume band before disabling checks.
- For a new data source, add a fixture or connector with owner, thresholds and expected schema.