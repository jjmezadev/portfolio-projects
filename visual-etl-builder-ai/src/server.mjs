import http from 'node:http';
import { createEtlBuilder } from './etl-builder.mjs';

const builder = await createEtlBuilder();
const port = Number(process.env.PORT || 4021);

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
      return sendJson(response, 200, { status: 'ok', service: 'visual-etl-builder-ai' });
    }
    if (request.method === 'GET' && url.pathname === '/templates') {
      return sendJson(response, 200, { templates: builder.listTemplates() });
    }
    if (request.method === 'POST' && url.pathname === '/suggest') {
      const body = await readJsonBody(request);
      return sendJson(response, 200, { pipeline: builder.suggestFromPrompt(body.prompt || '') });
    }
    if (request.method === 'POST' && url.pathname === '/compile') {
      const body = await readJsonBody(request);
      return sendJson(response, 200, builder.compile(body));
    }
    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(response, 500, { error: error.message });
  }
}).listen(port, () => {
  console.log(`visual-etl-builder-ai listening on http://localhost:${port}`);
});