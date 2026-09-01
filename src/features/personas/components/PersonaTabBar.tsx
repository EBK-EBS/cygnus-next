import clsx from 'clsx'
import type { TipoPersona } from '@/data/types'

export type PersonaTabId =
  | 'natural'
  | 'juridica'
  | 'coopEstudiantil'
  | 'direccion'
  | 'laboral'
  | 'familiar'
  | 'imagenes'
  | 'representantes'
  | 'cooperativa'
  | 'varios1'
  | 'varios2'
  | 'adicional'
  | 'infoAcademica'
  | 'documentos'
  | 'leyesLaft'
  | 'fatcaCrs'

interface TabDef {
  id: PersonaTabId
  label: string
}

const TODAS_LAS_PESTANAS: TabDef[] = [
  { id: 'natural', label: 'Natural' },
  { id: 'juridica', label: 'Jurídica' },
  { id: 'coopEstudiantil', label: 'Coop. Estudiantil' },
  { id: 'direccion', label: 'Dirección' },
  { id: 'laboral', label: 'Laboral' },
  { id: 'familiar', label: 'Familiar' },
  { id: 'imagenes', label: 'Imágenes' },
  { id: 'representantes', label: 'Representante/Firmas' },
  { id: 'cooperativa', label: 'Cooperativa' },
  { id: 'varios1', label: 'Varios 1' },
  { id: 'varios2', label: 'Varios 2' },
  { id: 'adicional', label: 'Adicional' },
  { id: 'infoAcademica', label: 'Info Académica' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'leyesLaft', label: 'LEYES LA/FT' },
  { id: 'fatcaCrs', label: 'FATCA/CRS' },
]

/** Pestañas que solo aplican a un tipo de persona (las demás son comunes). */
const SOLO_NATURAL: PersonaTabId[] = ['natural', 'coopEstudiantil', 'familiar']
const SOLO_JURIDICA: PersonaTabId[] = ['juridica', 'representantes']

/** Filtra las 16 pestañas legacy según el tipo de persona (Natural / Jurídica). */
export function pestanasParaTipo(tipo: TipoPersona): TabDef[] {
  return TODAS_LAS_PESTANAS.filter((t) => {
    if (SOLO_NATURAL.includes(t.id)) return tipo === 'N'
    if (SOLO_JURIDICA.includes(t.id)) return tipo === 'J'
    return true
  })
}

interface PersonaTabBarProps<T extends string> {
  tabs: Array<{ id: T; label: string }>
  active: T
  onChange: (id: T) => void
}

/**
 * Barra de navegación por pestañas — mismo patrón visual que `ProductosView` de
 * Estado de Cuenta 360° (`border-b-2` + `text-brand-500` activo, scroll horizontal
 * si no caben todas). Genérica en el tipo de id para poder reutilizarse tanto en
 * `PersonaForm` (`PersonaTabId`) como en `PersonaWorkspace` (secciones del workspace).
 */
export function PersonaTabBar<T extends string>({ tabs, active, onChange }: PersonaTabBarProps<T>) {
  return (
    <div className="flex items-center gap-5 overflow-x-auto border-b border-line bg-card px-4">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={clsx(
            'whitespace-nowrap border-b-2 py-3.5 text-sm font-medium transition-colors',
            active === t.id ? 'border-brand-500 text-brand-500' : 'border-transparent text-muted hover:text-ink',
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
