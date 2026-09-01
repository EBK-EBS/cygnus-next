import { useState } from 'react'
import { KeyRound, Save } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useSeguridadStore } from './store/seguridadStore'
import { FormField, inputClass } from './components/FormField'
import { LookupField } from './components/LookupField'

/** Cambio de Clave — actualiza la contraseña de acceso de un usuario del sistema. */
export function CambioClavePage() {
  const { usuarios, setClaveUsuario } = useSeguridadStore()
  const showToast = useUIStore((s) => s.showToast)

  const [usuarioId, setUsuarioId] = useState<number | null>(usuarios[0]?.id ?? null)
  const [claveActual, setClaveActual] = useState('')
  const [claveNueva, setClaveNueva] = useState('')
  const [confirmacion, setConfirmacion] = useState('')
  const [error, setError] = useState('')

  const usuario = usuarios.find((u) => u.id === usuarioId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!usuario) return
    if (claveActual !== usuario.clave) {
      setError('La clave actual no es correcta.')
      return
    }
    if (!claveNueva) {
      setError('Ingrese la nueva clave.')
      return
    }
    if (claveNueva !== confirmacion) {
      setError('La nueva clave y la confirmación no coinciden.')
      return
    }
    setClaveUsuario(usuario.id, claveNueva)
    setError('')
    setClaveActual('')
    setClaveNueva('')
    setConfirmacion('')
    showToast('Clave actualizada correctamente.')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5 text-2xl font-bold text-brand-500">
          <KeyRound className="size-6" /> Cambio de Clave
        </div>
        <p className="text-sm text-muted">Actualice la clave de acceso de un usuario del sistema.</p>
      </div>

      <div className="max-w-xl rounded-lg border border-line bg-card p-5 shadow-soft">
        <div className="mb-5">
          <FormField label="Usuario">
            <LookupField
              title="Seleccionar Usuario"
              value={usuarioId}
              options={usuarios.map((u) => ({ id: u.id, codigo: u.codigo, nombre: u.nombre }))}
              onChange={setUsuarioId}
            />
          </FormField>
        </div>

        {usuario && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Código">
                <input type="text" readOnly className={inputClass} value={usuario.codigo} />
              </FormField>
              <FormField label="Login">
                <input type="text" readOnly className={inputClass} value={usuario.login} />
              </FormField>
              <FormField label="Nombre" full>
                <input type="text" readOnly className={inputClass} value={usuario.nombre} />
              </FormField>
            </div>

            <div className="text-xs font-semibold uppercase tracking-wide text-muted">Datos de la Nueva Clave</div>

            <FormField label="Clave Actual">
              <input type="password" className={inputClass} value={claveActual} onChange={(e) => setClaveActual(e.target.value)} />
            </FormField>
            <FormField label="Nueva Clave">
              <input type="password" className={inputClass} value={claveNueva} onChange={(e) => setClaveNueva(e.target.value)} />
            </FormField>
            <FormField label="Confirmación">
              <input type="password" className={inputClass} value={confirmacion} onChange={(e) => setConfirmacion(e.target.value)} />
            </FormField>

            {error && <div className="text-xs text-danger">{error}</div>}

            <div className="text-right">
              <button type="submit" className="flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 ml-auto">
                <Save className="size-4" /> Guardar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
