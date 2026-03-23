import fs from 'node:fs/promises';

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

async function loadConfig() {
  const filePath = new URL('../fixtures/transactions.json', import.meta.url);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

function createRequestId() {
  return `fraud_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export class FraudEngine {
  constructor(config) {
    this.blockedCards = new Set(config.blockedCards);
    this.blockedIps = new Set(config.blockedIps);
    this.customerProfiles = new Map(config.customerProfiles.map((profile) => [profile.customerId, profile]));
    this.rules = config.rules;
  }

  listProfiles() {
    return Array.from(this.customerProfiles.values());
  }

  scoreTransaction(transaction) {
    const profile = this.customerProfiles.get(transaction.customerId) || {
      averageAmount: Number(transaction.amount || 0),
      velocityPerHour: 0,
      homeCountry: transaction.country,
      lastCountry: transaction.country,
      lastTransactionAt: '2026-03-23T10:00:00Z'
    };

    const signals = [];
    let score = 0;
    const amount = Number(transaction.amount || 0);
    const velocity = Number(transaction.transactionsLastHour || 0);
    const averageAmount = Math.max(1, Number(profile.averageAmount || 1));

    if (this.blockedCards.has(transaction.cardNumber)) {
      signals.push({ type: 'blocked_card', severity: 'critical', score: 60 });
      score += 60;
    }

    if (this.blockedIps.has(transaction.ipAddress)) {
      signals.push({ type: 'blocked_ip', severity: 'high', score: 35 });
      score += 35;
    }

    if (velocity > profile.velocityPerHour + 3) {
      signals.push({ type: 'velocity_spike', severity: 'high', score: 20, detail: `${velocity} tx/hour` });
      score += 20;
    }

    const amountRatio = amount / averageAmount;
    if (amountRatio >= 3) {
      signals.push({ type: 'amount_spike', severity: amountRatio >= 6 ? 'critical' : 'medium', score: Math.min(24, Math.round(amountRatio * 4)) });
      score += Math.min(24, Math.round(amountRatio * 4));
    }

    const minutesSinceLast = (new Date(transaction.timestamp || '2026-03-23T12:00:00Z') - new Date(profile.lastTransactionAt)) / 60000;
    if (transaction.country && profile.lastCountry && transaction.country !== profile.lastCountry && minutesSinceLast <= 90) {
      signals.push({ type: 'impossible_travel', severity: 'high', score: 22, detail: `${profile.lastCountry} -> ${transaction.country} in ${Math.round(minutesSinceLast)} min` });
      score += 22;
    }

    if (this.rules.highRiskMerchants.includes(transaction.merchantCategory)) {
      signals.push({ type: 'high_risk_merchant', severity: 'medium', score: 12 });
      score += 12;
    }

    if (String(transaction.deviceTrusted || 'true') === 'false') {
      signals.push({ type: 'new_device', severity: 'medium', score: 10 });
      score += 10;
    }

    const riskScore = clampScore(score);
    const decision = riskScore >= this.rules.declineThreshold ? 'decline' : riskScore >= this.rules.reviewThreshold ? 'review' : 'approve';

    return {
      requestId: createRequestId(),
      customerId: transaction.customerId,
      riskScore,
      decision,
      signals,
      rationale: signals.length === 0 ? ['No suspicious indicators detected.'] : signals.map((signal) => `${signal.type}:${signal.severity}`),
      recommendedActions: decision === 'decline'
        ? ['block transaction', 'create fraud case', 'notify payments risk team']
        : decision === 'review'
          ? ['send to analyst queue', 'step-up authentication', 'monitor next 24h']
          : ['approve transaction', 'continue passive monitoring']
    };
  }
}

export async function createFraudEngine() {
  const config = await loadConfig();
  return new FraudEngine(config);
}