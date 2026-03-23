import test from 'node:test';
import assert from 'node:assert/strict';
import { createReviewPlatform } from '../src/review-platform.mjs';

test('blocks insecure pull requests with critical findings', async () => {
  const platform = await createReviewPlatform();
  const result = platform.analyzePullRequest({
    id: 'pr-100',
    files: [
      {
        path: 'src/search.js',
        diff: '+ const html = userInput;\n+ element.innerHTML = html;\n+ const result = eval(customQuery);'
      }
    ]
  });

  assert.equal(result.summary.mergeRecommendation, 'block');
  assert.ok(result.findings.some((finding) => finding.category === 'security'));
});

test('approves low-risk pull requests with tests', async () => {
  const platform = await createReviewPlatform();
  const result = platform.analyzePullRequest({
    id: 'pr-101',
    files: [
      {
        path: 'src/math.js',
        diff: '+ export function sum(a, b) { return a + b; }'
      },
      {
        path: 'test/math.test.js',
        diff: '+ assert.equal(sum(1, 2), 3);'
      }
    ]
  });

  assert.equal(result.summary.mergeRecommendation, 'approve');
  assert.equal(result.summary.criticalFindings, 0);
});