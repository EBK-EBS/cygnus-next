import { useState } from 'react'
import { Plus } from 'lucide-react'
import clsx from 'clsx'
import type { Persona, PersonaRol } from '@/data/types'
import { usePersonasStore } from '@/store/personasStore'
import { useUIStore } from '@/store/uiStore'
import { ModuleCardShell } from '../ModuleCardShell'
import { RoleCard } from './RoleCard'
import { RoleDetail } from './RoleDetail'
import { RoleAssignForm } from './RoleAssignForm'

interface PersonaRolesModuleProps {
  persona: Persona
  numero: number
  collapsed: boolean
  onToggleCollapse: () => void
  maximized: boolean
  onToggleMaximize: () => void
  /** true si otro módulo (no Roles) ya está en edición — bloquea asignar/editar roles. */
  bloqueada: boolean
  editando: boolean
  onIniciarEdicion: () => void
  onFinalizarEdicion: () => void
}

/**
 * Módulo "Roles" del workspace (PT-PER-001 §6): PERSONA → ROLES → CONTEXTO DEL ROL.
 * Es el único módulo que no representa un draft de Persona sino una colección de
 * vínculos Persona-Rol, cada uno con su propia vigencia y estado — nunca crea una
 * Persona nueva ni toca `persona.estado`.
 */
export function PersonaRolesModule({
  persona,
  numero,
  collapsed,
  onToggleCollapse,
  maximized,
  onToggleMaximize,
  bloqueada,
  onIniciarEdicion,
  onFinalizarEdicion,
}: PersonaRolesModuleProps) {
  const [asignando, setAsignando] = useState(false)
  const [rolExpandidoId, setRolExpandidoId] = useState<number | null>(null)
  const [rolEditandoId, setRolEditandoId] = useState<number | null>(null)

  const asignarRol = usePersonasStore((s) => s.asignarRol)
  const actualizarRol = usePersonasStore((s) => s.actualizarRol)
  const cambiarEstadoRol = usePersonasStore((s) => s.cambiarEstadoRol)
  const showToast = useUIStore((s) => s.showToast)

  const activos = persona.roles.filter((r) => r.estado !== 'Terminado')
  const historicos = persona.roles.filter((r) => r.estado === 'Terminado')

  function handleAbrirAsignar() {
    setAsignando(true)
    onIniciarEdicion()
  }

  function handleCancelarAsignar() {
    setAsignando(false)
    onFinalizarEdicion()
  }

  function handleGuardarAsignar(rol: Omit<PersonaRol, 'id'>) {
    asignarRol(persona.id, rol)
    showToast('Rol asignado correctamente')
    setAsignando(false)
    onFinalizarEdicion()
  }

  function handleEditarRol(id: number) {
    setRolEditandoId(id)
    onIniciarEdicion()
  }

  function handleCancelarEdicionRol() {
    setRolEditandoId(null)
    onFinalizarEdicion()
  }

  function handleGuardarRol(id: number, datos: Partial<PersonaRol>) {
    actualizarRol(persona.id, id, datos)
    showToast('Rol actualizado correctamente')
    setRolEditandoId(null)
    onFinalizarEdicion()
  }

  function handleFinalizarRol(id: number) {
    cambiarEstadoRol(persona.id, id, 'Terminado')
    showToast('Rol finalizado correctamente')
    setRolExpandidoId(null)
  }

  const hayAlgoEnEdicion = asignando || rolEditandoId !== null

  return (
    <ModuleCardShell
      numero={numero}
      title="Roles"
      collapsed={collapsed}
      onToggleCollapse={onToggleCollapse}
      maximized={maximized}
      onToggleMaximize={onToggleMaximize}
      headerRight={
        !asignando && (
          <button
            type="button"
            onClick={handleAbrirAsignar}
            disabled={bloqueada || hayAlgoEnEdicion}
            title={bloqueada ? 'Termina de editar el otro módulo primero' : undefined}
            className={clsx(
              'flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors',
              bloqueada || hayAlgoEnEdicion
                ? 'cursor-not-allowed border-line text-muted opacity-50'
                : 'border-brand-500 text-brand-500 hover:bg-brand-50',
            )}
          >
            <Plus className="size-3" />
            Asignar rol
          </button>
        )
      }
    >
      {asignando ? (
        <RoleAssignForm onGuardar={handleGuardarAsignar} onCancelar={handleCancelarAsignar} />
      ) : (
        <div className="flex flex-col gap-3">
          {activos.length === 0 && (
            <p className="text-sm text-muted">Esta persona no tiene roles activos asignados.</p>
          )}

          {activos.map((rol) => (
            <RoleCard
              key={rol.id}
              rol={rol}
              expandido={rolExpandidoId === rol.id}
              onToggleExpandir={() => setRolExpandidoId(rolExpandidoId === rol.id ? null : rol.id)}
            >
              <RoleDetail
                rol={rol}
                editable={rolEditandoId === rol.id}
                deshabilitado={bloqueada || (hayAlgoEnEdicion && rolEditandoId !== rol.id)}
                onEditar={() => handleEditarRol(rol.id)}
                onCancelar={handleCancelarEdicionRol}
                onGuardar={(datos) => handleGuardarRol(rol.id, datos)}
                onFinalizar={() => handleFinalizarRol(rol.id)}
              />
            </RoleCard>
          ))}

          {historicos.length > 0 && (
            <details className="mt-1">
              <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-muted">
                Históricos ({historicos.length})
              </summary>
              <div className="mt-2 flex flex-col gap-2">
                {historicos.map((rol) => (
                  <RoleCard key={rol.id} rol={rol} historico />
                ))}
              </div>
            </details>
          )}
        </div>
      )}
    </ModuleCardShell>
  )
}
