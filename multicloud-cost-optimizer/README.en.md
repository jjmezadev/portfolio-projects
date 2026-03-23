# Multi-Cloud Cost Optimizer

Platform to consolidate AWS, Azure, and GCP spend, detect waste, recommend prioritized actions, and translate technical optimization opportunities into business and finance language.

## Problem

Multi-cloud organizations often lack a unified view of waste, idle capacity, overprovisioning, and unused commitments. Cost interpretation is slow, and optimization actions arrive too late.

## Value proposition

- Unified cost, usage, and efficiency view across accounts and teams.
- Actionable recommendations with savings estimate and implementation effort.
- Business-language explanations for non-technical stakeholders.
- Scenario simulation before executing changes.

## High-level architecture

- Ingestion of billing exports, CURs, and cloud APIs.
- Cost normalization and tagging model.
- Recommendation engine for rightsizing, idle resources, and commitment optimization.
- FinOps dashboard and AI assistant for ad hoc questions.

## Key deliverables

- Lakehouse or warehouse of normalized cost data.
- Optimization rules and alerts library.
- Ranked opportunity backlog with impact, owner, and ETA.
- Weekly executive report for business and operations.

## Roadmap

### Discovery

- Identify accounts, tagging gaps, and FinOps objectives.

### Prototype

- Consolidate spend and produce the first opportunity ranking.

### Implementation

- Automate recommendations, alerts, and what-if simulations.

### Handover

- Deliver FinOps runbooks, ownership matrix, and tracking dashboards.

## Status in this repository

Implemented in this repository as a runnable MVP with core logic in `src/`, demo fixtures, automated tests, OpenAPI, operations runbook, and Docker deployment.