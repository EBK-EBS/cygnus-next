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
} from '../types'
import type { ResultadoValidacion, ReporteValidacion } from '../types/validation'

/**
 * Servicio de validación del Modelo Canónico Transversal CACSA.
 * Ejecuta las 10 reglas de revisión humana contra el catálogo de datos mock.
 */

class ValidacionService {
  private tenants: Tenant[] = []
  private personas: BusinessPerson[] = []
  private tiposProducto: ProductType[] = []
  private productos: BusinessProduct[] = []
  private titulares: ProductHolder[] = []
  private tiposTransaccion: TransactionType[] = []
  private comprobantes: Voucher[] = []
  private lineasComprobante: VoucherLine[] = []
  private transacciones: Transaction[] = []
  private movimientos: TransactionEntry[] = []
  private saldos: Balance[] = []

  async cargarDatos(datos: {
    tenants: Tenant[]
    personas: BusinessPerson[]
    tiposProducto: ProductType[]
    productos: BusinessProduct[]
    titulares: ProductHolder[]
    tiposTransaccion: TransactionType[]
    comprobantes: Voucher[]
    lineasComprobante: VoucherLine[]
    transacciones: Transaction[]
    movimientos: TransactionEntry[]
    saldos: Balance[]
  }): Promise<void> {
    this.tenants = datos.tenants
    this.personas = datos.personas
    this.tiposProducto = datos.tiposProducto
    this.productos = datos.productos
    this.titulares = datos.titulares
    this.tiposTransaccion = datos.tiposTransaccion
    this.comprobantes = datos.comprobantes
    this.lineasComprobante = datos.lineasComprobante
    this.transacciones = datos.transacciones
    this.movimientos = datos.movimientos
    this.saldos = datos.saldos
  }

  async ejecutarValidacion(): Promise<ReporteValidacion> {
    await new Promise((r) => setTimeout(r, 300))

    const resultados: ResultadoValidacion[] = [
      this.validarC1_Completitud(),
      this.validarC2_Cardinalidad(),
      this.validarC3_Nulabilidad(),
      this.validarC4_Unicidad(),
      this.validarC5_Trazabilidad(),
      this.validarC6_Aislamiento(),
      this.validarC7_Normalizacion(),
      this.validarC8_TiposDatos(),
      this.validarC9_ReglasNegocio(),
      this.validarC10_Diagrama(),
    ]

    const exitosas = resultados.filter((r) => r.passed).length
    const errores = resultados.filter((r) => r.severidad === 'ERROR').length
    const advertencias = resultados.filter((r) => r.severidad === 'ADVERTENCIA').length

    return {
      timestamp: new Date().toISOString(),
      totalReglas: resultados.length,
      exitosas,
      advertencias,
      errores,
      resultados,
    }
  }

  // ── C1: Completitud — Todas las entidades están modeladas ────────────────

  private validarC1_Completitud(): ResultadoValidacion {
    const entidadesEsperadas = [
      'TENANT',
      'BUSINESS_PERSON',
      'BUSINESS_PRODUCT_TYPE',
      'BUSINESS_PRODUCT',
      'BUSINESS_PRODUCT_HOLDER',
      'BUSINESS_TRANSACTION_TYPE',
      'BUSINESS_VOUCHER',
      'BUSINESS_VOUCHER_LINE',
      'BUSINESS_TRANSACTION',
      'BUSINESS_TRANSACTION_ENTRY',
      'BUSINESS_BALANCE',
    ]

    const entidadesReales: Record<string, unknown[]> = {
      TENANT: this.tenants,
      BUSINESS_PERSON: this.personas,
      BUSINESS_PRODUCT_TYPE: this.tiposProducto,
      BUSINESS_PRODUCT: this.productos,
      BUSINESS_PRODUCT_HOLDER: this.titulares,
      BUSINESS_TRANSACTION_TYPE: this.tiposTransaccion,
      BUSINESS_VOUCHER: this.comprobantes,
      BUSINESS_VOUCHER_LINE: this.lineasComprobante,
      BUSINESS_TRANSACTION: this.transacciones,
      BUSINESS_TRANSACTION_ENTRY: this.movimientos,
      BUSINESS_BALANCE: this.saldos,
    }

    const failedChecks: string[] = []
    let checkedCount = 0
    let passedCount = 0

    for (const entidad of entidadesEsperadas) {
      checkedCount++
      const datos = entidadesReales[entidad]
      if (datos && datos.length > 0) {
        passedCount++
      } else {
        failedChecks.push(`Entidad ${entidad} sin datos`)
      }
    }

    return {
      id: 'C1',
      nombre: 'Completitud',
      criterio: 1,
      severidad: failedChecks.length > 0 ? 'ERROR' : 'OK',
      passed: failedChecks.length === 0,
      failedChecks,
      checkedCount,
      passedCount,
    }
  }

  // ── C2: Cardinalidad — Relaciones 1:N correctas ─────────────────────────

  private validarC2_Cardinalidad(): ResultadoValidacion {
    const failedChecks: string[] = []
    let checkedCount = 0
    let passedCount = 0

    // BUSINESS_PERSON → BUSINESS_PRODUCT (1:N via primaryPersonId)
    checkedCount++
    const personasConProducto = new Set(this.productos.map((p) => p.primaryPersonId))
    const personasSinProducto = this.personas.filter((p) => !personasConProducto.has(p.id))
    if (personasSinProducto.length > 0) {
      failedChecks.push(
        `${personasSinProducto.length} persona(s) sin producto asociado: ${personasSinProducto.map((p) => p.legalName).join(', ')}`,
      )
    } else {
      passedCount++
    }

    // PRODUCT_TYPE → BUSINESS_PRODUCT (1:N via productTypeId)
    checkedCount++
    const tiposConProducto = new Set(this.productos.map((p) => p.productTypeId))
    const tiposSinProducto = this.tiposProducto.filter((t) => !tiposConProducto.has(t.id))
    if (tiposSinProducto.length > 0) {
      failedChecks.push(
        `${tiposSinProducto.length} tipo(s) de producto sin productos: ${tiposSinProducto.map((t) => t.name).join(', ')}`,
      )
    } else {
      passedCount++
    }

    // BUSINESS_PRODUCT → PRODUCT_HOLDER (1:N via productId)
    checkedCount++
    const productosConTitular = new Set(this.titulares.map((t) => t.productId))
    const productosSinTitular = this.productos.filter((p) => !productosConTitular.has(p.id))
    if (productosSinTitular.length > 0) {
      failedChecks.push(
        `${productosSinTitular.length} producto(s) sin titular: ${productosSinTitular.map((p) => p.productNumber).join(', ')}`,
      )
    } else {
      passedCount++
    }

    // VOUCHER → VOUCHER_LINE (1:N via voucherId)
    checkedCount++
    const comprobantesConLinea = new Set(this.lineasComprobante.map((l) => l.voucherId))
    const comprobantesSinLinea = this.comprobantes.filter((v) => !comprobantesConLinea.has(v.id))
    if (comprobantesSinLinea.length > 0) {
      failedChecks.push(
        `${comprobantesSinLinea.length} comprobante(s) sin líneas: ${comprobantesSinLinea.map((v) => v.voucherNumber).join(', ')}`,
      )
    } else {
      passedCount++
    }

    // VOUCHER → TRANSACTION (1:N via voucherId)
    checkedCount++
    const comprobantesConTransaccion = new Set(this.transacciones.map((t) => t.voucherId))
    const comprobantesSinTransaccion = this.comprobantes.filter(
      (v) => !comprobantesConTransaccion.has(v.id),
    )
    if (comprobantesSinTransaccion.length > 0) {
      failedChecks.push(
        `${comprobantesSinTransaccion.length} comprobante(s) sin transacciones: ${comprobantesSinTransaccion.map((v) => v.voucherNumber).join(', ')}`,
      )
    } else {
      passedCount++
    }

    return {
      id: 'C2',
      nombre: 'Cardinalidad',
      criterio: 2,
      severidad: failedChecks.length > 0 ? 'ADVERTENCIA' : 'OK',
      passed: failedChecks.length === 0,
      failedChecks,
      checkedCount,
      passedCount,
    }
  }

  // ── C3: Nulabilidad — Campos opcionales correctamente marcados ──────────

  private validarC3_Nulabilidad(): ResultadoValidacion {
    const failedChecks: string[] = []
    let checkedCount = 0
    let passedCount = 0

    // closeDate debe ser nullable en BUSINESS_PRODUCT
    checkedCount++
    const productosConCloseDateNulo = this.productos.filter((p) => p.closeDate === null)
    if (productosConCloseDateNulo.length > 0) {
      passedCount++
    } else {
      failedChecks.push('Todos los productos tienen closeDate definido (debería haber algunos null)')
    }

    // endDate debe ser nullable en PRODUCT_HOLDER
    checkedCount++
    const titularesConEndDateNulo = this.titulares.filter((t) => t.endDate === null)
    if (titularesConEndDateNulo.length > 0) {
      passedCount++
    } else {
      failedChecks.push('Todos los titulares tienen endDate definido (debería haber algunos null)')
    }

    // reversalOfTransactionId debe ser nullable en TRANSACTION
    checkedCount++
    const transaccionesSinReversion = this.transacciones.filter(
      (t) => t.reversalOfTransactionId === null,
    )
    if (transaccionesSinReversion.length > 0) {
      passedCount++
    } else {
      failedChecks.push(
        'Todas las transacciones tienen reversalOfTransactionId definido (debería haber algunos null)',
      )
    }

    // Verificar que los nullable no tengan valores vacíos innecesarios
    checkedCount++
    const productosConCloseDateVacio = this.productos.filter(
      (p) => p.closeDate !== null && p.closeDate !== '' && p.status === 'ABIERTO',
    )
    if (productosConCloseDateVacio.length > 0) {
      failedChecks.push(
        `${productosConCloseDateVacio.length} producto(s) ABIERTO con closeDate definido`,
      )
    } else {
      passedCount++
    }

    return {
      id: 'C3',
      nombre: 'Nulabilidad',
      criterio: 3,
      severidad: failedChecks.length > 0 ? 'ERROR' : 'OK',
      passed: failedChecks.length === 0,
      failedChecks,
      checkedCount,
      passedCount,
    }
  }

  // ── C4: Unicidad — UK correctas según reglas de negocio ─────────────────

  private validarC4_Unicidad(): ResultadoValidacion {
    const failedChecks: string[] = []
    let checkedCount = 0
    let passedCount = 0

    // UK: Tenant + codigo (TENANT)
    checkedCount++
    const tenantCodes = this.tenants.map((t) => `${t.id}:${t.codigo}`)
    const tenantDups = tenantCodes.filter((v, i) => tenantCodes.indexOf(v) !== i)
    if (tenantDups.length > 0) {
      failedChecks.push(`Duplicados en TENANT UK (id, codigo): ${tenantDups.join(', ')}`)
    } else {
      passedCount++
    }

    // UK: tenantId + identificationNumber (BUSINESS_PERSON)
    checkedCount++
    const personIds = this.personas.map((p) => `${p.tenantId}:${p.identificationNumber}`)
    const personDups = personIds.filter((v, i) => personIds.indexOf(v) !== i)
    if (personDups.length > 0) {
      failedChecks.push(
        `Duplicados en BUSINESS_PERSON UK (tenantId, identificationNumber): ${personDups.join(', ')}`,
      )
    } else {
      passedCount++
    }

    // UK: tenantId + productNumber (BUSINESS_PRODUCT)
    checkedCount++
    const productNums = this.productos.map((p) => `${p.tenantId}:${p.productNumber}`)
    const productDups = productNums.filter((v, i) => productNums.indexOf(v) !== i)
    if (productDups.length > 0) {
      failedChecks.push(
        `Duplicados en BUSINESS_PRODUCT UK (tenantId, productNumber): ${productDups.join(', ')}`,
      )
    } else {
      passedCount++
    }

    // UK: tenantId + voucherType + voucherNumber (VOUCHER)
    checkedCount++
    const voucherKeys = this.comprobantes.map(
      (v) => `${v.tenantId}:${v.voucherType}:${v.voucherNumber}`,
    )
    const voucherDups = voucherKeys.filter((v, i) => voucherKeys.indexOf(v) !== i)
    if (voucherDups.length > 0) {
      failedChecks.push(
        `Duplicados en VOUCHER UK (tenantId, voucherType, voucherNumber): ${voucherDups.join(', ')}`,
      )
    } else {
      passedCount++
    }

    // UK: tenantId + operationNumber (TRANSACTION)
    checkedCount++
    const opNums = this.transacciones.map((t) => `${t.tenantId}:${t.operationNumber}`)
    const opDups = opNums.filter((v, i) => opNums.indexOf(v) !== i)
    if (opDups.length > 0) {
      failedChecks.push(
        `Duplicados en TRANSACTION UK (tenantId, operationNumber): ${opDups.join(', ')}`,
      )
    } else {
      passedCount++
    }

    // UK: tenantId + family + code (PRODUCT_TYPE)
    checkedCount++
    const tipoKeys = this.tiposProducto.map((t) => `${t.tenantId}:${t.family}:${t.code}`)
    const tipoDups = tipoKeys.filter((v, i) => tipoKeys.indexOf(v) !== i)
    if (tipoDups.length > 0) {
      failedChecks.push(
        `Duplicados en PRODUCT_TYPE UK (tenantId, family, code): ${tipoDups.join(', ')}`,
      )
    } else {
      passedCount++
    }

    return {
      id: 'C4',
      nombre: 'Unicidad',
      criterio: 4,
      severidad: failedChecks.length > 0 ? 'ERROR' : 'OK',
      passed: failedChecks.length === 0,
      failedChecks,
      checkedCount,
      passedCount,
    }
  }

  // ── C5: Trazabilidad — Campos source_* presentes ────────────────────────

  private validarC5_Trazabilidad(): ResultadoValidacion {
    const failedChecks: string[] = []
    let checkedCount = 0
    let passedCount = 0

    // BUSINESS_PERSON: sourceSystem y sourcePersonCode
    checkedCount++
    const personasSinSource = this.personas.filter(
      (p) => !p.sourceSystem || !p.sourcePersonCode,
    )
    if (personasSinSource.length > 0) {
      failedChecks.push(
        `${personasSinSource.length} persona(s) sin campos source: ${personasSinSource.map((p) => p.identificationNumber).join(', ')}`,
      )
    } else {
      passedCount++
    }

    // PRODUCT_TYPE: sourceTypeCode y sourceLineCode
    checkedCount++
    const tiposSinSource = this.tiposProducto.filter(
      (t) => !t.sourceTypeCode || !t.sourceLineCode,
    )
    if (tiposSinSource.length > 0) {
      failedChecks.push(
        `${tiposSinSource.length} tipo(s) de producto sin campos source: ${tiposSinSource.map((t) => t.code).join(', ')}`,
      )
    } else {
      passedCount++
    }

    // BUSINESS_PRODUCT: sourceProductId
    checkedCount++
    const productosSinSource = this.productos.filter((p) => !p.sourceProductId)
    if (productosSinSource.length > 0) {
      failedChecks.push(
        `${productosSinSource.length} producto(s) sin sourceProductId: ${productosSinSource.map((p) => p.productNumber).join(', ')}`,
      )
    } else {
      passedCount++
    }

    // TRANSACTION_TYPE: sourceTransactionTypeCode
    checkedCount++
    const tiposTransSinSource = this.tiposTransaccion.filter((t) => !t.sourceTransactionTypeCode)
    if (tiposTransSinSource.length > 0) {
      failedChecks.push(
        `${tiposTransSinSource.length} tipo(s) de transacción sin sourceTransactionTypeCode`,
      )
    } else {
      passedCount++
    }

    // VOUCHER: sourceVoucherId
    checkedCount++
    const vouchersSinSource = this.comprobantes.filter((v) => !v.sourceVoucherId)
    if (vouchersSinSource.length > 0) {
      failedChecks.push(
        `${vouchersSinSource.length} comprobante(s) sin sourceVoucherId`,
      )
    } else {
      passedCount++
    }

    // TRANSACTION: sourceOperationId
    checkedCount++
    const transSinSource = this.transacciones.filter((t) => !t.sourceOperationId)
    if (transSinSource.length > 0) {
      failedChecks.push(
        `${transSinSource.length} transacción(es) sin sourceOperationId`,
      )
    } else {
      passedCount++
    }

    // TRANSACTION_ENTRY: sourceEntryId
    checkedCount++
    const movSinSource = this.movimientos.filter((m) => !m.sourceEntryId)
    if (movSinSource.length > 0) {
      failedChecks.push(
        `${movSinSource.length} movimiento(s) sin sourceEntryId`,
      )
    } else {
      passedCount++
    }

    return {
      id: 'C5',
      nombre: 'Trazabilidad',
      criterio: 5,
      severidad: failedChecks.length > 0 ? 'ERROR' : 'OK',
      passed: failedChecks.length === 0,
      failedChecks,
      checkedCount,
      passedCount,
    }
  }

  // ── C6: Aislamiento — tenant_id en todas las tablas ─────────────────────

  private validarC6_Aislamiento(): ResultadoValidacion {
    const failedChecks: string[] = []
    let checkedCount = 0
    let passedCount = 0

    const entidadesConTenant: Array<{ nombre: string; datos: Array<{ tenantId?: number }> }> = [
      { nombre: 'BUSINESS_PERSON', datos: this.personas },
      { nombre: 'PRODUCT_TYPE', datos: this.tiposProducto },
      { nombre: 'BUSINESS_PRODUCT', datos: this.productos },
      { nombre: 'PRODUCT_HOLDER', datos: this.titulares },
      { nombre: 'TRANSACTION_TYPE', datos: this.tiposTransaccion },
      { nombre: 'VOUCHER', datos: this.comprobantes },
      { nombre: 'VOUCHER_LINE', datos: this.lineasComprobante },
      { nombre: 'TRANSACTION', datos: this.transacciones },
      { nombre: 'TRANSACTION_ENTRY', datos: this.movimientos },
      { nombre: 'BALANCE', datos: this.saldos },
    ]

    for (const entidad of entidadesConTenant) {
      checkedCount++
      if (entidad.datos.length === 0) {
        passedCount++
        continue
      }
      const sinTenant = entidad.datos.filter((d) => !d.tenantId || d.tenantId <= 0)
      if (sinTenant.length > 0) {
        failedChecks.push(
          `${entidad.nombre}: ${sinTenant.length} registro(s) sin tenantId válido`,
        )
      } else {
        passedCount++
      }
    }

    // TENANT no necesita tenantId (es la raíz)
    checkedCount++
    passedCount++

    return {
      id: 'C6',
      nombre: 'Aislamiento',
      criterio: 6,
      severidad: failedChecks.length > 0 ? 'ERROR' : 'OK',
      passed: failedChecks.length === 0,
      failedChecks,
      checkedCount,
      passedCount,
    }
  }

  // ── C7: Normalización — Sin dependencias transitivas ─────────────────────

  private validarC7_Normalizacion(): ResultadoValidacion {
    const failedChecks: string[] = []
    let checkedCount = 0
    let passedCount = 0

    // Verificar que no existan campos derivados repetidos
    // BUSINESS_PRODUCT no debería tener campos calculados de BALANCE
    checkedCount++
    const productosConSaldo = this.productos.filter(
      (p) => 'balance' in p || 'saldo' in p || 'totalDebit' in p,
    )
    if (productosConSaldo.length > 0) {
      failedChecks.push('BUSINESS_PRODUCT contiene campos derivados de BALANCE')
    } else {
      passedCount++
    }

    // Verificar que VOUCHER no tenga campos de TRANSACTION
    checkedCount++
    const vouchersConTransaccion = this.comprobantes.filter(
      (v) => 'operationNumber' in v || 'transactionDate' in v,
    )
    if (vouchersConTransaccion.length > 0) {
      failedChecks.push('BUSINESS_VOUCHER contiene campos derivados de TRANSACTION')
    } else {
      passedCount++
    }

    // Verificar que TRANSACTION no tenga campos de TRANSACTION_ENTRY
    checkedCount++
    const transConEntry = this.transacciones.filter(
      (t) => 'amount' in t || 'accountCode' in t,
    )
    if (transConEntry.length > 0) {
      failedChecks.push('BUSINESS_TRANSACTION contiene campos derivados de TRANSACTION_ENTRY')
    } else {
      passedCount++
    }

    // Verificar que PERSON no tenga campos de PRODUCT
    checkedCount++
    const personasConProducto = this.personas.filter(
      (p) => 'productNumber' in p || 'productStatus' in p,
    )
    if (personasConProducto.length > 0) {
      failedChecks.push('BUSINESS_PERSON contiene campos derivados de BUSINESS_PRODUCT')
    } else {
      passedCount++
    }

    // Verificar que PRODUCT_HOLDER no tenga campos de PERSON
    checkedCount++
    const holdersConPersonData = this.titulares.filter(
      (h) => 'legalName' in h || 'identificationNumber' in h,
    )
    if (holdersConPersonData.length > 0) {
      failedChecks.push(
        'BUSINESS_PRODUCT_HOLDER contiene campos derivados de BUSINESS_PERSON',
      )
    } else {
      passedCount++
    }

    return {
      id: 'C7',
      nombre: 'Normalización',
      criterio: 7,
      severidad: failedChecks.length > 0 ? 'ERROR' : 'OK',
      passed: failedChecks.length === 0,
      failedChecks,
      checkedCount,
      passedCount,
    }
  }

  // ── C8: Tipos de datos ──────────────────────────────────────────────────

  private validarC8_TiposDatos(): ResultadoValidacion {
    const failedChecks: string[] = []
    let checkedCount = 0
    let passedCount = 0

    // VOUCHER_LINE: montos deben ser numéricos
    checkedCount++
    const lineasMontosInvalidos = this.lineasComprobante.filter(
      (l) =>
        typeof l.debitAmount !== 'number' ||
        typeof l.creditAmount !== 'number' ||
        isNaN(l.debitAmount) ||
        isNaN(l.creditAmount),
    )
    if (lineasMontosInvalidos.length > 0) {
      failedChecks.push(
        `${lineasMontosInvalidos.length} línea(s) de comprobante con montos no numéricos`,
      )
    } else {
      passedCount++
    }

    // VOUCHER_LINE: montos no negativos
    checkedCount++
    const lineasMontosNegativos = this.lineasComprobante.filter(
      (l) => l.debitAmount < 0 || l.creditAmount < 0,
    )
    if (lineasMontosNegativos.length > 0) {
      failedChecks.push(
        `${lineasMontosNegativos.length} línea(s) de comprobante con montos negativos`,
      )
    } else {
      passedCount++
    }

    // TRANSACTION_ENTRY: amount debe ser numérico
    checkedCount++
    const movMontosInvalidos = this.movimientos.filter(
      (m) => typeof m.amount !== 'number' || isNaN(m.amount),
    )
    if (movMontosInvalidos.length > 0) {
      failedChecks.push(
        `${movMontosInvalidos.length} movimiento(s) con monto no numérico`,
      )
    } else {
      passedCount++
    }

    // BALANCE: amount debe ser numérico
    checkedCount++
    const saldoMontosInvalidos = this.saldos.filter(
      (s) => typeof s.amount !== 'number' || isNaN(s.amount),
    )
    if (saldoMontosInvalidos.length > 0) {
      failedChecks.push(
        `${saldoMontosInvalidos.length} saldo(s) con monto no numérico`,
      )
    } else {
      passedCount++
    }

    // Fechas deben ser strings válidos
    checkedCount++
    const fechasInvalidas = this.comprobantes.filter((v) => {
      try {
        return isNaN(Date.parse(v.voucherDate))
      } catch {
        return true
      }
    })
    if (fechasInvalidas.length > 0) {
      failedChecks.push(
        `${fechasInvalidas.length} comprobante(s) con fecha inválida`,
      )
    } else {
      passedCount++
    }

    return {
      id: 'C8',
      nombre: 'Tipos de datos',
      criterio: 8,
      severidad: failedChecks.length > 0 ? 'ERROR' : 'OK',
      passed: failedChecks.length === 0,
      failedChecks,
      checkedCount,
      passedCount,
    }
  }

  // ── C9: Reglas de negocio ───────────────────────────────────────────────

  private validarC9_ReglasNegocio(): ResultadoValidacion {
    const failedChecks: string[] = []
    let checkedCount = 0
    let passedCount = 0

    // Balance de comprobantes: totalDebit == totalCredit
    checkedCount++
    const vouchersDesbalanceados = this.comprobantes.filter((v) => {
      const lineas = this.lineasComprobante.filter((l) => l.voucherId === v.id)
      const totalDebito = lineas.reduce((sum, l) => sum + l.debitAmount, 0)
      const totalCredito = lineas.reduce((sum, l) => sum + l.creditAmount, 0)
      return lineas.length > 0 && Math.abs(totalDebito - totalCredito) > 0.01
    })
    if (vouchersDesbalanceados.length > 0) {
      failedChecks.push(
        `${vouchersDesbalanceados.length} comprobante(s) con débito ≠ crédito: ${vouchersDesbalanceados.map((v) => v.voucherNumber).join(', ')}`,
      )
    } else {
      passedCount++
    }

    // PRODUCT_HOLDER: startDate <= endDate (cuando endDate existe)
    checkedCount++
    const holdersFechasInvalidas = this.titulares.filter((h) => {
      if (!h.endDate) return false
      return new Date(h.startDate) > new Date(h.endDate)
    })
    if (holdersFechasInvalidas.length > 0) {
      failedChecks.push(
        `${holdersFechasInvalidas.length} titular(es) con startDate > endDate`,
      )
    } else {
      passedCount++
    }

    // BUSINESS_PRODUCT: openDate <= closeDate (cuando closeDate existe)
    checkedCount++
    const productosFechasInvalidas = this.productos.filter((p) => {
      if (!p.closeDate) return false
      return new Date(p.openDate) > new Date(p.closeDate)
    })
    if (productosFechasInvalidas.length > 0) {
      failedChecks.push(
        `${productosFechasInvalidas.length} producto(s) con openDate > closeDate`,
      )
    } else {
      passedCount++
    }

    // PRODUCT_HOLDER: holderRole válido
    checkedCount++
    const rolesValidos = ['TITULAR', 'CO_TITULAR', 'AVAL', 'GARANTE', 'APODERADO']
    const holdersRolesInvalidos = this.titulares.filter(
      (h) => !rolesValidos.includes(h.holderRole),
    )
    if (holdersRolesInvalidos.length > 0) {
      failedChecks.push(
        `${holdersRolesInvalidos.length} titular(es) con holderRole inválido: ${holdersRolesInvalidos.map((h) => h.holderRole).join(', ')}`,
      )
    } else {
      passedCount++
    }

    // TRANSACTION: reversalOfTransactionId debe apuntar a transacción existente
    checkedCount++
    const transReversionInvalida = this.transacciones.filter((t) => {
      if (!t.reversalOfTransactionId) return false
      return !this.transacciones.some((tr) => tr.id === t.reversalOfTransactionId)
    })
    if (transReversionInvalida.length > 0) {
      failedChecks.push(
        `${transReversionInvalida.length} transacción(es) con reversión a transacción inexistente`,
      )
    } else {
      passedCount++
    }

    // Referential integrity: PRODUCT_HOLDER.productId → BUSINESS_PRODUCT
    checkedCount++
    const holdersOrfProduct = this.titulares.filter(
      (h) => !this.productos.some((p) => p.id === h.productId),
    )
    if (holdersOrfProduct.length > 0) {
      failedChecks.push(
        `${holdersOrfProduct.length} titular(es) con productId inexistente`,
      )
    } else {
      passedCount++
    }

    // Referential integrity: PRODUCT_HOLDER.personId → BUSINESS_PERSON
    checkedCount++
    const holdersOrfPerson = this.titulares.filter(
      (h) => !this.personas.some((p) => p.id === h.personId),
    )
    if (holdersOrfPerson.length > 0) {
      failedChecks.push(
        `${holdersOrfPerson.length} titular(es) con personId inexistente`,
      )
    } else {
      passedCount++
    }

    // Referential integrity: TRANSACTION.voucherId → VOUCHER
    checkedCount++
    const transOrfVoucher = this.transacciones.filter(
      (t) => !this.comprobantes.some((v) => v.id === t.voucherId),
    )
    if (transOrfVoucher.length > 0) {
      failedChecks.push(
        `${transOrfVoucher.length} transacción(es) con voucherId inexistente`,
      )
    } else {
      passedCount++
    }

    // Referential integrity: TRANSACTION_ENTRY.transactionId → TRANSACTION
    checkedCount++
    const movOrfTransaction = this.movimientos.filter(
      (m) => !this.transacciones.some((t) => t.id === m.transactionId),
    )
    if (movOrfTransaction.length > 0) {
      failedChecks.push(
        `${movOrfTransaction.length} movimiento(s) con transactionId inexistente`,
      )
    } else {
      passedCount++
    }

    // Referential integrity: BALANCE.productId → BUSINESS_PRODUCT
    checkedCount++
    const saldosOrfProduct = this.saldos.filter(
      (s) => !this.productos.some((p) => p.id === s.productId),
    )
    if (saldosOrfProduct.length > 0) {
      failedChecks.push(
        `${saldosOrfProduct.length} saldo(s) con productId inexistente`,
      )
    } else {
      passedCount++
    }

    return {
      id: 'C9',
      nombre: 'Reglas de negocio',
      criterio: 9,
      severidad: failedChecks.length > 0 ? 'ERROR' : 'OK',
      passed: failedChecks.length === 0,
      failedChecks,
      checkedCount,
      passedCount,
    }
  }

  // ── C10: Diagrama — El diagrama refleja fielmente el modelo ─────────────

  private validarC10_Diagrama(): ResultadoValidacion {
    const failedChecks: string[] = []
    let checkedCount = 0
    let passedCount = 0

    // Verificar que todas las entidades del diagrama PlantUML estén presentes en los datos
    const entidadesDiagrama = [
      'TENANT',
      'BUSINESS_PERSON',
      'BUSINESS_PRODUCT_TYPE',
      'BUSINESS_PRODUCT',
      'BUSINESS_PRODUCT_HOLDER',
      'BUSINESS_TRANSACTION_TYPE',
      'BUSINESS_VOUCHER',
      'BUSINESS_VOUCHER_LINE',
      'BUSINESS_TRANSACTION',
      'BUSINESS_TRANSACTION_ENTRY',
      'BUSINESS_BALANCE',
    ]

    const entidadesConDatos: Record<string, boolean> = {
      TENANT: this.tenants.length > 0,
      BUSINESS_PERSON: this.personas.length > 0,
      BUSINESS_PRODUCT_TYPE: this.tiposProducto.length > 0,
      BUSINESS_PRODUCT: this.productos.length > 0,
      BUSINESS_PRODUCT_HOLDER: this.titulares.length > 0,
      BUSINESS_TRANSACTION_TYPE: this.tiposTransaccion.length > 0,
      BUSINESS_VOUCHER: this.comprobantes.length > 0,
      BUSINESS_VOUCHER_LINE: this.lineasComprobante.length > 0,
      BUSINESS_TRANSACTION: this.transacciones.length > 0,
      BUSINESS_TRANSACTION_ENTRY: this.movimientos.length > 0,
      BUSINESS_BALANCE: this.saldos.length > 0,
    }

    for (const entidad of entidadesDiagrama) {
      checkedCount++
      if (entidadesConDatos[entidad]) {
        passedCount++
      } else {
        failedChecks.push(`Entidad del diagrama sin datos: ${entidad}`)
      }
    }

    // Verificar cardinalidades documentadas
    checkedCount++
    const relPersonProduct = this.personas.every((p) =>
      this.productos.some((pr) => pr.primaryPersonId === p.id),
    )
    if (!relPersonProduct) {
      failedChecks.push('Relación PERSON → PRODUCT (1:N) no reflejada en datos')
    } else {
      passedCount++
    }

    return {
      id: 'C10',
      nombre: 'Diagrama',
      criterio: 10,
      severidad: failedChecks.length > 0 ? 'ADVERTENCIA' : 'OK',
      passed: failedChecks.length === 0,
      failedChecks,
      checkedCount,
      passedCount,
    }
  }
}

export const validacionService = new ValidacionService()
