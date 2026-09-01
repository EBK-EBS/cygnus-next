import { Modal } from '@/components/ui/Modal'

interface ConfirmModalProps {
  open: boolean
  title: string
  mensaje: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

/** Confirmación genérica (p. ej. antes de inactivar una persona) construida sobre `Modal`. */
export function ConfirmModal({
  open,
  title,
  mensaje,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal id="confirm-modal" open={open} onClose={onCancel} title={title}>
      <p className="text-sm text-ink">{mensaje}</p>
      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-brand-500 px-4 py-2 text-sm font-semibold text-brand-500 transition-colors hover:bg-brand-50"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-md bg-danger px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
