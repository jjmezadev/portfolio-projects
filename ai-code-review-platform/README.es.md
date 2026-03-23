# Plataforma de Code Review con IA

Plataforma para analizar pull requests y repositorios con LLMs, reglas estaticas y contexto del codigo para detectar bugs, vulnerabilidades, problemas de performance y deuda tecnica antes del merge.

## Problema

Los code reviews manuales son lentos, inconsistentes y no siempre capturan riesgos de seguridad, mantenibilidad o performance. Los equipos necesitan feedback temprano y accionable sin friccion adicional.

## Propuesta de valor

- Comentarios automaticos por PR con severidad y sugerencia concreta.
- Deteccion de issues de seguridad, performance, testing y estilo arquitectonico.
- Integracion con GitHub, GitLab y CI.
- Modo enterprise con politicas por repositorio y trazabilidad.

## Arquitectura resumida

- Ingestion de diffs y contexto de archivos relacionados.
- Analizador hibrido con reglas, AST y LLM prompts especializados.
- Motor de scoring por severidad y confianza.
- Generacion de comentarios, summary ejecutivo y checklist de merge.

## Entregables clave

- Motor de analisis de PRs con categorias configurables.
- Integracion de comentarios y summary checks.
- Dashboard de calidad por equipo y repositorio.
- Suite de evaluacion con PRs sinteticos y casos reales anonimizados.

## Roadmap

### Diagnostico

- Mapear flujo actual de revision, lenguajes soportados y politicas.

### Prototipo

- Procesar diffs, generar findings y validar precision sobre PRs historicos.

### Implementacion

- Enforce en CI, aprendizaje por feedback y governance por organizacion.

### Transferencia

- Manual operativo, ejemplos de politicas y tablero de adopcion.

## Estado en este repo

Proyecto implementado en este repo como MVP ejecutable con logica en `src/`, fixtures de demo, pruebas automaticas, OpenAPI, runbook operativo y despliegue Docker.