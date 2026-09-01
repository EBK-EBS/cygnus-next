import { ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react'
import clsx from 'clsx'
import { Card } from '@/components/ui/Card'

interface ModuleCardShellProps {
  numero: number
  title: string
  collapsed: boolean
  onToggleCollapse: () => void
  maximized: boolean
  onToggleMaximize: () => void
  headerRight?: React.ReactNode
  className?: string
  children: React.ReactNode
}

const claseBotonControl =
  'flex size-7 shrink-0 items-center justify-center rounded text-muted transition-colors hover:bg-surface hover:text-ink'

/**
 * Módulo independiente del workspace de Personas — numerado, colapsable y
 * maximizable, sin depender visualmente de los demás módulos del grid.
 */
export function ModuleCardShell({
  numero,
  title,
  collapsed,
  onToggleCollapse,
  maximized,
  onToggleMaximize,
  headerRight,
  className,
  children,
}: ModuleCardShellProps) {
  return (
    <Card className={clsx('mb-0 flex h-full flex-col', className)}>
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 rounded bg-surface px-1.5 py-0.5 text-[0.65rem] font-bold text-muted">
            {String(numero).padStart(2, '0')}
          </span>
          <span className="truncate text-sm font-semibold text-ink">{title}</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {headerRight}
          <button
            type="button"
            onClick={onToggleCollapse}
            title={collapsed ? 'Expandir' : 'Colapsar'}
            className={claseBotonControl}
          >
            {collapsed ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
          </button>
          <button
            type="button"
            onClick={onToggleMaximize}
            title={maximized ? 'Restaurar' : 'Maximizar'}
            className={claseBotonControl}
          >
            {maximized ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>
        </div>
      </div>
      {!collapsed && <div className="p-4">{children}</div>}
    </Card>
  )
}
