import fs from 'node:fs/promises';

async function loadTemplates() {
  const filePath = new URL('../fixtures/pipelines.json', import.meta.url);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw).templates;
}

function compileToSql(pipeline) {
  if (!pipeline.sourceTable || !pipeline.destinationTable) {
    throw new Error('Pipeline requires sourceTable and destinationTable');
  }

  let query = `SELECT * FROM ${pipeline.sourceTable}`;
  const aggregate = pipeline.steps.find((step) => step.type === 'aggregate');

  for (const step of pipeline.steps) {
    if (step.type === 'filter') {
      query = `SELECT * FROM (${query}) base WHERE ${step.condition}`;
    }
  }

  if (aggregate) {
    query = [
      'SELECT',
      `  ${aggregate.groupBy.join(', ')},`,
      `  ${aggregate.metrics.join(', ')}`,
      `FROM (${query}) base`,
      `GROUP BY ${aggregate.groupBy.join(', ')}`
    ].join('\n');
  }

  return `CREATE OR REPLACE TABLE ${pipeline.destinationTable} AS\n${query};`;
}

export class EtlBuilder {
  constructor(templates) {
    this.templates = templates;
  }

  listTemplates() {
    return this.templates;
  }

  suggestFromPrompt(prompt) {
    const lower = String(prompt).toLowerCase();
    return {
      sourceTable: lower.includes('orders') ? 'raw_orders' : 'raw_events',
      steps: [
        { type: 'filter', condition: lower.includes('paid') ? "status = 'paid'" : '1 = 1' },
        { type: 'aggregate', groupBy: lower.includes('country') ? ['country'] : ['event_date'], metrics: ['COUNT(*) AS record_count'] }
      ],
      destinationTable: lower.includes('orders') ? 'analytics_orders_ai' : 'analytics_events_ai'
    };
  }

  compile(pipeline) {
    const sql = compileToSql(pipeline);
    return {
      pipelineName: pipeline.name || 'ad-hoc-pipeline',
      sql,
      validation: {
        status: 'valid',
        stepCount: pipeline.steps.length
      }
    };
  }
}

export async function createEtlBuilder() {
  const templates = await loadTemplates();
  return new EtlBuilder(templates);
}