import type { Persona } from '@/data/types'

/** Props comunes a todas las pestañas — mismo componente sirve para consulta (editable=false) y creación/edición (editable=true). */
export interface PersonaTabProps {
  persona: Persona
  editable: boolean
  onChange: <K extends keyof Persona>(key: K, value: Persona[K]) => void
}
