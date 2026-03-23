import { createRagAssistant } from '../enterprise-rag-guardrails/src/rag-service.mjs';
import { createQualityPlatform } from '../data-quality-observability/src/quality-platform.mjs';
import { createDocumentPipeline } from '../intelligent-document-processing/src/document-pipeline.mjs';
import { createGatewayPlatform } from '../multitenant-api-analytics/src/gateway-platform.mjs';
import { createAutomationPlatform } from '../llm-process-agents/src/automation-platform.mjs';
import { createFraudEngine } from '../real-time-fraud-detection/src/fraud-engine.mjs';
import { createReviewPlatform } from '../ai-code-review-platform/src/review-platform.mjs';
import { createCostOptimizer } from '../multicloud-cost-optimizer/src/cost-optimizer.mjs';
import { createSupportCopilot } from '../real-time-support-copilot/src/support-copilot.mjs';
import { createCompliancePlatform } from '../automated-compliance-audit/src/compliance-platform.mjs';
import { createEtlBuilder } from '../visual-etl-builder-ai/src/etl-builder.mjs';
import { createExperimentationPlatform } from '../feature-flags-experimentation/src/experimentation-platform.mjs';
import { createModelMonitor } from '../ml-model-monitoring-platform/src/model-monitor.mjs';

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

const fraud = await createFraudEngine();
const fraudResult = fraud.scoreTransaction({
  customerId: 'cust-001',
  amount: 1600,
  country: 'RU',
  timestamp: '2026-03-23T12:00:00Z',
  transactionsLastHour: 8,
  cardNumber: '4000000000009995',
  ipAddress: '203.0.113.77',
  merchantCategory: 'CRYPTO',
  deviceTrusted: false
});

const review = await createReviewPlatform();
const reviewResult = review.analyzePullRequest({
  id: 'pr-100',
  files: [{ path: 'src/search.js', diff: '+ element.innerHTML = html;\n+ const result = eval(customQuery);' }]
});

const finops = await createCostOptimizer();
const finopsResult = finops.optimize();

const support = await createSupportCopilot();
const supportResult = support.assist({
  customerId: 'cust-acme',
  message: 'Customer reports payment API 503 and wants urgent help from Bogota.'
});

const compliance = await createCompliancePlatform();
const complianceResult = compliance.assess();

const etl = await createEtlBuilder();
const etlResult = etl.compile({
  ...etl.suggestFromPrompt('Aggregate paid orders by country'),
  name: 'orders-by-country'
});

const flags = await createExperimentationPlatform();
const flagResult = flags.evaluateFlag({ flagKey: 'checkout-redesign', userId: 'user-001', segment: 'general' });
const experimentResult = flags.analyzeExperiment('exp-001');

const mlMonitor = await createModelMonitor();
const mlMonitorResult = mlMonitor.generateReport();

console.log(JSON.stringify({
  rag: { action: ragResult.action, citations: ragResult.citations.length },
  dataQuality: { tables: qualityResult.tables.length, incidents: qualityResult.summary.incidentCount },
  documentProcessing: { type: documentResult.classification.type, route: documentResult.route },
  gateway: { status: gatewayResult.status, requestId: gatewayResult.requestId },
  agents: { status: workflowResult.status, steps: workflowResult.steps.length },
  fraud: { decision: fraudResult.decision, score: fraudResult.riskScore },
  codeReview: { recommendation: reviewResult.summary.mergeRecommendation, findings: reviewResult.summary.totalFindings },
  finops: { opportunities: finopsResult.summary.opportunityCount, savings: finopsResult.summary.totalEstimatedSavings },
  support: { escalation: supportResult.escalation, citations: supportResult.citations.length },
  compliance: { highRiskControls: complianceResult.summary.highRiskControls, averageScore: complianceResult.summary.averageScore },
  etl: { status: etlResult.validation.status, sqlLines: etlResult.sql.split('\n').length },
  flags: { enabled: flagResult.enabled, winner: experimentResult.winner },
  mlMonitoring: { criticalModels: mlMonitorResult.summary.criticalModels, averageHealthScore: mlMonitorResult.summary.averageHealthScore }
}, null, 2));