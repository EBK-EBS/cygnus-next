import { SeccionTitulo } from '../PersonaField'
import { EditableChildTable, type ChildColumn } from '../EditableChildTable'
import { ESTADOS_CIVILES, PAISES, TIPOS_IDENTIFICACION } from '@/data/personas-mock'
import type { RepresentanteLegal, SocioMayoritario } from '@/data/types'
import type { PersonaTabProps } from './types'

const columnasRepresentantes: Array<ChildColumn<RepresentanteLegal>> = [
  { key: 'cedula', header: 'Identificación' },
  { key: 'nombre', header: 'Nombres' },
  { key: 'apellidos', header: 'Apellidos' },
  { key: 'cargo', header: 'Cargo' },
  { key: 'esRepresentanteLegal', header: 'Representante Legal', type: 'checkbox' },
  { key: 'autorizado', header: 'Autorizado', type: 'checkbox' },
  { key: 'limite', header: 'Límite', type: 'number' },
  { key: 'certificado', header: 'Certificado' },
  { key: 'fechaNacimiento', header: 'Fecha de Nacimiento', type: 'date' },
  { key: 'tipoNombramiento', header: 'Tipo Nombramiento' },
  { key: 'estado', header: 'Estado' },
]

const columnasSocios: Array<ChildColumn<SocioMayoritario>> = [
  { key: 'tipoIdentificacion', header: 'Tipo de Identificación', type: 'select', options: TIPOS_IDENTIFICACION },
  { key: 'identificacion', header: 'Identificación' },
  { key: 'nombres', header: 'Nombres' },
  { key: 'fecha', header: 'Fecha', type: 'date' },
  { key: 'paisNacimiento', header: 'País de Nacimiento', type: 'select', options: PAISES },
  { key: 'estadoCivil', header: 'Estado Civil', type: 'select', options: ESTADOS_CIVILES },
  { key: 'genero', header: 'Género', type: 'select', options: [{ codigo: 'M', descripcion: 'M' }, { codigo: 'F', descripcion: 'F' }] },
  { key: 'direccion', header: 'Dirección' },
  { key: 'correoElectronico', header: 'Correo Electrónico' },
]

/** Pestaña "Representante/Firmas" (`RepresentantesFirmas.png`). */
export function RepresentantesTab({ persona, editable, onChange }: PersonaTabProps) {
  return (
      <div className="p-4">
        <div className="mb-6">
          <SeccionTitulo>Representantes</SeccionTitulo>
          <EditableChildTable
            columns={columnasRepresentantes}
            rows={persona.representantes}
            editable={editable}
            onChange={(rows) => onChange('representantes', rows)}
            crearFila={(id) => ({ id, nombre: '', cedula: '', cargo: '', tipoNombramiento: '' })}
            emptyMessage="Sin representantes registrados"
            addLabel="Agregar representante"
          />
        </div>
        <div>
          <SeccionTitulo>Socios Mayoritarios</SeccionTitulo>
          <EditableChildTable
            columns={columnasSocios}
            rows={persona.sociosMayoritarios}
            editable={editable}
            onChange={(rows) => onChange('sociosMayoritarios', rows)}
            crearFila={(id) => ({ id, identificacion: '', nombres: '' })}
            emptyMessage="Sin socios mayoritarios registrados"
            addLabel="Agregar socio"
          />
        </div>
      </div>
  )
}
