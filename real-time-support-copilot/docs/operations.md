# Operations

## Demo credentials

- OpenAI key: `sk-demo-support-0001`
- CRM API key: `crm_demo_support_001`
- Zendesk token: `zendesk_demo_support_001`
- Postgres user: `support_user`

## Run locally

```bash
npm run support:start
curl -s http://localhost:4019/knowledge
curl -s -X POST http://localhost:4019/assist -H 'content-type: application/json' -d '{"customerId":"cust-acme","message":"Customer reports payment API 503 and wants urgent help from Bogota."}'
```

## Runbook

- Escalate enterprise incidents by default when payment, outage, or security terms appear.
- Review retrieved articles before sending a final answer to customers.
- Keep refund policy approval steps explicit in the assistant response templates.