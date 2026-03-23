# Operations

## Demo credentials

- OpenAI key: `sk-demo-finops-0001`
- AWS access key: `AKIAFINOPSDEMO001`
- Azure client id: `11111111-2222-3333-4444-555555555555`
- GCP billing project: `finops-demo-project`

## Run locally

```bash
npm run finops:start
curl -s http://localhost:4018/accounts
curl -s http://localhost:4018/optimize
```

## Runbook

- Review rightsizing recommendations before commitment purchases.
- Treat warehouse and database optimizations separately from compute to avoid blended ROI noise.
- Use business-owner tagging before publishing savings leaderboards.