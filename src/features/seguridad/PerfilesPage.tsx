import { useState } from 'react'
import { Copy, Plus, Save, ShieldCheck, Trash2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { useUIStore } from '@/store/uiStore'
import { useSeguridadStore } from './store/seguridadStore'
import { FormField, inputClass } from './components/FormField'
import { LookupField } from './components/LookupField'
import { ProcessTree } from './components/ProcessTree'
import { OptionsGrid } from './components/OptionsGrid'
import { ConfirmDialog } from './components/ConfirmDialog'
import type { Opcion, OperacionCodigo, Perfil, ProcesoNode } from './types'

const emptyPerfilForm = { codigo: null as number | null, nombre: '', descripcion: '', activo: true }

function findNode(nodes: ProcesoNode[], codigo: number): ProcesoNode | null {
  for (const node of nodes) {
    if (node.codigo === codigo) return node
    const enHijos = findNode(node.hijos, codigo)
    if (enHijos) return enHijos
  }
  return null
}

interface CarpetaForm {
  codigo: number | null
  nombre: string
  requiereClave: boolean
  clave: string
}

function CarpetaModal({
  open,
  parentNombre,
  initial,
  onSubmit,
  onClose,
}: {
  open: boolean
  parentNombre?: string
  initial: CarpetaForm
  onSubmit: (data: CarpetaForm) => void
  onClose: () => void
}) {
  const [form, setForm] = useState(initial)

  if (open && form.codigo !== initial.codigo) setForm(initial)

  return (
    <Modal id="carpeta-modal" open={open} onClose={onClose} title={initial.codigo ? 'Editar Carpeta' : 'Nueva Carpeta'}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(form)
        }}
        className="flex flex-col gap-4"
      >
        {parentNombre && (
          <div className="text-sm text-muted">
            Dentro de: <strong className="text-ink">{parentNombre}</strong>
          </div>
        )}
        <FormField label="Nombre">
          <input type="text" required className={inputClass} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
        </FormField>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" className="size-4 accent-brand-500" checked={form.requiereClave} onChange={(e) => setForm({ ...form, requiereClave: e.target.checked })} />
          ¿Pide clave adicional para entrar?
        </label>
        {form.requiereClave && (
          <FormField label="Clave">
            <input type="password" className={inputClass} value={form.clave} onChange={(e) => setForm({ ...form, clave: e.target.value })} />
          </FormField>
        )}
        <div className="mt-2 flex justify-end gap-2.5">
          <button type="button" onClick={onClose} className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-hover">
            Cancelar
          </button>
          <button type="submit" className="flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
            <Save className="size-4" /> Guardar
          </button>
        </div>
      </form>
    </Modal>
  )
}

interface OpcionForm {
  codigo: number | null
  funcionCodigo: number | null
  nombre: string
  icono: string
  tecla: string
  requiereClave: boolean
  clave: string
  operaciones: OperacionCodigo[]
}

const OPERACIONES_FORM: Array<{ code: OperacionCodigo; label: string }> = [
  { code: 'CONSULTAR', label: 'Consultar' },
  { code: 'MODIFICAR', label: 'Modificar' },
  { code: 'INSERTAR', label: 'Insertar' },
  { code: 'BORRAR', label: 'Borrar' },
]

function OpcionModal({
  open,
  funcionalidades,
  initial,
  onSubmit,
  onClose,
}: {
  open: boolean
  funcionalidades: Array<{ id: number; codigo: string | number; nombre: string }>
  initial: OpcionForm
  onSubmit: (data: OpcionForm) => void
  onClose: () => void
}) {
  const [form, setForm] = useState(initial)

  if (open && form.codigo !== initial.codigo) setForm(initial)

  return (
    <Modal id="opcion-modal" open={open} onClose={onClose} title={initial.codigo ? 'Editar Opción' : 'Nueva Opción'}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(form)
        }}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Funcionalidad">
            <LookupField title="Seleccionar Funcionalidad" value={form.funcionCodigo} options={funcionalidades} onChange={(id) => setForm({ ...form, funcionCodigo: id })} />
          </FormField>
          <FormField label="Nombre">
            <input type="text" required className={inputClass} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          </FormField>
          <FormField label="Ícono (opcional)">
            <input type="text" className={inputClass} value={form.icono} onChange={(e) => setForm({ ...form, icono: e.target.value })} />
          </FormField>
          <FormField label="Tecla rápida (opcional)">
            <input type="text" maxLength={5} className={inputClass} value={form.tecla} onChange={(e) => setForm({ ...form, tecla: e.target.value })} />
          </FormField>
        </div>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" className="size-4 accent-brand-500" checked={form.requiereClave} onChange={(e) => setForm({ ...form, requiereClave: e.target.checked })} />
          ¿Pide clave adicional para ejecutarse?
        </label>
        {form.requiereClave && (
          <div className="max-w-xs">
            <FormField label="Clave">
              <input type="password" className={inputClass} value={form.clave} onChange={(e) => setForm({ ...form, clave: e.target.value })} />
            </FormField>
          </div>
        )}

        <div>
          <label className="mb-2 block text-xs font-medium text-muted">Permisos</label>
          <div className="flex flex-wrap gap-4">
            {OPERACIONES_FORM.map(({ code, label }) => (
              <label key={code} className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  className="size-4 accent-brand-500"
                  checked={form.operaciones.includes(code)}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      operaciones: e.target.checked ? [...form.operaciones, code] : form.operaciones.filter((o) => o !== code),
                    })
                  }
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-2 flex justify-end gap-2.5">
          <button type="button" onClick={onClose} className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-hover">
            Cancelar
          </button>
          <button type="submit" className="flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
            <Save className="size-4" /> Guardar
          </button>
        </div>
      </form>
    </Modal>
  )
}

function CopiarModal({
  open,
  perfiles,
  onSubmit,
  onClose,
}: {
  open: boolean
  perfiles: Array<{ id: number; codigo: string | number; nombre: string }>
  onSubmit: (data: { origenCodigo: number; nombre: string; descripcion: string }) => void
  onClose: () => void
}) {
  const [origenCodigo, setOrigenCodigo] = useState<number | null>(null)
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')

  return (
    <Modal id="copiar-modal" open={open} onClose={onClose} title="Copiar Perfil">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (origenCodigo == null) return
          onSubmit({ origenCodigo, nombre, descripcion })
          setOrigenCodigo(null)
          setNombre('')
          setDescripcion('')
        }}
        className="flex flex-col gap-4"
      >
        <FormField label="Copiar el árbol de menú de:">
          <LookupField title="Seleccionar Perfil Origen" value={origenCodigo} options={perfiles} onChange={setOrigenCodigo} />
        </FormField>
        <FormField label="Nombre del Perfil Nuevo">
          <input type="text" required className={inputClass} value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </FormField>
        <FormField label="Descripción">
          <input type="text" required className={inputClass} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </FormField>
        <div className="mt-2 flex justify-end gap-2.5">
          <button type="button" onClick={onClose} className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-hover">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={origenCodigo == null}
            className="flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            <Copy className="size-4" /> Copiar
          </button>
        </div>
      </form>
    </Modal>
  )
}

type DeleteTarget = { type: 'perfil' } | { type: 'proceso'; item: ProcesoNode } | { type: 'opcion'; item: Opcion }

/** Administración de Perfiles — árbol de menú propio con permisos C/M/I/B por opción. */
export function PerfilesPage() {
  const { perfiles, procesosPorPerfil, funcionalidades, savePerfil, cambiarEstadoPerfil, deletePerfil, copiarPerfil, upsertProceso, deleteProceso, upsertOpcion, deleteOpcion, toggleOperacion } =
    useSeguridadStore()
  const showToast = useUIStore((s) => s.showToast)

  const [form, setForm] = useState(emptyPerfilForm)
  const [selectedProceso, setSelectedProceso] = useState<ProcesoNode | null>(null)

  const [carpetaModal, setCarpetaModal] = useState<{ parentNode: ProcesoNode | null; initial: CarpetaForm } | null>(null)
  const [opcionModal, setOpcionModal] = useState<{ initial: OpcionForm } | null>(null)
  const [copiarModalOpen, setCopiarModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null)

  const arbol = form.codigo ? procesosPorPerfil[form.codigo] ?? [] : []

  const selectPerfil = (row: Perfil) => {
    setForm({ codigo: row.codigo, nombre: row.nombre, descripcion: row.descripcion, activo: row.activo })
    setSelectedProceso(null)
  }

  const startNew = () => {
    setForm({ ...emptyPerfilForm })
    setSelectedProceso(null)
  }

  const handleSubmitPerfil = (e: React.FormEvent) => {
    e.preventDefault()
    const guardado = savePerfil(form.codigo, { nombre: form.nombre, descripcion: form.descripcion })
    setForm({ codigo: guardado.codigo, nombre: guardado.nombre, descripcion: guardado.descripcion, activo: guardado.activo })
    showToast(form.codigo ? 'Perfil actualizado correctamente.' : 'Perfil creado correctamente.')
  }

  const handleToggleActivo = (checked: boolean) => {
    if (!form.codigo) {
      setForm({ ...form, activo: checked })
      return
    }
    cambiarEstadoPerfil(form.codigo, checked)
    setForm({ ...form, activo: checked })
    showToast('Estado del perfil actualizado.')
  }

  const handleDeletePerfil = () => {
    if (!form.codigo) return
    deletePerfil(form.codigo)
    startNew()
    showToast('Perfil eliminado.')
    setDeleteTarget(null)
  }

  const handleCopiar = ({ origenCodigo, nombre, descripcion }: { origenCodigo: number; nombre: string; descripcion: string }) => {
    const nuevo = copiarPerfil(origenCodigo, { nombre, descripcion })
    setCopiarModalOpen(false)
    selectPerfil(nuevo)
    showToast('Perfil copiado correctamente.')
  }

  const submitCarpeta = (data: CarpetaForm) => {
    if (!form.codigo) return
    upsertProceso(form.codigo, { ...data, clave: data.requiereClave ? data.clave : null }, carpetaModal?.parentNode?.codigo ?? null)
    setCarpetaModal(null)
    showToast('Carpeta guardada correctamente.')
  }

  const handleDeleteProceso = () => {
    if (!form.codigo || deleteTarget?.type !== 'proceso') return
    deleteProceso(form.codigo, deleteTarget.item.codigo)
    if (selectedProceso?.codigo === deleteTarget.item.codigo) setSelectedProceso(null)
    showToast('Carpeta eliminada.')
    setDeleteTarget(null)
  }

  const submitOpcion = (data: OpcionForm) => {
    if (!form.codigo) return
    upsertOpcion(form.codigo, selectedProceso?.codigo ?? null, {
      codigo: data.codigo,
      funcionCodigo: data.funcionCodigo,
      nombre: data.nombre,
      icono: data.icono || undefined,
      tecla: data.tecla || undefined,
      requiereClave: data.requiereClave,
      clave: data.requiereClave ? data.clave : null,
      operaciones: data.operaciones,
    })
    setOpcionModal(null)
    // Refresca la referencia del nodo seleccionado (sus opciones pudieron cambiar).
    if (selectedProceso) {
      const actualizado = findNode(procesosPorPerfil[form.codigo] ?? [], selectedProceso.codigo)
      if (actualizado) setSelectedProceso(actualizado)
    }
    showToast('Opción guardada correctamente.')
  }

  const handleDeleteOpcion = () => {
    if (!form.codigo || deleteTarget?.type !== 'opcion') return
    deleteOpcion(form.codigo, deleteTarget.item.codigo)
    showToast('Opción eliminada.')
    setDeleteTarget(null)
  }

  const handleToggleOperacion = (opcion: Opcion, codigo: OperacionCodigo) => {
    if (!form.codigo) return
    toggleOperacion(form.codigo, opcion.codigo, codigo)
  }

  const perfilLookupOptions = perfiles.map((p) => ({ id: p.codigo, codigo: p.codigo, nombre: p.nombre }))
  const funcionalidadLookupOptions = funcionalidades.map((f) => ({ id: f.codigo, codigo: f.identificador, nombre: f.nombre }))
  const selectedProcesoActual = selectedProceso ? findNode(arbol, selectedProceso.codigo) : null

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5 text-2xl font-bold text-brand-500">
          <ShieldCheck className="size-6" /> Administración de Perfiles
        </div>
        <p className="text-sm text-muted">Cree perfiles de seguridad y arme su propio árbol de menú, con permisos de Consultar/Modificar/Insertar/Borrar por opción.</p>
      </div>

      <DataTable
        columns={[
          { key: 'codigo', header: 'Código' },
          { key: 'nombre', header: 'Nombre' },
          { key: 'descripcion', header: 'Descripción' },
          { key: 'activo', header: 'Estado', render: (row) => <Badge tone={row.activo ? 'success' : 'danger'} dot>{row.activo ? 'Activo' : 'Inactivo'}</Badge> },
        ]}
        rows={perfiles}
        onRowClick={selectPerfil}
        emptyMessage="No hay perfiles registrados."
        className="rounded-lg border border-line bg-card shadow-soft"
      />

      <div className="flex justify-end gap-2.5">
        <button
          onClick={() => setCopiarModalOpen(true)}
          className="flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-hover"
        >
          <Copy className="size-4" /> Copiar Perfil
        </button>
        <button onClick={startNew} className="flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          <Plus className="size-4" /> Nuevo Perfil
        </button>
      </div>

      <div className="rounded-lg border border-line bg-card p-5 shadow-soft">
        <form onSubmit={handleSubmitPerfil} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Código">
              <input type="text" readOnly className={inputClass} value={form.codigo ?? 'Autogenerado'} />
            </FormField>
            <label className="flex items-end gap-2 pb-2 text-sm text-ink">
              <input type="checkbox" className="size-4 accent-brand-500" checked={form.activo} onChange={(e) => handleToggleActivo(e.target.checked)} />
              Perfil Activo
            </label>
            <FormField label="Nombre" full>
              <input type="text" required className={inputClass} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
            </FormField>
            <FormField label="Descripción" full>
              <input type="text" required className={inputClass} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
            </FormField>
          </div>
          <div className="flex justify-end gap-2.5">
            {form.codigo && (
              <button type="button" onClick={() => setDeleteTarget({ type: 'perfil' })} className="flex items-center gap-2 rounded-md bg-danger px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                <Trash2 className="size-4" /> Eliminar
              </button>
            )}
            <button type="submit" className="flex items-center gap-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
              <Save className="size-4" /> Guardar Perfil
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-2 items-start gap-5">
        <div className="flex flex-col rounded-lg border border-line bg-card p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between border-b border-line pb-2.5">
            <h4 className="m-0 font-semibold text-ink">Procesos</h4>
            {form.codigo && (
              <button
                onClick={() => setCarpetaModal({ parentNode: null, initial: { codigo: null, nombre: '', requiereClave: false, clave: '' } })}
                className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-hover"
              >
                <Plus className="size-3.5" /> Nueva Carpeta
              </button>
            )}
          </div>
          {!form.codigo ? (
            <div className="py-8 text-center text-sm text-muted">Guarde el perfil antes de armar su árbol de procesos.</div>
          ) : (
            <ProcessTree
              tree={arbol}
              selectedCodigo={selectedProceso?.codigo}
              onSelect={setSelectedProceso}
              onAddChild={(node) => setCarpetaModal({ parentNode: node, initial: { codigo: null, nombre: '', requiereClave: false, clave: '' } })}
              onEdit={(node) => setCarpetaModal({ parentNode: null, initial: { codigo: node.codigo, nombre: node.nombre, requiereClave: node.requiereClave, clave: '' } })}
              onDelete={(node) => setDeleteTarget({ type: 'proceso', item: node })}
            />
          )}
        </div>

        <div className="flex flex-col rounded-lg border border-line bg-card p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between border-b border-line pb-2.5">
            <h4 className="m-0 font-semibold text-ink">
              Opciones para: <span className="text-brand-500">{selectedProcesoActual?.nombre ?? '—'}</span>
            </h4>
            {selectedProcesoActual && (
              <button
                onClick={() =>
                  setOpcionModal({ initial: { codigo: null, funcionCodigo: null, nombre: '', icono: '', tecla: '', requiereClave: false, clave: '', operaciones: [] } })
                }
                className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-hover"
              >
                <Plus className="size-3.5" /> Nueva Opción
              </button>
            )}
          </div>

          {!selectedProcesoActual ? (
            <div className="py-8 text-center text-sm text-muted">Seleccione un proceso del árbol para ver sus opciones.</div>
          ) : (
            <OptionsGrid
              opciones={selectedProcesoActual.opciones}
              onToggleOperacion={handleToggleOperacion}
              onEdit={(opcion) =>
                setOpcionModal({
                  initial: {
                    codigo: opcion.codigo,
                    funcionCodigo: opcion.funcionCodigo,
                    nombre: opcion.nombre,
                    icono: opcion.icono ?? '',
                    tecla: opcion.tecla ?? '',
                    requiereClave: opcion.requiereClave,
                    clave: '',
                    operaciones: opcion.operaciones,
                  },
                })
              }
              onDelete={(opcion) => setDeleteTarget({ type: 'opcion', item: opcion })}
            />
          )}
        </div>
      </div>

      <CarpetaModal
        open={!!carpetaModal}
        parentNombre={carpetaModal?.parentNode?.nombre}
        initial={carpetaModal?.initial ?? { codigo: null, nombre: '', requiereClave: false, clave: '' }}
        onSubmit={submitCarpeta}
        onClose={() => setCarpetaModal(null)}
      />

      <OpcionModal
        open={!!opcionModal}
        funcionalidades={funcionalidadLookupOptions}
        initial={opcionModal?.initial ?? { codigo: null, funcionCodigo: null, nombre: '', icono: '', tecla: '', requiereClave: false, clave: '', operaciones: [] }}
        onSubmit={submitOpcion}
        onClose={() => setOpcionModal(null)}
      />

      <CopiarModal open={copiarModalOpen} perfiles={perfilLookupOptions} onSubmit={handleCopiar} onClose={() => setCopiarModalOpen(false)} />

      <ConfirmDialog
        open={!!deleteTarget}
        title={deleteTarget?.type === 'perfil' ? 'Eliminar Perfil' : deleteTarget?.type === 'proceso' ? 'Eliminar Carpeta' : 'Eliminar Opción'}
        message={
          deleteTarget?.type === 'perfil'
            ? `¿Está seguro que desea eliminar el perfil "${form.nombre}"? Esta acción no se puede deshacer.`
            : deleteTarget?.type === 'proceso'
              ? `¿Está seguro que desea eliminar "${deleteTarget.item.nombre}" y todo su contenido (subcarpetas y opciones)?`
              : `¿Está seguro que desea eliminar la opción "${deleteTarget?.item.nombre}"?`
        }
        onConfirm={deleteTarget?.type === 'perfil' ? handleDeletePerfil : deleteTarget?.type === 'proceso' ? handleDeleteProceso : handleDeleteOpcion}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
