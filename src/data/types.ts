/** Modelo de dominio Cygnus Next — tipos canónicos de la aplicación. */

export type EstadoAsociado = 'Activo' | 'Inactivo'
export type EstadoCredito = 'AL DIA' | 'VIGENTE' | 'MORA' | 'DESEMBOLSAR'
export type EstadoAporte = 'ACTIVO' | 'INACTIVO'
export type EstadoDevolucion = 'PROCESADA' | 'PENDIENTE' | 'RECHAZADA'

export interface Asociado {
  id: number
  nombre: string
  cedula: string
  empresa: string
  clienteDesde: string
  estado: EstadoAsociado
  sueldo: number
  ciudad: string
  direccion: string
  telefono: string
  email: string
  fechaNacimiento: string
  profesion: string
  score: number
  cupoRotativo: number
}

export interface Credito {
  radicacion: string
  linea: string
  saldo: number
  cuota: number
  plazo: number
  estado: EstadoCredito
  asociadoId: number
  montoAprobado: number
  tasa: number
  formaPago: string
  periodicidad: string
  vencimiento: string
}

export interface Aporte {
  numero: string
  tipo: string
  saldo: number
  estado: EstadoAporte
  asociadoId: number
}

export interface Deposito {
  numero: string
  tipo: string
  saldo: number
  tasa: string
  vencimiento: string
  asociadoId: number
}

export interface Devolucion {
  concepto: string
  fecha: string
  valor: number
  estado: EstadoDevolucion
  asociadoId: number
}

export interface Empresa {
  nit: string
  razonSocial: string
  direccion: string
  ciudad: string
  telefono: string
  correo: string
  sector: string
  representanteLegal: string
  numEmpleados: number
}

export interface ListaNomina {
  fecha: string
  num: string
  tipo: string
  total: number
  asoc: number
  est: string
}

export interface Comprobante {
  fecha: string
  num: string
  concepto: string
  debito: number
  credito: number
}

export interface Giro {
  fecha: string
  concepto: string
  valor: number
  dest: string
  est: string
}

export interface Novedad {
  fecha: string
  prod: string
  campo: string
  ant: string
  nue: string
  usr: string
}

/** Asociado enriquecido con agregaciones de sus productos (flatten del original). */
export interface AsociadoEnriquecido extends Asociado {
  totalDeuda: number
  lineasCredito: string
  estadosCredito: string
  totalAportes: number
  tiposAportes: string
  totalDepositos: number
  tiposDepositos: string
  totalDevoluciones: number
}

/** Métricas del score financiero derivadas del score numérico. */
export type SaludFinanciera = 'Excelente' | 'Regular' | 'Riesgo'

export function saludFinanciera(score: number): SaludFinanciera {
  if (score >= 80) return 'Excelente'
  if (score >= 60) return 'Regular'
  return 'Riesgo'
}