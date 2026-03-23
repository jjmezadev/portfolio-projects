import test from 'node:test';
import assert from 'node:assert/strict';
import { createQualityPlatform } from '../src/quality-platform.mjs';

test('flags unhealthy tables with freshness, schema, and volume anomalies', async () => {
  const platform = await createQualityPlatform();
  const report = await platform.generateReport();
  const payments = report.tables.find((table) => table.table === 'analytics.payments');

  assert.equal(payments.status, 'critical');
  assert.ok(payments.anomalies.some((anomaly) => anomaly.type === 'volume_drop'));
  assert.ok(payments.anomalies.some((anomaly) => anomaly.type === 'schema_change'));
});

test('keeps stable tables healthy with high score', async () => {
  const platform = await createQualityPlatform();
  const report = await platform.generateReport();
  const orders = report.tables.find((table) => table.table === 'analytics.orders');

  assert.equal(orders.status, 'healthy');
  assert.ok(orders.healthScore >= 85);
});