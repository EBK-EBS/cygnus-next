import { useState } from 'react'
import { Expand, Eye, Printer, X } from 'lucide-react'
import clsx from 'clsx'
import { Badge, tonePorEstado } from '@/components/ui/Badge'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { aportesDe, creditosDe, depositosDe, devolucionesDe } from '@/data/mock'
import type { Aporte, Credito, Deposito, Devolucion } from '@/data/types'
import { fmt } from '@/lib/format'
import { useUIStore } from '@/store/uiStore'

type TabId = 'aporte' | 'creditos' | 'depositos' | 'devolucion'

interface ProductoDetalle {
  tipo: string
  id: string
  valor: string
  estado: string
}

/**
 * Subvista de productos — reemplaza subview-productos del original.
 * Contiene los 4 tabs (Aporte/Créditos/Depósitos/Devolución) y el panel
 * de detalle inline.
 */
export function ProductosView() {
  const currentAsoc = useUIStore((s) => s.currentAsoc)
  const showToast = useUIStore((s) => s.showToast)
  const toggleAllMini = useUIStore((s) => s.toggleProfileMini)
  const [tab, setTab] = useState<TabId>('creditos')
  const [detalle, setDetalle] = useState<ProductoDetalle | null>(null)

  const creds = creditosDe(currentAsoc.id)
  const apos = aportesDe(currentAsoc.id)
  const deps = depositosDe(currentAsoc.id)
  const devs = devolucionesDe(currentAsoc.id)

  const totalDeuda = creds.reduce((s, c) => s + c.saldo, 0)

  const credColumns: Array<Column<Credito>> = [
    {
      key: 'estado',
      header: 'Estado',
      render: (c) => <Badge tone={tonePorEstado(c.estado)} dot>{c.estado}</Badge>,
    },
    { key: 'radicacion', header: 'Radicación' },
    { key: 'linea', header: 'Línea de crédito' },
    { key: 'saldo', header: 'Saldo capital', align: 'right', render: (c) => `$ ${fmt(c.saldo)}` },
    { key: 'cuota', header: 'Cuota', align: 'right', render: (c) => `$ ${fmt(c.cuota)}` },
    { key: 'plazo', header: 'Plazo', render: (c) => `${c.plazo}` },
    {
      key: 'ver',
      header: 'Ver',
      render: (c) => (
        <button
          className="rounded p-1 text-brand-500 transition-colors hover:bg-brand-50"
          title="Ver Detalle Completo"
          onClick={(e) => {
            e.stopPropagation()
            setDetalle({ tipo: c.linea, id: c.radicacion, valor: fmt(c.saldo), estado: c.estado })
          }}
        >
          <Eye className="size-4" />
        </button>
      ),
    },
  ]

  const aporteColumns: Array<Column<Aporte>> = [
    { key: 'tipo', header: 'Tipo' },
    { key: 'numero', header: 'Número' },
    { key: 'saldo', header: 'Saldo', align: 'right', render: (a) => `$ ${fmt(a.saldo)}` },
    {
      key: 'estado',
      header: 'Estado',
      render: (a) => <Badge tone={tonePorEstado(a.estado)}>{a.estado}</Badge>,
    },
  ]

  const depositoColumns: Array<Column<Deposito>> = [
    { key: 'tipo', header: 'Tipo' },
    { key: 'numero', header: 'Número' },
    { key: 'saldo', header: 'Saldo', align: 'right', render: (d) => `$ ${fmt(d.saldo)}` },
    { key: 'tasa', header: 'Tasa' },
    { key: 'vencimiento', header: 'Vcto' },
  ]

  const devolucionColumns: Array<Column<Devolucion>> = [
    { key: 'concepto', header: 'Concepto' },
    { key: 'fecha', header: 'Fecha' },
    { key: 'valor', header: 'Valor', align: 'right', render: (d) => `$ ${fmt(d.valor)}` },
    {
      key: 'estado',
      header: 'Estado',
      render: (d) => <Badge tone={tonePorEstado(d.estado)}>{d.estado}</Badge>,
    },
  ]

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: 'aporte', label: 'Aporte - Ahorro' },
    { id: 'creditos', label: 'Créditos' },
    { id: 'depositos', label: 'Depósitos' },
    { id: 'devolucion', label: 'Devolución' },
  ]

  return (
    <>
      <div className="rounded-lg border border-line bg-card shadow-soft">
        <div className="flex items-center gap-5 overflow-x-auto border-b border-line bg-card px-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id)
                setDetalle(null)
              }}
              className={clsx(
                'whitespace-nowrap border-b-2 py-3.5 text-sm font-medium transition-colors',
                tab === t.id
                  ? 'border-brand-500 text-brand-500'
                  : 'border-transparent text-muted hover:text-ink',
              )}
            >
              {t.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2.5">
            <button
              onClick={toggleAllMini}
              title="Maximizar espacio (Contraer todos los paneles)"
              className="cursor-pointer text-muted hover:text-brand-500"
            >
              <Expand className="size-4" />
            </button>
          </div>
        </div>

        <div className="p-5">
          {tab === 'aporte' && (
            <>
              <h3 className="mb-4 text-base font-semibold text-ink">Resumen de Aportes y Ahorros</h3>
              <DataTable columns={aporteColumns} rows={apos} emptyMessage="No tiene aportes" />
            </>
          )}

          {tab === 'creditos' && (
            <>
              <h3 className="mb-4 text-base font-semibold text-ink">Resumen de Créditos</h3>
              <DataTable
                columns={credColumns}
                rows={creds}
                emptyMessage="No tiene créditos"
                onRowClick={(c) =>
                  setDetalle({ tipo: c.linea, id: c.radicacion, valor: fmt(c.saldo), estado: c.estado })
                }
              />
              <div className="mt-4 flex flex-wrap justify-around gap-2.5 border-t border-line bg-card pt-5">
                <div className="text-center">
                  <div className="text-xs uppercase text-muted">Deuda actual</div>
                  <div className="mt-1 text-xl font-bold text-ink">$ {fmt(totalDeuda)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs uppercase text-muted">Cupo rotativo</div>
                  <div className="mt-1 text-xl font-bold text-ink">$ {fmt(currentAsoc.cupoRotativo)}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs uppercase text-muted">Total a pagar</div>
                  <div className="mt-1 text-xl font-bold text-brand-500">
                    $ {fmt(totalDeuda > 0 ? totalDeuda - currentAsoc.cupoRotativo : 0)}
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === 'depositos' && (
            <>
              <h3 className="mb-4 text-base font-semibold text-ink">Resumen de Depósitos</h3>
              <DataTable columns={depositoColumns} rows={deps} emptyMessage="No tiene depósitos" />
            </>
          )}

          {tab === 'devolucion' && (
            <>
              <h3 className="mb-4 text-base font-semibold text-ink">Resumen de Devoluciones</h3>
              <DataTable columns={devolucionColumns} rows={devs} emptyMessage="No tiene devoluciones" />
            </>
          )}
        </div>
      </div>

      {/* Panel de detalle inline */}
      {detalle && (
        <div className="rounded-lg border border-line bg-card shadow-soft">
          <div className="flex items-center justify-between border-b border-line bg-hover px-5 py-3.5 font-semibold text-ink">
            <span>Detalle de Producto: {detalle.id}</span>
            <div className="flex gap-2.5">
              <button
                className="rounded p-1 text-brand-500 hover:bg-brand-50"
                onClick={() => showToast('Imprimiendo detalle')}
              >
                <Printer className="size-4" />
              </button>
              <button className="rounded p-1 text-muted hover:bg-hover" onClick={() => setDetalle(null)}>
                <X className="size-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 p-5">
            <div>
              <span className="block text-[0.7rem] uppercase text-muted">Tipo</span>
              <input className="w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink" value={detalle.tipo} readOnly />
            </div>
            <div>
              <span className="block text-[0.7rem] uppercase text-muted">Identificador</span>
              <input className="w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink" value={detalle.id} readOnly />
            </div>
            <div>
              <span className="block text-[0.7rem] uppercase text-muted">Estado / Info</span>
              <input className="w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink" value={detalle.estado} readOnly />
            </div>
            <div className="col-span-3">
              <span className="block text-[0.7rem] uppercase text-muted">Saldo / Valor</span>
              <input className="w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink" value={`$ ${detalle.valor}`} readOnly />
            </div>
            <div>
              <span className="block text-[0.7rem] uppercase text-muted">Fecha corte</span>
              <input className="w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink" value="25/08/2026" readOnly />
            </div>
            <div>
              <span className="block text-[0.7rem] uppercase text-muted">Origen</span>
              <input className="w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink" value="Pago por Nómina" readOnly />
            </div>
          </div>
        </div>
      )}
    </>
  )
}