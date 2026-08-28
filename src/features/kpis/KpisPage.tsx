import { Card, CardHeader } from '@/components/ui/Card'

interface Indicador {
  value: string
  label: string
  color: string
}

const CAMEL: Indicador[] = [
  { value: '12.4%', label: 'Capital', color: 'text-brand-500' },
  { value: '85.2%', label: 'Activos', color: 'text-info' },
  { value: '2.8%', label: 'Manejo', color: 'text-warning' },
  { value: '9.1%', label: 'Rentabilidad', color: 'text-[#8b5cf6]' },
]

const PERLAS: Indicador[] = [
  { value: '10.5%', label: 'Protección', color: 'text-brand-500' },
  { value: '75.0%', label: 'Estructura', color: 'text-info' },
  { value: '5.2%', label: 'Rendimientos', color: 'text-warning' },
  { value: '15.3%', label: 'Liquidez', color: 'text-[#8b5cf6]' },
]

/** Indicadores Cooperativos (CAMEL y PERLAS) — reemplaza view-kpis. */
export function KpisPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5 text-2xl font-bold text-brand-500">
          Indicadores Cooperativos
        </div>
      </div>

      <Card>
        <CardHeader title="Indicadores CAMEL" />
        <div className="grid grid-cols-4 gap-4 p-5">
          {CAMEL.map((c) => (
            <div key={c.label} className="rounded-lg border border-line bg-card p-4 text-center shadow-soft">
              <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
              <div className="mt-1 text-xs uppercase text-muted">{c.label}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Indicadores PERLAS" />
        <div className="grid grid-cols-4 gap-4 p-5">
          {PERLAS.map((p) => (
            <div key={p.label} className="rounded-lg border border-line bg-card p-4 text-center shadow-soft">
              <div className={`text-2xl font-bold ${p.color}`}>{p.value}</div>
              <div className="mt-1 text-xs uppercase text-muted">{p.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}