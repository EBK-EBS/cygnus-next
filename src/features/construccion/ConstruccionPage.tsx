import { ArrowLeft, PersonStanding } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

/** Vista genérica de módulo en construcción — reemplaza view-construccion. */
export function ConstruccionPage() {
  const { modulo } = useParams<{ modulo: string }>()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5 text-2xl font-bold text-brand-500">
          Módulo en Construcción
        </div>
      </div>

      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-line bg-card p-16 text-center shadow-soft">
        <PersonStanding className="mb-6 size-24 text-warning" />
        <h2 className="mb-4 text-2xl font-bold text-ink">
          Sección: <span className="text-brand-500">{decodeURIComponent(modulo ?? '')}</span>
        </h2>
        <p className="max-w-[500px] text-lg leading-relaxed text-muted">
          Esta funcionalidad se encuentra actualmente en desarrollo y estará disponible en
          próximas actualizaciones de la plataforma.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 flex items-center gap-2 rounded-md bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="size-4" /> Volver al Dashboard
        </button>
      </div>
    </div>
  )
}