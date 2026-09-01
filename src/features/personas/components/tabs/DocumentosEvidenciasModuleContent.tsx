import { SeccionTitulo } from '../PersonaField'
import type { PersonaTabProps } from './types'
import { ImagenesTab } from './ImagenesTab'
import { DocumentosTab } from './DocumentosTab'

/**
 * Módulo "Documentos y Evidencias" — agrupa soportes documentales e imágenes
 * bajo un mismo dominio (Política PT-PER-001 §5.4.4 y paquete KP-PER-07:
 * "Documentos y Evidencias"), en vez de mantenerlos como dos pestañas Legacy
 * sin relación aparente entre sí.
 */
export function DocumentosEvidenciasModuleContent(props: PersonaTabProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <SeccionTitulo>Imágenes</SeccionTitulo>
        <ImagenesTab {...props} />
      </div>
      <div>
        <SeccionTitulo>Documentos</SeccionTitulo>
        <DocumentosTab {...props} />
      </div>
    </div>
  )
}
