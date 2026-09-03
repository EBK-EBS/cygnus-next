// Specification Package — Tipos TypeScript con contexto histórico rico
// Paquete de especificación para validación del modelo E/R canónico CACSA

// ── Enums / Tipos auxiliares ──────────────────────────────────────────────

export type SpecificationStatus = 'VALIDADO' | 'PENDIENTE' | 'OBSERVADO' | 'RECHAZADO'
export type HistoricalAction = 'CREACION' | 'MODIFICACION' | 'VALIDACION' | 'APROBACION' | 'RECHAZO'
export type CriterionSeverity = 'CRITICO' | 'ALTO' | 'MEDIO' | 'BAJO'
export type ValidationScope = 'ESTRUCTURA' | 'DATOS' | 'REGLAS' | 'INTEGRIDAD' | 'HISTORICO'

// ── Entidades del paquete de especificación ────────────────────────────────

export interface SpecificationEntity {
  id: string
  name: string
  tableName: string
  description: string
  attributes: EntityAttribute[]
  relationships: EntityRelationship[]
  constraints: EntityConstraint[]
  status: SpecificationStatus
  lastValidated: string
  validatedBy: string
}

export interface EntityAttribute {
  name: string
  type: string
  nullable: boolean
  isPrimaryKey: boolean
  isForeignKey: boolean
  foreignTable?: string
  description: string
}

export interface EntityRelationship {
  targetEntity: string
  type: '1:N' | 'N:1' | '1:1' | 'N:N'
  foreignKey: string
  description: string
}

export interface EntityConstraint {
  type: 'PK' | 'FK' | 'UK' | 'CHECK' | 'INDEX'
  name: string
  columns: string[]
  definition?: string
}

// ── Contexto histórico ────────────────────────────────────────────────────

export interface HistoricalRecord {
  id: string
  entityId: string
  action: HistoricalAction
  timestamp: string
  userId: string
  userName: string
  details: string
  previousValues?: Record<string, unknown>
  newValues?: Record<string, unknown>
}

export interface SpecificationVersion {
  version: string
  date: string
  author: string
  changes: string[]
  status: SpecificationStatus
}

export interface ValidationCriterion {
  id: number
  name: string
  description: string
  scope: ValidationScope
  severity: CriterionSeverity
  isRequired: boolean
}

export interface ValidationResult {
  criterionId: number
  passed: boolean
  severity: CriterionSeverity
  message: string
  details: string[]
  timestamp: string
}

export interface SpecificationAuditTrail {
  entityId: string
  records: HistoricalRecord[]
  totalChanges: number
  lastModified: string
}

// ── Paquete de especificación completo ─────────────────────────────────────

export interface SpecificationPackage {
  id: string
  name: string
  version: string
  description: string
  entities: SpecificationEntity[]
  criteria: ValidationCriterion[]
  results: ValidationResult[]
  history: HistoricalRecord[]
  versions: SpecificationVersion[]
  createdAt: string
  updatedAt: string
  createdBy: string
  status: SpecificationStatus
}

// ── Tipos derivados para la UI ────────────────────────────────────────────

export interface SpecificationStats {
  totalEntities: number
  validatedEntities: number
  pendingEntities: number
  totalCriteria: number
  passedCriteria: number
  failedCriteria: number
  totalHistoricalRecords: number
  lastValidationDate: string
}

export type SpecificationTab = 
  | 'resumen' 
  | 'entidades' 
  | 'criterios' 
  | 'historial' 
  | 'versiones'
