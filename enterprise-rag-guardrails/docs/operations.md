# Operations

## Demo credentials

- OpenAI key: `sk-demo-rag-0001-enterprise`
- Vector DB user: `rag_demo_user`
- Vector DB password: `rag_demo_password`
- Redis user: `cache_demo_user`
- Redis password: `cache_demo_password`

## Run locally

```bash
npm run rag:start
curl -s http://localhost:4011/documents
curl -s -X POST http://localhost:4011/ask -H 'content-type: application/json' -d '{"query":"How should we rollback a Cloud Run deployment?"}'
```

## Runbook

- If grounding is low, review `fixtures/corpus.json` and add a more explicit chunk.
- If sensitive data appears in the output, extend masking rules in `src/rag-service.mjs`.
- If latency spikes, increase cache hit rate before increasing model spend.