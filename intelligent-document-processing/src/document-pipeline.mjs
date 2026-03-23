import fs from 'node:fs/promises';

function createAudit(step, detail) {
  return {
    step,
    detail,
    at: new Date().toISOString()
  };
}

function normalizeContent(content) {
  return content.replace(/\r/g, '').trim();
}

function findValue(content, label) {
  const pattern = new RegExp(`${label}:\\s*(.+)`, 'i');
  const match = content.match(pattern);
  return match ? match[1].trim() : null;
}

async function loadSamples() {
  const filePath = new URL('../fixtures/sample-documents.json', import.meta.url);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

export class DocumentPipeline {
  constructor(samples) {
    this.samples = samples;
  }

  classify(content) {
    const lower = content.toLowerCase();
    if (lower.includes('invoice') || lower.includes('vendor:')) {
      return { type: 'invoice', confidence: 0.96, rationale: 'matched invoice markers' };
    }
    if (lower.includes('contract') || lower.includes('party a:')) {
      return { type: 'contract', confidence: 0.94, rationale: 'matched contract markers' };
    }
    if (lower.includes('application form') || lower.includes('applicant:')) {
      return { type: 'application_form', confidence: 0.91, rationale: 'matched form markers' };
    }
    return { type: 'unknown', confidence: 0.42, rationale: 'insufficient markers' };
  }

  extract(content, type) {
    if (type === 'invoice') {
      return {
        vendor: findValue(content, 'Vendor'),
        invoiceNumber: findValue(content, 'Invoice Number'),
        date: findValue(content, 'Date'),
        total: Number(findValue(content, 'Total')),
        tax: Number(findValue(content, 'Tax'))
      };
    }

    if (type === 'contract') {
      return {
        partyA: findValue(content, 'Party A'),
        partyB: findValue(content, 'Party B'),
        startDate: findValue(content, 'Start Date'),
        endDate: findValue(content, 'End Date'),
        contractValue: Number(findValue(content, 'Contract Value')),
        keyClause: findValue(content, 'Key Clause')
      };
    }

    if (type === 'application_form') {
      return {
        applicant: findValue(content, 'Applicant'),
        requestType: findValue(content, 'Request Type'),
        submittedAt: findValue(content, 'Submitted At'),
        region: findValue(content, 'Region')
      };
    }

    return {};
  }

  validate(extracted, type) {
    const issues = [];

    if (type === 'invoice') {
      if (!extracted.vendor) issues.push('missing_vendor');
      if (!Number.isFinite(extracted.total) || extracted.total <= 0) issues.push('invalid_total');
      if (!extracted.date) issues.push('missing_date');
    }

    if (type === 'contract') {
      if (!extracted.partyA || !extracted.partyB) issues.push('missing_parties');
      if (!Number.isFinite(extracted.contractValue) || extracted.contractValue <= 0) issues.push('invalid_contract_value');
      if (!extracted.startDate || !extracted.endDate) issues.push('missing_contract_dates');
    }

    if (type === 'application_form') {
      if (!extracted.applicant) issues.push('missing_applicant');
      if (!extracted.requestType) issues.push('missing_request_type');
    }

    return {
      passed: issues.length === 0,
      issues
    };
  }

  calculateConfidence(classification, extracted, validation) {
    const extractedFields = Object.values(extracted).filter((value) => value !== null && value !== undefined && value !== '').length;
    const completeness = extractedFields / Math.max(1, Object.keys(extracted).length);
    const penalty = validation.issues.length * 0.15;
    const overall = Math.max(0, Math.min(0.99, classification.confidence * 0.55 + completeness * 0.45 - penalty));

    return {
      classification: classification.confidence,
      completeness: Number(completeness.toFixed(2)),
      overall: Number(overall.toFixed(2))
    };
  }

  async process({ fileName, content }) {
    const auditTrail = [createAudit('received', fileName)];
    const normalized = normalizeContent(content);
    auditTrail.push(createAudit('preprocess', 'normalized input payload'));

    const classification = this.classify(normalized);
    auditTrail.push(createAudit('classify', `${classification.type}:${classification.confidence}`));

    const extracted = this.extract(normalized, classification.type);
    auditTrail.push(createAudit('extract', `${Object.keys(extracted).length} fields detected`));

    const validated = this.validate(extracted, classification.type);
    auditTrail.push(createAudit('validate', validated.passed ? 'passed' : validated.issues.join(',')));

    const confidence = this.calculateConfidence(classification, extracted, validated);
    const route = confidence.overall >= 0.9 && validated.passed ? 'auto' : 'review';
    auditTrail.push(createAudit('route', route));

    return {
      fileName,
      classification,
      extracted,
      validated,
      confidence,
      route,
      auditTrail
    };
  }

  listSamples() {
    return this.samples;
  }
}

export async function createDocumentPipeline() {
  const samples = await loadSamples();
  return new DocumentPipeline(samples);
}