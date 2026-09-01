import { PersonaField, SeccionTitulo } from '../PersonaField'
import { EditableChildTable, type ChildColumn } from '../EditableChildTable'
import type { InfoAdicionalItem, ReferenciaComercial, PersonaRelacionadaCooperativa } from '@/data/types'
import type { PersonaTabProps } from './types'

const columnasAdicional: Array<ChildColumn<InfoAdicionalItem>> = [
  { key: 'codigo', header: 'Código' },
  { key: 'descripcion', header: 'Descripción' },
  { key: 'valor', header: 'Valor' },
  { key: 'descripcionValores', header: 'Descripción Valores' },
]

const columnasReferencias: Array<ChildColumn<ReferenciaComercial>> = [
  { key: 'nombre', header: 'Nombre' },
  { key: 'telefono', header: 'Teléfono' },
]

const columnasRelacionadas: Array<ChildColumn<PersonaRelacionadaCooperativa>> = [
  { key: 'codigo', header: 'Código' },
  { key: 'identificacion', header: 'Identificación' },
  { key: 'nombre', header: 'Nombre' },
  { key: 'vinculo', header: 'Vínculo' },
]

/** Pestaña "Adicional" (`Adicional.png`). */
export function AdicionalTab({ persona, editable, onChange }: PersonaTabProps) {
  return (
      <div className="grid grid-cols-2 gap-6 p-4">
        <div>
          <SeccionTitulo>Información Adicional</SeccionTitulo>
          <EditableChildTable
            columns={columnasAdicional}
            rows={persona.infoAdicional}
            editable={editable}
            onChange={(rows) => onChange('infoAdicional', rows)}
            crearFila={(id) => ({ id, descripcion: '' })}
            emptyMessage="Sin información adicional"
            addLabel="Agregar"
          />
        </div>
        <div>
          <SeccionTitulo>Referencias Comerciales / Personales</SeccionTitulo>
          <EditableChildTable
            columns={columnasReferencias}
            rows={persona.referenciasComerciales}
            editable={editable}
            onChange={(rows) => onChange('referenciasComerciales', rows)}
            crearFila={(id) => ({ id, nombre: '' })}
            emptyMessage="Sin referencias registradas"
            addLabel="Agregar referencia"
          />
        </div>

        <PersonaField
          label="Observaciones"
          type="textarea"
          value={persona.observacionesAdicional}
          editable={editable}
          onChange={(v) => onChange('observacionesAdicional', v)}
        />
        <PersonaField
          label="Otras entidades con las cuales recibe Servicios Financieros"
          type="textarea"
          value={persona.otrasEntidadesServiciosFinancieros}
          editable={editable}
          onChange={(v) => onChange('otrasEntidadesServiciosFinancieros', v)}
        />

        <div className="col-span-2">
          <SeccionTitulo>Personas asociadas a la cooperativa con las cuales mantiene relación</SeccionTitulo>
          <EditableChildTable
            columns={columnasRelacionadas}
            rows={persona.personasRelacionadas}
            editable={editable}
            onChange={(rows) => onChange('personasRelacionadas', rows)}
            crearFila={(id) => ({ id, nombre: '' })}
            emptyMessage="Sin personas relacionadas"
            addLabel="Agregar"
          />
        </div>
      </div>
  )
}
