import { PersonaField, SeccionTitulo } from '../PersonaField'
import { EditableChildTable, type ChildColumn } from '../EditableChildTable'
import { CIUDADES, TIPOS_TEL, DOMINIOS_EMAIL } from '@/data/personas-mock'
import type { Telefono, DireccionElectronica } from '@/data/types'
import type { PersonaTabProps } from './types'

const columnasTelefono: Array<ChildColumn<Telefono>> = [
  { key: 'tipo', header: 'Teléfono', type: 'select', options: TIPOS_TEL },
  { key: 'numero', header: 'Número' },
  { key: 'extension', header: 'Extensión' },
  { key: 'ciudad', header: 'Ciudad', type: 'select', options: CIUDADES },
  { key: 'principal', header: 'Principal', type: 'checkbox' },
  { key: 'notificacionPagoElectronico', header: 'Notif. Pagos Electrónicos', type: 'checkbox' },
]

const columnasElectronica: Array<ChildColumn<DireccionElectronica>> = [
  { key: 'tipo', header: 'Dirección Electrónica' },
  { key: 'valor', header: 'Valor' },
  { key: 'dominio', header: 'Dominio', type: 'select', options: DOMINIOS_EMAIL },
  { key: 'principal', header: 'Defecto', type: 'checkbox' },
  { key: 'notificacionPago', header: 'Notif. Pagos Electrónicos', type: 'checkbox' },
]

/** Información de contacto (extraído de `Direccion.png`): correo, teléfonos, direcciones electrónicas. */
export function PersonaContactoFields({ persona, editable, onChange }: PersonaTabProps) {
  return (
    <div>
      <PersonaField
        label="Correo Electrónico"
        type="email"
        value={persona.email}
        editable={editable}
        className="mb-6 max-w-md"
        onChange={(v) => onChange('email', v)}
      />

      <div className="mb-6">
        <SeccionTitulo>Teléfonos</SeccionTitulo>
        <EditableChildTable
          columns={columnasTelefono}
          rows={persona.telefonos}
          editable={editable}
          onChange={(rows) => onChange('telefonos', rows)}
          crearFila={(id) => ({ id, tipo: 'Móvil', numero: '', principal: persona.telefonos.length === 0 })}
          emptyMessage="Sin teléfonos registrados"
          addLabel="Agregar teléfono"
        />
      </div>

      <div>
        <SeccionTitulo>Direcciones Electrónicas</SeccionTitulo>
        <EditableChildTable
          columns={columnasElectronica}
          rows={persona.direccionesElectronicas}
          editable={editable}
          onChange={(rows) => onChange('direccionesElectronicas', rows)}
          crearFila={(id) => ({ id, tipo: 'Personal', valor: '', principal: persona.direccionesElectronicas.length === 0 })}
          emptyMessage="Sin direcciones electrónicas registradas"
          addLabel="Agregar dirección electrónica"
        />
      </div>
    </div>
  )
}
