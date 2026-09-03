import { useState, useEffect } from 'react'
import {
  Package,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  Shield,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Search,
  History,
  GitBranch,
} from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge, type BadgeTone } from '@/components/ui/Badge'
import { specificationService } from './services/specificationService'
import type {
  SpecificationPackage,
  SpecificationEntity,
  HistoricalRecord,
  ValidationCriterion,
  ValidationResult,
  SpecificationVersion,
  SpecificationStats,
  SpecificationTab,
} from './types'

const TABS: Array<{ id: SpecificationTab; label: string; icon: typeof Package }> = [
  { id: 'resumen', label: 'Resumen', icon: Package },
  { id: 'entidades', label: 'Entidades', icon: Database },
  { id: 'criterios', label: 'Criterios', icon: Shield },
  { id: 'historial', label: 'Historial', icon: History },
  { id: 'versiones', label: 'Versiones', icon: GitBranch },
]

function toneSeveridad(sev: 'CRITICO' | 'ALTO' | 'MEDIO' | 'BAJO'): BadgeTone {
  switch (sev) {
    case 'CRITICO': return 'danger'
    case 'ALTO': return 'warning'
    case 'MEDIO': return 'neutral'
    case 'BAJO': return 'neutral'
  }
}

function toneStatus(status: string): BadgeTone {
  switch (status) {
    case 'VALIDADO': return 'success'
    case 'PENDIENTE': return 'warning'
    case 'OBSERVADO': return 'warning'
    case 'RECHAZADO': return 'danger'
    default: return 'neutral'
  }
}

function EntityRow({ entity, historicalCount }: { entity: SpecificationEntity; historicalCount: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-hover transition-colors"
      >
        {expanded ? (
          <ChevronDown className="size-4 text-muted shrink-0" />
        ) : (
          <ChevronRight className="size-4 text-muted shrink-0" />
        )}
        <span className="text-xs font-medium text-muted w-16">{entity.id}</span>
        <span className="flex-1 text-sm font-medium text-ink">{entity.name}</span>
        <Badge tone={toneStatus(entity.status)} dot>{entity.status}</Badge>
        <span className="text-xs text-muted ml-2">{entity.attributes.length} attrs</span>
        <span className="text-xs text-muted ml-2">{entity.relationships.length} rels</span>
        <span className="text-xs text-muted ml-2">{historicalCount} hist</span>
      </button>
      {expanded && (
        <div className="bg-surface border-t border-line px-4 py-3 ml-11">
          <p className="text-sm text-muted mb-3">{entity.description}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-ink mb-2">Atributos ({entity.attributes.length})</h4>
              <ul className="space-y-1">
                {entity.attributes.map((attr) => (
                  <li key={attr.name} className="flex items-center gap-2 text-xs">
                    {attr.isPrimaryKey && <Badge tone="success">PK</Badge>}
                    {attr.isForeignKey && <Badge tone="warning">FK</Badge>}
                    <span className="font-medium text-ink">{attr.name}</span>
                    <span className="text-muted">{attr.type}</span>
                    {attr.nullable && <span className="text-muted">NULL</span>}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold text-ink mb-2">Relaciones ({entity.relationships.length})</h4>
              <ul className="space-y-1">
                {entity.relationships.map((rel, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    <Badge tone="neutral">{rel.type}</Badge>
                    <span className="text-ink">{rel.targetEntity}</span>
                    <span className="text-muted">via {rel.foreignKey}</span>
                  </li>
                ))}
              </ul>
              
              <h4 className="text-xs font-semibold text-ink mb-2 mt-4">Restricciones ({entity.constraints.length})</h4>
              <ul className="space-y-1">
                {entity.constraints.map((con, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    <Badge tone={con.type === 'PK' ? 'success' : con.type === 'FK' ? 'warning' : 'neutral'}>{con.type}</Badge>
                    <span className="text-ink">{con.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-muted">
            Última validación: {new Date(entity.lastValidated).toLocaleString('es-CO')} por {entity.validatedBy}
          </div>
        </div>
      )}
    </div>
  )
}

function HistoryRow({ record }: { record: HistoricalRecord }) {
  const [expanded, setExpanded] = useState(false)
  const hasDetails = record.previousValues || record.newValues

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={() => hasDetails && setExpanded(!expanded)}
        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${hasDetails ? 'hover:bg-hover' : ''}`}
      >
        {hasDetails ? (
          expanded ? (
            <ChevronDown className="size-4 text-muted shrink-0" />
          ) : (
            <ChevronRight className="size-4 text-muted shrink-0" />
          )
        ) : (
          <span className="size-4 shrink-0" />
        )}
        <Badge tone={record.action === 'CREACION' ? 'success' : record.action === 'MODIFICACION' ? 'warning' : 'neutral'}>
          {record.action}
        </Badge>
        <span className="flex-1 text-sm text-ink">{record.details}</span>
        <span className="text-xs text-muted">{record.userName}</span>
        <span className="text-xs text-muted ml-2">{new Date(record.timestamp).toLocaleDateString('es-CO')}</span>
      </button>
      {expanded && hasDetails && (
        <div className="bg-surface border-t border-line px-4 py-3 ml-11">
          <div className="grid grid-cols-2 gap-4">
            {record.previousValues && (
              <div>
                <h4 className="text-xs font-semibold text-ink mb-2">Valores Anteriores</h4>
                <pre className="text-xs text-muted bg-hover p-2 rounded">
                  {JSON.stringify(record.previousValues, null, 2)}
                </pre>
              </div>
            )}
            {record.newValues && (
              <div>
                <h4 className="text-xs font-semibold text-ink mb-2">Nuevos Valores</h4>
                <pre className="text-xs text-muted bg-hover p-2 rounded">
                  {JSON.stringify(record.newValues, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function CriterionRow({ criterion, result }: { criterion: ValidationCriterion; result?: ValidationResult }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-hover transition-colors"
      >
        {expanded ? (
          <ChevronDown className="size-4 text-muted shrink-0" />
        ) : (
          <ChevronRight className="size-4 text-muted shrink-0" />
        )}
        <span className="text-xs font-medium text-muted w-8">C{criterion.id}</span>
        <span className="flex-1 text-sm font-medium text-ink">{criterion.name}</span>
        <Badge tone={toneSeveridad(criterion.severity)}>{criterion.severity}</Badge>
        {result ? (
          <Badge tone={result.passed ? 'success' : 'danger'} dot>
            {result.passed ? 'PASS' : 'FAIL'}
          </Badge>
        ) : (
          <Badge tone="neutral">SIN EVALUAR</Badge>
        )}
      </button>
      {expanded && (
        <div className="bg-surface border-t border-line px-4 py-3 ml-11">
          <p className="text-sm text-muted mb-2">{criterion.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>Alcance: <Badge tone="neutral">{criterion.scope}</Badge></span>
            <span>Requerido: {criterion.isRequired ? 'Sí' : 'No'}</span>
          </div>
          {result && (
            <div className="mt-3">
              <p className="text-xs font-semibold text-ink mb-1">{result.message}</p>
              <ul className="space-y-1">
                {result.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    {result.passed ? (
                      <CheckCircle className="size-3 text-success" />
                    ) : (
                      <XCircle className="size-3 text-danger" />
                    )}
                    <span className="text-muted">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function VersionRow({ version }: { version: SpecificationVersion }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-hover transition-colors"
      >
        {expanded ? (
          <ChevronDown className="size-4 text-muted shrink-0" />
        ) : (
          <ChevronRight className="size-4 text-muted shrink-0" />
        )}
        <span className="text-sm font-medium text-ink">{version.version}</span>
        <Badge tone={toneStatus(version.status)}>{version.status}</Badge>
        <span className="text-xs text-muted ml-2">{version.date}</span>
        <span className="text-xs text-muted ml-2">{version.author}</span>
      </button>
      {expanded && (
        <div className="bg-surface border-t border-line px-4 py-3 ml-11">
          <h4 className="text-xs font-semibold text-ink mb-2">Cambios</h4>
          <ul className="space-y-1">
            {version.changes.map((change, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-muted">
                <ChevronRight className="size-3" />
                {change}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export function SpecificationPackagePage() {
  const [activeTab, setActiveTab] = useState<SpecificationTab>('resumen')
  const [pkg, setPkg] = useState<SpecificationPackage | null>(null)
  const [entities, setEntities] = useState<SpecificationEntity[]>([])
  const [history, setHistory] = useState<HistoricalRecord[]>([])
  const [criteria, setCriteria] = useState<ValidationCriterion[]>([])
  const [results, setResults] = useState<ValidationResult[]>([])
  const [versions, setVersions] = useState<SpecificationVersion[]>([])
  const [stats, setStats] = useState<SpecificationStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [textoBusqueda, setTextoBusqueda] = useState('')

  useEffect(() => {
    async function cargar() {
      setLoading(true)
      const [p, e, h, c, r, v, s] = await Promise.all([
        specificationService.obtenerPaquete(),
        specificationService.listarEntidades(),
        specificationService.listarHistorial(),
        specificationService.listarCriterios(),
        specificationService.listarResultados(),
        specificationService.listarVersiones(),
        specificationService.obtenerEstadisticas(),
      ])
      setPkg(p)
      setEntities(e)
      setHistory(h)
      setCriteria(c)
      setResults(r)
      setVersions(v)
      setStats(s)
      setLoading(false)
    }
    cargar()
  }, [])

  async function recargar() {
    setLoading(true)
    const [p, e, h, c, r, v, s] = await Promise.all([
      specificationService.obtenerPaquete(),
      specificationService.listarEntidades(),
      specificationService.listarHistorial(),
      specificationService.listarCriterios(),
      specificationService.listarResultados(),
      specificationService.listarVersiones(),
      specificationService.obtenerEstadisticas(),
    ])
    setPkg(p)
    setEntities(e)
    setHistory(h)
    setCriteria(c)
    setResults(r)
    setVersions(v)
    setStats(s)
    setLoading(false)
  }

  function renderResumen() {
    if (!stats || !pkg) return null
    const cards = [
      { label: 'Entidades', value: stats.totalEntities, icon: Database, color: 'bg-brand-50 text-brand-500' },
      { label: 'Validadas', value: stats.validatedEntities, icon: CheckCircle, color: 'bg-success/10 text-success' },
      { label: 'Pendientes', value: stats.pendingEntities, icon: Clock, color: 'bg-warning/10 text-warning' },
      { label: 'Criterios', value: stats.totalCriteria, icon: Shield, color: 'bg-brand-50 text-brand-500' },
      { label: 'Aprobados', value: stats.passedCriteria, icon: CheckCircle, color: 'bg-success/10 text-success' },
      { label: 'Fallidos', value: stats.failedCriteria, icon: XCircle, color: 'bg-danger/10 text-danger' },
      { label: 'Registros Hist.', value: stats.totalHistoricalRecords, icon: History, color: 'bg-info/10 text-info' },
      { label: 'Versión', value: pkg.version, icon: GitBranch, color: 'bg-brand-50 text-brand-500', isText: true },
    ]

    const cumplimiento = Math.round((stats.passedCriteria / stats.totalCriteria) * 100)

    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          {cards.slice(0, 4).map((c) => (
            <Card key={c.label} className="mb-0">
              <div className="flex items-center gap-3 p-4">
                <div className={`flex size-10 items-center justify-center rounded-lg ${c.color}`}>
                  <c.icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink">{c.value}</p>
                  <p className="text-xs text-muted">{c.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {cards.slice(4).map((c) => (
            <Card key={c.label} className="mb-0">
              <div className="flex items-center gap-3 p-4">
                <div className={`flex size-10 items-center justify-center rounded-lg ${c.color}`}>
                  <c.icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink">{c.value}</p>
                  <p className="text-xs text-muted">{c.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader title="Resumen del Paquete de Especificación" />
          <div className="p-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted">Nombre:</span>
                  <span className="font-medium text-ink">{pkg.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted">Descripción:</span>
                  <span className="text-ink">{pkg.description}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted">Estado:</span>
                  <Badge tone={toneStatus(pkg.status)} dot>{pkg.status}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted">Creado por:</span>
                  <span className="text-ink">{pkg.createdBy}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted">Última actualización:</span>
                  <span className="text-ink">{new Date(pkg.updatedAt).toLocaleString('es-CO')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted">Última validación:</span>
                  <span className="text-ink">{new Date(stats.lastValidationDate).toLocaleString('es-CO')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted">Cumplimiento:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-hover rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${cumplimiento >= 80 ? 'bg-success' : cumplimiento >= 60 ? 'bg-warning' : 'bg-danger'}`}
                        style={{ width: `${cumplimiento}%` }}
                      />
                    </div>
                    <span className="font-medium text-ink">{cumplimiento}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Historial Reciente" />
          <div>
            {history.slice(0, 5).map((record) => (
              <HistoryRow key={record.id} record={record} />
            ))}
          </div>
        </Card>
      </div>
    )
  }

  function renderEntidades() {
    const busqueda = textoBusqueda.toLowerCase()
    const filtradas = entities.filter(
      (e) => !busqueda || e.name.toLowerCase().includes(busqueda) || e.tableName.toLowerCase().includes(busqueda),
    )

    return (
      <Card>
        <CardHeader
          title="Entidades del Modelo Canónico"
          right={<span className="text-xs text-muted">{filtradas.length} entidades</span>}
        />
        <div>
          {filtradas.map((entity) => (
            <EntityRow
              key={entity.id}
              entity={entity}
              historicalCount={history.filter((h) => h.entityId === entity.id).length}
            />
          ))}
        </div>
      </Card>
    )
  }

  function renderCriterios() {
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader title="Criterios de Validación" />
          <div>
            {criteria.map((criterio) => (
              <CriterionRow
                key={criterio.id}
                criterion={criterio}
                result={results.find((r) => r.criterionId === criterio.id)}
              />
            ))}
          </div>
        </Card>
      </div>
    )
  }

  function renderHistorial() {
    return (
      <Card>
        <CardHeader title="Historial de Cambios" />
        <div>
          {history.map((record) => (
            <HistoryRow key={record.id} record={record} />
          ))}
        </div>
      </Card>
    )
  }

  function renderVersiones() {
    return (
      <Card>
        <CardHeader title="Versiones del Paquete" />
        <div>
          {versions.map((version) => (
            <VersionRow key={version.version} version={version} />
          ))}
        </div>
      </Card>
    )
  }

  if (loading) {
    return <div className="p-8 text-center text-muted">Cargando paquete de especificación...</div>
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink">Specification Package</h1>
          <p className="text-sm text-muted">Modelo E/R Canónico CACSA — Paquete de especificación con contexto histórico rico</p>
        </div>
        <button
          onClick={recargar}
          disabled={loading}
          className="flex items-center gap-1.5 rounded bg-brand-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-600 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} />
          Recargar
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 rounded-lg border border-line bg-surface p-1">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-brand-500 text-white'
                  : 'text-muted hover:bg-hover hover:text-ink'
              }`}
            >
              <Icon className="size-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Filtros (solo en vista de entidades) */}
      {activeTab === 'entidades' && (
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Buscar entidad..."
              className="w-full rounded border border-line bg-surface py-2 pl-9 pr-3 text-sm text-ink outline-none focus:border-brand-500"
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
            />
          </div>
          {textoBusqueda && (
            <button
              onClick={() => setTextoBusqueda('')}
              className="text-xs text-brand-500 hover:underline"
            >
              Limpiar
            </button>
          )}
        </div>
      )}

      {/* Contenido */}
      {activeTab === 'resumen' && renderResumen()}
      {activeTab === 'entidades' && renderEntidades()}
      {activeTab === 'criterios' && renderCriterios()}
      {activeTab === 'historial' && renderHistorial()}
      {activeTab === 'versiones' && renderVersiones()}
    </div>
  )
}
