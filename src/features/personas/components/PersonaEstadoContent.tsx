import { useState } from 'react'
import { Badge, tonePorEstado } from '@/components/ui/Badge'
import type { Persona } from '@/data/types'
import { usePersonasStore } from '@/store/personasStore'
import { useUIStore } from '@/store/uiStore'
import { ConfirmModal } from './ConfirmModal'

interface PersonaEstadoContentProps {
  persona: Persona
}

/**
 * Sección "Estado" del workspace — activar/desactivar. No es un formulario con
 * draft: son acciones inmediatas sobre el store (única fuente de verdad).
 */
export function PersonaEstadoContent({ persona }: PersonaEstadoContentProps) {
  const cambiarEstado = usePersonasStore((s) => s.cambiarEstado)
  const showToast = useUIStore((s) => s.showToast)
  const [confirmando, setConfirmando] = useState(false)

  function activar() {
    cambiarEstado(persona.id, 'Activo')
    showToast('Persona activada correctamente')
  }

  function desactivar() {
    cambiarEstado(persona.id, 'Inactivo')
    showToast('Persona inactivada correctamente')
    setConfirmando(false)
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <div>
          <p className="text-[0.7rem] uppercase text-muted">Estado actual</p>
          <Badge tone={tonePorEstado(persona.estado)} dot>
            {persona.estado}
          </Badge>
        </div>
        <div className="flex-1" />
        {persona.estado === 'Activo' ? (
          <button
            type="button"
            onClick={() => setConfirmando(true)}
            className="rounded-md border border-danger px-4 py-2 text-sm font-semibold text-danger transition-colors hover:bg-danger/10"
          >
            Desactivar
          </button>
        ) : (
          <button
            type="button"
            onClick={activar}
            className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Activar
          </button>
        )}
      </div>

      <ConfirmModal
        open={confirmando}
        title="Confirmar inactivación"
        mensaje={`¿Confirmas que deseas inactivar a "${persona.nombres}${persona.primerApellido ? ' ' + persona.primerApellido : ''}"? Podrás activarla nuevamente desde esta misma sección.`}
        confirmLabel="Desactivar"
        onConfirm={desactivar}
        onCancel={() => setConfirmando(false)}
      />
    </>
  )
}
