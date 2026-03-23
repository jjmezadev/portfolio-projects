import fs from 'node:fs/promises';

async function loadCatalog() {
  const filePath = new URL('../fixtures/flags.json', import.meta.url);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

function bucket(value) {
  let total = 0;
  for (const char of value) total += char.charCodeAt(0);
  return total % 100;
}

function conversionRate(sample) {
  return sample.exposures === 0 ? 0 : sample.conversions / sample.exposures;
}

export class ExperimentationPlatform {
  constructor(catalog) {
    this.flags = catalog.flags;
    this.experiments = catalog.experiments;
  }

  listFlags() {
    return this.flags;
  }

  evaluateFlag({ flagKey, userId, segment = 'general' }) {
    const flag = this.flags.find((item) => item.key === flagKey);
    if (!flag) throw new Error('Flag not found');
    const targeted = flag.targetSegments.includes(segment);
    const assignedBucket = bucket(`${flagKey}:${userId}`);
    const enabled = targeted || assignedBucket < flag.rolloutPercentage;
    const variant = enabled ? flag.variants[assignedBucket % flag.variants.length] : 'control';

    return {
      flagKey,
      userId,
      enabled,
      variant,
      reason: targeted ? 'segment_targeted' : `bucket_${assignedBucket}`
    };
  }

  analyzeExperiment(experimentId) {
    const experiment = this.experiments.find((item) => item.id === experimentId);
    if (!experiment) throw new Error('Experiment not found');
    const controlRate = conversionRate(experiment.control);
    const variantRate = conversionRate(experiment.variant);
    const lift = ((variantRate - controlRate) / Math.max(controlRate, 0.0001)) * 100;

    return {
      experimentId,
      controlRate: Number(controlRate.toFixed(4)),
      variantRate: Number(variantRate.toFixed(4)),
      relativeLift: Number(lift.toFixed(2)),
      winner: lift > 5 ? 'variant' : lift < -5 ? 'control' : 'inconclusive'
    };
  }
}

export async function createExperimentationPlatform() {
  const catalog = await loadCatalog();
  return new ExperimentationPlatform(catalog);
}