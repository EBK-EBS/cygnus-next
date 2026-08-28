import { Circle } from 'lucide-react'
import clsx from 'clsx'

export type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral'

interface BadgeProps {
  tone: BadgeTone
  children: React.ReactNode
  /** Muestra el punto de estado (fiel al <i class="fa-solid fa-circle"> original). */
  dot?: boolean
  className?: string
}

const toneClasses: Record<BadgeTone, string> = {
  success: 'text-brand-500 bg-brand-50 dark:bg-brand-500/10',
  warning: 'text-warning bg-warning/10',
  danger: 'text-danger bg-danger/10',
  neutral: 'text-muted bg-hover',
}

/** Insignia de estado — reemplaza status-badge / status-al / status-pend / status-mora. */
export function Badge({ tone, children, dot = false, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-xs font-semibold',
        toneClasses[tone],
        className,
      )}
    >
      {dot && <Circle className="size-2.5 fill-current" />}
      {children}
    </span>
  )
}

/** Mapea un estado de crédito/devolución a su tono de badge. */
export function tonePorEstado(estado: string): BadgeTone {
  switch (estado) {
    case 'AL DIA':
    case 'VIGENTE':
    case 'ACTIVO':
    case 'PROCESADA':
    case 'Procesada':
      return 'success'
    case 'DESEMBOLSAR':
    case 'PENDIENTE':
    case 'Pendiente':
      return 'warning'
    case 'MORA':
    case 'INACTIVO':
    case 'RECHAZADA':
      return 'danger'
    default:
      return 'neutral'
  }
}