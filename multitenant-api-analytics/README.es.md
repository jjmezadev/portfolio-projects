# Multitenant API Analytics

SaaS multi-tenant para registrar APIs, exponerlas a traves de un gateway inteligente y obtener analytics, seguridad y billing basado en uso.

## Problema

Muchos equipos necesitan un API gateway con mejores insights de negocio y operacion que los gateways cloud nativos, sin asumir desde el inicio el costo de una plataforma enterprise completa.

## Propuesta de valor

- Proxy de APIs con auth, rate limiting y caching.
- Analytics en tiempo real por tenant, endpoint, latencia y errores.
- Alertas, planes por uso y feature flags.
- Modelo multi-tenant con aislamiento verificable.

## Arquitectura

- Gateway: Node.js + Fastify.
- Event stream: Pub/Sub o Kafka.
- Analytics: BigQuery con vistas materializadas.
- Dashboard: Next.js para tenants y admin panel.
- Configuracion: PostgreSQL + Redis.
- Infra: Cloud Run, Cloud Functions, Terraform y GitHub Actions.

## Implementacion incluida en este repo

- Servicio HTTP en `src/server.mjs`.
- Gateway y analytics core en `src/gateway-platform.mjs`.
- Tenants demo en `fixtures/tenants.json`.
- Pruebas en `test/gateway-platform.test.mjs`.
- OpenAPI en `docs/api/openapi.yaml`.
- Configuracion demo en `.env.example`.

## Endpoints

- `GET /health`
- `POST /simulate-request`
- `GET /tenants/:tenantId/analytics?viewer=:tenantId`

## Credenciales demo

- `ADMIN_API_KEY=demo-admin-key-analytics`
- `POSTGRES_DSN=postgres://gateway_demo_user:gateway_demo_password@demo-postgres.internal:5432/gateway_platform`
- `REDIS_URL=redis://gateway_cache_user:gateway_cache_password@demo-redis.internal:6379/2`

## Ejecucion

```bash
npm run gateway:start
```

## Resultado esperado en portafolio

Proyecto principal para nube y arquitectura, y un showcase fuerte de producto SaaS, backend y operaciones.