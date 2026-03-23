# Plataforma de Compliance y Auditoria Automatizada

Plataforma para centralizar controles, evidencia, evaluaciones y trazabilidad de compliance en marcos como ISO 27001, SOC 2, GDPR o PCI-DSS con automatizacion continua.

## Problema

La evidencia de cumplimiento suele estar dispersa en hojas de calculo, tickets, logs y documentos manuales. Las auditorias consumen semanas y es dificil sostener monitoreo continuo entre ciclos formales.

## Propuesta de valor

- Evidencia automatizada desde sistemas cloud, IAM, CI/CD y ticketing.
- Mapeo entre controles, owners y activos evaluados.
- Gap analysis continuo con alertas y plan de remediacion.
- Portal de auditoria con evidencia exportable y trazable.

## Arquitectura resumida

- Catalogo de controles y frameworks.
- Conectores para recolectar evidencia tecnica y procedimental.
- Motor de scoring de cumplimiento y vencimientos.
- Dashboard para auditores, risk owners y seguridad.

## Entregables clave

- Modelo de datos de controles, evidencias y excepciones.
- Libreria inicial de conectores y checks automatizados.
- Workflow de remediacion y aprobacion de excepciones.
- Paquetes exportables para auditorias.

## Roadmap

### Diagnostico

- Seleccionar frameworks, alcances y fuentes de evidencia.

### Prototipo

- Automatizar una porcion critica de controles y generar scorecards.

### Implementacion

- Expandir conectores, ownership y continuous monitoring.

### Transferencia

- Manual de auditoria, governance y operacion continua.

## Estado en este repo

Proyecto implementado en este repo como MVP ejecutable con logica en `src/`, fixtures de demo, pruebas automaticas, OpenAPI, runbook operativo y despliegue Docker.