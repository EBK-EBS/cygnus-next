import { SeccionTitulo } from '../PersonaField'
import { EditableChildTable, type ChildColumn } from '../EditableChildTable'
import type { CursoCooperativo, Capacitacion } from '@/data/types'
import type { PersonaTabProps } from './types'

const columnasCursos: Array<ChildColumn<CursoCooperativo>> = [
  { key: 'fecha', header: 'Fecha del Curso', type: 'date' },
  { key: 'descripcion', header: 'Descripción' },
  { key: 'entidad', header: 'Entidad' },
]

const columnasCapacitaciones: Array<ChildColumn<Capacitacion>> = [
  { key: 'codigoActividad', header: 'Código de Actividad' },
  { key: 'nombreActividad', header: 'Nombre de la Actividad' },
  { key: 'duracionHoras', header: 'Duración Actividad (Hrs)', type: 'number' },
  { key: 'fechaInicial', header: 'Fecha Inicial', type: 'date' },
  { key: 'fechaFinal', header: 'Fecha Final', type: 'date' },
]

/** Pestaña "Cooperativa" (`Cooperativa.png`) — cursos y capacitaciones cooperativas. */
export function CooperativaTab({ persona, editable, onChange }: PersonaTabProps) {
  return (
      <div className="p-4">
        <div className="mb-6">
          <SeccionTitulo>Cursos</SeccionTitulo>
          <EditableChildTable
            columns={columnasCursos}
            rows={persona.cursosCooperativa}
            editable={editable}
            onChange={(rows) => onChange('cursosCooperativa', rows)}
            crearFila={(id) => ({ id, fecha: '', descripcion: '' })}
            emptyMessage="Sin cursos registrados"
            addLabel="Agregar curso"
          />
        </div>
        <div>
          <SeccionTitulo>Capacitaciones</SeccionTitulo>
          <EditableChildTable
            columns={columnasCapacitaciones}
            rows={persona.capacitaciones}
            editable={editable}
            onChange={(rows) => onChange('capacitaciones', rows)}
            crearFila={(id) => ({ id, nombreActividad: '' })}
            emptyMessage="Sin capacitaciones registradas"
            addLabel="Agregar capacitación"
          />
        </div>
      </div>
  )
}
