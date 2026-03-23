# LLM Process Agents

这是一个由 LLM 代理驱动的流程自动化引擎，包含可连接工具、工作流运行时以及可配置的人类审批机制。

## 解决的问题

很多支持、销售、合规和报表流程都具有重复模式，但仍然需要上下文理解和业务判断。代理引擎可以在不失去运营控制的前提下自动化大部分流程。

## 价值主张

- 可视化工作流设计器。
- 支持串行、并行和条件分支的运行时。
- 带工具注册表和防护规则的代理执行器。
- 支持人工审批和执行可观测性。

## 架构

- 前端：React/Next.js，包含工作流设计器和执行查看器。
- 后端：基于状态机的运行时。
- 代理执行器：带限制和策略的 reason-act-observe 循环。
- 工具：HTTP、数据库、邮件、Slack、RAG 搜索、文件和日历。
- 基础设施：Cloud Run、Redis、PostgreSQL、Pub/Sub 和 OpenTelemetry。

## 本仓库包含的实现

- `src/server.mjs` 中的 HTTP 服务。
- `src/automation-platform.mjs` 中的运行时和工具注册表。
- `fixtures/workflows.json` 中的工作流目录。
- `test/automation-platform.test.mjs` 中的测试。
- `docs/api/openapi.yaml` 中的 OpenAPI 定义。
- `.env.example` 中的演示配置。

## 接口

- `GET /health`
- `GET /workflows`
- `POST /workflows/run/:workflowId`

## 演示凭据

- `OPENAI_API_KEY=sk-demo-agents-0001`
- `SLACK_BOT_TOKEN=xoxb-demo-agents-0001`
- `GOOGLE_CALENDAR_SERVICE_ACCOUNT=agents-calendar-demo@example.iam.gserviceaccount.com`

## 运行方式

```bash
npm run agents:start
```

## 作品集价值

该项目非常适合作为 LLM/AI 和软件工程能力的差异化展示，因为它结合了代理、工具、运营安全和产品设计。