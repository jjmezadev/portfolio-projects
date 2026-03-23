# Motor de Deteccion de Fraude en Tiempo Real

Motor orientado a pagos, fintech y e-commerce para evaluar transacciones en tiempo real con reglas, deteccion estadistica, perfiles de comportamiento y explicaciones asistidas por LLM.

## Problema

Las transacciones fraudulentas generan perdidas millonarias y los motores basados solo en reglas estaticas producen demasiados falsos positivos. Se necesita una deteccion explicable con latencia sub-500ms y capacidad de adaptarse a nuevos patrones.

## Propuesta de valor

- Decision en menos de 500 ms por transaccion.
- Combinacion de reglas, ML y explicabilidad asincrona con IA.
- Dashboard de analista con cola de revision y tuning de reglas.
- Feedback loop para mejorar precision y reducir falsos positivos.

## Arquitectura resumida

- Ingestion via Pub/Sub o Kafka.
- Rules engine para velocity, blocklists, geografia imposible y montos anormales.
- Modelo de anomalias para comportamiento y riesgo contextual.
- LLM asincrono para explicar por que una transaccion fue marcada.
- Dashboard operativo y audit trail completo.

## Entregables clave

- Dataset sintetico con fraude etiquetado.
- 8 o mas reglas de fraude listas para backtesting.
- Pipeline de decision y review queue.
- Benchmarks de precision, recall, latencia y throughput.

## Roadmap

### Diagnostico

- Definir patrones de fraude, SLAs y estrategia de evaluacion.

### Prototipo

- Construir rules engine, streaming y baseline de anomalias.

### Implementacion

- Escalado a 1000+ txns/seg, encryption, audit trail y shadow mode.

### Transferencia

- ADRs, runbooks, guia de backtesting y demo completa.

## Estado en este repo

Proyecto implementado en este repo como MVP ejecutable con logica en `src/`, fixtures de demo, pruebas automaticas, OpenAPI, runbook operativo y despliegue Docker.