import { SeccionTitulo } from '../PersonaField'
import type { PersonaTabProps } from './types'
import { Varios1Tab } from './Varios1Tab'
import { Varios2Tab } from './Varios2Tab'
import { AdicionalTab } from './AdicionalTab'

/**
 * Módulo "Información Adicional" — agrupa las tres pestañas Legacy "Varios 1",
 * "Varios 2" y "Adicional". El propio Legacy ya las trata como un mismo
 * dominio residual (información complementaria que no pertenece al núcleo
 * de identidad, contacto, laboral ni cumplimiento), así que se consolidan en
 * un solo módulo en vez de fragmentarlas en tres pestañas sin criterio claro
 * de separación.
 */
export function InformacionAdicionalModuleContent(props: PersonaTabProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <SeccionTitulo>Varios 1</SeccionTitulo>
        <Varios1Tab {...props} />
      </div>
      <div>
        <SeccionTitulo>Varios 2</SeccionTitulo>
        <Varios2Tab {...props} />
      </div>
      <div>
        <SeccionTitulo>Adicional</SeccionTitulo>
        <AdicionalTab {...props} />
      </div>
    </div>
  )
}
