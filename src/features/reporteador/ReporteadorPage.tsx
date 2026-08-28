import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Loader2, Printer, Sparkles, Table2, Wand2 } from 'lucide-react'
import clsx from 'clsx'
import { Card } from '@/components/ui/Card'
import { getEnrichedAssociates } from '@/data/mock'
import { analyzeReportWithAI } from '@/lib/api/deepseek'
import { beautifyHeader, fmt, nombreCorto } from '@/lib/format'

interface Campo {
  value: string
  label: string
  group: 'asociado' | 'creditos' | 'captaciones'
  monetary?: boolean
}

const CAMPOS: Campo[] = [
  { value: 'nombre', label: 'Nombre Completo', group: 'asociado' },
  { value: 'cedula', label: 'Cédula', group: 'asociado' },
  { value: 'empresa', label: 'Empresa', group: 'asociado' },
  { value: 'ciudad', label: 'Ciudad', group: 'asociado' },
  { value: 'sueldo', label: 'Sueldo Base', group: 'asociado', monetary: true },
  { value: 'score', label: 'Score Financiero', group: 'asociado' },
  { value: 'totalDeuda', label: 'Total Deuda Créditos', group: 'creditos', monetary: true },
  { value: 'cupoRotativo', label: 'Cupo Rotativo', group: 'creditos', monetary: true },
  { value: 'lineasCredito', label: 'Líneas de Crédito', group: 'creditos' },
  { value: 'estadosCredito', label: 'Estados de Créditos', group: 'creditos' },
  { value: 'totalAportes', label: 'Total Aportes', group: 'captaciones', monetary: true },
  { value: 'tiposAportes', label: 'Tipos de Aportes', group: 'captaciones' },
  { value: 'totalDepositos', label: 'Total Depósitos', group: 'captaciones', monetary: true },
  { value: 'tiposDepositos', label: 'Tipos de Depósitos', group: 'captaciones' },
  { value: 'totalDevoluciones', label: 'Total Devoluciones', group: 'captaciones', monetary: true },
]

const GRUPOS: Array<{ id: Campo['group']; titulo: string }> = [
  { id: 'asociado', titulo: 'Datos del Asociado' },
  { id: 'creditos', titulo: 'Créditos y Cartera' },
  { id: 'captaciones', titulo: 'Captaciones y Otros' },
]

const METRICAS = CAMPOS.filter((c) => c.monetary || ['sueldo', 'score'].includes(c.value))

const CHART_TYPES = [
  { value: 'bar', label: 'Barras' },
  { value: 'line', label: 'Línea' },
  { value: 'pie', label: 'Pastel (Pie)' },
  { value: 'doughnut', label: 'Dona (Doughnut)' },
  { value: 'radar', label: 'Radar' },
  { value: 'polarArea', label: 'Área Polar' },
] as const

type ChartType = (typeof CHART_TYPES)[number]['value']

const CHART_COLORS = [
  '#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6',
  '#14b8a6', '#f97316', '#06b6d4', '#ec4899', '#6366f1',
  '#84cc16', '#d946ef',
]

const MONETARY_FIELDS = new Set([
  'sueldo', 'cupoRotativo', 'totalDeuda', 'totalAportes', 'totalDepositos', 'totalDevoluciones',
])

type AdhocTab = 'tabla' | 'grafica'

/**
 * Reporteador Ad-Hoc Asistido por IA — reemplaza view-reporteador.
 * Genera tablas y gráficas dinámicas sobre los asociados enriquecidos,
 * y envía el reporte a DeepSeek para obtener insights.
 */
export function ReporteadorPage() {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(['nombre', 'cedula', 'sueldo', 'totalDeuda']),
  )
  const [metric, setMetric] = useState('sueldo')
  const [chartType, setChartType] = useState<ChartType>('bar')
  const [tab, setTab] = useState<AdhocTab>('tabla')
  const [aiResult, setAiResult] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)

  const dataList = useMemo(() => getEnrichedAssociates(), [])

  const toggleField = (value: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })
  }

  const fieldValue = (row: Record<string, unknown>, field: string) => {
    const v = row[field]
    if (MONETARY_FIELDS.has(field) && typeof v === 'number') return `$ ${fmt(v)}`
    return String(v ?? '')
  }

  const analyze = async () => {
    if (selected.size === 0) return
    setAiLoading(true)
    setAiResult(null)
    try {
      const simpleData = dataList.map((a) => {
        const obj: Record<string, unknown> = {}
        selected.forEach((f) => {
          obj[f] = (a as unknown as Record<string, unknown>)[f]
        })
        return obj
      })
      const result = await analyzeReportWithAI(JSON.stringify(simpleData))
      setAiResult(result)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error de conexión con la API de DeepSeek.'
      setAiResult(`<span style="color:var(--color-danger)">${msg}. Verifica la consola.</span>`)
    } finally {
      setAiLoading(false)
    }
  }

  const renderChart = () => {
    const labels = dataList.map((a) => nombreCorto(a.nombre))
    const data = dataList.map((a) => Number((a as unknown as Record<string, unknown>)[metric]) || 0)

    if (chartType === 'pie' || chartType === 'doughnut') {
      const pieData = labels.map((name, i) => ({ name, value: data[i] }))
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={chartType === 'doughnut' ? '55%' : 0}
              outerRadius="85%"
              paddingAngle={2}
              label
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )
    }

    if (chartType === 'radar') {
      const radarData = labels.map((name, i) => ({ name, value: data[i] }))
      return (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
            <PolarRadiusAxis />
            <Radar dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      )
    }

    if (chartType === 'polarArea') {
      const polarData = labels.map((name, i) => ({ name, value: data[i] }))
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={polarData} dataKey="value" nameKey="name" outerRadius="90%">
              {polarData.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )
    }

    const chartData = labels.map((name, i) => ({ name, value: data[i] }))
    return (
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'line' ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5 text-2xl font-bold text-brand-500">
          Reporteador Ad-Hoc Asistido por IA
        </div>
      </div>

      <Card className="mb-0 p-5">
        <h4 className="mb-4 border-b border-line pb-2.5 text-base font-semibold text-ink">
          1. Configurar Datos a Extraer
        </h4>
        <div className="mb-5 grid grid-cols-3 gap-5 rounded-lg border border-line bg-surface p-4">
          {GRUPOS.map((g) => (
            <div key={g.id}>
              <h5 className="mb-2.5 border-b border-line pb-1 text-sm font-semibold text-ink">
                {g.titulo}
              </h5>
              <div className="flex flex-col gap-1.5">
                {CAMPOS.filter((c) => c.group === g.id).map((c) => (
                  <label key={c.value} className="flex cursor-pointer items-center gap-2 text-sm text-ink">
                    <input
                      type="checkbox"
                      checked={selected.has(c.value)}
                      onChange={() => toggleField(c.value)}
                      className="size-4 accent-brand-500"
                    />
                    {c.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-5 grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-[0.7rem] uppercase text-muted">Métrica para Gráfica:</label>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="rounded border border-line bg-surface px-3 py-2 text-sm text-ink"
            >
              {METRICAS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[0.7rem] uppercase text-muted">Tipo de Gráfica:</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as ChartType)}
              className="rounded border border-line bg-surface px-3 py-2 text-sm text-ink"
            >
              {CHART_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={() => setTab('tabla')}
            className="flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Table2 className="size-4" /> Generar Tabla
          </button>
          <button
            onClick={() => setTab('grafica')}
            className="flex items-center gap-2 rounded-md border border-brand-500 px-4 py-2 text-sm font-semibold text-brand-500 transition-colors hover:bg-brand-50"
          >
            Generar Gráfica
          </button>
        </div>
      </Card>

      {/* Resultados */}
      <Card className="mb-0 flex min-h-[400px] flex-col">
        <div className="flex items-center gap-5 overflow-x-auto border-b border-line bg-card px-4">
          <button
            onClick={() => setTab('tabla')}
            className={clsx(
              'whitespace-nowrap border-b-2 py-3.5 text-sm font-medium',
              tab === 'tabla' ? 'border-brand-500 text-brand-500' : 'border-transparent text-muted',
            )}
          >
            Vista Tabla
          </button>
          <button
            onClick={() => setTab('grafica')}
            className={clsx(
              'whitespace-nowrap border-b-2 py-3.5 text-sm font-medium',
              tab === 'grafica' ? 'border-brand-500 text-brand-500' : 'border-transparent text-muted',
            )}
          >
            Vista Gráfica
          </button>
          <button
            onClick={() => window.print()}
            title="Imprimir"
            className="ml-auto text-muted transition-colors hover:text-brand-500"
          >
            <Printer className="size-4" />
          </button>
        </div>

        {tab === 'tabla' ? (
          <div className="flex-1 overflow-x-auto p-5">
            {selected.size === 0 ? (
              <p className="py-12 text-center text-muted">Seleccione al menos un campo.</p>
            ) : (
              <table className="w-full border-collapse text-[0.8rem]">
                <thead>
                  <tr className="bg-hover">
                    {[...selected].map((f) => (
                      <th key={f} className="px-2.5 py-2.5 text-left text-[0.75rem] font-medium uppercase text-muted">
                        {beautifyHeader(f)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataList.map((a, i) => (
                    <tr key={i} className="border-b border-line">
                      {[...selected].map((f) => (
                        <td key={f} className="px-2.5 py-3">
                          {fieldValue(a as unknown as Record<string, unknown>, f)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div className="relative h-[350px] w-full flex-1 p-5">
            {renderChart()}
          </div>
        )}
      </Card>

      {/* Análisis IA */}
      <Card className="mb-0 border-[#cbd5e1] bg-slate-50 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-base font-semibold text-brand-500">
            <Sparkles className="size-4" /> Análisis DeepSeek IA-COOP
          </h4>
          <button
            onClick={analyze}
            disabled={aiLoading || selected.size === 0}
            className="flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {aiLoading ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
            Analizar Reporte Actual
          </button>
        </div>
        <div
          className="min-h-[100px] rounded-md border border-line bg-card p-4 text-sm leading-relaxed text-ink"
          dangerouslySetInnerHTML={{
            __html: aiLoading
              ? '<i class="fa-solid fa-spinner fa-spin"></i> Analizando datos con DeepSeek...'
              : aiResult ?? 'Presiona el botón para enviar los datos de la tabla a la IA para obtener insights clave.',
          }}
        />
      </Card>
    </div>
  )
}