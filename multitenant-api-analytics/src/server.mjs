import http from 'node:http';
import { createGatewayPlatform } from './gateway-platform.mjs';

const gateway = await createGatewayPlatform();
const port = Number(process.env.PORT || 4014);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload, null, 2));
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {};
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (request.method === 'GET' && url.pathname === '/health') {
      return sendJson(response, 200, { status: 'ok', service: 'multitenant-api-analytics' });
    }

    if (request.method === 'POST' && url.pathname === '/simulate-request') {
      const body = await readJsonBody(request);
      const result = gateway.handleRequest(body);
      return sendJson(response, result.statusCode || 200, result);
    }

    const analyticsMatch = url.pathname.match(/^\/tenants\/([^/]+)\/analytics$/);
    if (request.method === 'GET' && analyticsMatch) {
      const targetTenantId = analyticsMatch[1];
      const viewer = url.searchParams.get('viewer') || targetTenantId;
      const result = gateway.getTenantAnalytics(viewer, targetTenantId);
      return sendJson(response, 200, result);
    }

    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(response, 500, { error: error.message });
  }
});

server.listen(port, () => {
  console.log(`multitenant-api-analytics listening on http://localhost:${port}`);
});