import { useState, useEffect } from 'react'
import { ShieldCheck, AlertTriangle, XCircle, CheckCircle, RefreshCw, ChevronDown, ChevronRight } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge, type BadgeTone } from '@/components/ui/Badge'
import { validacionService } from '../services/validacionService'
import type { ReporteValidacion, ResultadoValidacion } from '../types/validation'
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

interface ValidacionPanelProps {
  datos: {
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
  }
}

function toneSeveridad(sev: 'ERROR' | 'ADVERTENCIA' | 'OK'): BadgeTone {
  switch (sev) {
    case 'OK': return 'success'
    case 'ADVERTENCIA': return 'warning'
    case 'ERROR': return 'danger'
  }
}

function ResultadoRow({ resultado }: { resultado: ResultadoValidacion }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-hover transition-colors"
      >
        {expanded ? (
          <ChevronDown className="size-4 text-muted shrink-0" />
        ) : (
          <ChevronRight className="size-4 text-muted shrink-0" />
        )}
        <span className="text-xs font-medium text-muted w-8">C{resultado.criterio}</span>
        <span className="flex-1 text-sm font-medium text-ink">{resultado.nombre}</span>
        <Badge tone={toneSeveridad(resultado.severidad)} dot>
          {resultado.severidad}
        </Badge>
        <span className="text-xs text-muted ml-2">
          {resultado.passedCount}/{resultado.checkedCount}
        </span>
      </button>
      {expanded && resultado.failedChecks.length > 0 && (
        <div className="bg-danger/5 border-t border-line px-4 py-3 ml-11">
          <ul className="space-y-1">
            {resultado.failedChecks.map((check, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-danger">
                <XCircle className="size-3 mt-0.5 shrink-0" />
                {check}
              </li>
            ))}
          </ul>
        </div>
      )}
      {expanded && resultado.passed && (
        <div className="bg-success/5 border-t border-line px-4 py-3 ml-11">
          <div className="flex items-center gap-2 text-xs text-success">
            <CheckCircle className="size-3" />
            Todos los checks pasaron correctamente
          </div>
        </div>
      )}
    </div>
  )
}

export function ValidacionPanel({ datos }: ValidacionPanelProps) {
  const [reporte, setReporte] = useState<ReporteValidacion | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true
    validacionService.cargarDatos(datos).then(() =>
      validacionService.ejecutarValidacion().then((r) => {
        if (active) {
          setReporte(r)
        }
      }),
    )
    return () => {
      active = false
    }
  }, [datos])

  async function ejecutar() {
    setLoading(true)
    await validacionService.cargarDatos(datos)
    const r = await validacionService.ejecutarValidacion()
    setReporte(r)
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Resumen */}
      {reporte && (
        <div className="grid grid-cols-4 gap-4">
          <Card className="mb-0">
            <div className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-info/10 text-info">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-ink">{reporte.totalReglas}</p>
                <p className="text-xs text-muted">Reglas evaluadas</p>
              </div>
            </div>
          </Card>
          <Card className="mb-0">
            <div className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-success/10 text-success">
                <CheckCircle className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-ink">{reporte.exitosas}</p>
                <p className="text-xs text-muted">Exitosas</p>
              </div>
            </div>
          </Card>
          <Card className="mb-0">
            <div className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-ink">{reporte.advertencias}</p>
                <p className="text-xs text-muted">Advertencias</p>
              </div>
            </div>
          </Card>
          <Card className="mb-0">
            <div className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-danger/10 text-danger">
                <XCircle className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-ink">{reporte.errores}</p>
                <p className="text-xs text-muted">Errores</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Detalle */}
      <Card>
        <CardHeader
          title="Resultado de Validación — 10 Criterios de Revisión Humana"
          right={
            <button
              onClick={ejecutar}
              disabled={loading}
              className="flex items-center gap-1.5 rounded bg-brand-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-600 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} />
              Re-ejecutar
            </button>
          }
        />
        {loading && !reporte && (
          <div className="p-8 text-center text-muted text-sm">Ejecutando validación...</div>
        )}
        {reporte && (
          <div>
            {reporte.resultados.map((r) => (
              <ResultadoRow key={r.id} resultado={r} />
            ))}
          </div>
        )}
      </Card>

      {/* Timestamp */}
      {reporte && (
        <p className="text-xs text-muted text-right">
          Última ejecución: {new Date(reporte.timestamp).toLocaleString('es-CO')}
        </p>
      )}
    </div>
  )
}
