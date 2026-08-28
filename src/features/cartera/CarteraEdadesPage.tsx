import { Badge, tonePorEstado } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { fmt } from '@/lib/format'

interface RangoEdad {
  rango: string
  creditos: number
  saldo: number
  estado: string
}

const RANGOS: RangoEdad[] = [
  { rango: '0 - 30 días', creditos: 24, saldo: 18450000, estado: 'Normal' },
  { rango: '31 - 60 días', creditos: 8, saldo: 5230000, estado: 'Vigilancia' },
  { rango: '61 - 90 días', creditos: 3, saldo: 2100000, estado: 'Riesgo' },
  { rango: '91 - 180 días', creditos: 2, saldo: 890000, estado: 'Mora' },
]

/** Cartera por Edades — reemplaza view-cartera-edades. */
export function CarteraEdadesPage() {
  const columns: Array<Column<RangoEdad>> = [
    { key: 'rango', header: 'Rango de días' },
    { key: 'creditos', header: '# Créditos', align: 'center' },
    { key: 'saldo', header: 'Saldo Total', align: 'right', render: (r) => `$ ${fmt(r.saldo)}` },
    { key: 'estado', header: 'Estado', render: (r) => <Badge tone={tonePorEstado(r.estado)}>{r.estado}</Badge> },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5 text-2xl font-bold text-brand-500">
          Cartera por Edades
        </div>
      </div>
      <Card>
        <DataTable columns={columns} rows={RANGOS} className="p-2.5" />
      </Card>
    </div>
  )
}