import { PersonaField } from '../PersonaField'
import { ESTADOS_CIVILES, CIUDADES, NIVEL_ESTUDIOS, PAISES } from '@/data/personas-mock'
import type { PersonaTabProps } from './types'

/**
 * Campos específicos de Persona Natural (informe legacy §3.1.3), sin los campos
 * comunes de Persona Única (esos viven en `PersonaIdentificacionFields`/`PersonaDatosGeneralesFields`).
 */
export function NaturalTab({ persona, editable, onChange }: PersonaTabProps) {
  const estadoCivilLabel = ESTADOS_CIVILES.find((e) => e.codigo === persona.estadoCivil)?.descripcion

  return (
    <div className="grid grid-cols-4 gap-4">
      <PersonaField label="Nombres" value={persona.nombres} editable={editable} required onChange={(v) => onChange('nombres', v)} />
      <PersonaField
        label="Primer Apellido"
        value={persona.primerApellido}
        editable={editable}
        required
        onChange={(v) => onChange('primerApellido', v)}
      />
      <PersonaField
        label="Segundo Apellido"
        value={persona.segundoApellido}
        editable={editable}
        onChange={(v) => onChange('segundoApellido', v)}
      />
      <PersonaField
        label="Sexo"
        type="select"
        options={[
          { codigo: 'M', descripcion: 'Masculino' },
          { codigo: 'F', descripcion: 'Femenino' },
        ]}
        value={persona.sexo}
        editable={editable}
        onChange={(v) => onChange('sexo', v)}
      />
      <PersonaField
        label="Fecha Nacimiento"
        type="date"
        value={persona.fechaNacimiento}
        editable={editable}
        onChange={(v) => onChange('fechaNacimiento', v)}
      />
      {editable ? (
        <div>
          <label className="text-[0.7rem] font-medium uppercase text-muted">Estado Civil</label>
          <select
            className="w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand-500"
            value={persona.estadoCivil ?? ''}
            onChange={(e) => onChange('estadoCivil', e.target.value)}
          >
            <option value="">Seleccionar...</option>
            {ESTADOS_CIVILES.map((e) => (
              <option key={e.codigo} value={e.codigo}>
                {e.descripcion}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <PersonaField label="Estado Civil" value={estadoCivilLabel} editable={false} />
      )}
      <PersonaField
        label="Ciudad Nacimiento"
        type="select"
        options={CIUDADES}
        value={persona.ciudadNacimiento}
        editable={editable}
        onChange={(v) => onChange('ciudadNacimiento', v)}
      />
      <PersonaField
        label="País Nacimiento"
        type="select"
        options={PAISES}
        value={persona.paisNacimiento}
        editable={editable}
        onChange={(v) => onChange('paisNacimiento', v)}
      />
      <PersonaField
        label="País 2da Nacionalidad"
        type="select"
        options={PAISES}
        value={persona.paisSegundaNacionalidad}
        editable={editable}
        onChange={(v) => onChange('paisSegundaNacionalidad', v)}
      />
      <PersonaField
        label="Estrato"
        type="select"
        options={[1, 2, 3, 4, 5, 6].map((n) => ({ codigo: n, descripcion: String(n) }))}
        value={persona.estrato}
        editable={editable}
        onChange={(v) => onChange('estrato', v)}
      />
      <PersonaField
        label="Nivel de Estudio"
        type="select"
        options={NIVEL_ESTUDIOS}
        value={persona.nivelEstudio}
        editable={editable}
        onChange={(v) => onChange('nivelEstudio', v)}
      />
      <PersonaField
        label="Número de Hijos"
        type="number"
        value={persona.numeroHijos}
        editable={editable}
        onChange={(v) => onChange('numeroHijos', Number(v))}
      />
    </div>
  )
}
