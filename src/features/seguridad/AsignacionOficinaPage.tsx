import { useEffect, useState } from 'react'
import { Building2, Save, Search } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useSeguridadStore } from './store/seguridadStore'
import { FormField } from './components/FormField'
import { LookupField } from './components/LookupField'

/** Asignación de Usuarios a Oficina — marca qué usuarios tienen acceso a cada oficina. */
export function AsignacionOficinaPage() {
  const { oficinas, usuarios, usuariosLoaded, loadUsuarios, oficinaUsuarios, setOficinaUsuarios } = useSeguridadStore()
  const showToast = useUIStore((s) => s.showToast)

  const [oficinaId, setOficinaId] = useState<number | null>(oficinas[0]?.id ?? null)
  const [checkedIds, setCheckedIds] = useState<number[]>(oficinaId != null ? oficinaUsuarios[oficinaId] ?? [] : [])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!usuariosLoaded) void loadUsuarios().catch(() => undefined)
  }, [loadUsuarios, usuariosLoaded])

  useEffect(() => {
    setCheckedIds(oficinaId != null ? oficinaUsuarios[oficinaId] ?? [] : [])
  }, [oficinaId, oficinaUsuarios])

  const toggle = (usuarioId: number) => {
    setCheckedIds((prev) => (prev.includes(usuarioId) ? prev.filter((id) => id !== usuarioId) : [...prev, usuarioId]))
  }

  const filteredUsuarios = usuarios.filter((u) => `${u.login} ${u.nombre}`.toLowerCase().includes(search.trim().toLowerCase()))

  const handleSave = () => {
    if (oficinaId == null) return
    setOficinaUsuarios(oficinaId, checkedIds)
    showToast('Asignación de usuarios actualizada correctamente.')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5 text-2xl font-bold text-brand-500">
          <Building2 className="size-6" /> Asignación de Usuarios a Oficina
        </div>
        <p className="text-sm text-muted">Seleccione una oficina y marque los usuarios que tienen acceso a ella.</p>
      </div>

      <div className="max-w-sm rounded-lg border border-line bg-card p-5 shadow-soft">
        <FormField label="Oficina">
          <LookupField title="Seleccionar Oficina" value={oficinaId} options={oficinas} onChange={setOficinaId} />
        </FormField>
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-card shadow-soft">
        <div className="border-b border-line p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-line bg-surface py-2 pl-9 pr-3 text-sm text-ink outline-none focus:border-brand-500"
            />
          </div>
        </div>
        <div className="max-h-[420px] overflow-y-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b border-line px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted">Código</th>
                <th className="border-b border-line px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted">Login</th>
                <th className="border-b border-line px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted">Usuario</th>
                <th className="w-14 border-b border-line px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wide text-muted">Check</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((u) => (
                <tr key={u.id} onClick={() => toggle(u.id)} className="cursor-pointer hover:bg-hover">
                  <td className="border-b border-line px-3 py-2.5 text-ink">{u.codigo}</td>
                  <td className="border-b border-line px-3 py-2.5 text-ink">{u.login}</td>
                  <td className="border-b border-line px-3 py-2.5 text-ink">{u.nombre}</td>
                  <td className="border-b border-line px-3 py-2.5 text-center" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="size-4 accent-brand-500" checked={checkedIds.includes(u.id)} onChange={() => toggle(u.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsuarios.length === 0 && <div className="py-8 text-center text-sm text-muted">No hay usuarios que coincidan con la búsqueda.</div>}
        </div>
        <div className="border-t border-line p-4 text-right">
          <button onClick={handleSave} className="flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 ml-auto">
            <Save className="size-4" /> Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
