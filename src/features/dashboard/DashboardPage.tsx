import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'

const operaciones = [
  { hora: '8am', ops: 5 },
  { hora: '10am', ops: 12 },
  { hora: '12pm', ops: 8 },
  { hora: '2pm', ops: 15 },
  { hora: '4pm', ops: 6 },
]

const distribucion = [
  { name: 'Créditos', value: 50 },
  { name: 'Aportes', value: 30 },
  { name: 'Giros', value: 20 },
]

const PIE_COLORS = ['#10b981', '#f59e0b', '#3b82f6']

interface Kpi {
  label: string
  value: string
  delta: string
  up: boolean
  valueColor?: string
}

const kpis: Kpi[] = [
  { label: 'Operaciones del Día', value: '47', delta: '12% vs ayer', up: true },
  { label: 'Créditos Aprobados', value: '$ 125M', delta: 'Esta semana', up: true, valueColor: 'text-brand-500' },
  { label: 'Notificaciones', value: '8', delta: 'Pendientes', up: false },
]

/** Dashboard General-Usuario — reemplaza view-dashboard (KPIs + gráficos). */
export function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="page-header flex flex-col gap-1">
        <div className="flex items-center gap-2.5 text-2xl font-bold text-brand-500">
          Dashboard General
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-lg border border-line bg-card p-4 shadow-soft">
            <div className="text-xs uppercase text-muted">{k.label}</div>
            <div className={`mt-1 text-2xl font-bold text-ink ${k.valueColor ?? ''}`}>{k.value}</div>
            <div className={`mt-1 flex items-center gap-1 text-xs ${k.up ? 'text-brand-500' : 'text-danger'}`}>
              {k.up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="mb-0">
          <CardHeader title="Operaciones por Hora" />
          <div className="h-[200px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={operaciones}>
                <XAxis dataKey="hora" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="ops" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="mb-0">
          <CardHeader title="Distribución" />
          <div className="h-[200px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribucion} dataKey="value" nameKey="name" innerRadius="60%" outerRadius="90%" paddingAngle={2}>
                  {distribucion.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}