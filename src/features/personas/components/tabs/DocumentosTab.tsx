import { EditableChildTable, type ChildColumn } from '../EditableChildTable'
import type { DocumentoPersona } from '@/data/types'
import type { PersonaTabProps } from './types'

const columnas: Array<ChildColumn<DocumentoPersona>> = [
  { key: 'tipo', header: 'Código' },
  { key: 'descripcion', header: 'Nombre' },
  { key: 'fechaVigencia', header: 'Fecha Vigencia', type: 'date' },
  { key: 'activo', header: 'Activo/Inactivo', type: 'checkbox' },
  { key: 'esFisico', header: 'Físico?', type: 'checkbox' },
  { key: 'ruta', header: 'Cargar Documento' },
  { key: 'usuarioModifica', header: 'Usuario que Modifica' },
]

/** Pestaña "Documentos" (`Documentos.png`) — vigencia de documentos. */
export function DocumentosTab({ persona, editable, onChange }: PersonaTabProps) {
  return (
      <div className="p-4">
        <EditableChildTable
          columns={columnas}
          rows={persona.documentos}
          editable={editable}
          onChange={(rows) => onChange('documentos', rows)}
          crearFila={(id) => ({ id, tipo: '', descripcion: '', estado: 'Vigente' })}
          emptyMessage="Sin documentos registrados"
          addLabel="Agregar documento"
        />
      </div>
  )
}
