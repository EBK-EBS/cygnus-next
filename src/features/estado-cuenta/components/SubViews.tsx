import { useMemo, useState } from 'react'
import { Building2, Calculator, FileSearch, ListChecks, Banknote, Shuffle, TableProperties, Users } from 'lucide-react'
import { Badge, tonePorEstado } from '@/components/ui/Badge'
import { Card, CardHeader } from '@/components/ui/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { Modal } from '@/components/ui/Modal'
import { ASOCIADOS, COMPROBANTES, EMPRESA, GIROS, LISTAS, NOVEDADES, aportesDe, creditosDe, depositosDe } from '@/data/mock'
import type { Comprobante, Giro, ListaNomina, Novedad } from '@/data/types'
import { calcularCuota, fmt } from '@/lib/format'
import { useUIStore } from '@/store/uiStore'

/* ============ EMPRESA ============ */
export function EmpresaView() {
  const fields = [
    ['NIT', EMPRESA.nit],
    ['Razón Social', EMPRESA.razonSocial],
    ['Dirección', EMPRESA.direccion],
    ['Ciudad', EMPRESA.ciudad],
    ['Teléfono', EMPRESA.telefono],
    ['Correo', EMPRESA.correo],
    ['Sector', EMPRESA.sector],
    ['Representante Legal', EMPRESA.representanteLegal],
    ['No. Empleados', String(EMPRESA.numEmpleados)],
  ] as const

  return (
    <Card>
      <CardHeader title="Información de la Empresa" />
      <div className="grid grid-cols-3 gap-4 p-5">
        {fields.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1">
            <span className="text-[0.7rem] font-semibold uppercase text-muted">{label}</span>
            <input className="w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink" value={value} readOnly />
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ============ PERSONAS ============ */
export function PersonasView() {
  const [q, setQ] = useState('')
  const setCurrentAsoc = useUIStore((s) => s.setCurrentAsoc)
  const showToast = useUIStore((s) => s.showToast)

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return ASOCIADOS
    return ASOCIADOS.filter((a) => a.nombre.toLowerCase().includes(query) || a.cedula.includes(query))
  }, [q])

  const select = (id: number) => {
    setCurrentAsoc(id)
    showToast('Asociado seleccionado')
  }

  return (
    <Card>
      <CardHeader title="Directorio de Personas" />
      <div className="p-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar asociado..."
          className="mb-4 max-w-[400px] rounded border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand-500"
        />
        <div className="flex flex-col gap-2.5">
          {filtered.map((a) => (
            <button
              key={a.id}
              onClick={() => select(a.id)}
              className="flex items-center gap-3 rounded-lg border border-line bg-card px-3.5 py-2.5 text-left transition-all hover:border-brand-500 hover:bg-active"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#6366f1] font-semibold text-white">
                {a.nombre.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-medium text-ink">{a.nombre}</span>
                <span className="block text-xs text-muted">{a.cedula} - {a.empresa}</span>
              </span>
            </button>
          ))}
          {filtered.length === 0 && <p className="py-6 text-center text-sm text-muted">Sin resultados</p>}
        </div>
      </div>
    </Card>
  )
}

/* ============ REPORTE LISTA ============ */
export function ReporteListaView() {
  const columns: Array<Column<ListaNomina>> = [
    { key: 'fecha', header: 'Fecha' },
    { key: 'num', header: 'Número Lista' },
    { key: 'tipo', header: 'Tipo' },
    { key: 'total', header: 'Valor Total', align: 'right', render: (l) => `$ ${fmt(l.total)}` },
    { key: 'asoc', header: 'Valor Asociado', align: 'right', render: (l) => `$ ${fmt(l.asoc)}` },
    { key: 'est', header: 'Estado', render: (l) => <Badge tone={tonePorEstado(l.est)}>{l.est}</Badge> },
  ]
  return (
    <Card>
      <CardHeader title="Reporte de Listas de Descuento" />
      <DataTable columns={columns} rows={LISTAS} className="p-2.5" />
    </Card>
  )
}

/* ============ COMPROBANTES ============ */
export function ComprobantesView() {
  const [selected, setSelected] = useState<Comprobante | null>(null)
  const columns: Array<Column<Comprobante>> = [
    { key: 'fecha', header: 'Fecha' },
    { key: 'num', header: 'Número' },
    { key: 'concepto', header: 'Concepto' },
    { key: 'debito', header: 'Débito', align: 'right', render: (c) => `$ ${fmt(c.debito)}` },
    { key: 'credito', header: 'Crédito', align: 'right', render: (c) => `$ ${fmt(c.credito)}` },
  ]
  return (
    <>
      <Card>
        <CardHeader title="Comprobantes Contables" />
        <DataTable
          columns={columns}
          rows={COMPROBANTES}
          className="p-2.5"
          onRowClick={(c) => setSelected(c)}
        />
      </Card>
      <Modal id="modalComprobante" open={!!selected} onClose={() => setSelected(null)} title="Detalle Comprobante">
        {selected && (
          <div className="text-sm text-ink">
            <p className="font-semibold">{selected.num} - {selected.concepto}</p>
            <p className="mt-3">Débito: ${fmt(selected.debito)}</p>
            <p>Crédito: ${fmt(selected.credito)}</p>
          </div>
        )}
      </Modal>
    </>
  )
}

/* ============ GIROS ============ */
export function GirosView() {
  const columns: Array<Column<Giro>> = [
    { key: 'fecha', header: 'Fecha' },
    { key: 'concepto', header: 'Concepto' },
    { key: 'valor', header: 'Valor', align: 'right', render: (g) => `$ ${fmt(g.valor)}` },
    { key: 'dest', header: 'Destinatario' },
    { key: 'est', header: 'Estado', render: (g) => <Badge tone={tonePorEstado(g.est)}>{g.est}</Badge> },
  ]
  return (
    <Card>
      <CardHeader title="Giros Pendientes" />
      <DataTable columns={columns} rows={GIROS} className="p-2.5" />
    </Card>
  )
}

/* ============ NOVEDADES ============ */
export function NovedadesView() {
  const columns: Array<Column<Novedad>> = [
    { key: 'fecha', header: 'Fecha' },
    { key: 'prod', header: 'Producto' },
    { key: 'campo', header: 'Campo' },
    { key: 'ant', header: 'Anterior' },
    { key: 'nue', header: 'Nuevo', render: (n) => <span className="font-semibold text-brand-500">{n.nue}</span> },
    { key: 'usr', header: 'Usuario' },
  ]
  return (
    <Card>
      <CardHeader title="Registro de Novedades" />
      <DataTable columns={columns} rows={NOVEDADES} className="p-2.5" />
    </Card>
  )
}

/* ============ CRUCE CUENTAS ============ */
export function CruceCuentasView() {
  const currentAsoc = useUIStore((s) => s.currentAsoc)
  const totalAportes = aportesDe(currentAsoc.id).reduce((s, a) => s + a.saldo, 0)
  const totalDepositos = depositosDe(currentAsoc.id).reduce((s, d) => s + d.saldo, 0)
  const totalDeuda = creditosDe(currentAsoc.id).reduce((s, c) => s + c.saldo, 0)
  const pasivos = totalAportes + totalDepositos
  const resultado = pasivos - totalDeuda

  return (
    <Card>
      <CardHeader title="Simulación Cruce de Cuentas" />
      <div className="grid grid-cols-2 gap-5 p-5">
        <div className="rounded-lg border border-line p-4">
          <h4 className="mb-2.5 text-brand-500">Pasivos (A favor del asociado)</h4>
          <div className="mb-1 flex justify-between"><span>Aportes y Ahorros:</span> <strong>$ {fmt(totalAportes)}</strong></div>
          <div className="mb-4 flex justify-between"><span>Depósitos:</span> <strong>$ {fmt(totalDepositos)}</strong></div>
          <div className="flex justify-between border-t border-line pt-2.5">
            <strong>Subtotal:</strong> <strong className="text-brand-500">$ {fmt(pasivos)}</strong>
          </div>
        </div>
        <div className="rounded-lg border border-line p-4">
          <h4 className="mb-2.5 text-danger">Activos (Deuda a la entidad)</h4>
          <div className="mb-4 flex justify-between"><span>Créditos Vigentes:</span> <strong>$ {fmt(totalDeuda)}</strong></div>
          <div className="flex justify-between border-t border-line pt-2.5">
            <strong>Resultado:</strong>
            <strong className={`text-xl ${resultado >= 0 ? 'text-brand-500' : 'text-danger'}`}>$ {fmt(resultado)}</strong>
          </div>
        </div>
      </div>
    </Card>
  )
}

/* ============ SIMULACIÓN ============ */
export function SimulacionView() {
  const [monto, setMonto] = useState(10000000)
  const [plazo, setPlazo] = useState(24)
  const [tasa, setTasa] = useState(1.5)
  const [resultado, setResultado] = useState<{ cuota: number; total: number } | null>(null)

  const calcular = () => {
    const cuota = calcularCuota(monto, plazo, tasa / 100)
    if (cuota > 0) setResultado({ cuota, total: cuota * plazo })
  }

  return (
    <Card>
      <CardHeader title="Simulación de Pagos" />
      <div className="grid grid-cols-3 gap-4 p-5">
        <div className="flex flex-col gap-1">
          <label className="text-[0.7rem] uppercase text-muted">Monto Solicitado</label>
          <input type="number" className="rounded border border-line bg-surface px-3 py-2 text-sm text-ink" value={monto} onChange={(e) => setMonto(Number(e.target.value))} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[0.7rem] uppercase text-muted">Plazo (meses)</label>
          <input type="number" className="rounded border border-line bg-surface px-3 py-2 text-sm text-ink" value={plazo} onChange={(e) => setPlazo(Number(e.target.value))} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[0.7rem] uppercase text-muted">Tasa Mensual (%)</label>
          <input type="number" step="0.1" className="rounded border border-line bg-surface px-3 py-2 text-sm text-ink" value={tasa} onChange={(e) => setTasa(Number(e.target.value))} />
        </div>
        <div className="col-span-3">
          <button
            onClick={calcular}
            className="rounded-md bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Calcular
          </button>
        </div>
      </div>
      {resultado && (
        <div className="border-t border-line p-5">
          <h4 className="mb-4">Resultado Estimado</h4>
          <div className="flex gap-5">
            <div className="flex-1 rounded-lg border border-line p-4 text-center">
              <div className="text-xs uppercase text-muted">Cuota Mensual</div>
              <div className="mt-1 text-2xl font-bold text-brand-500">$ {fmt(resultado.cuota)}</div>
            </div>
            <div className="flex-1 rounded-lg border border-line p-4 text-center">
              <div className="text-xs uppercase text-muted">Total a Pagar</div>
              <div className="mt-1 text-2xl font-bold text-ink">$ {fmt(resultado.total)}</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

/* ============ ÍCONOS EXPORTADOS PARA TOOLBAR ============ */
export const SubViewIcons = {
  empresa: Building2,
  personas: Users,
  reporteLista: ListChecks,
  comprobantes: FileSearch,
  giros: Banknote,
  novedades: TableProperties,
  cruce: Shuffle,
  simulacion: Calculator,
}