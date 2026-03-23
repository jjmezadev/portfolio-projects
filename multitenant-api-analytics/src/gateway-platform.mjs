import fs from 'node:fs/promises';

async function loadTenants() {
  const filePath = new URL('../fixtures/tenants.json', import.meta.url);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw).tenants;
}

function createRequestId() {
  return `gw_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

class SlidingWindowRateLimiter {
  constructor(limit) {
    this.limit = limit;
    this.requests = [];
  }

  consume(now = Date.now()) {
    const threshold = now - 60_000;
    this.requests = this.requests.filter((timestamp) => timestamp > threshold);
    if (this.requests.length >= this.limit) {
      return false;
    }
    this.requests.push(now);
    return true;
  }
}

export class GatewayPlatform {
  constructor(tenants) {
    this.tenants = new Map(tenants.map((tenant) => [tenant.id, tenant]));
    this.rateLimiters = new Map();
    this.events = [];
  }

  getTenant(tenantId) {
    const tenant = this.tenants.get(tenantId);
    if (!tenant) {
      throw new Error('Unknown tenant');
    }
    return tenant;
  }

  getLimiter(tenantId) {
    if (!this.rateLimiters.has(tenantId)) {
      this.rateLimiters.set(tenantId, new SlidingWindowRateLimiter(this.getTenant(tenantId).rateLimitPerMinute));
    }
    return this.rateLimiters.get(tenantId);
  }

  handleRequest({ tenantId, apiKey, endpoint, method = 'GET', ip = '127.0.0.1', latencyMs = 24, statusCode = 200 }) {
    const tenant = this.getTenant(tenantId);
    if (!tenant.apiKeys.includes(apiKey)) {
      return { status: 'unauthorized', statusCode: 401, message: 'Invalid API key' };
    }
    if (!tenant.allowedEndpoints.includes(endpoint)) {
      return { status: 'forbidden', statusCode: 403, message: 'Endpoint not allowed for tenant' };
    }

    const limiter = this.getLimiter(tenantId);
    if (!limiter.consume()) {
      return { status: 'rate_limited', statusCode: 429, message: 'Rate limit exceeded' };
    }

    const requestId = createRequestId();
    this.events.push({
      requestId,
      tenantId,
      endpoint,
      method,
      ip,
      latencyMs,
      statusCode,
      at: new Date().toISOString()
    });

    return {
      status: statusCode >= 400 ? 'error' : 'ok',
      statusCode,
      requestId,
      upstream: { endpoint, method, tenantId }
    };
  }

  getTenantAnalytics(viewerTenantId, targetTenantId) {
    if (viewerTenantId !== targetTenantId) {
      throw new Error('Tenant isolation violation');
    }

    const tenant = this.getTenant(targetTenantId);
    const tenantEvents = this.events.filter((event) => event.tenantId === targetTenantId);
    const totalRequests = tenantEvents.length;
    const averageLatencyMs = totalRequests ? Math.round(tenantEvents.reduce((sum, event) => sum + event.latencyMs, 0) / totalRequests) : 0;
    const errorRate = totalRequests ? tenantEvents.filter((event) => event.statusCode >= 400).length / totalRequests : 0;
    const byEndpoint = Object.entries(tenantEvents.reduce((accumulator, event) => {
      accumulator[event.endpoint] = (accumulator[event.endpoint] || 0) + 1;
      return accumulator;
    }, {})).map(([endpoint, requests]) => ({ endpoint, requests }));

    const insights = [];
    if (errorRate >= 0.1) {
      insights.push('Error rate above 10%; inspect the latest deploy and upstream health checks.');
    }
    if (averageLatencyMs > 150) {
      insights.push('Latency spike detected; review cache hit rate and upstream saturation.');
    }

    return {
      tenant: { id: tenant.id, name: tenant.name, plan: tenant.plan },
      totals: { totalRequests, averageLatencyMs, errorRate: Number(errorRate.toFixed(2)) },
      byEndpoint,
      insights
    };
  }
}

export async function createGatewayPlatform() {
  const tenants = await loadTenants();
  return new GatewayPlatform(tenants);
}