# Operations

## Demo credentials

- Postgres user: `mlmon_user`
- Postgres password: `mlmon_password`
- PagerDuty key: `pgr_demo_ml_monitoring_0001`
- OpenAI key: `sk-demo-ml-monitoring-0001`

## Run locally

```bash
npm run mlmon:start
curl -s http://localhost:4023/models
curl -s http://localhost:4023/report
```

## Runbook

- Investigate data drift before scheduling full retraining by default.
- Monitor fairness gaps alongside performance to avoid optimizing only for aggregate AUC.
- Separate noisy alerting thresholds for batch and real-time inference domains.