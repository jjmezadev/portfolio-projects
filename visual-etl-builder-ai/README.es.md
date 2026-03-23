# Constructor Visual de ETL con IA

Plataforma visual para disenar pipelines ETL/ELT mediante drag and drop, generacion asistida de SQL o transformaciones y monitoreo operacional desde una sola interfaz.

## Problema

Muchos equipos de datos dependen de notebooks, SQL disperso y pipelines fragiles sin gobierno centralizado. Crear y mantener transformaciones complejas exige conocimiento tecnico alto y ralentiza la entrega.

## Propuesta de valor

- Diseno visual de pipelines para perfiles tecnicos y semitecnicos.
- Generacion de SQL y transformaciones mediante IA.
- Versionado, testing y observabilidad integrados.
- Publicacion a motores como dbt, Spark o warehouses cloud.

## Arquitectura resumida

- Editor DAG visual con nodos de fuentes, joins, filtros y destinos.
- Copiloto IA para describir transformaciones en lenguaje natural.
- Compilador a SQL, Python o manifests de orquestacion.
- Observabilidad de ejecucion, linaje y calidad de datos.

## Entregables clave

- Editor visual y metamodelo de pipelines.
- Generador de SQL confiable con validaciones.
- Integracion inicial con warehouse y scheduler.
- Demo end to end con dataset realista.

## Roadmap

### Diagnostico

- Definir motores objetivo, perfiles de usuario y casos de uso.

### Prototipo

- Construir editor base y compilacion a SQL.

### Implementacion

- Agregar AI copilot, testing, deployment y monitoreo.

### Transferencia

- Guia de extensibilidad, plantillas y patrones recomendados.

## Estado en este repo

Proyecto implementado en este repo como MVP ejecutable con logica en `src/`, fixtures de demo, pruebas automaticas, OpenAPI, runbook operativo y despliegue Docker.