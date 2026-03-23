# Operations

## Demo credentials

- Vision API key: `vision-demo-key-0001`
- Queue user: `docproc_queue_user`
- Queue password: `docproc_queue_password`
- ERP webhook: `https://sap-sandbox.example.invalid/api/documents`

## Run locally

```bash
npm run docproc:start
curl -s http://localhost:4013/samples
curl -s -X POST http://localhost:4013/process -H 'content-type: application/json' -d '{"fileName":"invoice.txt","content":"Invoice\nVendor: Acme Cloud\nInvoice Number: INV-88\nDate: 2026-03-23\nTotal: 1500\nTax: 285\n"}'
```

## Runbook

- If too many documents go to `review`, inspect missing field extraction before lowering the threshold.
- Keep business validation stricter than the classifier confidence.
- Add new document types by extending `classify`, `extract` and `validate` together.