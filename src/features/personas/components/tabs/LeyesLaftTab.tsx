import { PersonaField, PersonaCheckboxField, SeccionTitulo } from '../PersonaField'
import { EditableChildTable, type ChildColumn } from '../EditableChildTable'
import { PROPOSITOS_AFILIACION, ORIGENES_FONDOS, MONEDAS } from '@/data/personas-mock'
import type {
  DatosLAFT,
  DatosPEP,
  PromedioTransaccional,
  CuentaMonedaExtranjera,
  VinculacionPolitica,
  RelacionPEP,
  CatalogoItem,
} from '@/data/types'
import type { PersonaTabProps } from './types'

const LAFT_VACIO: DatosLAFT = {
  propositoAfiliacion: [],
  origenFondos: [],
  promediosTransaccionales: [],
  cuentasMonedaExtranjera: [],
  cargosPoliticos: [],
  funcionesPublicasOtroPais: [],
}

const columnasPromedios: Array<ChildColumn<PromedioTransaccional>> = [
  { key: 'moneda', header: 'Moneda', type: 'select', options: MONEDAS },
  { key: 'rango', header: 'Rango' },
]

const columnasCuentasExtranjeras: Array<ChildColumn<CuentaMonedaExtranjera>> = [
  { key: 'numeroCuenta', header: 'N° Cuenta' },
  { key: 'banco', header: 'Banco' },
  { key: 'moneda', header: 'Moneda', type: 'select', options: MONEDAS },
  { key: 'pais', header: 'País' },
  { key: 'ciudad', header: 'Ciudad' },
]

const columnasVinculacion: Array<ChildColumn<VinculacionPolitica>> = [
  { key: 'cual', header: '¿Cuál?' },
  { key: 'fechaVinculacion', header: 'Fecha de Vinculación', type: 'date' },
  { key: 'fechaDesvinculacion', header: 'Fecha de Desvinculación', type: 'date' },
  { key: 'actualmente', header: 'Actualmente', type: 'checkbox' },
]

const columnasRelacionPEP: Array<ChildColumn<RelacionPEP>> = [
  { key: 'nombres', header: 'Nombres y Apellidos' },
  { key: 'identificacion', header: 'N° Identificación' },
  { key: 'parentesco', header: 'Parentesco' },
  { key: 'entidad', header: 'Nombre de la Entidad' },
  { key: 'cargo', header: 'Cargo' },
]

/** Checklist Descripción/Selección respaldado por un catálogo fijo (Propósito, Origen de Fondos). */
function SeleccionCatalogo({
  catalogo,
  seleccionados,
  editable,
  onToggle,
}: {
  catalogo: CatalogoItem[]
  seleccionados: string[]
  editable: boolean
  onToggle: (descripcion: string, marcado: boolean) => void
}) {
  return (
    <table className="w-full border-collapse text-[0.8rem]">
      <thead>
        <tr>
          <th className="border-b border-line px-2.5 py-2 text-left text-[0.7rem] font-medium uppercase tracking-wide text-muted">
            Descripción
          </th>
          <th className="border-b border-line px-2.5 py-2 text-center text-[0.7rem] font-medium uppercase tracking-wide text-muted">
            Selección
          </th>
        </tr>
      </thead>
      <tbody>
        {catalogo.map((item) => {
          const marcado = seleccionados.includes(item.descripcion)
          if (!editable && !marcado) return null
          return (
            <tr key={item.codigo}>
              <td className="border-b border-line px-2.5 py-2 text-ink">{item.descripcion}</td>
              <td className="border-b border-line px-2.5 py-2 text-center">
                {editable ? (
                  <input
                    type="checkbox"
                    checked={marcado}
                    onChange={(e) => onToggle(item.descripcion, e.target.checked)}
                    className="rounded border-line"
                  />
                ) : (
                  'Sí'
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/** Pestaña "LEYES LA/FT" (`LeyesLAFT.png`) — SARLAFT, PEP y operaciones internacionales. */
export function LeyesLaftTab({ persona, editable, onChange }: PersonaTabProps) {
  const laft = persona.datosLAFT ?? LAFT_VACIO
  const pep: DatosPEP = persona.datosPEP ?? { esPEP: false, relacionesPEP: [] }

  function actualizarLaft<K extends keyof DatosLAFT>(campo: K, valor: DatosLAFT[K]) {
    onChange('datosLAFT', { ...laft, [campo]: valor })
  }
  function actualizarPep<K extends keyof DatosPEP>(campo: K, valor: DatosPEP[K]) {
    onChange('datosPEP', { ...pep, [campo]: valor })
  }
  function toggleCatalogo(campo: 'propositoAfiliacion' | 'origenFondos', descripcion: string, marcado: boolean) {
    const actual = laft[campo]
    actualizarLaft(campo, marcado ? [...actual, descripcion] : actual.filter((d) => d !== descripcion))
  }

  return (
      <div className="grid grid-cols-2 gap-6 p-4">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-6">
          <div>
            <PersonaCheckboxField
              label="¿Es usted una persona que realiza actividades de Canjes de Dineros, Transferencias, Fondos, Fideicomisos, Remesas, etc.?"
              checked={laft.realizaCanjesDineros}
              editable={editable}
              onChange={(v) => actualizarLaft('realizaCanjesDineros', v)}
            />
            <PersonaField
              label="Detalle brevemente la actividad que realiza (adjuntar documento probatorio)"
              type="textarea"
              value={laft.detalleActividad}
              editable={editable}
              className="mt-2"
              onChange={(v) => actualizarLaft('detalleActividad', v)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <SeccionTitulo>Propósito de la Afiliación</SeccionTitulo>
              <SeleccionCatalogo
                catalogo={PROPOSITOS_AFILIACION}
                seleccionados={laft.propositoAfiliacion}
                editable={editable}
                onToggle={(d, m) => toggleCatalogo('propositoAfiliacion', d, m)}
              />
              <PersonaField label="Otro" value={laft.otroPropositoAfiliacion} editable={editable} className="mt-2" onChange={(v) => actualizarLaft('otroPropositoAfiliacion', v)} />
            </div>
            <div>
              <SeccionTitulo>Origen de Fondos</SeccionTitulo>
              <SeleccionCatalogo
                catalogo={ORIGENES_FONDOS}
                seleccionados={laft.origenFondos}
                editable={editable}
                onToggle={(d, m) => toggleCatalogo('origenFondos', d, m)}
              />
              <PersonaField label="Otro" value={laft.otroOrigenFondos} editable={editable} className="mt-2" onChange={(v) => actualizarLaft('otroOrigenFondos', v)} />
            </div>
          </div>

          <div>
            <SeccionTitulo>Promedios Transaccionales</SeccionTitulo>
            <EditableChildTable
              columns={columnasPromedios}
              rows={laft.promediosTransaccionales}
              editable={editable}
              onChange={(rows) => actualizarLaft('promediosTransaccionales', rows)}
              crearFila={(id) => ({ id, moneda: 'COP', rango: '' })}
              emptyMessage="Sin promedios registrados"
              addLabel="Agregar rango"
            />
          </div>

          <div>
            <PersonaCheckboxField
              label="¿Es usted o tiene relación cercana con un PEP's?"
              checked={pep.esPEP}
              editable={editable}
              onChange={(v) => actualizarPep('esPEP', v)}
            />
            <div className="mt-2 grid grid-cols-2 gap-3">
              <PersonaField
                label="Tipo de Relación PEP"
                value={pep.tipoRelacionPEP}
                editable={editable}
                onChange={(v) => actualizarPep('tipoRelacionPEP', v)}
              />
              <PersonaCheckboxField label="Presenta Riesgo?" checked={pep.presentaRiesgo} editable={editable} onChange={(v) => actualizarPep('presentaRiesgo', v)} />
            </div>
            <div className="mt-3">
              <EditableChildTable
                columns={columnasRelacionPEP}
                rows={pep.relacionesPEP}
                editable={editable}
                onChange={(rows) => actualizarPep('relacionesPEP', rows)}
                crearFila={(id) => ({ id, nombres: '' })}
                emptyMessage="Sin relaciones PEP registradas"
                addLabel="Agregar relación PEP"
              />
            </div>
          </div>
        </div>

        {/* Columna derecha: Operaciones */}
        <div className="flex flex-col gap-6">
          <div>
            <SeccionTitulo>Operaciones</SeccionTitulo>
            <div className="grid grid-cols-2 gap-3">
              <PersonaCheckboxField label="Realiza Operaciones en el Exterior?" checked={laft.realizaOperacionesExterior} editable={editable} onChange={(v) => actualizarLaft('realizaOperacionesExterior', v)} />
              <PersonaCheckboxField label="Maneja Recursos Públicos?" checked={laft.manejaRecursosPublicos} editable={editable} onChange={(v) => actualizarLaft('manejaRecursosPublicos', v)} />
            </div>
            <PersonaField label="Cuáles" value={laft.cualesRecursos} editable={editable} className="mt-2" onChange={(v) => actualizarLaft('cualesRecursos', v)} />
          </div>

          <div>
            <PersonaCheckboxField
              label="¿Posee cuentas en cuenta moneda extranjera?"
              checked={laft.poseeCuentasMonedaExtranjera}
              editable={editable}
              onChange={(v) => actualizarLaft('poseeCuentasMonedaExtranjera', v)}
            />
            <div className="mt-2">
              <EditableChildTable
                columns={columnasCuentasExtranjeras}
                rows={laft.cuentasMonedaExtranjera}
                editable={editable}
                onChange={(rows) => actualizarLaft('cuentasMonedaExtranjera', rows)}
                crearFila={(id) => ({ id, numeroCuenta: '' })}
                emptyMessage="Sin cuentas en el exterior"
                addLabel="Agregar cuenta"
              />
            </div>
          </div>

          <div>
            <PersonaCheckboxField
              label="¿Desempeña o desempeñó un cargo político?"
              checked={laft.desempenaCargoPolitico}
              editable={editable}
              onChange={(v) => actualizarLaft('desempenaCargoPolitico', v)}
            />
            <div className="mt-2">
              <EditableChildTable
                columns={columnasVinculacion}
                rows={laft.cargosPoliticos}
                editable={editable}
                onChange={(rows) => actualizarLaft('cargosPoliticos', rows)}
                crearFila={(id) => ({ id, cual: '' })}
                emptyMessage="Sin cargos políticos registrados"
                addLabel="Agregar cargo"
              />
            </div>
          </div>

          <div>
            <PersonaCheckboxField
              label="¿Desempeña funciones públicas destacadas en otro país?"
              checked={laft.desempenaFuncionesPublicasOtroPais}
              editable={editable}
              onChange={(v) => actualizarLaft('desempenaFuncionesPublicasOtroPais', v)}
            />
            <div className="mt-2">
              <EditableChildTable
                columns={columnasVinculacion}
                rows={laft.funcionesPublicasOtroPais}
                editable={editable}
                onChange={(rows) => actualizarLaft('funcionesPublicasOtroPais', rows)}
                crearFila={(id) => ({ id, cual: '' })}
                emptyMessage="Sin funciones registradas"
                addLabel="Agregar función"
              />
            </div>
          </div>
        </div>
      </div>
  )
}
