# Portfolio Projects

这个仓库汇集了十三个作品集项目，用于展示在应用型 AI、数据、云架构以及生产级软件工程方面的交付能力。

## 当前状态

当前 13 个项目都已经实现为可运行的 MVP。

该 monorepo 包含：

- 基于 Node.js ESM 的领域逻辑
- 演示用 fixtures
- 每个项目一个最小 HTTP 服务
- 核心自动化测试
- monorepo smoke check
- GitHub Actions CI 工作流
- 每个项目一个 Dockerfile 和一个 `.env.example`
- 每个项目一个 OpenAPI 规格与运维 runbook

## 命令

在仓库根目录执行：

- `npm test`
- `npm run check`
- `npm run rag:start`
- `npm run dataq:start`
- `npm run docproc:start`
- `npm run gateway:start`
- `npm run agents:start`
- `npm run fraud:start`
- `npm run codereview:start`
- `npm run finops:start`
- `npm run support:start`
- `npm run compliance:start`
- `npm run etl:start`
- `npm run flags:start`
- `npm run mlmon:start`
- `docker compose up --build`

默认端口：

- RAG: `4011`
- Data Quality: `4012`
- Document Processing: `4013`
- API Analytics: `4014`
- LLM Agents: `4015`

- Fraud Detection: `4016`
- AI Code Review: `4017`
- Multi-Cloud Cost Optimizer: `4018`
- Support Copilot: `4019`
- Compliance Audit: `4020`
- Visual ETL Builder: `4021`
- Feature Flags: `4022`
- ML Monitoring: `4023`

## 已实现项目

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

6. [real-time-fraud-detection](./real-time-fraud-detection/README.md)
   结合规则、机器学习和 AI 解释能力的实时反欺诈引擎。

7. [ai-code-review-platform](./ai-code-review-platform/README.md)
   面向 bug、安全、性能和开发体验的 AI Code Review 平台。

8. [multicloud-cost-optimizer](./multicloud-cost-optimizer/README.md)
   提供节省建议和业务语言解释的多云成本优化平台。

9. [real-time-support-copilot](./real-time-support-copilot/README.md)
   具备客户上下文、RAG 和客服建议能力的实时支持 Copilot。

10. [automated-compliance-audit](./automated-compliance-audit/README.md)
    具备持续证据收集能力的自动化合规与审计平台。

11. [visual-etl-builder-ai](./visual-etl-builder-ai/README.md)
    带 AI SQL 生成与监控能力的可视化 ETL 构建器。

12. [feature-flags-experimentation](./feature-flags-experimentation/README.md)
    内置统计分析的 Feature Flags 与 A/B 实验系统。

13. [ml-model-monitoring-platform](./ml-model-monitoring-platform/README.md)
    具备 drift、公平性和业务影响分析能力的 ML 模型监控平台。

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

### 6. 实时反欺诈

- 基于 velocity、地理位置、设备和 blocklist 的实时评分
- `approve`、`review`、`decline` 三类决策
- `/score` 接口
- `/profiles` 接口

### 7. AI Code Review 平台

- 对 diff 进行安全、性能、测试和可维护性分析
- 输出合并建议和风险评分
- `/review` 接口
- `/samples` 接口

### 8. 多云成本优化

- rightsizing 与 commitment 优化机会识别
- 按账户和资源排序的节省建议
- `/optimize` 接口
- `/accounts` 接口

### 9. 实时支持 Copilot

- 基于知识检索和客户上下文进行建议
- 输出回复草案和升级动作
- `/assist` 接口
- `/knowledge` 接口

### 10. 自动化合规审计

- 按证据新鲜度、状态和例外进行控制项评分
- 输出集中化整改报告
- `/report` 接口
- `/controls` 接口

### 11. 可视化 ETL Builder AI

- 从自然语言生成 pipeline 建议
- SQL 编译与校验
- `/suggest` 接口
- `/compile` 接口

### 12. Feature Flags 与实验

- 确定性 flag 评估
- 实验 lift 与 winner 分析
- `/evaluate` 接口
- `/experiments/:id` 接口

### 13. ML 模型监控平台

- drift、公平性与退化监控
- 按模型输出健康分数
- `/report` 接口
- `/models` 接口

## 能力覆盖图

| 能力 | 项目 |
| --- | --- |
| LLMs / RAG | 1, 3, 5, 7, 9, 11 |
| Agents | 5, 9 |
| Cloud / Infra | 1, 2, 4, 5, 8, 10, 12 |
| Data Engineering | 2, 4, 8, 11 |
| Backend / APIs | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 |
| Observability | 1, 2, 4, 5, 6, 8, 10, 13 |
| Security | 1, 3, 4, 5, 6, 7, 10, 12, 13 |

## 建议发布方式

选定的方式是一个公开 monorepo，建议名称为：

- `portfolio-projects`

GitHub 结构预期如下：

- `portfolio-projects/enterprise-rag-guardrails`
- `portfolio-projects/data-quality-observability`
- `portfolio-projects/intelligent-document-processing`
- `portfolio-projects/multitenant-api-analytics`
- `portfolio-projects/llm-process-agents`
- `portfolio-projects/real-time-fraud-detection`
- `portfolio-projects/ai-code-review-platform`
- `portfolio-projects/multicloud-cost-optimizer`
- `portfolio-projects/real-time-support-copilot`
- `portfolio-projects/automated-compliance-audit`
- `portfolio-projects/visual-etl-builder-ai`
- `portfolio-projects/feature-flags-experimentation`
- `portfolio-projects/ml-model-monitoring-platform`

主作品集网站已经指向这个 monorepo 结构。

## 演示部署

仓库包含：

- `docker-compose.yml` 用于同时启动十三个服务
- 每个项目一个 `Dockerfile`
- 每个项目一个带一致伪凭据的 `.env.example`
- 每个项目一个 `docs/api/openapi.yaml`
- 每个项目一个 `docs/operations.md`

本次新增的 8 个项目已经达到与原有 5 个 MVP 相同的收口级别：包含可运行核心逻辑、HTTP 服务、fixtures、测试、OpenAPI、运维 runbook 和 Docker 部署。