# Operations

## Demo credentials

- OpenAI key: `sk-demo-fraud-0001`
- Postgres user: `fraud_user`
- Postgres password: `fraud_password`
- Redis user: `fraud_cache_user`
- Redis password: `fraud_cache_password`

## Run locally

```bash
npm run fraud:start
curl -s http://localhost:4016/profiles
curl -s -X POST http://localhost:4016/score -H 'content-type: application/json' -d '{"customerId":"cust-001","amount":1600,"country":"RU","timestamp":"2026-03-23T12:00:00Z","transactionsLastHour":8,"cardNumber":"4000000000009995","ipAddress":"203.0.113.77","merchantCategory":"CRYPTO","deviceTrusted":false}'
```

## Runbook

- Review blocked cards and blocked IP lists before changing thresholds.
- If false positives increase, tune `reviewThreshold` before relaxing decline rules.
- High-volume geolocation mismatches should be triaged before adding new hard blocks.