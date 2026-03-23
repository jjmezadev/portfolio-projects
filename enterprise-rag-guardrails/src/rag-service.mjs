import fs from 'node:fs/promises';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'como', 'con', 'de', 'del', 'do', 'el', 'en', 'for', 'from',
  'how', 'i', 'in', 'is', 'la', 'las', 'los', 'me', 'my', 'of', 'on', 'or', 'para', 'por', 'que', 'the', 'to', 'un', 'una', 'y'
]);

const DOMAIN_KEYWORDS = ['cloud', 'run', 'deployment', 'rollback', 'support', 'sla', 'incident', 'billing', 'token', 'refund', 'security'];

const PROMPT_INJECTION_PATTERNS = [
  /ignore previous instructions/gi,
  /system prompt/gi,
  /reveal secrets/gi,
  /show hidden rules/gi
];

const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_PATTERN = /\b\+?\d{1,3}[\s-]?\(?\d{2,3}\)?[\s-]?\d{3}[\s-]?\d{4}\b/g;

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúüñ\s]/gi, ' ')
    .split(/\s+/)
    .filter((token) => token && !STOP_WORDS.has(token));
}

function average(values) {
  if (!values.length) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function createRequestId() {
  return `rag_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

async function loadCorpus() {
  const filePath = new URL('../fixtures/corpus.json', import.meta.url);
  const raw = await fs.readFile(filePath, 'utf8');
  const documents = JSON.parse(raw);
  return documents.flatMap((document) => {
    const paragraphs = document.content.split(/(?<=[.])\s+/).filter(Boolean);
    return paragraphs.map((content, index) => ({
      id: `${document.id}-chunk-${index + 1}`,
      documentId: document.id,
      title: document.title,
      source: document.source,
      updatedAt: document.updatedAt,
      content,
      tokens: tokenize(`${document.title} ${content}`)
    }));
  });
}

class GuardrailEngine {
  sanitizeInput(query) {
    let sanitized = query.trim();
    for (const pattern of PROMPT_INJECTION_PATTERNS) {
      sanitized = sanitized.replace(pattern, '[redacted]');
    }

    return sanitized.replace(/\s+/g, ' ');
  }

  inspectInput(query) {
    const flags = [];
    const lower = query.toLowerCase();
    const domainMatch = DOMAIN_KEYWORDS.some((keyword) => lower.includes(keyword));
    if (!domainMatch) {
      flags.push('off_topic');
    }
    if (query.length > 320) {
      flags.push('input_too_long');
    }
    if (/password|credit card|token raw|customer email/i.test(query)) {
      flags.push('sensitive_request');
    }

    return {
      flags,
      action: flags.includes('sensitive_request') ? 'block' : 'allow'
    };
  }

  maskSensitiveContent(text) {
    return text.replace(EMAIL_PATTERN, '[redacted-email]').replace(PHONE_PATTERN, '[redacted-phone]');
  }

  validateOutput(answer, { retrievalScore, citations }) {
    const flags = [];
    let action = 'allow';
    let content = this.maskSensitiveContent(answer);

    if (retrievalScore < 0.2 || citations.length === 0) {
      flags.push('low_grounding');
      action = 'block';
      content = 'No encontré evidencia suficiente en la base documental para responder con seguridad.';
    }

    if (content !== answer) {
      flags.push('pii_masked');
      if (action === 'allow') {
        action = 'modify';
      }
    }

    return { flags, action, content };
  }
}

export class RAGAssistant {
  constructor(chunks) {
    this.chunks = chunks;
    this.guardrails = new GuardrailEngine();
    this.cache = new Map();
  }

  search(query, topK = 4) {
    const queryTokens = tokenize(query);

    return this.chunks
      .map((chunk) => {
        const overlap = chunk.tokens.filter((token) => queryTokens.includes(token)).length;
        const score = overlap === 0 ? 0 : overlap / new Set([...queryTokens, ...chunk.tokens]).size;
        return { ...chunk, score };
      })
      .filter((chunk) => chunk.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, topK);
  }

  buildAnswer(query, chunks) {
    const summaryLines = chunks.slice(0, 3).map((chunk) => `- ${chunk.content}`);
    return [
      `Respuesta basada en documentación interna para: "${query}"`,
      ...summaryLines,
      'Siguiente paso sugerido: valida el runbook citado antes de ejecutar cambios en producción.'
    ].join('\n');
  }

  async answer(query) {
    const requestId = createRequestId();
    const startedAt = Date.now();
    const sanitizedQuery = this.guardrails.sanitizeInput(query);
    const inputInspection = this.guardrails.inspectInput(sanitizedQuery);

    if (inputInspection.action === 'block') {
      return {
        requestId,
        action: 'block',
        answer: 'La consulta solicita información sensible o fuera de política. Debe escalarse a un humano.',
        citations: [],
        metrics: {
          latencyMs: Date.now() - startedAt,
          tokensUsed: sanitizedQuery.split(/\s+/).length,
          retrievalScore: 0,
          guardrailFlags: inputInspection.flags,
          cacheHit: false
        }
      };
    }

    const cacheKey = sanitizedQuery.toLowerCase();
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      return {
        ...cached,
        requestId,
        metrics: {
          ...cached.metrics,
          latencyMs: Date.now() - startedAt,
          cacheHit: true
        }
      };
    }

    const chunks = this.search(sanitizedQuery);
    const retrievalScore = average(chunks.map((chunk) => chunk.score));
    const citations = chunks.map((chunk) => ({
      id: chunk.id,
      title: chunk.title,
      source: chunk.source,
      score: Number(chunk.score.toFixed(3))
    }));

    const draft = this.buildAnswer(sanitizedQuery, chunks);
    const outputInspection = this.guardrails.validateOutput(draft, { retrievalScore, citations });
    const response = {
      requestId,
      action: outputInspection.action,
      answer: outputInspection.content,
      citations,
      metrics: {
        latencyMs: Date.now() - startedAt,
        tokensUsed: draft.split(/\s+/).length,
        retrievalScore: Number(retrievalScore.toFixed(3)),
        guardrailFlags: [...inputInspection.flags, ...outputInspection.flags],
        cacheHit: false
      }
    };

    this.cache.set(cacheKey, response);
    return response;
  }

  listDocuments() {
    const byDocument = new Map();
    for (const chunk of this.chunks) {
      if (!byDocument.has(chunk.documentId)) {
        byDocument.set(chunk.documentId, {
          id: chunk.documentId,
          title: chunk.title,
          source: chunk.source,
          updatedAt: chunk.updatedAt,
          chunks: 0
        });
      }
      byDocument.get(chunk.documentId).chunks += 1;
    }

    return Array.from(byDocument.values());
  }
}

export async function createRagAssistant() {
  const chunks = await loadCorpus();
  return new RAGAssistant(chunks);
}