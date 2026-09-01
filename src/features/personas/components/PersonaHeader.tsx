import { ArrowLeft } from 'lucide-react'
import { Badge, tonePorEstado } from '@/components/ui/Badge'
import type { Persona } from '@/data/types'

interface PersonaHeaderProps {
  persona: Persona
  onVolver: () => void
}

/**
 * Encabezado contextual del workspace — nombre, tipo, estado e identificación
 * principal de la persona seleccionada (mismo rol que la línea "Asociado: ..." de
 * `EstadoCuentaPage`, adaptado a Personas).
 */
export function PersonaHeader({ persona, onVolver }: PersonaHeaderProps) {
  const esNatural = persona.tipoPersona === 'N'
  const nombreCompleto = esNatural
    ? `${persona.nombres} ${persona.primerApellido}${persona.segundoApellido ? ' ' + persona.segundoApellido : ''}`
    : persona.razonSocial || persona.nombres

  const rolesActivos = persona.roles.filter((r) => r.estado === 'Activo')

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={onVolver} className="flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink">
          <ArrowLeft className="size-4" />
          Volver al listado
        </button>
        <div className="h-4 w-px bg-line" />
        <h2 className="text-lg font-semibold text-ink">{nombreCompleto}</h2>
        <span title="Estado de la Persona">
          <Badge tone={tonePorEstado(persona.estado)} dot>
            {persona.estado}
          </Badge>
        </span>
        <Badge tone="neutral">{esNatural ? 'Natural' : 'Jurídica'}</Badge>
        {rolesActivos.length > 0 && (
          <>
            <div className="h-4 w-px bg-line" />
            <div className="flex flex-wrap items-center gap-1.5" title="Roles activos — estado independiente del estado de la Persona">
              {rolesActivos.map((rol) => (
                <Badge key={rol.id} tone="success" dot>
                  {rol.tipoRol} · Activo
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="text-sm text-muted">
        Identificación: <strong className="text-brand-500">{persona.identificacion.numero}</strong>
        {persona.codigoAsociado && (
          <>
            {' '}
            | Código Asociado: <span>{persona.codigoAsociado}</span>
          </>
        )}
      </div>
    </div>
  )
}
