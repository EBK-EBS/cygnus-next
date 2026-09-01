import clsx from 'clsx'

interface FormFieldProps {
  label: string
  children: React.ReactNode
  hint?: string
  full?: boolean
}

/** Envoltorio de campo de formulario — label + control + hint opcional. */
export function FormField({ label, children, hint, full }: FormFieldProps) {
  return (
    <div className={clsx('flex flex-col gap-1.5', full && 'col-span-full')}>
      <label className="text-xs font-medium text-muted">{label}</label>
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </div>
  )
}

export const inputClass =
  'w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-brand-500 disabled:opacity-60'
