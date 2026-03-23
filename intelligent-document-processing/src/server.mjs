import http from 'node:http';
import { createDocumentPipeline } from './document-pipeline.mjs';

const pipeline = await createDocumentPipeline();
const port = Number(process.env.PORT || 4013);

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
      return sendJson(response, 200, { status: 'ok', service: 'intelligent-document-processing' });
    }

    if (request.method === 'GET' && url.pathname === '/samples') {
      return sendJson(response, 200, { samples: pipeline.listSamples() });
    }

    if (request.method === 'POST' && url.pathname === '/process') {
      const body = await readJsonBody(request);
      const result = await pipeline.process({
        fileName: String(body.fileName || 'uploaded-document.txt'),
        content: String(body.content || '')
      });
      return sendJson(response, 200, result);
    }

    return sendJson(response, 404, { error: 'Not found' });
  } catch (error) {
    return sendJson(response, 500, { error: error.message });
  }
});

server.listen(port, () => {
  console.log(`intelligent-document-processing listening on http://localhost:${port}`);
});