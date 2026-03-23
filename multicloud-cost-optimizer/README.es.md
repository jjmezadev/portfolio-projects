# Optimizador de Costos Multi-Cloud

Plataforma para consolidar costos de AWS, Azure y GCP, detectar desperdicio, recomendar acciones priorizadas y traducir hallazgos tecnicos a impacto financiero para ingenieria y finanzas.

## Problema

Las organizaciones multi-cloud suelen perder visibilidad sobre gasto, capacidad ociosa, sobreaprovisionamiento y compromisos desaprovechados. El costo real tarda en interpretarse y las acciones llegan tarde.

## Propuesta de valor

- Vista unificada de costo, uso y eficiencia por cuenta, equipo y servicio.
- Recomendaciones accionables con ahorro estimado y complejidad.
- Explicaciones en lenguaje de negocio para stakeholders no tecnicos.
- Simulacion de escenarios antes de ejecutar cambios.

## Arquitectura resumida

- Ingesta de billing exports, CURs y APIs cloud.
- Normalizacion de costos y tagging en un modelo comun.
- Motor de recomendaciones para rightsizing, idle resources y savings plans.
- Dashboard con KPIs FinOps y agente IA para preguntas ad hoc.

## Entregables clave

- Lakehouse o warehouse de costos normalizados.
- Libreria de reglas de optimizacion y alertas.
- Ranking de oportunidades con impacto, owner y ETA.
- Reporte ejecutivo semanal para negocio y operaciones.

## Roadmap

### Diagnostico

- Identificar cuentas, tagging gaps y objetivos FinOps.

### Prototipo

- Consolidar gasto y generar top oportunidades iniciales.

### Implementacion

- Automatizar recomendaciones, alertas y simulaciones.

### Transferencia

- Runbooks FinOps, ownership matrix y panel de seguimiento.

## Estado en este repo

Proyecto implementado en este repo como MVP ejecutable con logica en `src/`, fixtures de demo, pruebas automaticas, OpenAPI, runbook operativo y despliegue Docker.