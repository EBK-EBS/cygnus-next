import { SeccionTitulo } from '../PersonaField'
import { PersonaContactoFields } from './PersonaContactoFields'
import { PersonaDireccionesFields } from './PersonaDireccionesFields'
import type { PersonaTabProps } from './types'

/**
 * Pestaña "Dirección" (`Direccion.png`) usada en `PersonaForm` (creación) — compone
 * `PersonaDireccionesFields` + `PersonaContactoFields`, que en el workspace de consulta/edición
 * se muestran como dos secciones independientes ("Direcciones" e "Información de Contacto").
 */
export function DireccionTab(props: PersonaTabProps) {
  return (
    <div>
      <div className="mb-6">
        <SeccionTitulo>Direcciones</SeccionTitulo>
        <PersonaDireccionesFields {...props} />
      </div>
      <div>
        <SeccionTitulo>Información de Contacto</SeccionTitulo>
        <PersonaContactoFields {...props} />
      </div>
    </div>
  )
}
