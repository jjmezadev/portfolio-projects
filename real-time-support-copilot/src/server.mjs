import http from 'node:http';
import { createSupportCopilot } from './support-copilot.mjs';

const copilot = await createSupportCopilot();
const port = Number(process.env.PORT || 4019);

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
      return sendJson(response, 200, { status: 'ok', service: 'real-time-support-copilot' });
    }
    if (request.method === 'GET' && url.pathname === '/knowledge') {
      return sendJson(response, 200, { articles: copilot.listArticles() });
    }
    if (request.method === 'POST' && url.pathname === '/assist') {
      const body = await readJsonBody(request);
      return sendJson(response, 200, copilot.assist(body));
    }
    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(response, 500, { error: error.message });
  }
}).listen(port, () => {
  console.log(`real-time-support-copilot listening on http://localhost:${port}`);
});