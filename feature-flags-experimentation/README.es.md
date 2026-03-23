# Plataforma de Feature Flags y Experimentacion

Sistema para controlar releases progresivos, segmentar funcionalidades, ejecutar pruebas A/B y medir impacto de producto con gobierno centralizado.

## Problema

Lanzar cambios sin mecanismos de rollout, segmentacion o experimentacion aumenta el riesgo operativo y limita la capacidad de aprender rapido. Muchos equipos manejan flags de forma ad hoc y sin trazabilidad.

## Propuesta de valor

- Rollouts seguros por porcentaje, segmento o region.
- Experimentos A/B con metricas y analisis estadistico.
- Kill switch centralizado y auditoria completa.
- SDKs y consola unica para producto e ingenieria.

## Arquitectura resumida

- Control plane para definicion de flags y targeting.
- Evaluation engine de baja latencia con cache y edge delivery.
- Event pipeline para exposicion, conversion y metricas.
- Consola con resultados, recomendaciones y governance.

## Entregables clave

- Servicio de configuracion y evaluacion.
- SDK inicial para frontend o backend.
- Dashboard de experimentacion con significance tracking.
- Politicas de lifecycle y limpieza de flags.

## Roadmap

### Diagnostico

- Revisar proceso actual de releases y metricas clave.

### Prototipo

- Implementar flags basicos, targeting y telemetria.

### Implementacion

- Añadir experimentacion estadistica, approvals y edge support.

### Transferencia

- Playbooks de rollout, taxonomia de flags y ownership.

## Estado en este repo

Proyecto implementado en este repo como MVP ejecutable con logica en `src/`, fixtures de demo, pruebas automaticas, OpenAPI, runbook operativo y despliegue Docker.