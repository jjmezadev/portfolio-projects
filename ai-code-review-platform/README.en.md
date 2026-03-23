# AI Code Review Platform

Platform to analyze pull requests and repositories with LLMs, static rules, and repository context in order to detect bugs, security issues, performance risks, and technical debt before merge.

## Problem

Manual code review is slow, inconsistent, and often misses security, maintainability, or performance issues. Teams need earlier and more actionable feedback without adding heavy process overhead.

## Value proposition

- Automatic PR comments with severity and concrete suggestions.
- Detection across security, performance, testing, and architecture categories.
- Integration with GitHub, GitLab, and CI pipelines.
- Enterprise mode with repository policies and full traceability.

## High-level architecture

- Diff ingestion plus surrounding file context.
- Hybrid analyzer using rules, AST signals, and specialized LLM prompts.
- Scoring engine for severity and confidence.
- Comment generation, executive summary, and merge checklist.

## Key deliverables

- Pull request analysis engine with configurable categories.
- Comment and summary checks integration.
- Quality dashboard by team and repository.
- Evaluation suite with synthetic PRs and anonymized historical samples.

## Roadmap

### Discovery

- Map current review flows, supported languages, and policy requirements.

### Prototype

- Process diffs, produce findings, and validate precision on historical PRs.

### Implementation

- Add CI enforcement, feedback learning, and organization-wide governance.

### Handover

- Provide operating guide, policy examples, and adoption dashboard.

## Status in this repository

Implemented in this repository as a runnable MVP with core logic in `src/`, demo fixtures, automated tests, OpenAPI, operations runbook, and Docker deployment.