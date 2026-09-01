import { useState, type ComponentType } from 'react'
import { Pencil, Save, X } from 'lucide-react'
import clsx from 'clsx'
import type { Persona } from '@/data/types'
import type { PersonaTabProps } from './tabs/types'
import { ModuleCardShell } from './ModuleCardShell'

interface PersonaModuleFormProps {
  numero: number
  title: string
  persona: Persona
  Contenido: ComponentType<PersonaTabProps>
  onGuardar: (datos: Persona) => void
  validar?: (datos: Persona) => string | null
  collapsed: boolean
  onToggleCollapse: () => void
  maximized: boolean
  onToggleMaximize: () => void
  /** true si otro módulo distinto ya está en edición — bloquea el botón "Editar" de este. */
  bloqueada: boolean
  editando: boolean
  onIniciarEdicion: () => void
  onFinalizarEdicion: () => void
}

/**
 * Módulo del workspace con edición contextual propia (draft local + Editar/Guardar/
 * Cancelar). Sólo un módulo puede estar `editando` a la vez a nivel de todo el
 * workspace — `bloqueada` deshabilita "Editar" mientras otro módulo edita.
 */
export function PersonaModuleForm({
  numero,
  title,
  persona,
  Contenido,
  onGuardar,
  validar,
  collapsed,
  onToggleCollapse,
  maximized,
  onToggleMaximize,
  bloqueada,
  editando,
  onIniciarEdicion,
  onFinalizarEdicion,
}: PersonaModuleFormProps) {
  const [draft, setDraft] = useState<Persona>(persona)
  const [error, setError] = useState<string | null>(null)

  function handleEditar() {
    setDraft(persona)
    setError(null)
    if (collapsed) onToggleCollapse()
    onIniciarEdicion()
  }

  function handleCancelar() {
    setError(null)
    onFinalizarEdicion()
  }

  function handleGuardar() {
    const mensaje = validar?.(draft) ?? null
    if (mensaje) {
      setError(mensaje)
      return
    }
    onGuardar(draft)
    setError(null)
    onFinalizarEdicion()
  }

  function handleChange<K extends keyof Persona>(campo: K, valor: Persona[K]) {
    setDraft((prev) => ({ ...prev, [campo]: valor }))
    if (error) setError(null)
  }

  return (
    <ModuleCardShell
      numero={numero}
      title={title}
      collapsed={collapsed}
      onToggleCollapse={onToggleCollapse}
      maximized={maximized}
      onToggleMaximize={onToggleMaximize}
      headerRight={
        editando ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCancelar}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-muted transition-colors hover:text-ink"
            >
              <X className="size-3" />
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleGuardar}
              className="flex items-center gap-1.5 rounded-md bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Save className="size-3" />
              Guardar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleEditar}
            disabled={bloqueada}
            title={bloqueada ? 'Termina de editar el otro módulo primero' : undefined}
            className={clsx(
              'flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors',
              bloqueada
                ? 'cursor-not-allowed border-line text-muted opacity-50'
                : 'border-brand-500 text-brand-500 hover:bg-brand-50',
            )}
          >
            <Pencil className="size-3" />
            Editar
          </button>
        )
      }
    >
      {error && <p className="mb-3 text-xs text-danger">{error}</p>}
      <Contenido persona={editando ? draft : persona} editable={editando} onChange={handleChange} />
    </ModuleCardShell>
  )
}
