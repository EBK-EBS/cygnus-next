import { Trash2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

/** Diálogo de confirmación para acciones destructivas. */
export function ConfirmDialog({ open, title, message, confirmLabel = 'Eliminar', onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <Modal id="confirm-dialog" open={open} onClose={onCancel} title={title}>
      <p className="text-sm leading-relaxed text-ink">{message}</p>
      <div className="mt-5 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-hover"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex items-center gap-2 rounded-md bg-danger px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Trash2 className="size-4" /> {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
