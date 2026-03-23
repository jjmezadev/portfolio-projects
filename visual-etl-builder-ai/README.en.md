# Visual ETL Builder AI

Visual platform to design ETL or ELT pipelines with drag-and-drop interactions, AI-assisted SQL or transformation generation, and operational monitoring from a single interface.

## Problem

Many data teams still depend on scattered notebooks, fragile SQL scripts, and ad hoc pipelines with limited governance. Building and maintaining complex transformations requires deep technical expertise and slows delivery.

## Value proposition

- Visual pipeline authoring for technical and semi-technical users.
- AI-assisted SQL and transformation generation.
- Integrated versioning, testing, and observability.
- Deployment to dbt, Spark, or cloud warehouse targets.

## High-level architecture

- Visual DAG editor with source, join, filter, and destination nodes.
- AI copilot to translate natural language into transformations.
- Compiler to SQL, Python, or orchestration manifests.
- Execution observability, lineage, and data quality views.

## Key deliverables

- Visual editor and pipeline metamodel.
- Reliable SQL generation with validations.
- Initial warehouse and scheduler integration.
- End-to-end demo on a realistic dataset.

## Roadmap

### Discovery

- Define target engines, user profiles, and primary use cases.

### Prototype

- Build the base editor and SQL compilation path.

### Implementation

- Add AI copilot, testing, deployment, and monitoring.

### Handover

- Provide extensibility guide, templates, and recommended patterns.

## Status in this repository

Implemented in this repository as a runnable MVP with core logic in `src/`, demo fixtures, automated tests, OpenAPI, operations runbook, and Docker deployment.