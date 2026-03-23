import fs from 'node:fs/promises';

const STOP_WORDS = new Set(['a', 'an', 'and', 'are', 'as', 'at', 'de', 'el', 'en', 'for', 'in', 'la', 'los', 'or', 'the', 'to', 'y']);

function tokenize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúüñ\s]/gi, ' ')
    .split(/\s+/)
    .filter((token) => token && !STOP_WORDS.has(token));
}

async function loadKnowledge() {
  const filePath = new URL('../fixtures/knowledge.json', import.meta.url);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

export class SupportCopilot {
  constructor(data) {
    this.customers = new Map(data.customers.map((customer) => [customer.customerId, customer]));
    this.articles = data.articles;
  }

  listArticles() {
    return this.articles.map(({ id, title }) => ({ id, title }));
  }

  assist(request) {
    const customer = this.customers.get(request.customerId);
    const queryTokens = tokenize(`${request.message} ${customer?.recentIssue || ''}`);
    const relevantArticles = this.articles
      .map((article) => {
        const articleTokens = tokenize(`${article.title} ${article.content}`);
        const overlap = articleTokens.filter((token) => queryTokens.includes(token)).length;
        return { ...article, score: overlap / Math.max(1, new Set([...queryTokens, ...articleTokens]).size) };
      })
      .filter((article) => article.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, 2)
      .map(({ id, title, score }) => ({ id, title, score: Number(score.toFixed(3)) }));

    const needsEscalation = /503|outage|security|refund/i.test(request.message) || customer?.tier === 'enterprise';

    return {
      customer: customer || null,
      suggestedReply: customer
        ? `Hi ${customer.name}, we have identified the issue and are reviewing the affected payment flow. I am coordinating the next update with our operations team.`
        : 'We are reviewing the issue and will share the next update shortly.',
      recommendedActions: needsEscalation
        ? ['escalate to specialized queue', 'attach relevant knowledge article', 'set follow-up in 15 minutes']
        : ['share knowledge article', 'confirm resolution steps', 'close if customer validates'],
      escalation: needsEscalation,
      citations: relevantArticles
    };
  }
}

export async function createSupportCopilot() {
  const data = await loadKnowledge();
  return new SupportCopilot(data);
}