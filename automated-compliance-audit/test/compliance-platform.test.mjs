import test from 'node:test';
import assert from 'node:assert/strict';
import { createCompliancePlatform } from '../src/compliance-platform.mjs';

test('detects stale evidence and high-risk controls', async () => {
  const platform = await createCompliancePlatform();
  const report = platform.assess();

  assert.ok(report.summary.highRiskControls >= 1);
  assert.ok(report.controls.some((control) => control.stale));
});