import { Badge, type BadgeTone } from '@/components/ui/Badge'
import type { EstadoRol } from '@/data/types'

/**
 * Tono del badge de estado de un ROL — deliberadamente independiente de
 * `tonePorEstado` (que se usa para el estado de la Persona), para que nunca se
 * lean como el mismo concepto. "Terminado" usa un tono neutro (no "danger"):
 * finalizar un rol no es una condición negativa de la Persona.
 */
function tonePorEstadoRol(estado: EstadoRol): BadgeTone {
  switch (estado) {
    case 'Activo':
      return 'success'
    case 'Suspendido':
      return 'warning'
    case 'Terminado':
      return 'neutral'
  }
}

interface RoleStatusBadgeProps {
  estado: EstadoRol
}

/** Badge de estado de un Rol — nunca se muestra sin el nombre del rol al lado. */
export function RoleStatusBadge({ estado }: RoleStatusBadgeProps) {
  return (
    <Badge tone={tonePorEstadoRol(estado)} dot>
      {estado}
    </Badge>
  )
}
