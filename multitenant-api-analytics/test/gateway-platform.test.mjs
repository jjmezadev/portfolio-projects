import test from 'node:test';
import assert from 'node:assert/strict';
import { createGatewayPlatform } from '../src/gateway-platform.mjs';

test('enforces tenant isolation on analytics access', async () => {
  const gateway = await createGatewayPlatform();
  gateway.handleRequest({ tenantId: 'tenant-acme', apiKey: 'acme-key-001', endpoint: '/users' });

  assert.throws(() => gateway.getTenantAnalytics('tenant-northwind', 'tenant-acme'), /isolation/i);
});

test('rate limits tenant traffic using a sliding window', async () => {
  const gateway = await createGatewayPlatform();
  const one = gateway.handleRequest({ tenantId: 'tenant-acme', apiKey: 'acme-key-001', endpoint: '/users' });
  const two = gateway.handleRequest({ tenantId: 'tenant-acme', apiKey: 'acme-key-001', endpoint: '/users' });
  const three = gateway.handleRequest({ tenantId: 'tenant-acme', apiKey: 'acme-key-001', endpoint: '/users' });
  const four = gateway.handleRequest({ tenantId: 'tenant-acme', apiKey: 'acme-key-001', endpoint: '/users' });

  assert.equal(one.status, 'ok');
  assert.equal(two.status, 'ok');
  assert.equal(three.status, 'ok');
  assert.equal(four.status, 'rate_limited');
});