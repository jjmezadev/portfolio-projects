import test from 'node:test';
import assert from 'node:assert/strict';
import { createFraudEngine } from '../src/fraud-engine.mjs';

test('declines transactions with hard fraud indicators', async () => {
  const engine = await createFraudEngine();
  const result = engine.scoreTransaction({
    customerId: 'cust-001',
    amount: 1600,
    country: 'RU',
    timestamp: '2026-03-23T12:00:00Z',
    transactionsLastHour: 8,
    cardNumber: '4000000000009995',
    ipAddress: '203.0.113.77',
    merchantCategory: 'CRYPTO',
    deviceTrusted: false
  });

  assert.equal(result.decision, 'decline');
  assert.ok(result.riskScore >= 80);
  assert.ok(result.signals.some((signal) => signal.type === 'blocked_card'));
});

test('approves low-risk familiar transactions', async () => {
  const engine = await createFraudEngine();
  const result = engine.scoreTransaction({
    customerId: 'cust-001',
    amount: 140,
    country: 'CO',
    timestamp: '2026-03-23T12:00:00Z',
    transactionsLastHour: 1,
    cardNumber: '4000000000001234',
    ipAddress: '198.51.100.10',
    merchantCategory: 'RETAIL',
    deviceTrusted: true
  });

  assert.equal(result.decision, 'approve');
  assert.ok(result.riskScore < 55);
});