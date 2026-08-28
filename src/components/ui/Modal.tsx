import { X } from 'lucide-react'
import clsx from 'clsx'
import { useEffect } from 'react'

interface ModalProps {
  id: string
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

/**
 * Modal con backdrop — reemplaza .modal.show del original.
 * Renderiza condicionalmente y cierra con Escape o click en backdrop.
 */
export function Modal({ id, open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={clsx(
          'animate-fade-in w-full max-w-lg rounded-lg border border-line bg-card shadow-drop',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          {title && <h3 className="text-sm font-semibold text-ink">{title}</h3>}
          <button
            onClick={onClose}
            className="text-muted transition-colors hover:text-danger"
            aria-label="Cerrar"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  )
}