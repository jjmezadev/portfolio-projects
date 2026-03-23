import http from 'node:http';
import { createExperimentationPlatform } from './experimentation-platform.mjs';

const platform = await createExperimentationPlatform();
const port = Number(process.env.PORT || 4022);

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
      return sendJson(response, 200, { status: 'ok', service: 'feature-flags-experimentation' });
    }
    if (request.method === 'GET' && url.pathname === '/flags') {
      return sendJson(response, 200, { flags: platform.listFlags() });
    }
    if (request.method === 'POST' && url.pathname === '/evaluate') {
      const body = await readJsonBody(request);
      return sendJson(response, 200, platform.evaluateFlag(body));
    }
    if (request.method === 'GET' && url.pathname.startsWith('/experiments/')) {
      const experimentId = url.pathname.split('/')[2];
      return sendJson(response, 200, platform.analyzeExperiment(experimentId));
    }
    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(response, 500, { error: error.message });
  }
}).listen(port, () => {
  console.log(`feature-flags-experimentation listening on http://localhost:${port}`);
});