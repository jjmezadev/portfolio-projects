import fs from 'node:fs/promises';

async function loadWorkflows() {
  const filePath = new URL('../fixtures/workflows.json', import.meta.url);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

class ToolRegistry {
  constructor() {
    this.tools = new Map([
      ['ticketClassifier', ({ message, customerTier }) => {
        const lower = String(message).toLowerCase();
        const severity = /503|outage|payment|security/.test(lower) ? 'high' : 'medium';
        return {
          urgency: customerTier === 'enterprise' || severity === 'high' ? 'urgent' : 'normal',
          topic: /payment/.test(lower) ? 'payments' : 'platform',
          severity
        };
      }],
      ['knowledgeSearch', ({ message }) => ({
        article: /503/.test(String(message)) ? 'KB-503-platform-outage' : 'KB-general-support',
        confidence: 0.88
      })],
      ['assignTeam', (payload, context) => ({
        team: context.ticketClassifier?.topic === 'payments' ? 'payments-oncall' : 'platform-oncall'
      })],
      ['leadScorer', ({ companySize = 0, budget = 0 }) => ({
        score: Math.min(100, Math.round(companySize * 0.15 + budget / 500)),
        segment: budget >= 20000 ? 'enterprise' : 'mid-market'
      })],
      ['routeLead', (payload, context) => ({
        owner: context.leadScorer?.score >= 70 ? 'senior-ae' : 'smb-team'
      })],
      ['metricsReporter', ({ metrics = [] }) => ({
        collected: metrics.length,
        totals: metrics.reduce((sum, metric) => sum + metric.value, 0)
      })],
      ['generateSummary', (payload, context) => ({
        summary: `Collected ${context.metricsReporter?.collected || 0} metrics for this reporting window.`
      })],
      ['complianceReview', ({ documentText = '' }) => {
        const lower = documentText.toLowerCase();
        const findings = [];
        if (/ssn|passport|credit card/.test(lower)) findings.push('sensitive_personal_data');
        if (/transfer to external vendor/.test(lower)) findings.push('third_party_transfer');
        return {
          findings,
          requiresHumanApproval: findings.length > 0,
          reason: findings.length > 0 ? 'Human approval required before notifying external parties.' : null
        };
      }],
      ['emailNotifier', (payload, context) => {
        if (context.complianceReview?.requiresHumanApproval) {
          return {
            queued: false,
            requiresHumanApproval: true,
            reason: 'Compliance findings require human approval before external notifications.'
          };
        }
        return {
          queued: true,
          requiresHumanApproval: false
        };
      }]
    ]);
  }

  execute(toolName, payload, context) {
    const tool = this.tools.get(toolName);
    if (!tool) {
      throw new Error(`Unknown tool: ${toolName}`);
    }
    return tool(payload, context);
  }
}

export class AutomationPlatform {
  constructor(workflows) {
    this.workflows = new Map(workflows.map((workflow) => [workflow.id, workflow]));
    this.registry = new ToolRegistry();
  }

  listWorkflows() {
    return Array.from(this.workflows.values()).map((workflow) => ({ id: workflow.id, name: workflow.name, steps: workflow.steps.length }));
  }

  async runWorkflow(workflowId, payload) {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error('Workflow not found');
    }

    const context = {};
    const steps = [];
    for (const step of workflow.steps) {
      const result = this.registry.execute(step.tool, payload, context);
      context[step.tool] = result;
      steps.push({
        stepId: step.id,
        tool: step.tool,
        result
      });

      if (result.requiresHumanApproval) {
        return {
          workflowId,
          status: 'awaiting_human_approval',
          steps,
          finalOutput: result
        };
      }
    }

    return {
      workflowId,
      status: 'completed',
      steps,
      finalOutput: steps.at(-1)?.result || null
    };
  }
}

export async function createAutomationPlatform() {
  const workflows = await loadWorkflows();
  return new AutomationPlatform(workflows);
}