import { Minimize2, Users } from 'lucide-react'
import clsx from 'clsx'
import { Badge, tonePorEstado } from '@/components/ui/Badge'
import { fmt } from '@/lib/format'
import { useUIStore } from '@/store/uiStore'

/**
 * Tarjeta de perfil del asociado — reemplaza .user-profile del original.
 * Colapsable a avatar (mini) y abre el modal de cambio de asociado.
 */
export function ProfileCard({ mini }: { mini: boolean }) {
  const currentAsoc = useUIStore((s) => s.currentAsoc)
  const toggleMini = useUIStore((s) => s.toggleProfileMini)
  const setAsociadosModal = useUIStore((s) => s.setAsociadosModal)

  return (
    <div
      className={clsx(
        'rounded-lg border border-line bg-card shadow-soft transition-all',
        mini ? 'px-1 py-3.5' : 'p-4',
      )}
    >
      <div
        className={clsx(
          'flex items-center gap-2.5 border-b border-line pb-2.5 font-semibold text-ink',
          mini && 'justify-center border-b-0 pb-0',
        )}
      >
        {!mini && (
          <button
            onClick={() => setAsociadosModal(true)}
            title="Cambiar Asociado"
            className="flex flex-1 items-center gap-2.5"
          >
            <Users className="size-4 text-muted" />
            <span className="text-sm">Cambiar Asociado</span>
          </button>
        )}
        {!mini && (
          <button
            onClick={toggleMini}
            title="Contraer/Expandir Perfil"
            className="ml-auto text-muted transition-colors hover:text-brand-500"
          >
            <Minimize2 className="size-4" />
          </button>
        )}
      </div>

      {mini ? (
        <button
          onClick={toggleMini}
          title="Expandir Panel Perfil"
          className="mx-auto flex size-9 items-center justify-center rounded-full bg-[#6366f1] font-semibold text-white"
        >
          {currentAsoc.nombre.charAt(0)}
        </button>
      ) : (
        <div className="mt-2.5 flex flex-col gap-2.5 text-[0.8rem]">
          <div>
            <span className="block text-[0.7rem] text-muted">{currentAsoc.nombre}</span>
            <span className="block text-[0.7rem] text-muted">EMPRESA / PAGADURÍA</span>
            <span className="block font-medium text-ink">{currentAsoc.empresa}</span>
          </div>
          <div>
            <span className="block text-[0.7rem] uppercase text-muted">Identificación</span>
            <span className="font-medium text-ink">
              {currentAsoc.cedula} (Cédula)
            </span>
          </div>
          <div>
            <span className="block text-[0.7rem] uppercase text-muted">Cliente desde</span>
            <span className="font-medium text-ink">{currentAsoc.clienteDesde}</span>
          </div>
          <div>
            <span className="block text-[0.7rem] uppercase text-muted">Estado</span>
            <Badge tone={tonePorEstado(currentAsoc.estado)} dot>
              {currentAsoc.estado}
            </Badge>
          </div>
          <div>
            <span className="block text-[0.7rem] uppercase text-muted">Sueldo base</span>
            <span className="font-medium text-ink">$ {fmt(currentAsoc.sueldo)}</span>
          </div>
          <div>
            <span className="block text-[0.7rem] uppercase text-muted">Ciudad / Dir</span>
            <span className="font-medium text-ink">
              {currentAsoc.ciudad} - {currentAsoc.direccion}
            </span>
          </div>
          <div>
            <span className="block text-[0.7rem] uppercase text-muted">Contacto</span>
            <span className="font-medium text-ink">
              {currentAsoc.telefono}
              <br />
              {currentAsoc.email}
            </span>
          </div>
          <div>
            <span className="block text-[0.7rem] uppercase text-muted">Profesión</span>
            <span className="font-medium text-ink">{currentAsoc.profesion}</span>
          </div>
        </div>
      )}
    </div>
  )
}