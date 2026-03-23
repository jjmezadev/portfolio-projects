import http from 'node:http';
import { createRagAssistant } from './rag-service.mjs';

const assistant = await createRagAssistant();
const port = Number(process.env.PORT || 4011);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload, null, 2));
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (request.method === 'GET' && url.pathname === '/health') {
      return sendJson(response, 200, { status: 'ok', service: 'enterprise-rag-guardrails' });
    }

    if (request.method === 'GET' && url.pathname === '/documents') {
      return sendJson(response, 200, { documents: assistant.listDocuments() });
    }

    if (request.method === 'POST' && url.pathname === '/ask') {
      const body = await readJsonBody(request);
      const result = await assistant.answer(String(body.query || ''));
      return sendJson(response, 200, result);
    }

    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(response, 500, { error: error.message });
  }
});

server.listen(port, () => {
  console.log(`enterprise-rag-guardrails listening on http://localhost:${port}`);
});