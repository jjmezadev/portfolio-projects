import test from 'node:test';
import assert from 'node:assert/strict';
import { createModelMonitor } from '../src/model-monitor.mjs';

test('detects models with drift and fairness deterioration', async () => {
  const monitor = await createModelMonitor();
  const report = monitor.generateReport();

  assert.ok(report.summary.criticalModels >= 1);
  assert.ok(report.models.some((model) => model.signals.some((signal) => signal.type === 'feature_drift' && signal.value > 0.1)));
});