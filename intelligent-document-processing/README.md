# Intelligent Document Processing

Sistema para clasificar, extraer, validar y enrutar documentos empresariales con confianza medible y revisión humana cuando hace falta.

## Problema

El procesamiento manual de facturas, contratos y formularios es costoso, lento y propenso a errores. La extracción automática suele fallar sin validación de negocio y sin una ruta clara de revisión.

## Propuesta de valor

- Ingesta por UI, email, API o carpeta observada.
- Clasificación documental con LLM/ML.
- OCR cuando el documento es escaneado.
- Extracción estructurada con validación de reglas de negocio.
- Human-in-the-Loop para casos de baja confianza.

## Arquitectura

- Frontend: Next.js con upload, review queue y analytics.
- Backend: pipeline asíncrono con workers escalables.
- OCR: Google Vision o Tesseract.
- LLM structured extraction con JSON schema enforcement.
- Storage: GCS o S3 para documentos y evidencias.
- Integraciones: ERP, base de datos y webhooks.

## Métricas objetivo

- Accuracy de clasificación: >= 95%
- Accuracy de extracción por campo: >= 90%
- Tiempo por documento: < 30s
- Human review rate: < 15%
- Costo por documento: < 0.10 USD

## Módulos principales

- Preprocesamiento y OCR.
- Clasificación por tipo documental.
- Extracción estructurada.
- Validación de negocio.
- Confidence scoring y ruteo automático.
- Cola de revisión humana.

## Stack destacado

`Next.js` `TypeScript` `BullMQ` `Cloud Run` `GCS` `OpenAPI` `Vision OCR` `LLM structured outputs`

## Implementación incluida en este repo

- servicio HTTP en `src/server.mjs`
- pipeline documental en `src/document-pipeline.mjs`
- fixtures de ejemplo en `fixtures/sample-documents.json`
- pruebas en `test/document-pipeline.test.mjs`
- OpenAPI en `docs/api/openapi.yaml`
- configuración demo en `.env.example`

## Endpoints

- `GET /health`
- `GET /samples`
- `POST /process`

## Credenciales demo

- `VISION_API_KEY=vision-demo-key-0001`
- `QUEUE_URL=redis://docproc_queue_user:docproc_queue_password@demo-redis.internal:6379/1`
- `ERP_WEBHOOK=https://sap-sandbox.example.invalid/api/documents`

## Ejecución

```bash
npm run docproc:start
```

## Resultado esperado en portafolio

Proyecto puente entre IA aplicada y desarrollo de software, con demo visual clara y argumento comercial sólido.