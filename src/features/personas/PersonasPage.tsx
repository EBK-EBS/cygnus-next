import { useState, useMemo } from 'react'
import { Plus, Search, Users, Building2, UserCheck, UserX } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { Badge, tonePorEstado } from '@/components/ui/Badge'
import { useUIStore } from '@/store/uiStore'
import { usePersonasStore, buscarPersonas, contarPorTipo, contarActivas } from '@/store/personasStore'
import type { Persona, TipoPersona } from '@/data/types'
import { PersonaForm } from './components/PersonaForm'
import { PersonaWorkspace } from './components/PersonaWorkspace'
import { ConfirmModal } from './components/ConfirmModal'

type VistaActual = 'listado' | 'workspace' | 'crear'

export function PersonasPage() {
  const [vista, setVista] = useState<VistaActual>('listado')
  const [personaSeleccionadaId, setPersonaSeleccionadaId] = useState<number | null>(null)
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<TipoPersona | ''>('')
  const [filtroEstado, setFiltroEstado] = useState('')
  const [tipoCreacion, setTipoCreacion] = useState<TipoPersona>('N')
  const [personaAInactivar, setPersonaAInactivar] = useState<Persona | null>(null)

  const showToast = useUIStore((s) => s.showToast)
  const todasLasPersonas = usePersonasStore((s) => s.personas)
  const crearPersona = usePersonasStore((s) => s.crearPersona)
  const cambiarEstado = usePersonasStore((s) => s.cambiarEstado)

  // Datos filtrados — recalcula automáticamente cuando el store cambia (crear/activar/desactivar)
  const personas = useMemo(() => {
    let resultado = buscarPersonas(todasLasPersonas, textoBusqueda)
    if (filtroTipo) resultado = resultado.filter((p) => p.tipoPersona === filtroTipo)
    if (filtroEstado) resultado = resultado.filter((p) => p.estado === filtroEstado)
    return resultado
  }, [todasLasPersonas, textoBusqueda, filtroTipo, filtroEstado])

  // Estadísticas — conteos globales (no dependen de los filtros de búsqueda)
  const totalNaturales = contarPorTipo(todasLasPersonas, 'N')
  const totalJuridicas = contarPorTipo(todasLasPersonas, 'J')
  const totalActivas = contarActivas(todasLasPersonas)

  const personaSeleccionada = useMemo(
    () => todasLasPersonas.find((p) => p.id === personaSeleccionadaId) ?? null,
    [todasLasPersonas, personaSeleccionadaId],
  )

  function seleccionarYAbrirWorkspace(id: number) {
    setPersonaSeleccionadaId(id)
    setVista('workspace')
  }

  // Columnas de la tabla
  const columns: Array<Column<Persona>> = [
    {
      key: 'identificacion',
      header: 'Identificación',
      render: (row) => (
        <span className="font-medium text-ink">
          {row.identificacion.numero}
        </span>
      ),
    },
    {
      key: 'nombre',
      header: 'Nombre / Razón Social',
      render: (row) => (
        <div>
          <p className="font-medium text-ink">
            {row.tipoPersona === 'N'
              ? `${row.nombres} ${row.primerApellido}${row.segundoApellido ? ' ' + row.segundoApellido : ''}`
              : row.razonSocial || row.nombres}
          </p>
          {row.email && <p className="text-xs text-muted">{row.email}</p>}
        </div>
      ),
    },
    {
      key: 'tipo',
      header: 'Tipo',
      align: 'center',
      render: (row) => (
        <Badge tone="neutral">
          {row.tipoPersona === 'N' ? 'Natural' : 'Jurídica'}
        </Badge>
      ),
    },
    {
      key: 'estado',
      header: 'Estado',
      align: 'center',
      render: (row) => (
        <Badge tone={tonePorEstado(row.estado)} dot>
          {row.estado}
        </Badge>
      ),
    },
    {
      key: 'ciudad',
      header: 'Ciudad',
      render: (row) => row.ciudadExpedicion ?? '—',
    },
    {
      key: 'acciones',
      header: '',
      align: 'center',
      render: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              seleccionarYAbrirWorkspace(row.id)
            }}
            className="rounded px-2 py-1 text-xs text-brand-500 transition-colors hover:bg-brand-50"
          >
            Editar
          </button>
          {row.estado === 'Activo' && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setPersonaAInactivar(row)
              }}
              className="rounded px-2 py-1 text-xs text-danger transition-colors hover:bg-danger/10"
            >
              Inactivar
            </button>
          )}
        </div>
      ),
    },
  ]

  function handleGuardarCreacion(persona: Persona) {
    const nueva = crearPersona(persona)
    showToast('Persona creada correctamente')
    setPersonaSeleccionadaId(nueva.id)
    setVista('workspace')
  }

  function handleCrear(tipo: TipoPersona) {
    setTipoCreacion(tipo)
    setVista('crear')
  }

  function confirmarInactivacion() {
    if (!personaAInactivar) return
    cambiarEstado(personaAInactivar.id, 'Inactivo')
    showToast('Persona inactivada correctamente')
    setPersonaAInactivar(null)
  }

  // Vista de workspace (secciones colapsables de la persona seleccionada)
  if (vista === 'workspace' && personaSeleccionada) {
    return (
      <PersonaWorkspace
        persona={personaSeleccionada}
        onVolver={() => {
          setVista('listado')
          setPersonaSeleccionadaId(null)
        }}
      />
    )
  }

  // Vista de creación
  if (vista === 'crear') {
    return (
      <PersonaForm
        tipoInicial={tipoCreacion}
        onGuardar={handleGuardarCreacion}
        onCancelar={() => setVista('listado')}
      />
    )
  }

  // Vista de listado
  return (
    <div className="flex flex-col gap-4">
      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="mb-0">
          <div className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
              <Users className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-ink">{personas.length}</p>
              <p className="text-xs text-muted">Total Personas</p>
            </div>
          </div>
        </Card>
        <Card className="mb-0">
          <div className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
              <UserCheck className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-ink">{totalActivas}</p>
              <p className="text-xs text-muted">Activas</p>
            </div>
          </div>
        </Card>
        <Card className="mb-0">
          <div className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-info/10 text-info">
              <UserX className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-ink">{totalNaturales}</p>
              <p className="text-xs text-muted">Naturales</p>
            </div>
          </div>
        </Card>
        <Card className="mb-0">
          <div className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
              <Building2 className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-ink">{totalJuridicas}</p>
              <p className="text-xs text-muted">Jurídicas</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabla principal */}
      <Card>
        <CardHeader
          title="Personas"
          right={
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCrear('N')}
                className="flex items-center gap-1.5 rounded-md border border-brand-500 px-3 py-1.5 text-xs font-semibold text-brand-500 transition-colors hover:bg-brand-50"
              >
                <Plus className="size-3" />
                Natural
              </button>
              <button
                onClick={() => handleCrear('J')}
                className="flex items-center gap-1.5 rounded-md bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Plus className="size-3" />
                Jurídica
              </button>
            </div>
          }
        />

        {/* Filtros y búsqueda */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Buscar por nombre, identificación o email..."
              className="w-full rounded border border-line bg-surface py-2 pl-9 pr-3 text-sm text-ink outline-none focus:border-brand-500"
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
            />
          </div>
          <select
            className="rounded border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand-500"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as TipoPersona | '')}
          >
            <option value="">Todos los tipos</option>
            <option value="N">Natural</option>
            <option value="J">Jurídica</option>
          </select>
          <select
            className="rounded border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand-500"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          {(textoBusqueda || filtroTipo || filtroEstado) && (
            <button
              onClick={() => {
                setTextoBusqueda('')
                setFiltroTipo('')
                setFiltroEstado('')
              }}
              className="text-xs text-brand-500 hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <DataTable
          columns={columns}
          rows={personas}
          onRowClick={(row) => seleccionarYAbrirWorkspace(row.id)}
          emptyMessage="No se encontraron personas con los criterios de búsqueda"
          className="p-0"
        />
      </Card>

      <ConfirmModal
        open={personaAInactivar !== null}
        title="Confirmar inactivación"
        mensaje={
          personaAInactivar
            ? `¿Confirmas que deseas inactivar a "${personaAInactivar.nombres}${personaAInactivar.primerApellido ? ' ' + personaAInactivar.primerApellido : ''}"?`
            : ''
        }
        confirmLabel="Desactivar"
        onConfirm={confirmarInactivacion}
        onCancel={() => setPersonaAInactivar(null)}
      />
    </div>
  )
}
