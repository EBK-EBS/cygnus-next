import { Pencil, Trash2 } from 'lucide-react'
import type { Opcion, OperacionCodigo } from '../types'

const OPERACIONES: Array<{ code: OperacionCodigo; label: string; title: string }> = [
  { code: 'CONSULTAR', label: 'C', title: 'Consultar' },
  { code: 'MODIFICAR', label: 'M', title: 'Modificar' },
  { code: 'INSERTAR', label: 'I', title: 'Insertar' },
  { code: 'BORRAR', label: 'B', title: 'Borrar' },
]

interface OptionsGridProps {
  opciones: Opcion[]
  onToggleOperacion: (opcion: Opcion, codigo: OperacionCodigo) => void
  onEdit: (opcion: Opcion) => void
  onDelete: (opcion: Opcion) => void
  emptyMessage?: string
}

/** Grilla de opciones de un proceso, con permisos C/M/I/B por opción. */
export function OptionsGrid({ opciones, onToggleOperacion, onEdit, onDelete, emptyMessage }: OptionsGridProps) {
  if (opciones.length === 0) {
    return <div className="py-8 text-center text-sm text-muted">{emptyMessage ?? 'Este proceso no tiene opciones. Cree la primera con "Nueva Opción".'}</div>
  }

  return (
    <div className="max-h-[500px] overflow-y-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border-b border-line px-2 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted">Nombre</th>
            <th className="border-b border-line px-2 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted">Función</th>
            {OPERACIONES.map((op) => (
              <th key={op.code} title={op.title} className="w-10 border-b border-line px-1 py-2 text-center text-xs font-medium uppercase text-muted">
                {op.label}
              </th>
            ))}
            <th className="w-16 border-b border-line" />
          </tr>
        </thead>
        <tbody>
          {opciones.map((opcion) => (
            <tr key={opcion.codigo}>
              <td className="border-b border-line px-2 py-2.5 text-ink">{opcion.nombre}</td>
              <td className="border-b border-line px-2 py-2.5 text-muted">{opcion.funcionNombre}</td>
              {OPERACIONES.map((op) => (
                <td key={op.code} className="border-b border-line px-1 py-2.5 text-center">
                  <input
                    type="checkbox"
                    className="size-4 accent-brand-500"
                    checked={opcion.operaciones.includes(op.code)}
                    onChange={() => onToggleOperacion(opcion, op.code)}
                  />
                </td>
              ))}
              <td className="border-b border-line px-1 py-2.5 text-right">
                <button type="button" title="Editar opción" onClick={() => onEdit(opcion)} className="rounded p-1.5 text-muted hover:bg-hover hover:text-brand-500">
                  <Pencil className="size-3.5" />
                </button>
                <button type="button" title="Eliminar opción" onClick={() => onDelete(opcion)} className="rounded p-1.5 text-muted hover:bg-hover hover:text-danger">
                  <Trash2 className="size-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
