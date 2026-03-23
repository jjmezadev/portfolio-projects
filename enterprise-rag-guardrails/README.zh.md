# Enterprise RAG Guardrails

这是一个面向生产环境的企业级 RAG 助手，用于查询内部文档、工单、政策和运营知识，并返回可追溯、带引用、受防护规则保护的答案。

## 解决的问题

企业关键知识通常分散在 PDF、Markdown、工单、Wiki 和 FAQ 中。这会增加检索时间、降低回答一致性，并在团队之间造成协作摩擦。

## 价值主张

- 带来源引用的企业聊天助手。
- 支持 PII、提示注入、有害内容和越界回答的防护规则。
- 提供成本、延迟、相关性和满意度指标。
- 支持带可观测性和 CI/CD 的云端部署。

## 架构

- 前端：Next.js，包含聊天界面、管理面板和分析视图。
- 后端：Node.js + TypeScript + Fastify。
- 检索层：pgvector 或 Qdrant，配合 PostgreSQL 元数据。
- 模型：OpenAI、Claude、Gemini 或本地模型。
- 可观测性：OpenTelemetry、Grafana 和 Sentry。
- 基础设施：Docker、Cloud Run、Terraform 和 Secret Manager。

## 本仓库包含的实现

- `src/server.mjs` 中的 HTTP 服务。
- `src/rag-service.mjs` 中的检索与防护规则。
- `fixtures/corpus.json` 中的演示语料。
- `test/rag-service.test.mjs` 中的测试。
- `docs/api/openapi.yaml` 中的 OpenAPI 定义。
- `.env.example` 中的演示配置。

## 接口

- `GET /health`
- `GET /documents`
- `POST /ask`

## 演示凭据

- `OPENAI_API_KEY=sk-demo-rag-0001-enterprise`
- `VECTOR_DB_URL=postgres://rag_demo_user:rag_demo_password@demo-pgvector.internal:5432/rag_platform`
- `REDIS_URL=redis://cache_demo_user:cache_demo_password@demo-redis.internal:6379/0`

## 运行方式

```bash
npm run rag:start
```

## 作品集价值

该项目非常适合作为 LLM/AI、云架构、软件工程和应用安全能力的展示项目。