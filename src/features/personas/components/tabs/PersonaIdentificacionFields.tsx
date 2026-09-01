import { PersonaField } from '../PersonaField'
import { TIPOS_IDENTIFICACION } from '@/data/personas-mock'
import type { PersonaTabProps } from './types'

/**
 * Campos comunes de identificación de Persona Única (tipo/número de identificación,
 * código de asociado, dígito de chequeo) — compartidos por Natural y Jurídica.
 */
export function PersonaIdentificacionFields({ persona, editable, onChange }: PersonaTabProps) {
  const tipoIdLabel = TIPOS_IDENTIFICACION.find((t) => t.codigo === persona.identificacion.tipoId)?.descripcion

  return (
    <div className="grid grid-cols-4 gap-4">
      <PersonaField label="Código Persona" value={persona.id} editable={false} />
      <PersonaField
        label="Código de Asociado"
        value={persona.codigoAsociado}
        editable={editable}
        onChange={(v) => onChange('codigoAsociado', v)}
      />
      {editable ? (
        <div>
          <label className="text-[0.7rem] font-medium uppercase text-muted">Tipo Identificación *</label>
          <select
            className="w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand-500"
            value={persona.identificacion.tipoId || ''}
            onChange={(e) => onChange('identificacion', { ...persona.identificacion, tipoId: Number(e.target.value) })}
          >
            <option value="">Seleccionar...</option>
            {TIPOS_IDENTIFICACION.map((t) => (
              <option key={t.codigo} value={t.codigo}>
                {t.descripcion}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <PersonaField label="Tipo Identificación" value={tipoIdLabel} editable={false} />
      )}
      <PersonaField
        label="Identificación"
        value={persona.identificacion.numero}
        editable={editable}
        required
        onChange={(v) => onChange('identificacion', { ...persona.identificacion, numero: v })}
      />
      <PersonaField label="Dígito de Chequeo" value={persona.digitoChequeo} editable={false} />
    </div>
  )
}
