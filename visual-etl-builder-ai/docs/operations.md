# Operations

## Demo credentials

- OpenAI key: `sk-demo-etl-0001`
- Postgres user: `etl_user`
- Postgres password: `etl_password`
- dbt Cloud token: `dbt_demo_token_001`

## Run locally

```bash
npm run etl:start
curl -s http://localhost:4021/templates
curl -s -X POST http://localhost:4021/suggest -H 'content-type: application/json' -d '{"prompt":"Aggregate paid orders by country"}'
```

## Runbook

- Validate compiled SQL against warehouse naming conventions before publishing.
- Keep AI suggestions separate from persisted pipeline definitions until reviewed.
- Treat generated aggregations as drafts when source contracts are unstable.