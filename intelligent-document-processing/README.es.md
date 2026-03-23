# Intelligent Document Processing

Sistema para clasificar, extraer, validar y enrutar documentos empresariales con confianza medible y revision humana cuando hace falta.

## Problema

El procesamiento manual de facturas, contratos y formularios es costoso, lento y propenso a errores. La extraccion automatica suele fallar sin validacion de negocio y sin una ruta clara de revision.

## Propuesta de valor

- Ingesta por UI, email, API o carpeta observada.
- Clasificacion documental con LLM/ML.
- OCR cuando el documento es escaneado.
- Extraccion estructurada con validacion de reglas de negocio.
- Human-in-the-Loop para casos de baja confianza.

## Arquitectura

- Frontend: Next.js con upload, review queue y analytics.
- Backend: pipeline asincrono con workers escalables.
- OCR: Google Vision o Tesseract.
- LLM structured extraction con JSON schema enforcement.
- Storage: GCS o S3 para documentos y evidencias.
- Integraciones: ERP, base de datos y webhooks.

## Implementacion incluida en este repo

- Servicio HTTP en `src/server.mjs`.
- Pipeline documental en `src/document-pipeline.mjs`.
- Fixtures en `fixtures/sample-documents.json`.
- Pruebas en `test/document-pipeline.test.mjs`.
- OpenAPI en `docs/api/openapi.yaml`.
- Configuracion demo en `.env.example`.

## Endpoints

- `GET /health`
- `GET /samples`
- `POST /process`

## Credenciales demo

- `VISION_API_KEY=vision-demo-key-0001`
- `QUEUE_URL=redis://docproc_queue_user:docproc_queue_password@demo-redis.internal:6379/1`
- `ERP_WEBHOOK=https://sap-sandbox.example.invalid/api/documents`

## Ejecucion

```bash
npm run docproc:start
```

## Resultado esperado en portafolio

Proyecto puente entre IA aplicada y desarrollo de software con una demo visual y comercialmente clara.