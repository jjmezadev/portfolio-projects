import http from 'node:http';
import { createQualityPlatform } from './quality-platform.mjs';

const platform = await createQualityPlatform();
const port = Number(process.env.PORT || 4012);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload, null, 2));
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === 'GET' && url.pathname === '/health') {
    return sendJson(response, 200, { status: 'ok', service: 'data-quality-observability' });
  }

  if (request.method === 'GET' && url.pathname === '/reports') {
    const report = await platform.generateReport();
    return sendJson(response, 200, report);
  }

  return sendJson(response, 404, { error: 'Not found' });
});

server.listen(port, () => {
  console.log(`data-quality-observability listening on http://localhost:${port}`);
});