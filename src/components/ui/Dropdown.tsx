import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  /** Clases extra para posicionar el menú (default: derecha). */
  menuClassName?: string
}

/**
 * Dropdown con cierre por click fuera — reemplaza .dropdown + .dropdown-menu.show.
 */
export function Dropdown({ trigger, children, menuClassName }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div
          className={clsx(
            'animate-fade-in absolute right-0 top-full z-[2000] mt-1 min-w-[260px] rounded-lg border border-line bg-card py-1.5 shadow-drop',
            menuClassName,
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export function DropdownHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1.5 border-b border-line px-4 py-2.5 text-[0.7rem] font-bold uppercase tracking-wide text-muted">
      {children}
    </div>
  )
}

export function DropdownItem({
  icon,
  children,
  onClick,
}: {
  icon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-ink transition-colors hover:bg-hover hover:text-brand-500"
    >
      {icon}
      {children}
    </button>
  )
}