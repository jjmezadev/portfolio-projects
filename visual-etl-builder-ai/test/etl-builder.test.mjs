import test from 'node:test';
import assert from 'node:assert/strict';
import { createEtlBuilder } from '../src/etl-builder.mjs';

test('compiles a valid ETL pipeline into SQL', async () => {
  const builder = await createEtlBuilder();
  const pipeline = builder.suggestFromPrompt('Aggregate paid orders by country');
  const result = builder.compile({ ...pipeline, name: 'orders-by-country' });

  assert.equal(result.validation.status, 'valid');
  assert.match(result.sql, /CREATE OR REPLACE TABLE/);
  assert.match(result.sql, /GROUP BY country/);
});