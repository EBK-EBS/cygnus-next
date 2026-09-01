import { useState } from 'react'
import { Save, X } from 'lucide-react'
import { TIPOS_ROL } from '@/data/personas-mock'
import type { PersonaRol } from '@/data/types'

const claseLabel = 'text-[0.7rem] uppercase text-muted font-medium'
const claseInput = 'w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand-500'

interface RoleAssignFormProps {
  onGuardar: (rol: Omit<PersonaRol, 'id'>) => void
  onCancelar: () => void
}

/**
 * Flujo de asignación de rol: Persona existente → seleccionar tipo de rol → completar
 * información inicial → validar → guardar vínculo Persona-Rol. Nunca crea una Persona nueva.
 */
export function RoleAssignForm({ onGuardar, onCancelar }: RoleAssignFormProps) {
  const [tipoRol, setTipoRol] = useState('')
  const [fechaInicio, setFechaInicio] = useState(() => new Date().toISOString().slice(0, 10))
  const [observacion, setObservacion] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleGuardar() {
    if (!tipoRol) {
      setError('Selecciona el tipo de rol')
      return
    }
    if (!fechaInicio) {
      setError('La fecha de inicio es obligatoria')
      return
    }
    onGuardar({
      tipoRol,
      estado: 'Activo',
      fechaInicio,
      contexto: observacion ? { Observación: observacion } : {},
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-muted">
        Asigna un rol nuevo a esta persona ya existente. La información que captures aquí es propia del rol y
        no modifica ningún otro dato de la Persona.
      </p>

      {error && <p className="text-xs text-danger">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={claseLabel}>Tipo de rol *</label>
          <select className={claseInput} value={tipoRol} onChange={(e) => setTipoRol(e.target.value)}>
            <option value="">Seleccionar...</option>
            {TIPOS_ROL.map((t) => (
              <option key={t.codigo} value={t.codigo}>
                {t.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={claseLabel}>Fecha de inicio *</label>
          <input
            type="date"
            className={claseInput}
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className={claseLabel}>Observación (opcional)</label>
          <input
            className={claseInput}
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            placeholder="Información inicial propia de este rol"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-line pt-3">
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
          Guardar vínculo
        </button>
      </div>
    </div>
  )
}
