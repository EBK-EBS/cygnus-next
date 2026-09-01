import { useState } from 'react'
import { Pencil, Save, X } from 'lucide-react'
import clsx from 'clsx'
import type { PersonaRol } from '@/data/types'
import { ConfirmModal } from '../ConfirmModal'

const claseLabel = 'text-[0.7rem] uppercase text-muted font-medium'
const claseInput = 'w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand-500'

interface RoleDetailProps {
  rol: PersonaRol
  editable: boolean
  /** true si no se puede iniciar edición ahora mismo (otro módulo o otro rol ya está en edición). */
  deshabilitado: boolean
  onEditar: () => void
  onCancelar: () => void
  onGuardar: (datos: Partial<PersonaRol>) => void
  onFinalizar: (causal?: string) => void
}

/**
 * Detalle contextual de un rol — consulta y edición de su vigencia y de sus atributos
 * propios (`contexto`). Deliberadamente no reutiliza ni referencia los campos existentes
 * de Persona (Información Adicional, Cooperativa, etc.): son fuentes distintas y no deben
 * verse como equivalentes.
 */
export function RoleDetail({ rol, editable, deshabilitado, onEditar, onCancelar, onGuardar, onFinalizar }: RoleDetailProps) {
  const [draft, setDraft] = useState(rol)
  const [confirmandoFin, setConfirmandoFin] = useState(false)

  function handleEditar() {
    setDraft(rol)
    onEditar()
  }

  function handleGuardar() {
    onGuardar({ fechaInicio: draft.fechaInicio, contexto: draft.contexto })
  }

  function handleCambiarContexto(clave: string, valor: string) {
    setDraft((prev) => ({ ...prev, contexto: { ...prev.contexto, [clave]: valor } }))
  }

  const entradasContexto = Object.entries(editable ? draft.contexto : rol.contexto)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-muted">
        Información propia de este rol — independiente de otros datos de la Persona (p. ej. "Información
        Adicional" o "Cooperativa"), que siguen siendo información histórica existente sin relación con este
        contexto.
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className={claseLabel}>Estado del rol</p>
          <p className="text-sm text-ink">{rol.estado}</p>
        </div>
        <div>
          <p className={claseLabel}>Fecha inicio</p>
          {editable ? (
            <input
              type="date"
              className={claseInput}
              value={draft.fechaInicio}
              onChange={(e) => setDraft((prev) => ({ ...prev, fechaInicio: e.target.value }))}
            />
          ) : (
            <p className="text-sm text-ink">{rol.fechaInicio}</p>
          )}
        </div>
        {rol.fechaFin && (
          <div>
            <p className={claseLabel}>Fecha fin</p>
            <p className="text-sm text-ink">{rol.fechaFin}</p>
          </div>
        )}
      </div>

      {entradasContexto.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {entradasContexto.map(([clave, valor]) => (
            <div key={clave}>
              <p className={claseLabel}>{clave}</p>
              {editable ? (
                <input
                  className={claseInput}
                  value={valor}
                  onChange={(e) => handleCambiarContexto(clave, e.target.value)}
                />
              ) : (
                <p className="text-sm text-ink">{valor || '—'}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-end gap-2 border-t border-line pt-3">
        {editable ? (
          <>
            <button
              type="button"
              onClick={onCancelar}
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
          </>
        ) : (
          <>
            {rol.estado === 'Activo' && (
              <button
                type="button"
                onClick={() => setConfirmandoFin(true)}
                disabled={deshabilitado}
                className={clsx(
                  'rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors',
                  deshabilitado
                    ? 'cursor-not-allowed border-line text-muted opacity-50'
                    : 'border-danger text-danger hover:bg-danger/10',
                )}
              >
                Finalizar rol
              </button>
            )}
            <button
              type="button"
              onClick={handleEditar}
              disabled={deshabilitado}
              title={deshabilitado ? 'Termina de editar lo que está en edición primero' : undefined}
              className={clsx(
                'flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors',
                deshabilitado
                  ? 'cursor-not-allowed border-line text-muted opacity-50'
                  : 'border-brand-500 text-brand-500 hover:bg-brand-50',
              )}
            >
              <Pencil className="size-3" />
              Editar
            </button>
          </>
        )}
      </div>

      <ConfirmModal
        open={confirmandoFin}
        title="Finalizar rol"
        mensaje={`¿Confirmas que deseas finalizar el rol "${rol.tipoRol}"? Pasará a Históricos. Esto no afecta el estado de la Persona ni sus demás roles.`}
        confirmLabel="Finalizar rol"
        onConfirm={() => {
          setConfirmandoFin(false)
          onFinalizar()
        }}
        onCancel={() => setConfirmandoFin(false)}
      />
    </div>
  )
}
