import clsx from 'clsx'
import type { CatalogoItem } from '@/data/types'

const claseInput =
  'w-full rounded border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand-500'
const claseLabel = 'text-[0.7rem] uppercase text-muted font-medium'

interface PersonaFieldProps {
  label: string
  value?: string | number
  editable: boolean
  onChange?: (valor: string) => void
  type?: 'text' | 'number' | 'date' | 'email' | 'tel' | 'select' | 'textarea'
  options?: CatalogoItem[]
  placeholder?: string
  className?: string
  required?: boolean
  format?: 'currency'
  rows?: number
}

/** Campo de solo lectura o editable — mismo layout en consulta y creación/edición. */
export function PersonaField({
  label,
  value,
  editable,
  onChange,
  type = 'text',
  options,
  placeholder,
  className,
  required,
  format,
  rows = 2,
}: PersonaFieldProps) {
  if (!editable) {
    const texto =
      value === undefined || value === '' || value === null
        ? '—'
        : format === 'currency' && typeof value === 'number'
          ? `$ ${value.toLocaleString('es-CO')}`
          : String(value)
    return (
      <div className={className}>
        <p className={claseLabel}>{label}</p>
        <p className="text-sm text-ink">{texto}</p>
      </div>
    )
  }

  return (
    <div className={className}>
      <label className={claseLabel}>
        {label}
        {required && ' *'}
      </label>
      {type === 'select' ? (
        <select
          className={claseInput}
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
        >
          <option value="">Seleccionar...</option>
          {options?.map((o) => (
            <option key={o.codigo} value={o.descripcion}>
              {o.descripcion}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          className={claseInput}
          rows={rows}
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          className={claseInput}
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}

interface PersonaCheckboxFieldProps {
  label: string
  checked?: boolean
  editable: boolean
  onChange?: (valor: boolean) => void
  className?: string
}

/** Checkbox de solo lectura ("Sí"/"No") o editable. */
export function PersonaCheckboxField({ label, checked, editable, onChange, className }: PersonaCheckboxFieldProps) {
  if (!editable) {
    return (
      <div className={className}>
        <p className={claseLabel}>{label}</p>
        <p className="text-sm text-ink">{checked ? 'Sí' : 'No'}</p>
      </div>
    )
  }
  return (
    <label className={clsx('flex items-center gap-2 text-sm text-ink', className)}>
      <input
        type="checkbox"
        checked={checked ?? false}
        onChange={(e) => onChange?.(e.target.checked)}
        className="rounded border-line"
      />
      {label}
    </label>
  )
}

export function SeccionTitulo({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-3 border-b border-line pb-2 text-xs font-semibold uppercase tracking-wide text-muted">
      {children}
    </h4>
  )
}
