import { Plus, Trash2 } from 'lucide-react'
import type { CatalogoItem } from '@/data/types'

export type ChildColumnType = 'text' | 'number' | 'date' | 'select' | 'checkbox'

export interface ChildColumn<T> {
  key: keyof T
  header: string
  type?: ChildColumnType
  options?: CatalogoItem[]
}

interface EditableChildTableProps<T extends { id: number }> {
  columns: Array<ChildColumn<T>>
  rows: T[]
  editable: boolean
  onChange: (rows: T[]) => void
  crearFila: (id: number) => T
  emptyMessage?: string
  addLabel?: string
}

const inputClase =
  'w-full rounded border border-line bg-surface px-2 py-1.5 text-xs text-ink outline-none focus:border-brand-500'

/**
 * Tabla hija editable genérica — reemplaza las ~15 tablas repetibles del formulario
 * legacy (familiares, representantes, cuentas, documentos, etc.) con una sola
 * implementación que alterna entre modo consulta (texto) y modo edición (inputs inline).
 */
export function EditableChildTable<T extends { id: number }>({
  columns,
  rows,
  editable,
  onChange,
  crearFila,
  emptyMessage = 'Sin registros',
  addLabel = 'Agregar',
}: EditableChildTableProps<T>) {
  function actualizarCelda(idx: number, key: keyof T, valor: unknown) {
    const nuevas = [...rows]
    nuevas[idx] = { ...nuevas[idx], [key]: valor }
    onChange(nuevas)
  }

  function agregarFila() {
    const siguienteId = rows.reduce((max, r) => Math.max(max, r.id), 0) + 1
    onChange([...rows, crearFila(siguienteId)])
  }

  function eliminarFila(idx: number) {
    onChange(rows.filter((_, i) => i !== idx))
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[0.8rem]">
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className="border-b border-line px-2.5 py-2.5 text-left text-[0.7rem] font-medium uppercase tracking-wide text-muted"
                >
                  {c.header}
                </th>
              ))}
              {editable && <th className="border-b border-line px-2.5 py-2.5" />}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + (editable ? 1 : 0)} className="py-6 text-center text-muted">
                  {emptyMessage}
                </td>
              </tr>
            )}
            {rows.map((row, idx) => (
              <tr key={row.id}>
                {columns.map((c) => (
                  <td key={String(c.key)} className="border-b border-line px-2.5 py-2 align-middle text-ink">
                    {renderCelda(row, c, idx, editable, actualizarCelda)}
                  </td>
                ))}
                {editable && (
                  <td className="border-b border-line px-2.5 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => eliminarFila(idx)}
                      className="text-danger transition-opacity hover:opacity-70"
                      aria-label="Eliminar fila"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editable && (
        <button
          type="button"
          onClick={agregarFila}
          className="mt-2 flex items-center gap-1 text-xs text-brand-500 hover:underline"
        >
          <Plus className="size-3" /> {addLabel}
        </button>
      )}
    </div>
  )
}

function renderCelda<T>(
  row: T,
  c: ChildColumn<T>,
  idx: number,
  editable: boolean,
  actualizarCelda: (idx: number, key: keyof T, valor: unknown) => void,
): React.ReactNode {
  const valor = row[c.key]

  if (!editable) {
    if (c.type === 'checkbox') return valor ? 'Sí' : 'No'
    if (typeof valor === 'number') return valor.toLocaleString('es-CO')
    return (valor as string) || '—'
  }

  if (c.type === 'checkbox') {
    return (
      <input
        type="checkbox"
        checked={Boolean(valor)}
        onChange={(e) => actualizarCelda(idx, c.key, e.target.checked)}
        className="rounded border-line"
      />
    )
  }

  if (c.type === 'select') {
    return (
      <select
        className={inputClase}
        value={(valor as string) ?? ''}
        onChange={(e) => actualizarCelda(idx, c.key, e.target.value)}
      >
        <option value="">—</option>
        {c.options?.map((o) => (
          <option key={o.codigo} value={o.descripcion}>
            {o.descripcion}
          </option>
        ))}
      </select>
    )
  }

  return (
    <input
      type={c.type === 'number' ? 'number' : c.type === 'date' ? 'date' : 'text'}
      className={inputClase}
      value={(valor as string | number | undefined) ?? ''}
      onChange={(e) => actualizarCelda(idx, c.key, c.type === 'number' ? Number(e.target.value) : e.target.value)}
    />
  )
}
