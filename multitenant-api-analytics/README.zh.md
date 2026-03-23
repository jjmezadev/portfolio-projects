# Multitenant API Analytics

这是一个多租户 SaaS 平台，用于注册 API、通过智能网关对外暴露，并提供分析、安全能力以及按使用量计费。

## 解决的问题

很多团队需要一个比云原生 API Gateway 更具业务与运维洞察力的 API 网关，但又不想在一开始就承担完整企业级平台的成本。

## 价值主张

- 支持认证、限流和缓存的 API 代理。
- 按租户、端点、延迟和错误维度提供实时分析。
- 提供告警、按使用量分层的套餐和功能开关。
- 提供可验证的多租户隔离模型。

## 架构

- 网关：Node.js + Fastify。
- 事件流：Pub/Sub 或 Kafka。
- 分析层：BigQuery + 物化视图。
- 控制台：Next.js，包含租户视图和管理面板。
- 配置层：PostgreSQL + Redis。
- 基础设施：Cloud Run、Cloud Functions、Terraform 和 GitHub Actions。

## 本仓库包含的实现

- `src/server.mjs` 中的 HTTP 服务。
- `src/gateway-platform.mjs` 中的网关和分析核心逻辑。
- `fixtures/tenants.json` 中的演示租户数据。
- `test/gateway-platform.test.mjs` 中的测试。
- `docs/api/openapi.yaml` 中的 OpenAPI 定义。
- `.env.example` 中的演示配置。

## 接口

- `GET /health`
- `POST /simulate-request`
- `GET /tenants/:tenantId/analytics?viewer=:tenantId`

## 演示凭据

- `ADMIN_API_KEY=demo-admin-key-analytics`
- `POSTGRES_DSN=postgres://gateway_demo_user:gateway_demo_password@demo-postgres.internal:5432/gateway_platform`
- `REDIS_URL=redis://gateway_cache_user:gateway_cache_password@demo-redis.internal:6379/2`

## 运行方式

```bash
npm run gateway:start
```

## 作品集价值

该项目非常适合作为云架构、SaaS 产品、后端和运维工程能力的展示。