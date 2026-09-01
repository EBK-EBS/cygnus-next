import { EditableChildTable, type ChildColumn } from '../EditableChildTable'
import { TIPOS_DIR, CIUDADES, TIPOS_INMUEBLE, MONEDAS } from '@/data/personas-mock'
import type { Direccion } from '@/data/types'
import type { PersonaTabProps } from './types'

const columnasDireccion: Array<ChildColumn<Direccion>> = [
  { key: 'tipo', header: 'Tipo Dirección', type: 'select', options: TIPOS_DIR },
  { key: 'direccion', header: 'Dirección' },
  { key: 'ciudad', header: 'Ciudad', type: 'select', options: CIUDADES },
  { key: 'barrio', header: 'Barrio' },
  { key: 'codigoPostal', header: 'Código Postal' },
  { key: 'tipoInmueble', header: 'Tipo Inmueble', type: 'select', options: TIPOS_INMUEBLE },
  { key: 'principal', header: 'Principal', type: 'checkbox' },
  { key: 'envioCorrespondencia', header: 'Envío Correspondencia', type: 'checkbox' },
  { key: 'notificacionSINPE', header: 'Notif. Pagos Electrónicos', type: 'checkbox' },
  { key: 'pagaArriendo', header: '¿Paga Arriendo?', type: 'checkbox' },
  { key: 'valorArriendo', header: 'Valor', type: 'number' },
  { key: 'monedaArriendo', header: 'Moneda', type: 'select', options: MONEDAS },
  { key: 'arrendador', header: 'Arrendador' },
  { key: 'telefonoArrendador', header: 'Teléfono Arrendador' },
  { key: 'desdeArriendo', header: 'Desde', type: 'date' },
  { key: 'hastaArriendo', header: 'Hasta', type: 'date' },
]

/** Direcciones físicas de la persona (extraído de `Direccion.png`). */
export function PersonaDireccionesFields({ persona, editable, onChange }: PersonaTabProps) {
  return (
    <EditableChildTable
      columns={columnasDireccion}
      rows={persona.direcciones}
      editable={editable}
      onChange={(rows) => onChange('direcciones', rows)}
      crearFila={(id) => ({ id, tipo: 'Residencia', direccion: '', ciudad: '', principal: persona.direcciones.length === 0 })}
      emptyMessage="Sin direcciones registradas"
      addLabel="Agregar dirección"
    />
  )
}
