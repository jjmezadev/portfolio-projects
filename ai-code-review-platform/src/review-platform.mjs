import fs from 'node:fs/promises';

async function loadConfig() {
  const filePath = new URL('../fixtures/pull-requests.json', import.meta.url);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

function createReviewId() {
  return `review_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function severityScore(severity) {
  return { critical: 35, high: 25, medium: 15, low: 8 }[severity] || 0;
}

export class ReviewPlatform {
  constructor(config) {
    this.rules = config.rules;
    this.samples = config.samples;
  }

  listSamples() {
    return this.samples;
  }

  analyzePullRequest(pullRequest) {
    const findings = [];
    const files = pullRequest.files || [];
    const changedPaths = files.map((file) => file.path);
    const hasTests = changedPaths.some((path) => this.rules.testIndicators.some((indicator) => path.includes(indicator)));

    for (const file of files) {
      const diff = String(file.diff || '');
      for (const pattern of this.rules.securityPatterns) {
        if (diff.includes(pattern)) {
          findings.push({
            category: 'security',
            severity: pattern === 'eval(' || pattern === 'child_process.exec' ? 'critical' : 'high',
            file: file.path,
            message: `Detected risky pattern: ${pattern}`,
            suggestion: 'Replace the insecure primitive with validated parsing or safe DOM/text rendering.'
          });
        }
      }

      if ((diff.match(/for \(/g) || []).length >= 2 && diff.includes('.find(')) {
        findings.push({
          category: 'performance',
          severity: 'medium',
          file: file.path,
          message: 'Nested iteration detected in hot path candidate.',
          suggestion: 'Pre-index data by key before iterating to avoid quadratic behavior.'
        });
      }

      if (/TODO|FIXME/.test(diff)) {
        findings.push({
          category: 'maintainability',
          severity: 'low',
          file: file.path,
          message: 'Unresolved TODO/FIXME introduced in diff.',
          suggestion: 'Resolve the placeholder or create a tracked follow-up issue.'
        });
      }
    }

    if (!hasTests && files.some((file) => file.path.startsWith('src/'))) {
      findings.push({
        category: 'testing',
        severity: 'medium',
        file: 'pull-request',
        message: 'Source changes were introduced without corresponding tests.',
        suggestion: 'Add coverage for the new code path before merge.'
      });
    }

    const riskScore = Math.min(100, findings.reduce((sum, finding) => sum + severityScore(finding.severity), 0));
    const mergeRecommendation = riskScore >= 70 ? 'block' : riskScore >= 35 ? 'needs_changes' : 'approve';

    return {
      reviewId: createReviewId(),
      pullRequestId: pullRequest.id || 'ad-hoc',
      findings,
      summary: {
        totalFindings: findings.length,
        criticalFindings: findings.filter((finding) => finding.severity === 'critical').length,
        riskScore,
        mergeRecommendation
      }
    };
  }
}

export async function createReviewPlatform() {
  const config = await loadConfig();
  return new ReviewPlatform(config);
}