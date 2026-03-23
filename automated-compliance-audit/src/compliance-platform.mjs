import fs from 'node:fs/promises';

async function loadControls() {
  const filePath = new URL('../fixtures/controls.json', import.meta.url);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw).controls;
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export class CompliancePlatform {
  constructor(controls) {
    this.controls = controls;
  }

  listControls() {
    return this.controls;
  }

  assess() {
    const assessments = this.controls.map((control) => {
      const stale = control.evidenceFreshnessDays > control.maxFreshnessDays;
      const failed = control.status !== 'pass';
      const score = clampScore(100 - (stale ? 35 : 0) - (failed ? 45 : 0) - control.exceptions * 8);
      return {
        ...control,
        stale,
        score,
        risk: score >= 80 ? 'low' : score >= 55 ? 'medium' : 'high',
        actions: failed || stale
          ? ['collect fresh evidence', 'open remediation task', 'review control owner']
          : ['keep current cadence']
      };
    });

    return {
      generatedAt: '2026-03-23T12:00:00Z',
      summary: {
        controlCount: assessments.length,
        highRiskControls: assessments.filter((control) => control.risk === 'high').length,
        staleEvidenceControls: assessments.filter((control) => control.stale).length,
        averageScore: clampScore(assessments.reduce((sum, control) => sum + control.score, 0) / assessments.length)
      },
      controls: assessments
    };
  }
}

export async function createCompliancePlatform() {
  const controls = await loadControls();
  return new CompliancePlatform(controls);
}