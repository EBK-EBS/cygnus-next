import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
}

/** Tarjeta genérica — reemplaza .card del diseño original. */
export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        'mb-5 overflow-hidden rounded-lg border border-line bg-card shadow-soft',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  right?: React.ReactNode
}

/** Encabezado de tarjeta — reemplaza .card-header-basic. */
export function CardHeader({ title, right }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-line px-4 py-3 text-base font-semibold text-ink">
      <span>{title}</span>
      {right}
    </div>
  )
}