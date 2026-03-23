import fs from 'node:fs/promises';

async function loadModels() {
  const filePath = new URL('../fixtures/models.json', import.meta.url);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw).models;
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export class ModelMonitor {
  constructor(models) {
    this.models = models;
  }

  listModels() {
    return this.models.map(({ modelId, owner }) => ({ modelId, owner }));
  }

  generateReport() {
    const models = this.models.map((model) => {
      const aucDrop = Math.max(0, model.baseline.auc - model.current.auc);
      const driftIncrease = Math.max(0, model.current.featureDrift - model.baseline.featureDrift);
      const fairnessIncrease = Math.max(0, model.current.fairnessGap - model.baseline.fairnessGap);
      const healthScore = clampScore(100 - aucDrop * 180 - driftIncrease * 160 - fairnessIncrease * 180);

      return {
        modelId: model.modelId,
        owner: model.owner,
        healthScore,
        status: healthScore >= 80 ? 'healthy' : healthScore >= 60 ? 'warning' : 'critical',
        signals: [
          { type: 'auc_drop', value: Number(aucDrop.toFixed(3)) },
          { type: 'feature_drift', value: Number(driftIncrease.toFixed(3)) },
          { type: 'fairness_gap', value: Number(fairnessIncrease.toFixed(3)) }
        ],
        recommendedActions: healthScore < 60
          ? ['investigate feature drift', 'review segment fairness', 'prepare retraining trigger']
          : ['continue monitoring']
      };
    });

    return {
      generatedAt: '2026-03-23T12:00:00Z',
      summary: {
        modelCount: models.length,
        criticalModels: models.filter((model) => model.status === 'critical').length,
        averageHealthScore: clampScore(models.reduce((sum, model) => sum + model.healthScore, 0) / models.length)
      },
      models
    };
  }
}

export async function createModelMonitor() {
  const models = await loadModels();
  return new ModelMonitor(models);
}