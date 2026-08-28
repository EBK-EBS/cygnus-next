import { Link, useParams } from 'react-router-dom'
import {
  Building2,
  Calculator,
  FileSearch,
  HandCoins,
  Layers,
  ListChecks,
  ListFilter,
  Banknote,
  Printer,
  RefreshCw,
  Shuffle,
  TableProperties,
  User,
} from 'lucide-react'
import clsx from 'clsx'
import { ProfileCard } from './components/ProfileCard'
import { ProductosView } from './components/ProductosView'
import {
  ComprobantesView,
  CruceCuentasView,
  EmpresaView,
  GirosView,
  NovedadesView,
  PersonasView,
  ReporteListaView,
  SimulacionView,
} from './components/SubViews'
import { fmt } from '@/lib/format'
import { useUIStore } from '@/store/uiStore'

type SubviewId =
  | 'productos'
  | 'empresa'
  | 'personas'
  | 'reporte-lista'
  | 'comprobantes'
  | 'giros'
  | 'novedades'
  | 'cruce-cuentas'
  | 'simulacion'

const SUBVIEWS: Record<SubviewId, { label: string; icon: React.ReactNode; component: React.ReactNode }> = {
  productos: { label: 'Resumen', icon: <Layers className="size-4" />, component: <ProductosView /> },
  empresa: { label: 'Empresa', icon: <Building2 className="size-4" />, component: <EmpresaView /> },
  personas: { label: 'Personas', icon: <User className="size-4" />, component: <PersonasView /> },
  'reporte-lista': { label: 'Reporte Listas', icon: <ListChecks className="size-4" />, component: <ReporteListaView /> },
  comprobantes: { label: 'Comprobantes', icon: <FileSearch className="size-4" />, component: <ComprobantesView /> },
  giros: { label: 'Giros', icon: <Banknote className="size-4" />, component: <GirosView /> },
  novedades: { label: 'Novedades', icon: <TableProperties className="size-4" />, component: <NovedadesView /> },
  'cruce-cuentas': { label: 'Cruce Cuentas', icon: <Shuffle className="size-4" />, component: <CruceCuentasView /> },
  simulacion: { label: 'Simulación', icon: <Calculator className="size-4" />, component: <SimulacionView /> },
}

const TOOLBAR: Array<{ id: SubviewId; label: string; icon: React.ReactNode; toast?: string }> = [
  { id: 'productos', label: 'Resumen', icon: <Layers className="size-4" /> },
  { id: 'novedades', label: 'Novedades', icon: <TableProperties className="size-4" /> },
  { id: 'empresa', label: 'Empresa', icon: <Building2 className="size-4" /> },
  { id: 'reporte-lista', label: 'Reporte Listas', icon: <ListChecks className="size-4" /> },
  { id: 'cruce-cuentas', label: 'Cruce Cuentas', icon: <Shuffle className="size-4" /> },
  { id: 'simulacion', label: 'Simulación', icon: <Calculator className="size-4" /> },
  { id: 'comprobantes', label: 'Comprobantes', icon: <FileSearch className="size-4" /> },
  { id: 'personas', label: 'Personas', icon: <User className="size-4" /> },
  { id: 'giros', label: 'Giros', icon: <Banknote className="size-4" /> },
]

/**
 * Estado de Cuenta 360° — reemplaza view-estado-cuenta del original.
 * La subvista activa se deriva de la URL (:subview), con 'productos' por defecto.
 */
export function EstadoCuentaPage() {
  const { subview } = useParams<{ subview: string }>()
  const currentAsoc = useUIStore((s) => s.currentAsoc)
  const showToast = useUIStore((s) => s.showToast)
  const profileMini = useUIStore((s) => s.profileMini)

  const active: SubviewId = (subview as SubviewId) in SUBVIEWS ? (subview as SubviewId) : 'productos'

  const refresh = () => {
    showToast('Datos actualizados')
  }

  const print = () => {
    window.print()
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5 text-2xl font-bold text-brand-500">
          <img
            src="/images/IconoEstadoDeCuenta.png"
            alt="Icono Estado de Cuenta"
            className="mr-2.5 h-8 object-contain"
          />
          Estado de Cuenta 360°
        </div>
        <div className="text-sm text-muted">
          Asociado: <strong className="text-brand-500">{currentAsoc.nombre}</strong> | Cédula:{' '}
          <span>{currentAsoc.cedula}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 rounded-lg border border-line bg-card px-4 py-2.5 shadow-soft">
        <button onClick={print} className="flex min-w-[60px] flex-col items-center gap-1 text-xs text-muted transition-colors hover:text-brand-500">
          <Printer className="size-4 text-ink" />
          Imprimir
        </button>
        <button onClick={refresh} className="flex min-w-[60px] flex-col items-center gap-1 text-xs text-muted transition-colors hover:text-brand-500">
          <RefreshCw className="size-4 text-ink" />
          Refrescar
        </button>
        <div className="h-full w-px bg-line" />
        {TOOLBAR.map((t) => (
          <Link
            key={t.id}
            to={`/estado-cuenta/${t.id}`}
            className={clsx(
              'flex min-w-[60px] flex-col items-center gap-1 text-xs transition-colors',
              active === t.id ? 'text-brand-500' : 'text-muted hover:text-brand-500',
            )}
          >
            {t.icon}
            {t.label}
          </Link>
        ))}
        <button
          onClick={() => showToast('Ir a módulo de solicitudes')}
          className="flex min-w-[60px] flex-col items-center gap-1 text-xs text-muted transition-colors hover:text-brand-500"
        >
          <HandCoins className="size-4 text-ink" />
          Solicitudes
        </button>
        <button
          onClick={() => showToast('Filtros de búsqueda')}
          className="flex min-w-[60px] flex-col items-center gap-1 text-xs text-muted transition-colors hover:text-brand-500"
        >
          <ListFilter className="size-4 text-ink" />
          Buscar
        </button>
      </div>

      {/* Content grid: profile + subview */}
      <div className={clsx('grid items-start gap-5 transition-all', profileMini ? 'grid-cols-[60px_1fr]' : 'grid-cols-[250px_1fr]')}>
        <ProfileCard mini={profileMini} />
        <div className="flex flex-col gap-5">
          {SUBVIEWS[active].component}
          {/* Footer contextual del asociado */}
          <div className="rounded-lg border border-line bg-card p-4 text-xs text-muted shadow-soft">
            Sueldo base: <strong className="text-ink">$ {fmt(currentAsoc.sueldo)}</strong> · Cupo rotativo:{' '}
            <strong className="text-ink">$ {fmt(currentAsoc.cupoRotativo)}</strong> · Score:{' '}
            <strong className="text-brand-500">{currentAsoc.score}/100</strong>
          </div>
        </div>
      </div>
    </div>
  )
}