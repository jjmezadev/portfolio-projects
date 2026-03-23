# Real-Time Fraud Detection Engine

Project focused on payments, fintech, and e-commerce scenarios to score transactions in real time using rules, anomaly detection, behavioral profiling, and asynchronous LLM explanations.

## Problem

Fraud creates direct revenue loss, chargebacks, and operational drag. Static rule engines alone generate too many false positives, while opaque ML models are hard to trust without clear analyst workflows and traceability.

## Value proposition

- Sub-500ms decisioning per transaction.
- Hybrid rules plus ML approach with explainability.
- Analyst dashboard with review queue and rule tuning.
- Feedback loop to improve precision and reduce false positives.

## High-level architecture

- Streaming ingestion through Kafka or Pub/Sub.
- Rules engine for velocity, blocklists, impossible travel, and amount spikes.
- Anomaly scoring for contextual and behavioral risk.
- Asynchronous LLM layer to explain flagged transactions.
- Audit trail and operational dashboard.

## Key deliverables

- Synthetic fraud-labeled dataset.
- Backtesting-ready rules catalog.
- Real-time decision pipeline and analyst queue.
- Metrics for precision, recall, latency, and throughput.

## Roadmap

### Discovery

- Define fraud patterns, SLAs, and evaluation design.

### Prototype

- Build rules engine, streaming layer, and anomaly baseline.

### Implementation

- Scale to 1000+ tx/sec, add encryption, audit trail, and shadow mode.

### Handover

- Provide ADRs, runbooks, backtesting guide, and live demo.

## Status in this repository

Implemented in this repository as a runnable MVP with core logic in `src/`, demo fixtures, automated tests, OpenAPI, operations runbook, and Docker deployment.