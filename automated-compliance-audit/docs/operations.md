# Operations

## Demo credentials

- OpenAI key: `sk-demo-compliance-0001`
- Postgres user: `compliance_user`
- Postgres password: `compliance_password`
- Okta token: `okta_demo_compliance_001`
- Jira token: `jira_demo_compliance_001`

## Run locally

```bash
npm run compliance:start
curl -s http://localhost:4020/controls
curl -s http://localhost:4020/report
```

## Runbook

- Escalate high-risk controls with stale evidence before the next audit cycle.
- Keep framework mappings explicit when one control satisfies multiple obligations.
- Evidence freshness should be tuned by control criticality, not only by framework default cadence.