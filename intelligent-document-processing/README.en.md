# Intelligent Document Processing

System to classify, extract, validate, and route business documents with measurable confidence and human review when needed.

## Problem

Manual processing of invoices, contracts, and forms is costly, slow, and error-prone. Automated extraction often fails when there is no business validation layer and no clear review path.

## Value proposition

- Ingestion through UI, email, API, or watched folders.
- Document classification with LLM/ML.
- OCR for scanned files.
- Structured extraction with business-rule validation.
- Human-in-the-loop for low-confidence cases.

## Architecture

- Frontend: Next.js with upload, review queue, and analytics.
- Backend: asynchronous pipeline with scalable workers.
- OCR: Google Vision or Tesseract.
- Structured LLM extraction with JSON schema enforcement.
- Storage: GCS or S3 for documents and evidence.
- Integrations: ERP, database, and webhooks.

## Implementation included in this repo

- HTTP service in `src/server.mjs`.
- Document pipeline in `src/document-pipeline.mjs`.
- Demo fixtures in `fixtures/sample-documents.json`.
- Tests in `test/document-pipeline.test.mjs`.
- OpenAPI spec in `docs/api/openapi.yaml`.
- Demo configuration in `.env.example`.

## Endpoints

- `GET /health`
- `GET /samples`
- `POST /process`

## Demo credentials

- `VISION_API_KEY=vision-demo-key-0001`
- `QUEUE_URL=redis://docproc_queue_user:docproc_queue_password@demo-redis.internal:6379/1`
- `ERP_WEBHOOK=https://sap-sandbox.example.invalid/api/documents`

## Run

```bash
npm run docproc:start
```

## Portfolio impact

This project connects applied AI with software engineering and provides a clear, sellable demo.