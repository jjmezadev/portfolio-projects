# Operations

## Demo credentials

- OpenAI key: `sk-demo-code-review-0001`
- Postgres user: `review_user`
- Postgres password: `review_password`
- Redis user: `review_cache_user`
- Redis password: `review_cache_password`

## Run locally

```bash
npm run codereview:start
curl -s http://localhost:4017/samples
curl -s -X POST http://localhost:4017/review -H 'content-type: application/json' -d '{"id":"pr-100","files":[{"path":"src/search.js","diff":"+ element.innerHTML = html;\n+ const result = eval(customQuery);"}]}'
```

## Runbook

- Treat critical security findings as merge blockers by default.
- If review noise is high, tune category thresholds before muting the entire analyzer.
- Keep repository-specific allowlists outside the core analyzer to preserve portability.