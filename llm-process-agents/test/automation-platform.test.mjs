import test from 'node:test';
import assert from 'node:assert/strict';
import { createAutomationPlatform } from '../src/automation-platform.mjs';

test('runs support triage workflows end to end', async () => {
  const platform = await createAutomationPlatform();
  const result = await platform.runWorkflow('support-triage', {
    message: 'Payment API outage with 503 errors',
    customerTier: 'enterprise'
  });

  assert.equal(result.status, 'completed');
  assert.equal(result.steps.length, 3);
  assert.equal(result.finalOutput.team, 'payments-oncall');
});

test('requests human approval for risky compliance notifications', async () => {
  const platform = await createAutomationPlatform();
  const result = await platform.runWorkflow('compliance-review', {
    documentText: 'The form contains SSN details and transfer to external vendor.'
  });

  assert.equal(result.status, 'awaiting_human_approval');
  assert.match(result.finalOutput.reason, /human approval/i);
});