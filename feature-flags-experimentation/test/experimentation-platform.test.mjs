import test from 'node:test';
import assert from 'node:assert/strict';
import { createExperimentationPlatform } from '../src/experimentation-platform.mjs';

test('evaluates flags deterministically', async () => {
  const platform = await createExperimentationPlatform();
  const resultA = platform.evaluateFlag({ flagKey: 'checkout-redesign', userId: 'user-001', segment: 'general' });
  const resultB = platform.evaluateFlag({ flagKey: 'checkout-redesign', userId: 'user-001', segment: 'general' });

  assert.deepEqual(resultA, resultB);
});

test('detects experiment winner when lift is meaningful', async () => {
  const platform = await createExperimentationPlatform();
  const result = platform.analyzeExperiment('exp-001');

  assert.equal(result.winner, 'variant');
  assert.ok(result.relativeLift > 5);
});