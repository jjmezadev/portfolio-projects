import fs from 'node:fs/promises';

async function loadAccounts() {
  const filePath = new URL('../fixtures/costs.json', import.meta.url);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw).accounts;
}

function round(value) {
  return Math.round(value * 100) / 100;
}

export class CostOptimizer {
  constructor(accounts) {
    this.accounts = accounts;
  }

  listAccounts() {
    return this.accounts;
  }

  optimize() {
    const opportunities = [];

    for (const account of this.accounts) {
      for (const resource of account.resources) {
        if (resource.utilization < 0.3) {
          opportunities.push({
            accountId: account.accountId,
            provider: account.provider,
            type: 'rightsizing',
            resource: resource.name,
            estimatedSavings: round(resource.monthlyCost * 0.35),
            effort: 'medium',
            rationale: `Utilization ${(resource.utilization * 100).toFixed(0)}% is below efficient threshold.`
          });
        }

        if (resource.commitmentCoverage < 0.4 && resource.type !== 'storage') {
          opportunities.push({
            accountId: account.accountId,
            provider: account.provider,
            type: 'commitment_optimization',
            resource: resource.name,
            estimatedSavings: round(resource.monthlyCost * 0.18),
            effort: 'low',
            rationale: `Commitment coverage ${(resource.commitmentCoverage * 100).toFixed(0)}% leaves savings on the table.`
          });
        }
      }
    }

    const sorted = opportunities.sort((left, right) => right.estimatedSavings - left.estimatedSavings);
    const totalSavings = round(sorted.reduce((sum, item) => sum + item.estimatedSavings, 0));

    return {
      generatedAt: '2026-03-23T12:00:00Z',
      summary: {
        accountCount: this.accounts.length,
        opportunityCount: sorted.length,
        totalEstimatedSavings: totalSavings,
        topRecommendation: sorted[0] || null
      },
      opportunities: sorted
    };
  }
}

export async function createCostOptimizer() {
  const accounts = await loadAccounts();
  return new CostOptimizer(accounts);
}