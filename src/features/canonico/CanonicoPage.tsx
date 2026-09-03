import { useState, useEffect, useMemo } from 'react'
import {
  Building2,
  Users,
  Package,
  Briefcase,
  UserCheck,
  ArrowLeftRight,
  FileText,
  List,
  ArrowRightLeft,
  Banknote,
  Scale,
  Search,
  ChevronRight,
  Database,
} from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { Badge, type BadgeTone } from '@/components/ui/Badge'
import { fmt } from '@/lib/format'
import { canonicoService } from './services/canonicoService'
import type {
  Tenant,
  BusinessPerson,
  ProductType,
  BusinessProduct,
  ProductHolder,
  TransactionType,
  Voucher,
  Transaction,
  TransactionEntry,
  Balance,
  CanonicoStats,
  EntidadCanonica,
} from './types'

type TabId = EntidadCanonica | 'resumen'

const TABS: Array<{ id: TabId; label: string; icon: typeof Building2 }> = [
  { id: 'resumen', label: 'Resumen', icon: Scale },
  { id: 'tenant', label: 'Tenants', icon: Building2 },
  { id: 'business_person', label: 'Personas', icon: Users },
  { id: 'product_type', label: 'Tipos Producto', icon: Package },
  { id: 'business_product', label: 'Productos', icon: Briefcase },
  { id: 'product_holder', label: 'Titulares', icon: UserCheck },
  { id: 'transaction_type', label: 'Tipos Transacción', icon: ArrowLeftRight },
  { id: 'voucher', label: 'Comprobantes', icon: FileText },
  { id: 'transaction', label: 'Transacciones', icon: ArrowRightLeft },
  { id: 'transaction_entry', label: 'Movimientos', icon: Banknote },
  { id: 'balance', label: 'Saldos', icon: Database },
]

const tonePorEstado = (estado: string): BadgeTone => {
  switch (estado) {
    case 'ACTIVO':
    case 'COMPLETADA':
    case 'CONTABILIZADO':
    case 'APROBADO':
    case 'ABIERTO':
      return 'success'
    case 'PENDIENTE':
    case 'BORRADOR':
    case 'SUSPENDIDO':
      return 'warning'
    case 'INACTIVO':
    case 'ANULADA':
    case 'ANULADO':
    case 'REVERTIDA':
    case 'CERRADO':
      return 'danger'
    default:
      return 'neutral'
  }
}

export function CanonicoPage() {
  const [activeTab, setActiveTab] = useState<TabId>('resumen')
  const [stats, setStats] = useState<CanonicoStats | null>(null)
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [personas, setPersonas] = useState<BusinessPerson[]>([])
  const [tiposProducto, setTiposProducto] = useState<ProductType[]>([])
  const [productos, setProductos] = useState<BusinessProduct[]>([])
  const [titulares, setTitulares] = useState<ProductHolder[]>([])
  const [tiposTransaccion, setTiposTransaccion] = useState<TransactionType[]>([])
  const [comprobantes, setComprobantes] = useState<Voucher[]>([])
  const [transacciones, setTransacciones] = useState<Transaction[]>([])
  const [movimientos, setMovimientos] = useState<TransactionEntry[]>([])
  const [saldos, setSaldos] = useState<Balance[]>([])
  const [loading, setLoading] = useState(true)
  const [filtroTenant, setFiltroTenant] = useState<number | ''>('')
  const [textoBusqueda, setTextoBusqueda] = useState('')

  useEffect(() => {
    async function cargar() {
      setLoading(true)
      const [s, ten, per, tp, pr, ti, tt, co, tr, mo, sa] = await Promise.all([
        canonicoService.obtenerEstadisticas(),
        canonicoService.listarTenants(),
        canonicoService.listarPersonas(),
        canonicoService.listarTiposProducto(),
        canonicoService.listarProductos(),
        canonicoService.listarTitulares(),
        canonicoService.listarTiposTransaccion(),
        canonicoService.listarComprobantes(),
        canonicoService.listarTransacciones(),
        canonicoService.listarMovimientos(),
        canonicoService.listarSaldos(),
      ])
      setStats(s)
      setTenants(ten)
      setPersonas(per)
      setTiposProducto(tp)
      setProductos(pr)
      setTitulares(ti)
      setTiposTransaccion(tt)
      setComprobantes(co)
      setTransacciones(tr)
      setMovimientos(mo)
      setSaldos(sa)
      setLoading(false)
    }
    cargar()
  }, [])

  const tenantMap = useMemo(() => {
    const m = new Map<number, string>()
    tenants.forEach((t) => m.set(t.id, t.codigo))
    return m
  }, [tenants])

  const personaMap = useMemo(() => {
    const m = new Map<number, string>()
    personas.forEach((p) => m.set(p.id, p.legalName))
    return m
  }, [personas])

  const tipoProductoMap = useMemo(() => {
    const m = new Map<number, string>()
    tiposProducto.forEach((t) => m.set(t.id, t.name))
    return m
  }, [tiposProducto])

  const tipoTransaccionMap = useMemo(() => {
    const m = new Map<number, string>()
    tiposTransaccion.forEach((t) => m.set(t.id, t.name))
    return m
  }, [tiposTransaccion])

  const productoMap = useMemo(() => {
    const m = new Map<number, string>()
    productos.forEach((p) => m.set(p.id, p.productNumber))
    return m
  }, [productos])

  const filtrarPorTenant = <T,>(items: T[], getTenantId: (item: T) => number): T[] => {
    return filtroTenant !== '' ? items.filter((i) => getTenantId(i) === filtroTenant) : items
  }

  // ── Columnas por entidad ────────────────────────────────────────────────

  const tenantColumns: Column<Tenant>[] = [
    { key: 'id', header: 'ID', align: 'center' },
    { key: 'codigo', header: 'Código', render: (r) => <span className="font-medium text-ink">{r.codigo}</span> },
    { key: 'nombre', header: 'Nombre' },
    {
      key: 'estado', header: 'Estado', align: 'center',
      render: (r) => <Badge tone={tonePorEstado(r.estado)} dot>{r.estado}</Badge>,
    },
  ]

  const personaColumns: Column<BusinessPerson>[] = [
    { key: 'id', header: 'ID', align: 'center' },
    {
      key: 'tenantId', header: 'Tenant', align: 'center',
      render: (r) => <Badge tone="neutral">{tenantMap.get(r.tenantId) ?? r.tenantId}</Badge>,
    },
    { key: 'identificationNumber', header: 'Identificación', render: (r) => <span className="font-medium text-ink">{r.identificationNumber}</span> },
    { key: 'legalName', header: 'Nombre Legal' },
    { key: 'personType', header: 'Tipo', align: 'center', render: (r) => <Badge tone="neutral">{r.personType}</Badge> },
    {
      key: 'status', header: 'Estado', align: 'center',
      render: (r) => <Badge tone={tonePorEstado(r.status)} dot>{r.status}</Badge>,
    },
  ]

  const tipoProductoColumns: Column<ProductType>[] = [
    { key: 'id', header: 'ID', align: 'center' },
    { key: 'code', header: 'Código', render: (r) => <span className="font-medium text-ink">{r.code}</span> },
    { key: 'name', header: 'Nombre' },
    { key: 'family', header: 'Familia', align: 'center', render: (r) => <Badge tone="neutral">{r.family}</Badge> },
    {
      key: 'active', header: 'Activo', align: 'center',
      render: (r) => <Badge tone={r.active ? 'success' : 'danger'}>{r.active ? 'Sí' : 'No'}</Badge>,
    },
  ]

  const productoColumns: Column<BusinessProduct>[] = [
    { key: 'id', header: 'ID', align: 'center' },
    { key: 'productNumber', header: 'Nº Producto', render: (r) => <span className="font-medium text-ink">{r.productNumber}</span> },
    {
      key: 'productTypeId', header: 'Tipo', align: 'center',
      render: (r) => <Badge tone="neutral">{tipoProductoMap.get(r.productTypeId) ?? r.productTypeId}</Badge>,
    },
    {
      key: 'primaryPersonId', header: 'Titular Principal',
      render: (r) => personaMap.get(r.primaryPersonId) ?? `#${r.primaryPersonId}`,
    },
    { key: 'currencyCode', header: 'Moneda', align: 'center' },
    { key: 'openDate', header: 'Apertura' },
    {
      key: 'status', header: 'Estado', align: 'center',
      render: (r) => <Badge tone={tonePorEstado(r.status)} dot>{r.status}</Badge>,
    },
  ]

  const titularColumns: Column<ProductHolder>[] = [
    { key: 'id', header: 'ID', align: 'center' },
    {
      key: 'productId', header: 'Producto',
      render: (r) => <span className="font-medium text-ink">{productoMap.get(r.productId) ?? `#${r.productId}`}</span>,
    },
    {
      key: 'personId', header: 'Persona',
      render: (r) => personaMap.get(r.personId) ?? `#${r.personId}`,
    },
    { key: 'holderRole', header: 'Rol', align: 'center', render: (r) => <Badge tone="neutral">{r.holderRole}</Badge> },
    { key: 'startDate', header: 'Desde' },
    {
      key: 'isPrimary', header: 'Principal', align: 'center',
      render: (r) => r.isPrimary ? <Badge tone="success">Sí</Badge> : <Badge tone="neutral">No</Badge>,
    },
  ]

  const tipoTransaccionColumns: Column<TransactionType>[] = [
    { key: 'id', header: 'ID', align: 'center' },
    { key: 'code', header: 'Código', render: (r) => <span className="font-medium text-ink">{r.code}</span> },
    { key: 'name', header: 'Nombre' },
    {
      key: 'movementNature', header: 'Naturaleza', align: 'center',
      render: (r) => (
        <Badge tone={r.movementNature === 'CREDITO' ? 'success' : 'warning'}>{r.movementNature}</Badge>
      ),
    },
    {
      key: 'active', header: 'Activo', align: 'center',
      render: (r) => <Badge tone={r.active ? 'success' : 'danger'}>{r.active ? 'Sí' : 'No'}</Badge>,
    },
  ]

  const comprobanteColumns: Column<Voucher>[] = [
    { key: 'id', header: 'ID', align: 'center' },
    { key: 'voucherNumber', header: 'Nº Comprobante', render: (r) => <span className="font-medium text-ink">{r.voucherNumber}</span> },
    { key: 'voucherType', header: 'Tipo', align: 'center', render: (r) => <Badge tone="neutral">{r.voucherType}</Badge> },
    { key: 'voucherDate', header: 'Fecha' },
    {
      key: 'status', header: 'Estado', align: 'center',
      render: (r) => <Badge tone={tonePorEstado(r.status)} dot>{r.status}</Badge>,
    },
  ]

  const transaccionColumns: Column<Transaction>[] = [
    { key: 'id', header: 'ID', align: 'center' },
    { key: 'operationNumber', header: 'Nº Operación', render: (r) => <span className="font-medium text-ink">{r.operationNumber}</span> },
    {
      key: 'voucherId', header: 'Comprobante', align: 'center',
      render: (r) => comprobantes.find((v) => v.id === r.voucherId)?.voucherNumber ?? `#${r.voucherId}`,
    },
    { key: 'transactionDate', header: 'Fecha', render: (r) => new Date(r.transactionDate).toLocaleDateString('es-CO') },
    {
      key: 'reversalOfTransactionId', header: 'Revierte', align: 'center',
      render: (r) => r.reversalOfTransactionId
        ? <Badge tone="warning">OP #{r.reversalOfTransactionId}</Badge>
        : <span className="text-muted">—</span>,
    },
    {
      key: 'status', header: 'Estado', align: 'center',
      render: (r) => <Badge tone={tonePorEstado(r.status)} dot>{r.status}</Badge>,
    },
  ]

  const movimientoColumns: Column<TransactionEntry>[] = [
    { key: 'id', header: 'ID', align: 'center' },
    {
      key: 'transactionId', header: 'Transacción', align: 'center',
      render: (r) => transacciones.find((t) => t.id === r.transactionId)?.operationNumber ?? `#${r.transactionId}`,
    },
    {
      key: 'transactionTypeId', header: 'Tipo', align: 'center',
      render: (r) => <Badge tone="neutral">{tipoTransaccionMap.get(r.transactionTypeId) ?? r.transactionTypeId}</Badge>,
    },
    {
      key: 'productId', header: 'Producto',
      render: (r) => productoMap.get(r.productId) ?? `#${r.productId}`,
    },
    {
      key: 'personId', header: 'Persona',
      render: (r) => personaMap.get(r.personId) ?? `#${r.personId}`,
    },
    { key: 'amount', header: 'Monto', align: 'right', render: (r) => `$ ${fmt(r.amount)}` },
    { key: 'entryDate', header: 'Fecha', render: (r) => new Date(r.entryDate).toLocaleDateString('es-CO') },
  ]

  const saldoColumns: Column<Balance>[] = [
    { key: 'id', header: 'ID', align: 'center' },
    {
      key: 'productId', header: 'Producto',
      render: (r) => <span className="font-medium text-ink">{productoMap.get(r.productId) ?? `#${r.productId}`}</span>,
    },
    { key: 'balanceDate', header: 'Fecha Corte' },
    { key: 'balanceType', header: 'Tipo', align: 'center', render: (r) => <Badge tone="neutral">{r.balanceType}</Badge> },
    { key: 'amount', header: 'Saldo', align: 'right', render: (r) => <span className="font-semibold text-ink">$ {fmt(r.amount)}</span> },
  ]

  // ── Resumen ─────────────────────────────────────────────────────────────

  function renderResumen() {
    if (!stats) return null
    const cards = [
      { label: 'Tenants', value: stats.totalTenants, icon: Building2, color: 'bg-brand-50 text-brand-500' },
      { label: 'Personas', value: stats.totalPersonas, icon: Users, color: 'bg-info/10 text-info' },
      { label: 'Tipos Producto', value: stats.totalTiposProducto, icon: Package, color: 'bg-warning/10 text-warning' },
      { label: 'Productos', value: stats.totalProductos, icon: Briefcase, color: 'bg-brand-50 text-brand-500' },
      { label: 'Titulares', value: stats.totalTitulares, icon: UserCheck, color: 'bg-info/10 text-info' },
      { label: 'Tipos Transacción', value: stats.totalTiposTransaccion, icon: ArrowLeftRight, color: 'bg-warning/10 text-warning' },
      { label: 'Comprobantes', value: stats.totalComprobantes, icon: FileText, color: 'bg-brand-50 text-brand-500' },
      { label: 'Líneas Comprobante', value: stats.totalLineasComprobante, icon: List, color: 'bg-info/10 text-info' },
      { label: 'Transacciones', value: stats.totalTransacciones, icon: ArrowRightLeft, color: 'bg-warning/10 text-warning' },
      { label: 'Movimientos', value: stats.totalMovimientos, icon: Banknote, color: 'bg-brand-50 text-brand-500' },
      { label: 'Saldos', value: stats.totalSaldos, icon: Database, color: 'bg-info/10 text-info' },
    ]

    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          {cards.slice(0, 4).map((c) => (
            <Card key={c.label} className="mb-0">
              <div className="flex items-center gap-3 p-4">
                <div className={`flex size-10 items-center justify-center rounded-lg ${c.color}`}>
                  <c.icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink">{c.value}</p>
                  <p className="text-xs text-muted">{c.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {cards.slice(4, 8).map((c) => (
            <Card key={c.label} className="mb-0">
              <div className="flex items-center gap-3 p-4">
                <div className={`flex size-10 items-center justify-center rounded-lg ${c.color}`}>
                  <c.icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink">{c.value}</p>
                  <p className="text-xs text-muted">{c.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {cards.slice(8).map((c) => (
            <Card key={c.label} className="mb-0">
              <div className="flex items-center gap-3 p-4">
                <div className={`flex size-10 items-center justify-center rounded-lg ${c.color}`}>
                  <c.icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink">{c.value}</p>
                  <p className="text-xs text-muted">{c.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader title="Relaciones del Modelo Canónico" />
          <div className="grid grid-cols-2 gap-4 p-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-ink">Entidades Principales</h4>
              <ul className="space-y-1 text-muted">
                <li className="flex items-center gap-2"><ChevronRight className="size-3" /> TENANT → BUSINESS_PERSON (1:N)</li>
                <li className="flex items-center gap-2"><ChevronRight className="size-3" /> TENANT → PRODUCT_TYPE (1:N)</li>
                <li className="flex items-center gap-2"><ChevronRight className="size-3" /> PRODUCT_TYPE → BUSINESS_PRODUCT (1:N)</li>
                <li className="flex items-center gap-2"><ChevronRight className="size-3" /> BUSINESS_PERSON → BUSINESS_PRODUCT (1:N)</li>
                <li className="flex items-center gap-2"><ChevronRight className="size-3" /> BUSINESS_PRODUCT → PRODUCT_HOLDER (1:N)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-ink">Transacciones y Contabilidad</h4>
              <ul className="space-y-1 text-muted">
                <li className="flex items-center gap-2"><ChevronRight className="size-3" /> VOUCHER → VOUCHER_LINE (1:N)</li>
                <li className="flex items-center gap-2"><ChevronRight className="size-3" /> VOUCHER → TRANSACTION (1:N)</li>
                <li className="flex items-center gap-2"><ChevronRight className="size-3" /> TRANSACTION → TRANSACTION_ENTRY (1:N)</li>
                <li className="flex items-center gap-2"><ChevronRight className="size-3" /> TRANSACTION → TRANSACTION (1:0..1 reversión)</li>
                <li className="flex items-center gap-2"><ChevronRight className="size-3" /> BUSINESS_PRODUCT → BALANCE (1:N)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // ── Vista de entidad ────────────────────────────────────────────────────

  function renderEntidad() {
    const busqueda = textoBusqueda.toLowerCase()

    switch (activeTab) {
      case 'tenant':
        return (
          <Card>
            <CardHeader
              title="Entidad TENANT"
              right={<span className="text-xs text-muted">{tenants.length} registros</span>}
            />
            <DataTable columns={tenantColumns} rows={tenants} emptyMessage="Sin tenants" />
          </Card>
        )

      case 'business_person': {
        const filtrados = filtrarPorTenant(personas, (p) => p.tenantId).filter(
          (p) => !busqueda || p.legalName.toLowerCase().includes(busqueda) || p.identificationNumber.includes(busqueda),
        )
        return (
          <Card>
            <CardHeader
              title="Entidad BUSINESS_PERSON"
              right={<span className="text-xs text-muted">{filtrados.length} registros</span>}
            />
            <DataTable columns={personaColumns} rows={filtrados} emptyMessage="Sin personas" />
          </Card>
        )
      }

      case 'product_type':
        return (
          <Card>
            <CardHeader
              title="Entidad PRODUCT_TYPE"
              right={<span className="text-xs text-muted">{filtrarPorTenant(tiposProducto, (t) => t.tenantId).length} registros</span>}
            />
            <DataTable columns={tipoProductoColumns} rows={filtrarPorTenant(tiposProducto, (t) => t.tenantId)} emptyMessage="Sin tipos de producto" />
          </Card>
        )

      case 'business_product':
        return (
          <Card>
            <CardHeader
              title="Entidad BUSINESS_PRODUCT"
              right={<span className="text-xs text-muted">{filtrarPorTenant(productos, (p) => p.tenantId).length} registros</span>}
            />
            <DataTable columns={productoColumns} rows={filtrarPorTenant(productos, (p) => p.tenantId)} emptyMessage="Sin productos" />
          </Card>
        )

      case 'product_holder':
        return (
          <Card>
            <CardHeader
              title="Entidad PRODUCT_HOLDER"
              right={<span className="text-xs text-muted">{filtrarPorTenant(titulares, (t) => t.tenantId).length} registros</span>}
            />
            <DataTable columns={titularColumns} rows={filtrarPorTenant(titulares, (t) => t.tenantId)} emptyMessage="Sin titulares" />
          </Card>
        )

      case 'transaction_type':
        return (
          <Card>
            <CardHeader
              title="Entidad TRANSACTION_TYPE"
              right={<span className="text-xs text-muted">{filtrarPorTenant(tiposTransaccion, (t) => t.tenantId).length} registros</span>}
            />
            <DataTable columns={tipoTransaccionColumns} rows={filtrarPorTenant(tiposTransaccion, (t) => t.tenantId)} emptyMessage="Sin tipos de transacción" />
          </Card>
        )

      case 'voucher':
        return (
          <Card>
            <CardHeader
              title="Entidad VOUCHER"
              right={<span className="text-xs text-muted">{filtrarPorTenant(comprobantes, (v) => v.tenantId).length} registros</span>}
            />
            <DataTable columns={comprobanteColumns} rows={filtrarPorTenant(comprobantes, (v) => v.tenantId)} emptyMessage="Sin comprobantes" />
          </Card>
        )

      case 'transaction':
        return (
          <Card>
            <CardHeader
              title="Entidad TRANSACTION"
              right={<span className="text-xs text-muted">{filtrarPorTenant(transacciones, (t) => t.tenantId).length} registros</span>}
            />
            <DataTable columns={transaccionColumns} rows={filtrarPorTenant(transacciones, (t) => t.tenantId)} emptyMessage="Sin transacciones" />
          </Card>
        )

      case 'transaction_entry':
        return (
          <Card>
            <CardHeader
              title="Entidad TRANSACTION_ENTRY"
              right={<span className="text-xs text-muted">{filtrarPorTenant(movimientos, (m) => m.tenantId).length} registros</span>}
            />
            <DataTable columns={movimientoColumns} rows={filtrarPorTenant(movimientos, (m) => m.tenantId)} emptyMessage="Sin movimientos" />
          </Card>
        )

      case 'balance':
        return (
          <Card>
            <CardHeader
              title="Entidad BALANCE"
              right={<span className="text-xs text-muted">{filtrarPorTenant(saldos, (s) => s.tenantId).length} registros</span>}
            />
            <DataTable columns={saldoColumns} rows={filtrarPorTenant(saldos, (s) => s.tenantId)} emptyMessage="Sin saldos" />
          </Card>
        )

      default:
        return null
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-muted">Cargando modelo canónico...</div>
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink">Modelo Canónico Transversal</h1>
          <p className="text-sm text-muted">Especificación CACSA — 11 entidades · 3FN · Aislamiento por tenant</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 rounded-lg border border-line bg-surface p-1">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-brand-500 text-white'
                  : 'text-muted hover:bg-hover hover:text-ink'
              }`}
            >
              <Icon className="size-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Filtros (solo en vista de entidad, no en resumen) */}
      {activeTab !== 'resumen' && (
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full rounded border border-line bg-surface py-2 pl-9 pr-3 text-sm text-ink outline-none focus:border-brand-500"
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
            />
          </div>
          <select
            className="rounded border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand-500"
            value={filtroTenant}
            onChange={(e) => setFiltroTenant(e.target.value ? Number(e.target.value) : '')}
          >
            <option value="">Todos los tenants</option>
            {tenants.map((t) => (
              <option key={t.id} value={t.id}>{t.codigo}</option>
            ))}
          </select>
          {(textoBusqueda || filtroTenant !== '') && (
            <button
              onClick={() => { setTextoBusqueda(''); setFiltroTenant('') }}
              className="text-xs text-brand-500 hover:underline"
            >
              Limpiar
            </button>
          )}
        </div>
      )}

      {/* Contenido */}
      {activeTab === 'resumen' ? renderResumen() : renderEntidad()}
    </div>
  )
}
