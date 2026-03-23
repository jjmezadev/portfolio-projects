# Multitenant API Analytics

Multi-tenant SaaS platform to register APIs, expose them through an intelligent gateway, and deliver analytics, security, and usage-based billing.

## Problem

Many teams need an API gateway with better operational and business insight than native cloud gateways, without paying for a full enterprise platform on day one.

## Value proposition

- API proxy with authentication, rate limiting, and caching.
- Real-time analytics by tenant, endpoint, latency, and errors.
- Alerts, usage-based plans, and feature flags.
- Verifiable multi-tenant isolation model.

## Architecture

- Gateway: Node.js + Fastify.
- Event stream: Pub/Sub or Kafka.
- Analytics: BigQuery with materialized views.
- Dashboard: Next.js for tenants and admin panel.
- Configuration: PostgreSQL + Redis.
- Infrastructure: Cloud Run, Cloud Functions, Terraform, and GitHub Actions.

## Implementation included in this repo

- HTTP service in `src/server.mjs`.
- Gateway and analytics core in `src/gateway-platform.mjs`.
- Demo tenants in `fixtures/tenants.json`.
- Tests in `test/gateway-platform.test.mjs`.
- OpenAPI spec in `docs/api/openapi.yaml`.
- Demo configuration in `.env.example`.

## Endpoints

- `GET /health`
- `POST /simulate-request`
- `GET /tenants/:tenantId/analytics?viewer=:tenantId`

## Demo credentials

- `ADMIN_API_KEY=demo-admin-key-analytics`
- `POSTGRES_DSN=postgres://gateway_demo_user:gateway_demo_password@demo-postgres.internal:5432/gateway_platform`
- `REDIS_URL=redis://gateway_cache_user:gateway_cache_password@demo-redis.internal:6379/2`

## Run

```bash
npm run gateway:start
```

## Portfolio impact

This is a strong showcase for cloud and architecture, as well as SaaS product, backend, and operations engineering.