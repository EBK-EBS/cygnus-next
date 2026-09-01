import { PersonaField, PersonaCheckboxField } from '../PersonaField'
import { CIUDADES } from '@/data/personas-mock'
import type { PersonaTabProps } from './types'

/**
 * Datos generales comunes de Persona Única (ciudad/fecha de expedición, estado actual,
 * residente) — compartidos por Natural y Jurídica, no se duplican por tipo.
 */
export function PersonaDatosGeneralesFields({ persona, editable, onChange }: PersonaTabProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <PersonaField
        label="Ciudad Expedición"
        type="select"
        options={CIUDADES}
        value={persona.ciudadExpedicion}
        editable={editable}
        onChange={(v) => onChange('ciudadExpedicion', v)}
      />
      <PersonaField
        label="Fecha Expedición"
        type="date"
        value={persona.fechaExpedicion}
        editable={editable}
        onChange={(v) => onChange('fechaExpedicion', v)}
      />
      <PersonaField label="Estado Actual" value={persona.estadoActual} editable={false} />
      <PersonaCheckboxField
        label="Residente"
        checked={persona.residente}
        editable={editable}
        onChange={(v) => onChange('residente', v)}
      />
    </div>
  )
}
