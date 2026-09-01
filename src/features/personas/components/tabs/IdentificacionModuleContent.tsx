import { SeccionTitulo } from '../PersonaField'
import type { PersonaTabProps } from './types'
import { PersonaIdentificacionFields } from './PersonaIdentificacionFields'
import { PersonaDatosGeneralesFields } from './PersonaDatosGeneralesFields'

/**
 * Módulo "Identificación" del workspace — núcleo común de identidad de Persona
 * Única (Política PT-PER-001 §5.1): identificadores oficiales, código de
 * asociado y los demás atributos maestros que no son específicos de un rol ni
 * del tipo de persona. Compone dos grupos de campos ya existentes sin
 * duplicar su lógica.
 */
export function IdentificacionModuleContent(props: PersonaTabProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <SeccionTitulo>Identificación</SeccionTitulo>
        <PersonaIdentificacionFields {...props} />
      </div>
      <div>
        <SeccionTitulo>Datos Generales</SeccionTitulo>
        <PersonaDatosGeneralesFields {...props} />
      </div>
    </div>
  )
}
