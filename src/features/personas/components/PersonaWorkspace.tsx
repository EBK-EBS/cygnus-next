import { useState, type ComponentType } from 'react'
import type { Persona } from '@/data/types'
import { usePersonasStore, existeIdentificacionDuplicada } from '@/store/personasStore'
import { useUIStore } from '@/store/uiStore'
import { PersonaHeader } from './PersonaHeader'
import { PersonaModuleForm } from './PersonaModuleForm'
import { ModuleCardShell } from './ModuleCardShell'
import { PersonaEstadoContent } from './PersonaEstadoContent'
import { PersonaRolesModule } from './roles/PersonaRolesModule'
import type { PersonaTabProps } from './tabs/types'
import { IdentificacionModuleContent } from './tabs/IdentificacionModuleContent'
import { NaturalTab } from './tabs/NaturalTab'
import { JuridicaTab } from './tabs/JuridicaTab'
import { PersonaContactoFields } from './tabs/PersonaContactoFields'
import { PersonaDireccionesFields } from './tabs/PersonaDireccionesFields'
import { LaboralTab } from './tabs/LaboralTab'
import { FamiliarTab } from './tabs/FamiliarTab'
import { CoopEstudiantilTab } from './tabs/CoopEstudiantilTab'
import { RepresentantesTab } from './tabs/RepresentantesTab'
import { CooperativaTab } from './tabs/CooperativaTab'
import { InfoAcademicaTab } from './tabs/InfoAcademicaTab'
import { InformacionAdicionalModuleContent } from './tabs/InformacionAdicionalModuleContent'
import { DocumentosEvidenciasModuleContent } from './tabs/DocumentosEvidenciasModuleContent'
import { CumplimientoModuleContent } from './tabs/CumplimientoModuleContent'

interface PersonaWorkspaceProps {
  persona: Persona
  onVolver: () => void
}

type ModuloId =
  | 'identificacion'
  | 'roles'
  | 'natural'
  | 'juridica'
  | 'contacto'
  | 'direcciones'
  | 'laboral'
  | 'familiar'
  | 'representantes'
  | 'infoAcademica'
  | 'coopEstudiantil'
  | 'cooperativa'
  | 'adicional'
  | 'documentos'
  | 'cumplimiento'
  | 'estado'

interface ModuloConfig {
  id: ModuloId
  title: string
  Contenido: ComponentType<PersonaTabProps>
  width: 'half' | 'full'
  aplica?: (p: Persona) => boolean
  validar?: (p: Persona) => string | null
}

/**
 * PF-01: además de los obligatorios ya existentes, valida unicidad de
 * `identificacion.numero` contra las Personas actualmente en memoria (ver
 * `existeIdentificacionDuplicada` en `personasStore.ts` para el alcance y las
 * limitaciones explícitas de esta validación).
 */
function validarIdentificacion(p: Persona): string | null {
  if (!p.identificacion.numero) return 'La identificación es obligatoria'
  if (!p.identificacion.tipoId) return 'El tipo de identificación es obligatorio'
  if (existeIdentificacionDuplicada(usePersonasStore.getState().personas, p.identificacion.numero, p.id)) {
    return 'Esta identificación ya está registrada para otra persona'
  }
  return null
}

function validarNatural(p: Persona): string | null {
  if (!p.nombres) return 'Los nombres son obligatorios'
  if (!p.primerApellido) return 'El primer apellido es obligatorio'
  return null
}

function validarJuridica(p: Persona): string | null {
  if (!p.razonSocial) return 'La razón social es obligatoria'
  return null
}

/**
 * Módulos del workspace — agrupados por dominio de información de Persona
 * Única (ver Política Transversal PT-PER-001), no por una traducción literal
 * 1:1 de las pestañas Legacy. Se consolidan en un solo módulo: Identificación
 * + Datos Generales (núcleo común de identidad, §5.1); Imágenes + Documentos
 * (documentos y evidencias, §5.4.4); LEYES LA/FT + FATCA/CRS (perfil de
 * cumplimiento, §5.5); Varios 1 + Varios 2 + Adicional (información
 * complementaria, ya tratada como un mismo dominio residual en el propio
 * Legacy).
 */
const MODULOS: ModuloConfig[] = [
  { id: 'identificacion', title: 'Identificación', Contenido: IdentificacionModuleContent, width: 'half', validar: validarIdentificacion },
  // "Roles" no usa PersonaModuleForm (no es un draft de Persona, es una colección de
  // vínculos Persona-Rol con su propia vigencia/estado) — se resuelve aparte en el render.
  { id: 'roles', title: 'Roles', Contenido: IdentificacionModuleContent, width: 'half' },
  { id: 'natural', title: 'Información Natural', Contenido: NaturalTab, width: 'half', aplica: (p) => p.tipoPersona === 'N', validar: validarNatural },
  { id: 'juridica', title: 'Información Jurídica', Contenido: JuridicaTab, width: 'half', aplica: (p) => p.tipoPersona === 'J', validar: validarJuridica },
  { id: 'contacto', title: 'Contacto', Contenido: PersonaContactoFields, width: 'half' },
  { id: 'direcciones', title: 'Direcciones', Contenido: PersonaDireccionesFields, width: 'half' },
  { id: 'laboral', title: 'Información Laboral', Contenido: LaboralTab, width: 'half', aplica: (p) => p.tipoPersona === 'N' },
  { id: 'familiar', title: 'Información Familiar', Contenido: FamiliarTab, width: 'half', aplica: (p) => p.tipoPersona === 'N' },
  { id: 'representantes', title: 'Representantes y Socios', Contenido: RepresentantesTab, width: 'half', aplica: (p) => p.tipoPersona === 'J' },
  { id: 'infoAcademica', title: 'Información Académica', Contenido: InfoAcademicaTab, width: 'half' },
  { id: 'coopEstudiantil', title: 'Coop. Estudiantil', Contenido: CoopEstudiantilTab, width: 'half', aplica: (p) => p.tipoPersona === 'N' },
  { id: 'cooperativa', title: 'Cooperativa', Contenido: CooperativaTab, width: 'half' },
  { id: 'adicional', title: 'Información Adicional', Contenido: InformacionAdicionalModuleContent, width: 'full' },
  { id: 'documentos', title: 'Documentos y Evidencias', Contenido: DocumentosEvidenciasModuleContent, width: 'full' },
  { id: 'cumplimiento', title: 'Cumplimiento y Debida Diligencia', Contenido: CumplimientoModuleContent, width: 'full' },
  // "Estado" no usa PersonaModuleForm (no es un formulario con draft) — se resuelve
  // aparte en el render, pero necesita numeración y chrome igual que los demás.
  { id: 'estado', title: 'Estado', Contenido: IdentificacionModuleContent, width: 'half' },
]

const EXPANDIDOS_POR_DEFECTO: ModuloId[] = ['identificacion', 'roles', 'estado']

/**
 * Workspace de una persona seleccionada — grid de módulos independientes
 * (colapsables, maximizables y numerados), cada uno reflejando un dominio de
 * información de Persona Única en vez de una pestaña Legacy. Sólo un módulo
 * puede estar en edición a la vez: `editandoId` bloquea el botón "Editar" de
 * los demás mientras uno tiene un draft abierto.
 */
export function PersonaWorkspace({ persona, onVolver }: PersonaWorkspaceProps) {
  const modulos = MODULOS.filter((m) => !m.aplica || m.aplica(persona)).map((m, i) => ({ ...m, numero: i + 1 }))
  const [colapsados, setColapsados] = useState<Set<ModuloId>>(
    () => new Set(MODULOS.map((m) => m.id).filter((id) => !EXPANDIDOS_POR_DEFECTO.includes(id))),
  )
  const [maximizadoId, setMaximizadoId] = useState<ModuloId | null>(null)
  const [editandoId, setEditandoId] = useState<ModuloId | null>(null)

  const actualizarPersona = usePersonasStore((s) => s.actualizarPersona)
  const showToast = useUIStore((s) => s.showToast)

  function toggleColapso(id: ModuloId) {
    setColapsados((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleMaximizado(id: ModuloId) {
    setMaximizadoId((prev) => (prev === id ? null : id))
  }

  function handleGuardarModulo(datos: Persona) {
    actualizarPersona(persona.id, datos)
    showToast('Persona actualizada correctamente')
  }

  const maximizado = maximizadoId ? modulos.find((m) => m.id === maximizadoId) : undefined
  const visibles = maximizado ? [maximizado] : modulos

  return (
    <div className="flex flex-col gap-4">
      <PersonaHeader persona={persona} onVolver={onVolver} />

      <div className={maximizado ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-1 gap-3 lg:grid-cols-2'}>
        {visibles.map((modulo) => (
          <div key={modulo.id} className={!maximizado && modulo.width === 'full' ? 'lg:col-span-2' : undefined}>
            {modulo.id === 'estado' ? (
              <ModuleCardShell
                numero={modulo.numero}
                title="Estado"
                collapsed={colapsados.has(modulo.id)}
                onToggleCollapse={() => toggleColapso(modulo.id)}
                maximized={maximizadoId === modulo.id}
                onToggleMaximize={() => toggleMaximizado(modulo.id)}
              >
                <PersonaEstadoContent persona={persona} />
              </ModuleCardShell>
            ) : modulo.id === 'roles' ? (
              <PersonaRolesModule
                persona={persona}
                numero={modulo.numero}
                collapsed={colapsados.has(modulo.id)}
                onToggleCollapse={() => toggleColapso(modulo.id)}
                maximized={maximizadoId === modulo.id}
                onToggleMaximize={() => toggleMaximizado(modulo.id)}
                bloqueada={editandoId !== null && editandoId !== modulo.id}
                editando={editandoId === modulo.id}
                onIniciarEdicion={() => setEditandoId(modulo.id)}
                onFinalizarEdicion={() => setEditandoId(null)}
              />
            ) : (
              <PersonaModuleForm
                numero={modulo.numero}
                title={modulo.title}
                persona={persona}
                Contenido={modulo.Contenido}
                onGuardar={handleGuardarModulo}
                validar={modulo.validar}
                collapsed={colapsados.has(modulo.id)}
                onToggleCollapse={() => toggleColapso(modulo.id)}
                maximized={maximizadoId === modulo.id}
                onToggleMaximize={() => toggleMaximizado(modulo.id)}
                bloqueada={editandoId !== null && editandoId !== modulo.id}
                editando={editandoId === modulo.id}
                onIniciarEdicion={() => setEditandoId(modulo.id)}
                onFinalizarEdicion={() => setEditandoId(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
