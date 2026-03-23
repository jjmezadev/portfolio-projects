# Multitenant API Analytics

SaaS multi-tenant para registrar APIs, exponerlas a través de un gateway inteligente y obtener analytics, seguridad y billing basado en uso.

## Problema

Muchos equipos necesitan un API gateway con mejores insights de negocio y operación que los gateways cloud nativos, sin pagar el costo de una plataforma enterprise completa desde el día uno.

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
- Configuración: PostgreSQL + Redis.
- Infra: Cloud Run, Cloud Functions, Terraform y GitHub Actions.

## Métricas objetivo

- Overhead del proxy: < 10 ms
- Throughput: 1000+ rps por tenant
- Disponibilidad: 99.9%
- Onboarding a primera API: < 5 min

## Capacidades clave

- API keys y JWT.
- Sliding window rate limiting.
- Billing calculator por requests, almacenamiento y retención.
- Row-Level Security y pruebas de aislamiento.
- Insights asistidos por IA sobre spikes y errores.

## Stack destacado

`Fastify` `TypeScript` `Redis` `PostgreSQL` `BigQuery` `Pub/Sub` `Terraform` `GitHub Actions`

## Resultado esperado en portafolio

Proyecto principal para nube y arquitectura, y un excelente showcase de producto SaaS, backend y operaciones.