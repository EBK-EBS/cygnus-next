import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { ASOCIADOS } from '@/data/mock'
import { useUIStore } from '@/store/uiStore'
import { useNavigate } from 'react-router-dom'

/**
 * Modal de selección de asociado (demo) — reemplaza modalAsociados del original.
 * Filtra por nombre o cédula y navega al estado de cuenta del asociado.
 */
export function AsociadosModal() {
  const open = useUIStore((s) => s.asociadosModalOpen)
  const setOpen = useUIStore((s) => s.setAsociadosModal)
  const setCurrentAsoc = useUIStore((s) => s.setCurrentAsoc)
  const showToast = useUIStore((s) => s.showToast)
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return ASOCIADOS
    return ASOCIADOS.filter(
      (a) => a.nombre.toLowerCase().includes(query) || a.cedula.includes(query),
    )
  }, [q])

  const select = (id: number) => {
    setCurrentAsoc(id)
    setOpen(false)
    showToast('Asociado cambiado')
    navigate('/estado-cuenta/productos')
  }

  return (
    <Modal id="modalAsociados" open={open} onClose={() => setOpen(false)} title="Seleccionar Asociado">
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2">
        <Search className="size-4 text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre o cédula..."
          className="flex-1 bg-transparent text-sm text-ink outline-none"
          autoFocus
        />
      </div>
      <div className="flex max-h-[50vh] flex-col gap-2.5 overflow-y-auto">
        {filtered.map((a) => (
          <button
            key={a.id}
            onClick={() => select(a.id)}
            className="flex items-center gap-3 rounded-lg border border-line bg-card px-3.5 py-2.5 text-left transition-all hover:border-brand-500 hover:bg-active"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#6366f1] font-semibold text-white">
              {a.nombre.charAt(0)}
            </span>
            <span>
              <span className="block text-sm font-medium text-ink">{a.nombre}</span>
              <span className="block text-xs text-muted">
                {a.cedula} - {a.empresa}
              </span>
            </span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="py-6 text-center text-sm text-muted">Sin resultados</p>
        )}
      </div>
    </Modal>
  )
}