import test from 'node:test';
import assert from 'node:assert/strict';
import { createCostOptimizer } from '../src/cost-optimizer.mjs';

test('returns prioritized savings opportunities', async () => {
  const optimizer = await createCostOptimizer();
  const report = optimizer.optimize();

  assert.ok(report.summary.opportunityCount >= 1);
  assert.ok(report.summary.totalEstimatedSavings > 0);
  assert.equal(report.opportunities[0].estimatedSavings >= report.opportunities.at(-1).estimatedSavings, true);
});