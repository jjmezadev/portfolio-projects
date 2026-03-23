import http from 'node:http';
import { createAutomationPlatform } from './automation-platform.mjs';

const platform = await createAutomationPlatform();
const port = Number(process.env.PORT || 4015);

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
      return sendJson(response, 200, { status: 'ok', service: 'llm-process-agents' });
    }

    if (request.method === 'GET' && url.pathname === '/workflows') {
      return sendJson(response, 200, { workflows: platform.listWorkflows() });
    }

    const runMatch = url.pathname.match(/^\/workflows\/run\/([^/]+)$/);
    if (request.method === 'POST' && runMatch) {
      const workflowId = runMatch[1];
      const body = await readJsonBody(request);
      const result = await platform.runWorkflow(workflowId, body);
      return sendJson(response, 200, result);
    }

    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(response, 500, { error: error.message });
  }
});

server.listen(port, () => {
  console.log(`llm-process-agents listening on http://localhost:${port}`);
});