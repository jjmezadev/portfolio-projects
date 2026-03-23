# Portfolio Projects

这个仓库汇集了五个作品集项目，用于展示在应用型 AI、数据、云架构以及生产级软件工程方面的交付能力。

## 当前状态

这五个项目都已经实现为可运行的 MVP，并包含：

- 基于 Node.js ESM 的领域逻辑
- 演示用 fixtures
- 每个项目一个最小 HTTP 服务
- 核心自动化测试
- monorepo smoke check
- GitHub Actions CI 工作流

## 命令

在仓库根目录执行：

- `npm test`
- `npm run check`
- `npm run rag:start`
- `npm run dataq:start`
- `npm run docproc:start`
- `npm run gateway:start`
- `npm run agents:start`
- `docker compose up --build`

默认端口：

- RAG: `4011`
- Data Quality: `4012`
- Document Processing: `4013`
- API Analytics: `4014`
- LLM Agents: `4015`

## 项目列表

1. [enterprise-rag-guardrails](./enterprise-rag-guardrails/README.md)
   带引用来源、防护规则和可观测性的企业级 RAG 助手。

2. [data-quality-observability](./data-quality-observability/README.md)
   带评分、告警和异常检测的数据质量与可观测性平台。

3. [intelligent-document-processing](./intelligent-document-processing/README.md)
   带 Human-in-the-Loop 的文档分类、提取和校验系统。

4. [multitenant-api-analytics](./multitenant-api-analytics/README.md)
   面向 API 的多租户 SaaS 平台，支持限流、分析和按使用量计费。

5. [llm-process-agents](./llm-process-agents/README.md)
   由 LLM 代理、工具和人工监督驱动的流程自动化引擎。

## 已实现能力

### 1. Enterprise RAG Guardrails

- 基于 overlap 的内存检索评分
- 输入、grounding 和 PII masking guardrails
- `/ask` 接口
- `/documents` 接口

### 2. Data Quality Observability

- freshness、volume、completeness、uniqueness、validity、schema 和 consistency 检查
- 每张表 0-100 的健康分数
- 针对体量偏差和陈旧数据的异常检测
- `/reports` 接口

### 3. Intelligent Document Processing

- 文档分类
- 按类型进行结构化提取
- 业务规则校验
- 置信度评分以及 `auto` / `review` 路由
- `/process` 接口

### 4. Multitenant API Analytics

- API key 认证
- 按租户限流
- 租户级分析隔离
- 基础指标聚合与洞察
- `/simulate-request` 接口

### 5. LLM Process Agents

- 串行工作流运行时
- 用于分流、评分、报表和合规的工具注册表
- 人工审批闸门
- `/workflows/run/:id` 接口

## 能力覆盖图

| 能力 | 项目 |
| --- | --- |
| LLMs / RAG | 1, 3, 5 |
| Agents | 5 |
| Cloud / Infra | 1, 2, 4, 5 |
| Data Engineering | 2, 4 |
| Backend / APIs | 1, 2, 3, 4, 5 |
| Observability | 1, 2, 4, 5 |
| Security | 1, 3, 4, 5 |

## 建议发布方式

选定的方式是一个公开 monorepo，建议名称为：

- `portfolio-projects`

GitHub 结构预期如下：

- `portfolio-projects/enterprise-rag-guardrails`
- `portfolio-projects/data-quality-observability`
- `portfolio-projects/intelligent-document-processing`
- `portfolio-projects/multitenant-api-analytics`
- `portfolio-projects/llm-process-agents`

主作品集网站已经指向这个 monorepo 结构。

## 演示部署

仓库包含：

- `docker-compose.yml` 用于同时启动五个服务
- 每个项目一个 `Dockerfile`
- 每个项目一个带一致伪凭据的 `.env.example`
- 每个项目一个 `docs/api/openapi.yaml`
- 每个项目一个 `docs/operations.md`