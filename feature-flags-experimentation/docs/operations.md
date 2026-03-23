# Operations

## Demo credentials

- Redis user: `flags_user`
- Redis password: `flags_password`
- Postgres user: `flags_user`
- Segment write key: `segment_demo_write_key_001`

## Run locally

```bash
npm run flags:start
curl -s http://localhost:4022/flags
curl -s -X POST http://localhost:4022/evaluate -H 'content-type: application/json' -d '{"flagKey":"checkout-redesign","userId":"user-001","segment":"general"}'
```

## Runbook

- Do not change rollout percentages without checking exposure telemetry quality.
- Treat enterprise-targeted flags as explicit overrides over percentage bucketing.
- Retire stale flags after experiments converge to avoid configuration debt.