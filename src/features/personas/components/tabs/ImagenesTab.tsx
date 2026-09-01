import { Camera, PenTool } from 'lucide-react'
import { PersonaField, PersonaCheckboxField } from '../PersonaField'
import { TIPOS_IMAGEN } from '@/data/personas-mock'
import type { ImagenesPersona } from '@/data/types'
import type { PersonaTabProps } from './types'

/** Pestaña "Imágenes" (`Imagenes.png`) — fotos, firma y huella. */
export function ImagenesTab({ persona, editable, onChange }: PersonaTabProps) {
  const imagenes = persona.imagenes ?? {}

  function actualizar<K extends keyof ImagenesPersona>(campo: K, valor: ImagenesPersona[K]) {
    onChange('imagenes', { ...imagenes, [campo]: valor })
  }

  return (
      <div className="grid grid-cols-2 gap-6 p-4">
        <div className="flex flex-col gap-4">
          <PersonaField
            label="Tipo Imagen"
            type="select"
            options={TIPOS_IMAGEN}
            value={imagenes.tipoFoto}
            editable={editable}
            onChange={(v) => actualizar('tipoFoto', v)}
          />
          <div className="flex gap-3">
            <div className="flex size-32 items-center justify-center rounded border border-line bg-surface text-muted">
              <Camera className="size-8" />
            </div>
            <div className="flex size-32 items-center justify-center rounded border border-line bg-surface text-muted">
              <Camera className="size-8" />
            </div>
          </div>

          <PersonaField
            label="Tipo Imagen (Firma)"
            type="select"
            options={TIPOS_IMAGEN}
            value={imagenes.tipoFirma}
            editable={editable}
            onChange={(v) => actualizar('tipoFirma', v)}
          />
          <div className="flex h-20 w-full items-center justify-center rounded border border-line bg-surface text-muted">
            <PenTool className="size-6" />
          </div>

          <PersonaField
            label="Observaciones"
            type="textarea"
            value={imagenes.observaciones}
            editable={editable}
            onChange={(v) => actualizar('observaciones', v)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <PersonaCheckboxField
            label="Actualizar Huella"
            checked={imagenes.actualizarHuella}
            editable={editable}
            onChange={(v) => actualizar('actualizarHuella', v)}
          />
          <PersonaCheckboxField
            label="Grabar Huella"
            checked={imagenes.grabarHuella}
            editable={editable}
            onChange={(v) => actualizar('grabarHuella', v)}
          />
        </div>
      </div>
  )
}
