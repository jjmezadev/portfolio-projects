import fs from 'node:fs/promises';

const WEIGHTS = {
  freshness: 0.25,
  volume: 0.2,
  completeness: 0.2,
  uniqueness: 0.1,
  validity: 0.15,
  schema: 0.1
};

function average(values) {
  if (!values.length) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function stddev(values) {
  const mean = average(values);
  const variance = average(values.map((value) => (value - mean) ** 2));
  return Math.sqrt(variance);
}

async function loadSources() {
  const filePath = new URL('../fixtures/sources.json', import.meta.url);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw).tables;
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function statusFromScore(score) {
  if (score >= 80) {
    return 'healthy';
  }
  if (score >= 60) {
    return 'warning';
  }
  return 'critical';
}

export class QualityPlatform {
  constructor(tables) {
    this.tables = tables;
  }

  runChecks(table) {
    const now = new Date('2026-03-23T12:00:00Z');
    const minutesSinceUpdate = (now - new Date(table.lastUpdated)) / 60000;
    const freshnessPassed = minutesSinceUpdate <= table.freshnessThresholdMinutes;

    const meanVolume = average(table.historicalRowCounts);
    const sigma = stddev(table.historicalRowCounts) || 1;
    const zScore = (table.currentRowCount - meanVolume) / sigma;
    const volumeDeviation = Math.abs(table.currentRowCount - meanVolume) / meanVolume;
    const volumePassed = volumeDeviation <= 0.3;

    const avgNullRate = average(table.columns.map((column) => column.nullRate));
    const completenessPassed = avgNullRate <= 0.05;

    const duplicateCount = table.columns.reduce((sum, column) => sum + column.duplicateCount, 0);
    const uniquenessPassed = duplicateCount === 0;

    const invalidColumns = table.columns.filter((column) => column.expectedMin > column.expectedMax);
    const validityPassed = invalidColumns.length === 0;

    const schemaPassed = JSON.stringify(table.schema) === JSON.stringify(table.expectedSchema);

    const checks = [
      { dimension: 'freshness', passed: freshnessPassed, detail: `${minutesSinceUpdate.toFixed(1)} min since last update` },
      { dimension: 'volume', passed: volumePassed, detail: `z-score ${zScore.toFixed(2)} / deviation ${(volumeDeviation * 100).toFixed(1)}%` },
      { dimension: 'completeness', passed: completenessPassed, detail: `avg null rate ${(avgNullRate * 100).toFixed(1)}%` },
      { dimension: 'uniqueness', passed: uniquenessPassed, detail: `${duplicateCount} duplicates detected` },
      { dimension: 'validity', passed: validityPassed, detail: `${invalidColumns.length} invalid range definitions` },
      { dimension: 'schema', passed: schemaPassed, detail: schemaPassed ? 'schema unchanged' : 'schema drift detected' },
      { dimension: 'consistency', passed: table.relationshipIssueRate <= 0.03, detail: `relationship issue rate ${(table.relationshipIssueRate * 100).toFixed(1)}%` }
    ];

    const anomalies = [];
    if (!volumePassed) {
      anomalies.push({ type: 'volume_drop', severity: volumeDeviation > 0.5 ? 'high' : 'medium', zScore: Number(zScore.toFixed(2)) });
    }
    if (!freshnessPassed) {
      anomalies.push({ type: 'stale_data', severity: 'high', minutesSinceUpdate: Number(minutesSinceUpdate.toFixed(1)) });
    }
    if (!schemaPassed) {
      anomalies.push({ type: 'schema_change', severity: 'high', added: table.schema.filter((value) => !table.expectedSchema.includes(value)) });
    }

    const dimensionScores = {
      freshness: freshnessPassed ? 100 : 35,
      volume: volumePassed ? 100 : Math.max(10, 100 - volumeDeviation * 140),
      completeness: Math.max(0, 100 - avgNullRate * 220),
      uniqueness: uniquenessPassed ? 100 : Math.max(0, 100 - duplicateCount * 12),
      validity: validityPassed ? 100 : 50,
      schema: schemaPassed ? 100 : 20
    };

    const healthScore = clampScore(
      dimensionScores.freshness * WEIGHTS.freshness +
      dimensionScores.volume * WEIGHTS.volume +
      dimensionScores.completeness * WEIGHTS.completeness +
      dimensionScores.uniqueness * WEIGHTS.uniqueness +
      dimensionScores.validity * WEIGHTS.validity +
      dimensionScores.schema * WEIGHTS.schema
    );

    return {
      table: table.name,
      owner: table.owner,
      checks,
      anomalies,
      healthScore,
      status: statusFromScore(healthScore)
    };
  }

  async generateReport() {
    const tables = this.tables.map((table) => this.runChecks(table));
    const incidentCount = tables.reduce((sum, table) => sum + table.anomalies.length, 0);
    const criticalTables = tables.filter((table) => table.status === 'critical').length;

    return {
      generatedAt: '2026-03-23T12:00:00Z',
      summary: {
        tableCount: tables.length,
        averageHealthScore: clampScore(average(tables.map((table) => table.healthScore))),
        incidentCount,
        criticalTables
      },
      tables
    };
  }
}

export async function createQualityPlatform() {
  const tables = await loadSources();
  return new QualityPlatform(tables);
}