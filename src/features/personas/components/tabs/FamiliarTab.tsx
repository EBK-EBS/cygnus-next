import { EditableChildTable, type ChildColumn } from '../EditableChildTable'
import { TIPOS_IDENTIFICACION, PARENTESCOS, TIPOS_BENEFICIARIO } from '@/data/personas-mock'
import type { Familiar } from '@/data/types'
import type { PersonaTabProps } from './types'

const columnas: Array<ChildColumn<Familiar>> = [
  { key: 'nombre', header: 'Nombres' },
  { key: 'apellidos', header: 'Apellidos' },
  { key: 'tipoIdentificacion', header: 'Tipo Identificación', type: 'select', options: TIPOS_IDENTIFICACION },
  { key: 'numeroDocumento', header: 'Identificación' },
  { key: 'fechaNacimiento', header: 'Fecha de Nacimiento', type: 'date' },
  { key: 'sexo', header: 'Género', type: 'select', options: [{ codigo: 'M', descripcion: 'M' }, { codigo: 'F', descripcion: 'F' }] },
  { key: 'esBeneficiario', header: 'Beneficiario', type: 'checkbox' },
  { key: 'parentesco', header: 'Parentesco', type: 'select', options: PARENTESCOS },
  { key: 'tipoBeneficiario', header: 'Tipo Beneficiario', type: 'select', options: TIPOS_BENEFICIARIO },
  { key: 'porcentajeBeneficio', header: '% Beneficio', type: 'number' },
]

/** Pestaña "Familiar" (`Familiar.png`). */
export function FamiliarTab({ persona, editable, onChange }: PersonaTabProps) {
  return (
      <div className="p-4">
        <EditableChildTable
          columns={columnas}
          rows={persona.familiares}
          editable={editable}
          onChange={(rows) => onChange('familiares', rows)}
          crearFila={(id) => ({ id, nombre: '', parentesco: '' })}
          emptyMessage="Sin familiares/beneficiarios registrados"
          addLabel="Agregar familiar"
        />
      </div>
  )
}
