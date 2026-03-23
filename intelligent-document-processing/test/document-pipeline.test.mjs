import test from 'node:test';
import assert from 'node:assert/strict';
import { createDocumentPipeline } from '../src/document-pipeline.mjs';

test('extracts invoice fields and auto routes confident documents', async () => {
  const pipeline = await createDocumentPipeline();
  const result = await pipeline.process({
    fileName: 'invoice.txt',
    content: 'Invoice\nVendor: Acme Cloud\nInvoice Number: INV-120\nDate: 2026-03-23\nTotal: 5200\nTax: 988\n'
  });

  assert.equal(result.classification.type, 'invoice');
  assert.equal(result.route, 'auto');
  assert.equal(result.extracted.vendor, 'Acme Cloud');
});

test('routes incomplete contracts to human review', async () => {
  const pipeline = await createDocumentPipeline();
  const result = await pipeline.process({
    fileName: 'contract.txt',
    content: 'Contract\nParty A: Acme Cloud\nStart Date: 2026-03-20\n'
  });

  assert.equal(result.classification.type, 'contract');
  assert.equal(result.route, 'review');
  assert.ok(result.validated.issues.includes('missing_parties'));
});