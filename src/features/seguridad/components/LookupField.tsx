import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import clsx from 'clsx'
import { Modal } from '@/components/ui/Modal'
import { inputClass } from './FormField'
import type { LookupOption } from '../types'

interface LookupFieldProps {
  value: number | null
  options: LookupOption[]
  onChange: (id: number) => void
  title?: string
  placeholder?: string
}

/** Selector con búsqueda en modal — reemplaza el "lookup input" del maquetado original. */
export function LookupField({ value, options, onChange, title = 'Seleccionar', placeholder = 'Sin seleccionar' }: LookupFieldProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const selected = options.find((o) => o.id === value)

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return options
    return options.filter((o) => `${o.codigo} ${o.nombre}`.toLowerCase().includes(term))
  }, [options, search])

  const select = (option: LookupOption) => {
    onChange(option.id)
    setOpen(false)
    setSearch('')
  }

  return (
    <>
      <div className="flex gap-2">
        <input type="text" readOnly className={inputClass} value={selected ? `${selected.codigo} - ${selected.nombre}` : ''} placeholder={placeholder} />
        <button
          type="button"
          title={title}
          onClick={() => setOpen(true)}
          className="flex shrink-0 items-center justify-center rounded-md border border-line px-3 text-muted transition-colors hover:border-brand-500 hover:text-brand-500"
        >
          <Search className="size-4" />
        </button>
      </div>

      <Modal id="lookup-field-modal" open={open} onClose={() => setOpen(false)} title={title}>
        <input
          type="text"
          autoFocus
          className={clsx(inputClass, 'mb-3')}
          placeholder="Buscar por código o nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex max-h-80 flex-col gap-1 overflow-y-auto">
          {filtered.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => select(option)}
              className={clsx(
                'flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-hover',
                option.id === value && 'bg-active text-brand-500',
              )}
            >
              <span className="font-semibold">{option.codigo}</span>
              <span>{option.nombre}</span>
            </button>
          ))}
          {filtered.length === 0 && <div className="py-8 text-center text-sm text-muted">Sin resultados.</div>}
        </div>
      </Modal>
    </>
  )
}
