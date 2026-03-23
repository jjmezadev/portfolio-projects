# Operations

## Demo credentials

- OpenAI key: `sk-demo-agents-0001`
- Slack bot token: `xoxb-demo-agents-0001`
- Service account: `agents-calendar-demo@example.iam.gserviceaccount.com`
- Email sender: `ops-bot@example.invalid`

## Run locally

```bash
npm run agents:start
curl -s http://localhost:4015/workflows
curl -s -X POST http://localhost:4015/workflows/run/support-triage -H 'content-type: application/json' -d '{"message":"Payment API outage with 503 errors","customerTier":"enterprise"}'
```

## Runbook

- If a tool can create external side effects, require human approval by default.
- Keep workflow steps idempotent so retries do not duplicate actions.
- Add new tools only if they return structured output that downstream steps can validate.