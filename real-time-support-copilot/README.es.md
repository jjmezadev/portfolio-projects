# Copiloto de Soporte en Tiempo Real

Copiloto para operaciones de customer support que asiste a agentes humanos con contexto del cliente, busqueda semantica, sugerencias de respuesta y proximas acciones durante conversaciones en vivo.

## Problema

Los agentes de soporte pierden tiempo buscando informacion dispersa entre CRM, base de conocimiento, tickets previos y politicas internas. Esto eleva el AHT, reduce la consistencia y afecta la satisfaccion del cliente.

## Propuesta de valor

- Respuestas sugeridas con contexto unificado por cliente.
- Acciones recomendadas y siguientes pasos segun la intencion.
- Soporte omnicanal para chat, email y voz.
- Control de calidad, compliance y human-in-the-loop.

## Arquitectura resumida

- Conectores a CRM, helpdesk, billing y knowledge base.
- RAG para recuperar articulos, tickets y politicas relevantes.
- Orquestador de prompts con guardrails y tono configurado.
- UI lateral para agentes con resumen, acciones y redactado asistido.

## Entregables clave

- Timeline unificado del cliente.
- Motor de sugerencias en tiempo real.
- Quality score de respuestas y handoff guidelines.
- Evaluacion offline de exactitud, utilidad y tiempo ahorrado.

## Roadmap

### Diagnostico

- Priorizar canales, intents y sistemas fuente.

### Prototipo

- Construir retrieval, resumen contextual y draft suggestions.

### Implementacion

- Integrar con desktop de agentes, telemetria y politicas.

### Transferencia

- Guia de adopcion, prompts versionados y tablero operacional.

## Estado en este repo

Proyecto implementado en este repo como MVP ejecutable con logica en `src/`, fixtures de demo, pruebas automaticas, OpenAPI, runbook operativo y despliegue Docker.