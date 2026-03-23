import http from 'node:http';
import { createCompliancePlatform } from './compliance-platform.mjs';

const platform = await createCompliancePlatform();
const port = Number(process.env.PORT || 4020);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload, null, 2));
}

http.createServer((request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (request.method === 'GET' && url.pathname === '/health') {
      return sendJson(response, 200, { status: 'ok', service: 'automated-compliance-audit' });
    }
    if (request.method === 'GET' && url.pathname === '/controls') {
      return sendJson(response, 200, { controls: platform.listControls() });
    }
    if (request.method === 'GET' && url.pathname === '/report') {
      return sendJson(response, 200, platform.assess());
    }
    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(response, 500, { error: error.message });
  }
}).listen(port, () => {
  console.log(`automated-compliance-audit listening on http://localhost:${port}`);
});