import http from 'node:http';
import { createModelMonitor } from './model-monitor.mjs';

const monitor = await createModelMonitor();
const port = Number(process.env.PORT || 4023);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload, null, 2));
}

http.createServer((request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (request.method === 'GET' && url.pathname === '/health') {
      return sendJson(response, 200, { status: 'ok', service: 'ml-model-monitoring-platform' });
    }
    if (request.method === 'GET' && url.pathname === '/models') {
      return sendJson(response, 200, { models: monitor.listModels() });
    }
    if (request.method === 'GET' && url.pathname === '/report') {
      return sendJson(response, 200, monitor.generateReport());
    }
    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(response, 500, { error: error.message });
  }
}).listen(port, () => {
  console.log(`ml-model-monitoring-platform listening on http://localhost:${port}`);
});