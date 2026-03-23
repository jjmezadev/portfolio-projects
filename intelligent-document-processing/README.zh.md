# Intelligent Document Processing

这是一个用于分类、提取、校验并路由企业文档的系统，能够提供可量化的置信度，并在需要时引入人工复核。

## 解决的问题

发票、合同和表单的人工处理成本高、速度慢且容易出错。如果没有业务校验层和明确的复核流程，自动化抽取很容易失效。

## 价值主张

- 支持通过 UI、邮件、API 或监听目录进行文档接入。
- 使用 LLM/ML 进行文档分类。
- 对扫描文件支持 OCR。
- 提供带业务规则校验的结构化抽取。
- 对低置信度结果支持 Human-in-the-Loop。

## 架构

- 前端：Next.js，包含上传、复核队列和分析视图。
- 后端：异步处理流水线和可扩展 worker。
- OCR：Google Vision 或 Tesseract。
- 结构化抽取：基于 JSON Schema 约束的 LLM 输出。
- 存储：GCS 或 S3，用于文档和审计证据。
- 集成：ERP、数据库和 webhook。

## 本仓库包含的实现

- `src/server.mjs` 中的 HTTP 服务。
- `src/document-pipeline.mjs` 中的文档流水线。
- `fixtures/sample-documents.json` 中的演示样例。
- `test/document-pipeline.test.mjs` 中的测试。
- `docs/api/openapi.yaml` 中的 OpenAPI 定义。
- `.env.example` 中的演示配置。

## 接口

- `GET /health`
- `GET /samples`
- `POST /process`

## 演示凭据

- `VISION_API_KEY=vision-demo-key-0001`
- `QUEUE_URL=redis://docproc_queue_user:docproc_queue_password@demo-redis.internal:6379/1`
- `ERP_WEBHOOK=https://sap-sandbox.example.invalid/api/documents`

## 运行方式

```bash
npm run docproc:start
```

## 作品集价值

该项目很好地连接了应用型 AI 与软件工程，并且具有清晰的业务演示价值。