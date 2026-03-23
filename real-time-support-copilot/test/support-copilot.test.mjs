import test from 'node:test';
import assert from 'node:assert/strict';
import { createSupportCopilot } from '../src/support-copilot.mjs';

test('returns grounded suggestions and escalation for critical issues', async () => {
  const copilot = await createSupportCopilot();
  const result = copilot.assist({
    customerId: 'cust-acme',
    message: 'Customer reports payment API 503 and wants urgent help from Bogota.'
  });

  assert.equal(result.escalation, true);
  assert.ok(result.citations.length >= 1);
  assert.match(result.suggestedReply, /Acme Logistics/);
});