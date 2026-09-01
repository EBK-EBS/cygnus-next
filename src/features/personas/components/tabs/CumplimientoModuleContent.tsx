import { SeccionTitulo } from '../PersonaField'
import type { PersonaTabProps } from './types'
import { LeyesLaftTab } from './LeyesLaftTab'
import { FatcaCrsTab } from './FatcaCrsTab'

/**
 * Módulo "Cumplimiento y Debida Diligencia" — LA/FT y FATCA/CRS pertenecen al
 * mismo dominio de perfil de cumplimiento de Persona Única (Política
 * PT-PER-001 §5.5 y paquete KP-PER-06), por lo que se agrupan en un solo
 * módulo en vez de dos pestañas Legacy separadas sin relación visible.
 */
export function CumplimientoModuleContent(props: PersonaTabProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <SeccionTitulo>LEYES LA/FT</SeccionTitulo>
        <LeyesLaftTab {...props} />
      </div>
      <div>
        <SeccionTitulo>FATCA/CRS</SeccionTitulo>
        <FatcaCrsTab {...props} />
      </div>
    </div>
  )
}
