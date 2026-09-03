// Tipos para el módulo de Validación del Modelo Canónico
// Basado en los 10 criterios de revisión humana de la especificación

export type Severidad = 'ERROR' | 'ADVERTENCIA' | 'OK'

export interface ReglaValidacion {
  id: string
  criterio: number
  nombre: string
  descripcion: string
  severidad: Severidad
  detalles: string[]
}

export interface ResultadoValidacion {
  id: string
  nombre: string
  criterio: number
  severidad: Severidad
  passed: boolean
  failedChecks: string[]
  checkedCount: number
  passedCount: number
}

export interface ReporteValidacion {
  timestamp: string
  totalReglas: number
  exitosas: number
  advertencias: number
  errores: number
  resultados: ResultadoValidacion[]
}
