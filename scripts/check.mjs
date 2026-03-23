import { createRagAssistant } from '../enterprise-rag-guardrails/src/rag-service.mjs';
import { createQualityPlatform } from '../data-quality-observability/src/quality-platform.mjs';
import { createDocumentPipeline } from '../intelligent-document-processing/src/document-pipeline.mjs';
import { createGatewayPlatform } from '../multitenant-api-analytics/src/gateway-platform.mjs';
import { createAutomationPlatform } from '../llm-process-agents/src/automation-platform.mjs';

const rag = await createRagAssistant();
const ragResult = await rag.answer('How do we rollback the Cloud Run service after a failed deploy?');

const quality = await createQualityPlatform();
const qualityResult = await quality.generateReport();

const documentPipeline = await createDocumentPipeline();
const documentResult = await documentPipeline.process({
  fileName: 'invoice-april.txt',
  content: 'Invoice\nVendor: Acme Cloud\nInvoice Number: INV-100\nDate: 2026-03-20\nTotal: 4200\nTax: 798\n'
});

const gateway = await createGatewayPlatform();
const gatewayResult = await gateway.handleRequest({
  tenantId: 'tenant-acme',
  apiKey: 'acme-key-001',
  endpoint: '/users',
  method: 'GET',
  ip: '10.0.0.5'
});

const automation = await createAutomationPlatform();
const workflowResult = await automation.runWorkflow('support-triage', {
  ticketId: 'TCK-100',
  message: 'The payment API returns 503 from Bogotá customers.',
  customerTier: 'enterprise'
});

console.log(JSON.stringify({
  rag: { action: ragResult.action, citations: ragResult.citations.length },
  dataQuality: { tables: qualityResult.tables.length, incidents: qualityResult.summary.incidentCount },
  documentProcessing: { type: documentResult.classification.type, route: documentResult.route },
  gateway: { status: gatewayResult.status, requestId: gatewayResult.requestId },
  agents: { status: workflowResult.status, steps: workflowResult.steps.length }
}, null, 2));