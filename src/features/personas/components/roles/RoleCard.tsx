import { ChevronDown, ChevronUp } from 'lucide-react'
import type { PersonaRol } from '@/data/types'
import { RoleStatusBadge } from './RoleStatusBadge'

interface RoleCardProps {
  rol: PersonaRol
  /** Roles históricos (Terminado) se muestran de solo lectura, sin acción "Ver información". */
  historico?: boolean
  expandido?: boolean
  onToggleExpandir?: () => void
  children?: React.ReactNode
}

/** Tarjeta de un solo rol dentro del módulo Roles — resumen + detalle expandible in-place. */
export function RoleCard({ rol, historico = false, expandido = false, onToggleExpandir, children }: RoleCardProps) {
  return (
    <div className="rounded-md border border-line bg-surface">
      <div className="flex items-center justify-between gap-3 px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-sm font-semibold text-ink">{rol.tipoRol}</span>
          <RoleStatusBadge estado={rol.estado} />
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-xs text-muted">
            {historico ? `${rol.fechaInicio} → ${rol.fechaFin ?? '—'}` : `Desde: ${rol.fechaInicio}`}
          </span>
          {!historico && (
            <button
              type="button"
              onClick={onToggleExpandir}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-brand-500 transition-colors hover:bg-brand-50"
            >
              {expandido ? 'Ocultar' : 'Ver información'}
              {expandido ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            </button>
          )}
        </div>
      </div>
      {expandido && <div className="border-t border-line p-3">{children}</div>}
    </div>
  )
}
