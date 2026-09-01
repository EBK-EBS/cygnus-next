import { useMemo, useState } from 'react'
import { Pencil, Plus, Save, Search, Trash2, UserCog } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { useUIStore } from '@/store/uiStore'
import { useSeguridadStore } from './store/seguridadStore'
import { FormField, inputClass } from './components/FormField'
import { LookupField } from './components/LookupField'
import { ConfirmDialog } from './components/ConfirmDialog'
import type { Usuario } from './types'

const emptyUsuario: Omit<Usuario, 'id' | 'codigo'> = {
  personaId: null,
  nombre: '',
  tipoUsuarioId: null,
  oficinaId: null,
  departamentoId: null,
  correo: '',
  fechaIngreso: '',
  estado: 'Activo',
  login: '',
  clave: '',
  perfilCodigo: null,
  expira: false,
  alertaCada: '',
  alertaUnidad: 'Días',
  numAlertas: '',
}

type UsuarioForm = Omit<Usuario, 'id' | 'codigo'> & { id?: number; codigo?: number }

/** Administración de Usuarios — alta, edición y baja de accesos del sistema. */
export function UsuariosPage() {
  const { usuarios, personas, tiposUsuario, oficinas, departamentos, perfiles, saveUsuario, deleteUsuario } = useSeguridadStore()
  const showToast = useUIStore((s) => s.showToast)

  const [search, setSearch] = useState('')
  const [modalUsuario, setModalUsuario] = useState<UsuarioForm | null>(null)
  const [confirmClave, setConfirmClave] = useState('')
  const [formError, setFormError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Usuario | null>(null)

  const nombreOficina = (id: number | null) => oficinas.find((o) => o.id === id)?.nombre ?? '—'
  const nombrePerfil = (codigo: number | null) => perfiles.find((p) => p.codigo === codigo)?.nombre ?? '—'

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return usuarios
    return usuarios.filter((u) => `${u.nombre} ${u.login}`.toLowerCase().includes(term))
  }, [usuarios, search])

  const openNew = () => {
    setModalUsuario({ ...emptyUsuario })
    setConfirmClave('')
    setFormError('')
  }

  const openEdit = (usuario: Usuario) => {
    setModalUsuario({ ...usuario })
    setConfirmClave(usuario.clave)
    setFormError('')
  }

  const closeModal = () => setModalUsuario(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!modalUsuario) return
    if (!modalUsuario.id && !modalUsuario.clave) {
      setFormError('La clave es obligatoria para un usuario nuevo.')
      return
    }
    if (modalUsuario.clave !== confirmClave) {
      setFormError('La clave y la confirmación no coinciden.')
      return
    }
    saveUsuario(modalUsuario)
    showToast('Usuario guardado correctamente.')
    closeModal()
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    deleteUsuario(deleteTarget.id)
    showToast('Usuario eliminado.')
    setDeleteTarget(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5 text-2xl font-bold text-brand-500">
          <UserCog className="size-6" /> Administración de Usuarios
        </div>
        <p className="text-sm text-muted">Cree, edite y gestione el acceso de los usuarios del sistema.</p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Buscar usuario por nombre o login..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-line bg-surface py-2 pl-9 pr-3 text-sm text-ink outline-none focus:border-brand-500"
          />
        </div>
        <button onClick={openNew} className="flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          <Plus className="size-4" /> Nuevo Usuario
        </button>
      </div>

      <DataTable
        columns={[
          { key: 'codigo', header: 'Código' },
          { key: 'nombre', header: 'Nombre' },
          { key: 'login', header: 'Login' },
          { key: 'oficina', header: 'Oficina', render: (row) => nombreOficina(row.oficinaId) },
          { key: 'perfil', header: 'Perfil', render: (row) => nombrePerfil(row.perfilCodigo) },
          { key: 'estado', header: 'Estado', render: (row) => <Badge tone={row.estado === 'Activo' ? 'success' : 'danger'} dot>{row.estado}</Badge> },
          {
            key: 'acciones',
            header: '',
            align: 'right',
            render: (row) => (
              <span className="flex justify-end gap-1">
                <button title="Editar" onClick={() => openEdit(row)} className="rounded p-1.5 text-muted hover:bg-hover hover:text-brand-500">
                  <Pencil className="size-3.5" />
                </button>
                <button title="Eliminar" onClick={() => setDeleteTarget(row)} className="rounded p-1.5 text-muted hover:bg-hover hover:text-danger">
                  <Trash2 className="size-3.5" />
                </button>
              </span>
            ),
          },
        ]}
        rows={filtered}
        emptyMessage="No hay usuarios registrados."
        className="rounded-lg border border-line bg-card shadow-soft"
      />

      <Modal id="usuario-modal" open={!!modalUsuario} onClose={closeModal} title={modalUsuario?.id ? 'Editar Usuario' : 'Nuevo Usuario'}>
        {modalUsuario && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Persona">
                <LookupField
                  title="Seleccionar Persona"
                  value={modalUsuario.personaId}
                  options={personas.map((p) => ({ id: p.id, codigo: p.cedula, nombre: p.nombre }))}
                  onChange={(id) => setModalUsuario({ ...modalUsuario, personaId: id })}
                />
              </FormField>
              <FormField label="Nombre">
                <input type="text" required className={inputClass} value={modalUsuario.nombre} onChange={(e) => setModalUsuario({ ...modalUsuario, nombre: e.target.value })} />
              </FormField>

              <FormField label="Tipo">
                <LookupField
                  title="Seleccionar Tipo de Usuario"
                  value={modalUsuario.tipoUsuarioId}
                  options={tiposUsuario.map((t) => ({ id: t.id, codigo: t.codigo, nombre: t.nombre }))}
                  onChange={(id) => setModalUsuario({ ...modalUsuario, tipoUsuarioId: id })}
                />
              </FormField>
              <FormField label="Oficina">
                <LookupField title="Seleccionar Oficina" value={modalUsuario.oficinaId} options={oficinas} onChange={(id) => setModalUsuario({ ...modalUsuario, oficinaId: id })} />
              </FormField>

              <FormField label="Departamento">
                <LookupField
                  title="Seleccionar Departamento"
                  value={modalUsuario.departamentoId}
                  options={departamentos}
                  onChange={(id) => setModalUsuario({ ...modalUsuario, departamentoId: id })}
                />
              </FormField>
              <FormField label="Correo Electrónico">
                <input type="email" className={inputClass} value={modalUsuario.correo} onChange={(e) => setModalUsuario({ ...modalUsuario, correo: e.target.value })} />
              </FormField>

              <FormField label="Fecha Ingreso">
                <input type="date" className={inputClass} value={modalUsuario.fechaIngreso} onChange={(e) => setModalUsuario({ ...modalUsuario, fechaIngreso: e.target.value })} />
              </FormField>
              <FormField label="Estado">
                <select
                  className={inputClass}
                  value={modalUsuario.estado}
                  onChange={(e) => setModalUsuario({ ...modalUsuario, estado: e.target.value as Usuario['estado'] })}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </FormField>

              <FormField label="Login">
                <input type="text" required className={inputClass} value={modalUsuario.login} onChange={(e) => setModalUsuario({ ...modalUsuario, login: e.target.value })} />
              </FormField>
              <FormField label="Perfil">
                <select
                  required
                  className={inputClass}
                  value={modalUsuario.perfilCodigo ?? ''}
                  onChange={(e) => setModalUsuario({ ...modalUsuario, perfilCodigo: Number(e.target.value) || null })}
                >
                  <option value="">Seleccione un perfil</option>
                  {perfiles.map((p) => (
                    <option key={p.codigo} value={p.codigo}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Clave" hint={modalUsuario.id ? 'Dejar en blanco para mantener la clave actual.' : ''}>
                <input type="password" className={inputClass} value={modalUsuario.clave} onChange={(e) => setModalUsuario({ ...modalUsuario, clave: e.target.value })} />
              </FormField>
              <FormField label="Confirme la Clave">
                <input type="password" className={inputClass} value={confirmClave} onChange={(e) => setConfirmClave(e.target.value)} />
              </FormField>

              <div className="col-span-full text-xs font-semibold uppercase tracking-wide text-muted">Expiración de Clave</div>
              <label className="col-span-full flex items-center gap-2 text-sm text-ink">
                <input type="checkbox" className="size-4 accent-brand-500" checked={modalUsuario.expira} onChange={(e) => setModalUsuario({ ...modalUsuario, expira: e.target.checked })} />
                ¿Expira?
              </label>

              {modalUsuario.expira && (
                <>
                  <FormField label="Alerta Cada">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        className={inputClass}
                        value={modalUsuario.alertaCada}
                        onChange={(e) => setModalUsuario({ ...modalUsuario, alertaCada: e.target.value === '' ? '' : Number(e.target.value) })}
                      />
                      <select
                        className={inputClass}
                        value={modalUsuario.alertaUnidad}
                        onChange={(e) => setModalUsuario({ ...modalUsuario, alertaUnidad: e.target.value as Usuario['alertaUnidad'] })}
                      >
                        <option value="Días">Días</option>
                        <option value="Meses">Meses</option>
                      </select>
                    </div>
                  </FormField>
                  <FormField label="Núm. de Alertas">
                    <input
                      type="number"
                      min="1"
                      className={inputClass}
                      value={modalUsuario.numAlertas}
                      onChange={(e) => setModalUsuario({ ...modalUsuario, numAlertas: e.target.value === '' ? '' : Number(e.target.value) })}
                    />
                  </FormField>
                </>
              )}
            </div>

            {formError && <div className="text-xs text-danger">{formError}</div>}

            <div className="flex justify-end gap-2.5 border-t border-line pt-4">
              <button type="button" onClick={closeModal} className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-hover">
                Cancelar
              </button>
              <button type="submit" className="flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                <Save className="size-4" /> Guardar
              </button>
            </div>
          </form>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar Usuario"
        message={`¿Está seguro que desea eliminar al usuario "${deleteTarget?.nombre}"? Esta acción no se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
