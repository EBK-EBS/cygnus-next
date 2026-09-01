import { PersonaField, SeccionTitulo } from '../PersonaField'
import { EditableChildTable, type ChildColumn } from '../EditableChildTable'
import { MONEDAS, PRODUCTOS_COOPERATIVA } from '@/data/personas-mock'
import type { PromotorServicio, CuentaBancaria, CuentaRelacionada, ProductoCooperativaDeseado } from '@/data/types'
import type { PersonaTabProps } from './types'

const columnasCuentas: Array<ChildColumn<CuentaBancaria>> = [
  { key: 'codigoEntidad', header: 'Código Entidad' },
  { key: 'entidad', header: 'Entidad' },
  { key: 'cuenta', header: 'Cuenta' },
  { key: 'digitoChequeo', header: 'Díg. Chequeo' },
  { key: 'tipoCuenta', header: 'Tipo Cuenta' },
  { key: 'codigoSucursal', header: 'Cód. Sucursal' },
  { key: 'sucursal', header: 'Sucursal' },
]

const columnasRelacionadas: Array<ChildColumn<CuentaRelacionada>> = [
  { key: 'identificacion', header: 'Identificación' },
  { key: 'nombres', header: 'Nombres' },
  { key: 'apellidos', header: 'Apellidos' },
  { key: 'entidad', header: 'Entidad' },
  { key: 'cuentaCliente', header: 'Cuenta Cliente' },
  { key: 'moneda', header: 'Moneda', type: 'select', options: MONEDAS },
]

const columnasProductos: Array<ChildColumn<ProductoCooperativaDeseado>> = [
  { key: 'codigo', header: 'Código' },
  { key: 'descripcion', header: 'Descripción', type: 'select', options: PRODUCTOS_COOPERATIVA },
  { key: 'seleccionado', header: 'Selección', type: 'checkbox' },
]

/** Pestaña "Varios 2" (`Varios2.png`). */
export function Varios2Tab({ persona, editable, onChange }: PersonaTabProps) {
  const promotor = persona.promotorServicio ?? {}

  function actualizarPromotor<K extends keyof PromotorServicio>(campo: K, valor: PromotorServicio[K]) {
    onChange('promotorServicio', { ...promotor, [campo]: valor })
  }

  return (
      <div className="p-4">
        <div className="mb-6">
          <SeccionTitulo>Promotor de Servicio</SeccionTitulo>
          <div className="grid grid-cols-4 gap-3">
            <PersonaField label="Código" value={promotor.codigo} editable={editable} onChange={(v) => actualizarPromotor('codigo', v)} />
            <PersonaField label="Identificación" value={promotor.identificacion} editable={editable} onChange={(v) => actualizarPromotor('identificacion', v)} />
            <PersonaField label="Tipo" value={promotor.tipo} editable={editable} onChange={(v) => actualizarPromotor('tipo', v)} />
            <PersonaField label="Nombre" value={promotor.nombre} editable={editable} onChange={(v) => actualizarPromotor('nombre', v)} />
            <PersonaField label="Apellido" value={promotor.apellido} editable={editable} onChange={(v) => actualizarPromotor('apellido', v)} />
          </div>
        </div>

        <div className="mb-6">
          <SeccionTitulo>Cuentas Bancarias</SeccionTitulo>
          <EditableChildTable
            columns={columnasCuentas}
            rows={persona.cuentasBancarias}
            editable={editable}
            onChange={(rows) => onChange('cuentasBancarias', rows)}
            crearFila={(id) => ({ id, cuenta: '' })}
            emptyMessage="Sin cuentas bancarias registradas"
            addLabel="Agregar cuenta"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <SeccionTitulo>Cuentas Relacionadas</SeccionTitulo>
            <EditableChildTable
              columns={columnasRelacionadas}
              rows={persona.cuentasRelacionadas}
              editable={editable}
              onChange={(rows) => onChange('cuentasRelacionadas', rows)}
              crearFila={(id) => ({ id, identificacion: '' })}
              emptyMessage="Sin cuentas relacionadas"
              addLabel="Agregar"
            />
          </div>
          <div>
            <SeccionTitulo>Productos ofrecidos por la Cooperativa que desea utilizar</SeccionTitulo>
            <EditableChildTable
              columns={columnasProductos}
              rows={persona.productosDeseados}
              editable={editable}
              onChange={(rows) => onChange('productosDeseados', rows)}
              crearFila={(id) => ({ id, descripcion: '', seleccionado: false })}
              emptyMessage="Sin productos seleccionados"
              addLabel="Agregar"
            />
          </div>
        </div>
      </div>
  )
}
