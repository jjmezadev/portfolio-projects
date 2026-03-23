import http from 'node:http';
import { createCostOptimizer } from './cost-optimizer.mjs';

const optimizer = await createCostOptimizer();
const port = Number(process.env.PORT || 4018);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload, null, 2));
}

http.createServer((request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (request.method === 'GET' && url.pathname === '/health') {
      return sendJson(response, 200, { status: 'ok', service: 'multicloud-cost-optimizer' });
    }
    if (request.method === 'GET' && url.pathname === '/accounts') {
      return sendJson(response, 200, { accounts: optimizer.listAccounts() });
    }
    if (request.method === 'GET' && url.pathname === '/optimize') {
      return sendJson(response, 200, optimizer.optimize());
    }
    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(response, 500, { error: error.message });
  }
}).listen(port, () => {
  console.log(`multicloud-cost-optimizer listening on http://localhost:${port}`);
});