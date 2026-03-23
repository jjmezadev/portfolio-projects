import http from 'node:http';
import { createReviewPlatform } from './review-platform.mjs';

const platform = await createReviewPlatform();
const port = Number(process.env.PORT || 4017);

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
      return sendJson(response, 200, { status: 'ok', service: 'ai-code-review-platform' });
    }
    if (request.method === 'GET' && url.pathname === '/samples') {
      return sendJson(response, 200, { samples: platform.listSamples() });
    }
    if (request.method === 'POST' && url.pathname === '/review') {
      const body = await readJsonBody(request);
      return sendJson(response, 200, platform.analyzePullRequest(body));
    }
    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(response, 500, { error: error.message });
  }
}).listen(port, () => {
  console.log(`ai-code-review-platform listening on http://localhost:${port}`);
});