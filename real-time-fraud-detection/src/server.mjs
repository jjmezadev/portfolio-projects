import http from 'node:http';
import { createFraudEngine } from './fraud-engine.mjs';

const engine = await createFraudEngine();
const port = Number(process.env.PORT || 4016);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload, null, 2));
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {};
}

http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (request.method === 'GET' && url.pathname === '/health') {
      return sendJson(response, 200, { status: 'ok', service: 'real-time-fraud-detection' });
    }
    if (request.method === 'GET' && url.pathname === '/profiles') {
      return sendJson(response, 200, { profiles: engine.listProfiles() });
    }
    if (request.method === 'POST' && url.pathname === '/score') {
      const body = await readJsonBody(request);
      return sendJson(response, 200, engine.scoreTransaction(body));
    }
    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(response, 500, { error: error.message });
  }
}).listen(port, () => {
  console.log(`real-time-fraud-detection listening on http://localhost:${port}`);
});