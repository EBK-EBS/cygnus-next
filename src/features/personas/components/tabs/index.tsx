import type { ComponentType } from 'react'
import type { PersonaTabId } from '../PersonaTabBar'
import type { PersonaTabProps } from './types'
import { PersonaIdentificacionFields } from './PersonaIdentificacionFields'
import { PersonaDatosGeneralesFields } from './PersonaDatosGeneralesFields'
import { NaturalTab as NaturalFields } from './NaturalTab'
import { JuridicaTab as JuridicaFields } from './JuridicaTab'
import { CoopEstudiantilTab } from './CoopEstudiantilTab'
import { DireccionTab } from './DireccionTab'
import { LaboralTab } from './LaboralTab'
import { FamiliarTab } from './FamiliarTab'
import { ImagenesTab } from './ImagenesTab'
import { RepresentantesTab } from './RepresentantesTab'
import { CooperativaTab } from './CooperativaTab'
import { Varios1Tab } from './Varios1Tab'
import { Varios2Tab } from './Varios2Tab'
import { AdicionalTab } from './AdicionalTab'
import { InfoAcademicaTab } from './InfoAcademicaTab'
import { DocumentosTab } from './DocumentosTab'
import { LeyesLaftTab } from './LeyesLaftTab'
import { FatcaCrsTab } from './FatcaCrsTab'

export type { PersonaTabProps } from './types'

/**
 * Composición usada por `PersonaForm` (creación, un único formulario por tipo) para las
 * pestañas "Natural"/"Jurídica": agrupa los campos comunes de Persona Única
 * (Identificación + Datos Generales) con los campos específicos del tipo. En el
 * workspace de consulta/edición estos mismos bloques se muestran como secciones
 * independientes en vez de estar apilados en una sola pestaña.
 */
function NaturalTab(props: PersonaTabProps) {
  return (
    <div className="flex flex-col gap-6">
      <PersonaIdentificacionFields {...props} />
      <PersonaDatosGeneralesFields {...props} />
      <NaturalFields {...props} />
    </div>
  )
}

function JuridicaTab(props: PersonaTabProps) {
  return (
    <div className="flex flex-col gap-6">
      <PersonaIdentificacionFields {...props} />
      <PersonaDatosGeneralesFields {...props} />
      <JuridicaFields {...props} />
    </div>
  )
}

/** Mapa pestaña → componente, usado por `PersonaForm` (creación) y por el workspace de Personas. */
export const PERSONA_TAB_COMPONENTS: Record<PersonaTabId, ComponentType<PersonaTabProps>> = {
  natural: NaturalTab,
  juridica: JuridicaTab,
  coopEstudiantil: CoopEstudiantilTab,
  direccion: DireccionTab,
  laboral: LaboralTab,
  familiar: FamiliarTab,
  imagenes: ImagenesTab,
  representantes: RepresentantesTab,
  cooperativa: CooperativaTab,
  varios1: Varios1Tab,
  varios2: Varios2Tab,
  adicional: AdicionalTab,
  infoAcademica: InfoAcademicaTab,
  documentos: DocumentosTab,
  leyesLaft: LeyesLaftTab,
  fatcaCrs: FatcaCrsTab,
}
