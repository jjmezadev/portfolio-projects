# Data Quality Observability

该平台用于监控数据质量、检测异常，并按表、数据管道和业务域计算健康分数。

## 解决的问题

数据事故通常在太晚的时候才被发现，例如仪表盘损坏、报表错误，以及由于缺少 freshness 检查、Schema 跟踪和可执行告警而导致的数据不可信。

## 价值主张

- 持续监控 freshness、volume、completeness、uniqueness、validity、consistency 和 schema drift。
- 通过 Slack、邮件或 webhook 发送带上下文的告警。
- 为每个数据资产生成健康分数。
- 支持统计方法和机器学习方法的异常检测。

## 架构

- 连接器：PostgreSQL、BigQuery、S3/GCS 和外部 API。
- 核心：规则引擎 + 异常检测 + 评分引擎。
- 仪表盘：Next.js，包含总览、表级详情、事故时间线和数据血缘。
- 编排：Airflow 或 Cloud Scheduler。
- 基础设施：PostgreSQL 元数据、BigQuery 指标、Cloud Run 和 Terraform。

## 本仓库包含的实现

- `src/server.mjs` 中的 HTTP 服务。
- `src/quality-platform.mjs` 中的规则与评分逻辑。
- `fixtures/sources.json` 中的表样例数据。
- `test/quality-platform.test.mjs` 中的测试。
- `docs/api/openapi.yaml` 中的 OpenAPI 定义。
- `.env.example` 中的演示配置。

## 接口

- `GET /health`
- `GET /reports`

## 演示凭据

- `POSTGRES_DSN=postgres://dq_demo_user:dq_demo_password@demo-postgres.internal:5432/data_quality`
- `PAGERDUTY_ROUTING_KEY=pgr_demo_data_quality_0001`
- `SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T000000/B000000/demo-data-quality`

## 运行方式

```bash
npm run dataq:start
```

## 作品集价值

该项目是展示数据能力和端到端数据可靠性的核心项目。