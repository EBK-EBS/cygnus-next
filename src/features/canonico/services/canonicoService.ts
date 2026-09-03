import type {
  Tenant,
  BusinessPerson,
  ProductType,
  BusinessProduct,
  ProductHolder,
  TransactionType,
  Voucher,
  VoucherLine,
  Transaction,
  TransactionEntry,
  Balance,
  CanonicoStats,
} from '../types'

import {
  TENANTS,
  BUSINESS_PERSONS,
  PRODUCT_TYPES,
  BUSINESS_PRODUCTS,
  PRODUCT_HOLDERS,
  TRANSACTION_TYPES,
  VOUCHERS,
  VOUCHER_LINES,
  TRANSACTIONS,
  TRANSACTION_ENTRIES,
  BALANCES,
} from '../mockData'

/**
 * Servicio mock del modelo canónico transversal.
 * Simula latencia de red y devuelve datos del catálogo mock.
 * TODO: Reemplazar por llamadas HTTP al backend cuando se implementen
 * los endpoints del módulo canónico (TENANT, BUSINESS_PERSON, etc.).
 */
class CanonicoService {
  private tenants: Tenant[] = [...TENANTS]
  private personas: BusinessPerson[] = [...BUSINESS_PERSONS]
  private tiposProducto: ProductType[] = [...PRODUCT_TYPES]
  private productos: BusinessProduct[] = [...BUSINESS_PRODUCTS]
  private titulares: ProductHolder[] = [...PRODUCT_HOLDERS]
  private tiposTransaccion: TransactionType[] = [...TRANSACTION_TYPES]
  private comprobantes: Voucher[] = [...VOUCHERS]
  private lineasComprobante: VoucherLine[] = [...VOUCHER_LINES]
  private transacciones: Transaction[] = [...TRANSACTIONS]
  private movimientos: TransactionEntry[] = [...TRANSACTION_ENTRIES]
  private saldos: Balance[] = [...BALANCES]

  // ── Lecturas ────────────────────────────────────────────────────────────

  async listarTenants(): Promise<Tenant[]> {
    await this.delay(200)
    return this.tenants
  }

  async listarPersonas(tenantId?: number): Promise<BusinessPerson[]> {
    await this.delay(250)
    return tenantId ? this.personas.filter((p) => p.tenantId === tenantId) : this.personas
  }

  async listarTiposProducto(tenantId?: number): Promise<ProductType[]> {
    await this.delay(200)
    return tenantId ? this.tiposProducto.filter((t) => t.tenantId === tenantId) : this.tiposProducto
  }

  async listarProductos(tenantId?: number): Promise<BusinessProduct[]> {
    await this.delay(300)
    return tenantId ? this.productos.filter((p) => p.tenantId === tenantId) : this.productos
  }

  async listarTitulares(tenantId?: number): Promise<ProductHolder[]> {
    await this.delay(200)
    return tenantId ? this.titulares.filter((t) => t.tenantId === tenantId) : this.titulares
  }

  async listarTiposTransaccion(tenantId?: number): Promise<TransactionType[]> {
    await this.delay(200)
    return tenantId ? this.tiposTransaccion.filter((t) => t.tenantId === tenantId) : this.tiposTransaccion
  }

  async listarComprobantes(tenantId?: number): Promise<Voucher[]> {
    await this.delay(250)
    return tenantId ? this.comprobantes.filter((v) => v.tenantId === tenantId) : this.comprobantes
  }

  async listarLineasComprobante(voucherId: number): Promise<VoucherLine[]> {
    await this.delay(200)
    return this.lineasComprobante.filter((l) => l.voucherId === voucherId)
  }

  async listarTransacciones(tenantId?: number): Promise<Transaction[]> {
    await this.delay(300)
    return tenantId ? this.transacciones.filter((t) => t.tenantId === tenantId) : this.transacciones
  }

  async listarMovimientos(tenantId?: number): Promise<TransactionEntry[]> {
    await this.delay(300)
    return tenantId ? this.movimientos.filter((m) => m.tenantId === tenantId) : this.movimientos
  }

  async listarSaldos(tenantId?: number): Promise<Balance[]> {
    await this.delay(200)
    return tenantId ? this.saldos.filter((s) => s.tenantId === tenantId) : this.saldos
  }

  // ── Estadísticas ────────────────────────────────────────────────────────

  async obtenerEstadisticas(): Promise<CanonicoStats> {
    await this.delay(150)
    return {
      totalTenants: this.tenants.length,
      totalPersonas: this.personas.length,
      totalTiposProducto: this.tiposProducto.length,
      totalProductos: this.productos.length,
      totalTitulares: this.titulares.length,
      totalTiposTransaccion: this.tiposTransaccion.length,
      totalComprobantes: this.comprobantes.length,
      totalLineasComprobante: this.lineasComprobante.length,
      totalTransacciones: this.transacciones.length,
      totalMovimientos: this.movimientos.length,
      totalSaldos: this.saldos.length,
    }
  }

  // ── Utilidades ──────────────────────────────────────────────────────────

  /** Busca una persona por ID dentro del catálogo local. */
  obtenerPersonaPorId(id: number): BusinessPerson | undefined {
    return this.personas.find((p) => p.id === id)
  }

  /** Busca un producto por ID. */
  obtenerProductoPorId(id: number): BusinessProduct | undefined {
    return this.productos.find((p) => p.id === id)
  }

  /** Busca un tipo de producto por ID. */
  obtenerTipoProductoPorId(id: number): ProductType | undefined {
    return this.tiposProducto.find((t) => t.id === id)
  }

  /** Busca un tipo de transacción por ID. */
  obtenerTipoTransaccionPorId(id: number): TransactionType | undefined {
    return this.tiposTransaccion.find((t) => t.id === id)
  }

  /** Obtiene el tenant por ID. */
  obtenerTenantPorId(id: number): Tenant | undefined {
    return this.tenants.find((t) => t.id === id)
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export const canonicoService = new CanonicoService()
