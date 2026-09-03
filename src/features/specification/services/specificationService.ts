import type {
  SpecificationPackage,
  SpecificationEntity,
  HistoricalRecord,
  ValidationCriterion,
  ValidationResult,
  SpecificationVersion,
  SpecificationStats,
  SpecificationAuditTrail,
} from '../types'

import {
  SPECIFICATION_PACKAGE,
  SPECIFICATION_ENTITIES,
  HISTORICAL_RECORDS,
  VALIDATION_CRITERIA,
  VALIDATION_RESULTS,
  SPECIFICATION_VERSIONS,
} from '../mockData'

/**
 * Servicio del paquete de especificación con contexto histórico rico.
 * Simula latencia de red y devuelve datos del catálogo de especificación.
 * TODO: Reemplazar por llamadas HTTP al backend cuando se implementen
 * los endpoints del módulo de especificación.
 */
class SpecificationService {
  private package: SpecificationPackage = { ...SPECIFICATION_PACKAGE }
  private entities: SpecificationEntity[] = [...SPECIFICATION_ENTITIES]
  private history: HistoricalRecord[] = [...HISTORICAL_RECORDS]
  private criteria: ValidationCriterion[] = [...VALIDATION_CRITERIA]
  private results: ValidationResult[] = [...VALIDATION_RESULTS]
  private versions: SpecificationVersion[] = [...SPECIFICATION_VERSIONS]

  // ── Lecturas ────────────────────────────────────────────────────────────

  async obtenerPaquete(): Promise<SpecificationPackage> {
    await this.delay(200)
    return this.package
  }

  async listarEntidades(): Promise<SpecificationEntity[]> {
    await this.delay(250)
    return this.entities
  }

  async obtenerEntidadPorId(id: string): Promise<SpecificationEntity | undefined> {
    await this.delay(150)
    return this.entities.find((e) => e.id === id)
  }

  async listarHistorial(): Promise<HistoricalRecord[]> {
    await this.delay(200)
    return this.history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  async listarHistorialPorEntidad(entityId: string): Promise<HistoricalRecord[]> {
    await this.delay(150)
    return this.history
      .filter((h) => h.entityId === entityId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  async listarCriterios(): Promise<ValidationCriterion[]> {
    await this.delay(200)
    return this.criteria
  }

  async listarResultados(): Promise<ValidationResult[]> {
    await this.delay(250)
    return this.results
  }

  async listarVersiones(): Promise<SpecificationVersion[]> {
    await this.delay(200)
    return this.versions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  // ── Estadísticas ────────────────────────────────────────────────────────

  async obtenerEstadisticas(): Promise<SpecificationStats> {
    await this.delay(150)
    const validatedEntities = this.entities.filter((e) => e.status === 'VALIDADO').length
    const pendingEntities = this.entities.filter((e) => e.status === 'PENDIENTE').length
    const passedCriteria = this.results.filter((r) => r.passed).length
    const failedCriteria = this.results.filter((r) => !r.passed).length
    const lastValidation = this.results.length > 0
      ? this.results.reduce((latest, r) => new Date(r.timestamp) > new Date(latest.timestamp) ? r : latest).timestamp
      : new Date().toISOString()

    return {
      totalEntities: this.entities.length,
      validatedEntities,
      pendingEntities,
      totalCriteria: this.criteria.length,
      passedCriteria,
      failedCriteria,
      totalHistoricalRecords: this.history.length,
      lastValidationDate: lastValidation,
    }
  }

  // ── Auditoría ───────────────────────────────────────────────────────────

  async obtenerAuditoriaEntidad(entityId: string): Promise<SpecificationAuditTrail> {
    await this.delay(200)
    const entityHistory = this.history.filter((h) => h.entityId === entityId)
    const lastModified = entityHistory.length > 0
      ? entityHistory.reduce((latest, h) => new Date(h.timestamp) > new Date(latest.timestamp) ? h : latest).timestamp
      : new Date().toISOString()

    return {
      entityId,
      records: entityHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
      totalChanges: entityHistory.length,
      lastModified,
    }
  }

  // ── Utilidades ──────────────────────────────────────────────────────────

  /** Obtiene el conteo de atributos por entidad. */
  obtenerConteoAtributos(entityId: string): number {
    const entity = this.entities.find((e) => e.id === entityId)
    return entity ? entity.attributes.length : 0
  }

  /** Obtiene el conteo de relaciones por entidad. */
  obtenerConteoRelaciones(entityId: string): number {
    const entity = this.entities.find((e) => e.id === entityId)
    return entity ? entity.relationships.length : 0
  }

  /** Obtiene el conteo de restricciones por entidad. */
  obtenerConteoRestricciones(entityId: string): number {
    const entity = this.entities.find((e) => e.id === entityId)
    return entity ? entity.constraints.length : 0
  }

  /** Verifica si una entidad tiene contexto histórico completo. */
  verificarContextoHistorico(entityId: string): boolean {
    const entity = this.entities.find((e) => e.id === entityId)
    if (!entity) return false
    const hasAuditFields = entity.attributes.some((a) => a.name === 'created_at') &&
      entity.attributes.some((a) => a.name === 'updated_at')
    const hasHistory = this.history.some((h) => h.entityId === entityId)
    return hasAuditFields && hasHistory
  }

  /** Calcula el porcentaje de cumplimiento por criterio. */
  calcularCumplimientoPorCriterio(): Array<{ criterio: ValidationCriterion; cumplimiento: number }> {
    return this.criteria.map((criterio) => {
      const result = this.results.find((r) => r.criterionId === criterio.id)
      const cumplimiento = result ? (result.passed ? 100 : 0) : 0
      return { criterio, cumplimiento }
    })
  }

  /** Obtiene un resumen de las validaciones fallidas. */
  obtenerResumenFallos(): Array<{ criterio: string; mensaje: string; detalles: string[] }> {
    return this.results
      .filter((r) => !r.passed)
      .map((r) => {
        const criterio = this.criteria.find((c) => c.id === r.criterionId)
        return {
          criterio: criterio?.name || `C${r.criterionId}`,
          mensaje: r.message,
          detalles: r.details,
        }
      })
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export const specificationService = new SpecificationService()
