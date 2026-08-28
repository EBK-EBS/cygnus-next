import clsx from 'clsx'

export interface Column<T> {
  key: string
  header: string
  align?: 'left' | 'right' | 'center'
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Array<Column<T>>
  rows: T[]
  onRowClick?: (row: T) => void
  emptyMessage?: string
  className?: string
}

/**
 * Tabla de datos genérica — reemplaza los <table> repetidos del HTML original.
 * Renderiza columnas tipadas y filas con callback opcional de click.
 */
export function DataTable<T>({
  columns,
  rows,
  onRowClick,
  emptyMessage = 'Sin registros',
  className,
}: DataTableProps<T>) {
  const alignClass = (align?: Column<T>['align']) =>
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="w-full border-collapse text-[0.8rem]">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={clsx(
                  'border-b border-line px-2.5 py-2.5 text-[0.75rem] font-medium uppercase tracking-wide text-muted',
                  alignClass(c.align),
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-muted">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row)}
                className={clsx(onRowClick && 'cursor-pointer')}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={clsx(
                      'border-b border-line px-2.5 py-3 align-middle',
                      alignClass(c.align),
                    )}
                  >
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}