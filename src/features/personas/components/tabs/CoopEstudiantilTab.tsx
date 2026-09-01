import { PersonaField, SeccionTitulo } from '../PersonaField'
import { EditableChildTable, type ChildColumn } from '../EditableChildTable'
import { ESTADOS_CIVILES, PAISES, CIUDADES, TIPOS_TEL, PROFESIONES } from '@/data/personas-mock'
import type { MiembroConsejo, ProfesorRecargo } from '@/data/types'
import type { PersonaTabProps } from './types'

const columnasConsejo: Array<ChildColumn<MiembroConsejo>> = [
  { key: 'codigo', header: 'Código' },
  { key: 'identificacion', header: 'Identificación' },
  { key: 'nombres', header: 'Nombres' },
  { key: 'apellidos', header: 'Apellidos' },
  { key: 'puesto', header: 'Puesto' },
  { key: 'telefono', header: 'Teléfono' },
]

/** Pestaña "Coop. Estudiantil" (`CoopEstudiantil.png`). */
export function CoopEstudiantilTab({ persona, editable, onChange }: PersonaTabProps) {
  const profesor = persona.profesorRecargo ?? {}

  function actualizarProfesor(campo: keyof ProfesorRecargo, valor: string) {
    onChange('profesorRecargo', { ...profesor, [campo]: valor })
  }

  return (
      <div className="p-4">
        <PersonaField
          label="Cantidad de Asociados"
          type="number"
          value={persona.coopEstudiantil?.cantidadAsociados}
          editable={editable}
          className="mb-6 max-w-[200px]"
          onChange={(v) => onChange('coopEstudiantil', { ...persona.coopEstudiantil, cantidadAsociados: Number(v) })}
        />

        <div className="mb-6">
          <SeccionTitulo>Miembros del Consejo de Administración</SeccionTitulo>
          <EditableChildTable
            columns={columnasConsejo}
            rows={persona.miembrosConsejo}
            editable={editable}
            onChange={(rows) => onChange('miembrosConsejo', rows)}
            crearFila={(id) => ({ id, identificacion: '', nombres: '' })}
            emptyMessage="Sin miembros registrados"
            addLabel="Agregar miembro"
          />
        </div>

        <div>
          <SeccionTitulo>Profesor con Recargo</SeccionTitulo>
          <div className="grid grid-cols-4 gap-4">
            <PersonaField label="Código" value={profesor.codigo} editable={editable} onChange={(v) => actualizarProfesor('codigo', v)} />
            <PersonaField
              label="Identificación"
              value={profesor.identificacion}
              editable={editable}
              className="col-span-2"
              onChange={(v) => actualizarProfesor('identificacion', v)}
            />
            <PersonaField label="Nombres" value={profesor.nombres} editable={editable} onChange={(v) => actualizarProfesor('nombres', v)} />
            <PersonaField label="Primer Apellido" value={profesor.primerApellido} editable={editable} onChange={(v) => actualizarProfesor('primerApellido', v)} />
            <PersonaField label="Segundo Apellido" value={profesor.segundoApellido} editable={editable} onChange={(v) => actualizarProfesor('segundoApellido', v)} />
            <PersonaField label="Fecha de Nacimiento" type="date" value={profesor.fechaNacimiento} editable={editable} onChange={(v) => actualizarProfesor('fechaNacimiento', v)} />
            <PersonaField
              label="Estado Civil"
              type="select"
              options={ESTADOS_CIVILES}
              value={profesor.estadoCivil}
              editable={editable}
              onChange={(v) => actualizarProfesor('estadoCivil', v)}
            />
            <PersonaField
              label="País de Origen"
              type="select"
              options={PAISES}
              value={profesor.paisOrigen}
              editable={editable}
              onChange={(v) => actualizarProfesor('paisOrigen', v)}
            />
            <PersonaField
              label="Ciudad de Nacimiento"
              type="select"
              options={CIUDADES}
              value={profesor.ciudadNacimiento}
              editable={editable}
              onChange={(v) => actualizarProfesor('ciudadNacimiento', v)}
            />
            <PersonaField
              label="Tipo de Teléfono"
              type="select"
              options={TIPOS_TEL}
              value={profesor.tipoTelefono}
              editable={editable}
              onChange={(v) => actualizarProfesor('tipoTelefono', v)}
            />
            <PersonaField label="Número" value={profesor.numero} editable={editable} onChange={(v) => actualizarProfesor('numero', v)} />
            <PersonaField label="Correo Electrónico" type="email" value={profesor.correoElectronico} editable={editable} onChange={(v) => actualizarProfesor('correoElectronico', v)} />
            <PersonaField
              label="Profesión"
              type="select"
              options={PROFESIONES}
              value={profesor.profesion}
              editable={editable}
              onChange={(v) => actualizarProfesor('profesion', v)}
            />
          </div>
        </div>
      </div>
  )
}
