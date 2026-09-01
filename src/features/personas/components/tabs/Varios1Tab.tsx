import { PersonaField, SeccionTitulo } from '../PersonaField'
import { EditableChildTable, type ChildColumn } from '../EditableChildTable'
import { NIVEL_ESTUDIOS, PROFESIONES } from '@/data/personas-mock'
import type { ImpuestoPersona } from '@/data/types'
import type { PersonaTabProps } from './types'

const columnasImpuestos: Array<ChildColumn<ImpuestoPersona>> = [
  { key: 'nombre', header: 'Nombre Impuesto' },
  { key: 'activo', header: 'Activar', type: 'checkbox' },
]

/** Pestaña "Varios 1" (`Varios1.png`). */
export function Varios1Tab({ persona, editable, onChange }: PersonaTabProps) {
  return (
      <div className="grid grid-cols-2 gap-6 p-4">
        <div className="flex flex-col gap-6">
          <div>
            <SeccionTitulo>Académica</SeccionTitulo>
            <div className="grid grid-cols-2 gap-3">
              <PersonaField
                label="Nivel de Estudios"
                type="select"
                options={NIVEL_ESTUDIOS}
                value={persona.nivelEstudio}
                editable={editable}
                onChange={(v) => onChange('nivelEstudio', v)}
              />
              <PersonaField
                label="Profesión"
                type="select"
                options={PROFESIONES}
                value={persona.profesion}
                editable={editable}
                onChange={(v) => onChange('profesion', v)}
              />
            </div>
          </div>
          <div>
            <SeccionTitulo>Personal</SeccionTitulo>
            <div className="grid grid-cols-2 gap-3">
              <PersonaField label="Afición" value={persona.aficion} editable={editable} onChange={(v) => onChange('aficion', v)} />
              <PersonaField label="Nick Name" value={persona.nickname} editable={editable} onChange={(v) => onChange('nickname', v)} />
              <PersonaField label="Tratamiento" value={persona.tratamiento} editable={editable} onChange={(v) => onChange('tratamiento', v)} />
            </div>
          </div>
          <div>
            <SeccionTitulo>Otros</SeccionTitulo>
            <div className="mb-3 grid grid-cols-2 gap-3">
              <PersonaField
                label="Veces Codeudor"
                type="number"
                value={persona.vecesCodeudor}
                editable={editable}
                onChange={(v) => onChange('vecesCodeudor', Number(v))}
              />
              <PersonaField
                label="Contribuyente"
                type="select"
                options={[{ codigo: 'S', descripcion: 'Sí' }, { codigo: 'N', descripcion: 'No' }]}
                value={persona.contribuyente}
                editable={editable}
                onChange={(v) => onChange('contribuyente', v)}
              />
            </div>
            <EditableChildTable
              columns={columnasImpuestos}
              rows={persona.impuestos}
              editable={editable}
              onChange={(rows) => onChange('impuestos', rows)}
              crearFila={(id) => ({ id, nombre: '', activo: false })}
              emptyMessage="Sin impuestos configurados"
              addLabel="Agregar impuesto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 self-start">
          <PersonaField label="Día de Pago" value={persona.diaPago} editable={editable} onChange={(v) => onChange('diaPago', v)} />
          <PersonaField label="Cliente Desde" type="date" value={persona.clienteDesde} editable={editable} onChange={(v) => onChange('clienteDesde', v)} />
          <PersonaField label="Fecha de Registro" type="date" value={persona.fechaRegistro} editable={editable} onChange={(v) => onChange('fechaRegistro', v)} />
          <PersonaField label="Oficina" value={persona.oficina} editable={editable} onChange={(v) => onChange('oficina', v)} />
          <PersonaField label="Fecha de Afiliación" type="date" value={persona.fechaAfiliacion} editable={editable} onChange={(v) => onChange('fechaAfiliacion', v)} />
        </div>
      </div>
  )
}
