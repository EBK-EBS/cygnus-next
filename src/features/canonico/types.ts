// Modelo Canónico Transversal CACSA — Tipos TypeScript
// Generado a partir de la especificación ER 3FN

// ── Enums / Tipos auxiliares ──────────────────────────────────────────────

export type TenantEstado = 'ACTIVO' | 'INACTIVO'
export type PersonaEstado = 'ACTIVO' | 'INACTIVO' | 'PENDIENTE'
export type PersonaTipo = 'NATURAL' | 'JURIDICA'
export type ProductoEstado = 'ABIERTO' | 'CERRADO' | 'SUSPENDIDO'
export type HolderRole = 'TITULAR' | 'CO_TITULAR' | 'AVAL' | 'GARANTE' | 'APODERADO'
export type MovimientoNaturaleza = 'DEBITO' | 'CREDITO'
export type VoucherTipo = 'INGRESO' | 'EGRESO' | 'TRASPASO' | 'AJUSTE'
export type VoucherEstado = 'BORRADOR' | 'APROBADO' | 'ANULADO' | 'CONTABILIZADO'
export type TransactionEstado = 'PENDIENTE' | 'COMPLETADA' | 'REVERTIDA' | 'ANULADA'
export type BalanceTipo = 'DISPONIBLE' | 'CONTABLE' | 'DISPONIBLE_MA' | 'CONTABLE_MA'

// ── Entidades del modelo canónico ─────────────────────────────────────────

export interface Tenant {
  id: number
  codigo: string
  nombre: string
  estado: TenantEstado
}

export interface BusinessPerson {
  id: number
  tenantId: number
  sourceSystem: string
  sourcePersonCode: string
  identificationNumber: string
  personType: PersonaTipo
  legalName: string
  tradeName: string
  email: string
  phone: string
  address: string
  status: PersonaEstado
  createdAt: string
  updatedAt: string
}

export interface ProductType {
  id: number
  tenantId: number
  family: string
  code: string
  name: string
  sourceTypeCode: string
  sourceLineCode: string
  active: boolean
}

export interface BusinessProduct {
  id: number
  tenantId: number
  productTypeId: number
  primaryPersonId: number
  productNumber: string
  sourceProductId: string
  openDate: string
  closeDate: string | null
  currencyCode: string
  status: ProductoEstado
}

export interface ProductHolder {
  id: number
  tenantId: number
  productId: number
  personId: number
  holderRole: HolderRole
  startDate: string
  endDate: string | null
  isPrimary: boolean
}

export interface TransactionType {
  id: number
  tenantId: number
  sourceTransactionTypeCode: string
  code: string
  name: string
  movementNature: MovimientoNaturaleza
  active: boolean
}

export interface Voucher {
  id: number
  tenantId: number
  voucherType: VoucherTipo
  voucherNumber: string
  sourceVoucherId: string
  voucherDate: string
  status: VoucherEstado
  createdAt: string
}

export interface VoucherLine {
  id: number
  tenantId: number
  voucherId: number
  lineNumber: number
  accountCode: string
  debitAmount: number
  creditAmount: number
  description: string
}

export interface Transaction {
  id: number
  tenantId: number
  voucherId: number
  operationNumber: string
  sourceOperationId: string
  transactionDate: string
  reversalOfTransactionId: number | null
  status: TransactionEstado
}

export interface TransactionEntry {
  id: number
  tenantId: number
  transactionId: number
  transactionTypeId: number
  productId: number
  personId: number
  amount: number
  entryDate: string
  sourceEntryId: string
}

export interface Balance {
  id: number
  tenantId: number
  productId: number
  balanceDate: string
  balanceType: BalanceTipo
  amount: number
}

// ── Tipos derivados para la UI ────────────────────────────────────────────

export interface CanonicoStats {
  totalTenants: number
  totalPersonas: number
  totalTiposProducto: number
  totalProductos: number
  totalTitulares: number
  totalTiposTransaccion: number
  totalComprobantes: number
  totalLineasComprobante: number
  totalTransacciones: number
  totalMovimientos: number
  totalSaldos: number
}

export type EntidadCanonica =
  | 'tenant'
  | 'business_person'
  | 'product_type'
  | 'business_product'
  | 'product_holder'
  | 'transaction_type'
  | 'voucher'
  | 'voucher_line'
  | 'transaction'
  | 'transaction_entry'
  | 'balance'
