# Operations

## Demo credentials

- Postgres user: `gateway_demo_user`
- Postgres password: `gateway_demo_password`
- Redis user: `gateway_cache_user`
- Redis password: `gateway_cache_password`
- Admin API key: `demo-admin-key-analytics`

## Run locally

```bash
npm run gateway:start
curl -s -X POST http://localhost:4014/simulate-request -H 'content-type: application/json' -d '{"tenantId":"tenant-acme","apiKey":"acme-key-001","endpoint":"/users","method":"GET"}'
curl -s 'http://localhost:4014/tenants/tenant-acme/analytics?viewer=tenant-acme'
```

## Runbook

- If a tenant sees another tenant's data, treat it as a sev-0 isolation incident.
- Keep rate limits tenant-specific and never reuse API keys across tenants.
- Investigate rising error rates before increasing quotas.