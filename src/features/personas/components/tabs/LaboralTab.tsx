import { PersonaField, SeccionTitulo } from '../PersonaField'
import {
  PAGADURIAS,
  FORMAS_PAGO,
  DEPENDENCIAS,
  CARGOS,
  TIPOS_CONTRATO,
  ACTIVIDADES_ECONOMICAS,
  SECTORES,
  VINCULOS_LABORALES,
} from '@/data/personas-mock'
import type { InfoLaboral } from '@/data/types'
import type { PersonaTabProps } from './types'

/** Pestaña "Laboral" (`Laboral.png` / `Natural.png`). */
export function LaboralTab({ persona, editable, onChange }: PersonaTabProps) {
  const laboral = persona.infoLaboral ?? {}

  function actualizar<K extends keyof InfoLaboral>(campo: K, valor: InfoLaboral[K]) {
    onChange('infoLaboral', { ...laboral, [campo]: valor })
  }

  return (
    <div className="grid grid-cols-3 gap-4">
        <PersonaField label="Empresa" value={laboral.empresa} editable={editable} onChange={(v) => actualizar('empresa', v)} />
        <PersonaField label="Teléfono" value={laboral.telefonoEmpresa} editable={editable} onChange={(v) => actualizar('telefonoEmpresa', v)} />
        <PersonaField
          label="Pagaduría"
          type="select"
          options={PAGADURIAS}
          value={laboral.pagaduria}
          editable={editable}
          onChange={(v) => actualizar('pagaduria', v)}
        />
        <PersonaField
          label="Institución donde labora"
          value={laboral.institucionDondeLabora}
          editable={editable}
          className="col-span-2"
          onChange={(v) => actualizar('institucionDondeLabora', v)}
        />
        <PersonaField
          label="Forma de Cobro"
          type="select"
          options={FORMAS_PAGO}
          value={laboral.formaCobro}
          editable={editable}
          onChange={(v) => actualizar('formaCobro', v)}
        />
        <PersonaField label="Periodicidad" value={laboral.periodicidadCobro} editable={editable} onChange={(v) => actualizar('periodicidadCobro', v)} />
        <PersonaField
          label="Dependencias"
          type="select"
          options={DEPENDENCIAS}
          value={laboral.dependencia}
          editable={editable}
          onChange={(v) => actualizar('dependencia', v)}
        />
        <PersonaField
          label="Cargo"
          type="select"
          options={CARGOS}
          value={laboral.cargo}
          editable={editable}
          onChange={(v) => actualizar('cargo', v)}
        />
        <PersonaField
          label="Tipo de Contrato"
          type="select"
          options={TIPOS_CONTRATO}
          value={laboral.tipoContrato}
          editable={editable}
          onChange={(v) => actualizar('tipoContrato', v)}
        />
        <PersonaField
          label="Salario Devengado"
          type="number"
          format="currency"
          value={laboral.salarioDevengado}
          editable={editable}
          onChange={(v) => actualizar('salarioDevengado', Number(v))}
        />
        <PersonaField
          label="Salario Líquido"
          type="number"
          format="currency"
          value={laboral.salarioLiquido}
          editable={editable}
          onChange={(v) => actualizar('salarioLiquido', Number(v))}
        />
        <PersonaField
          label="Salario Neto Cargas Sociales"
          type="number"
          format="currency"
          value={laboral.salarioNetoCargasSociales}
          editable={editable}
          onChange={(v) => actualizar('salarioNetoCargasSociales', Number(v))}
        />
        <PersonaField
          label="Salario Embargado"
          type="number"
          format="currency"
          value={laboral.salarioEmbargado}
          editable={editable}
          onChange={(v) => actualizar('salarioEmbargado', Number(v))}
        />
        <PersonaField
          label="Fecha Ingreso"
          type="date"
          value={laboral.fechaIngreso}
          editable={editable}
          onChange={(v) => actualizar('fechaIngreso', v)}
        />
        <PersonaField
          label="Actividad Económica"
          type="select"
          options={ACTIVIDADES_ECONOMICAS}
          value={laboral.actividadEconomica}
          editable={editable}
          onChange={(v) => actualizar('actividadEconomica', v)}
        />
        <PersonaField
          label="Sector Empresarial"
          type="select"
          options={SECTORES}
          value={laboral.sector}
          editable={editable}
          onChange={(v) => actualizar('sector', v)}
        />
        <PersonaField
          label="Vínculo Laboral"
          type="select"
          options={VINCULOS_LABORALES}
          value={laboral.vinculoLaboral}
          editable={editable}
          onChange={(v) => actualizar('vinculoLaboral', v)}
        />

        <div className="col-span-3 mt-2">
          <SeccionTitulo>Otros Ingresos</SeccionTitulo>
          <div className="grid grid-cols-3 gap-4">
            <PersonaField
              label="Total Otros Ingresos"
              type="number"
              format="currency"
              value={laboral.otrosIngresos}
              editable={editable}
              onChange={(v) => actualizar('otrosIngresos', Number(v))}
            />
            <PersonaField
              label="Detalle el origen de los ingresos adicionales"
              value={laboral.descripcionOtrosIngresos}
              editable={editable}
              className="col-span-2"
              onChange={(v) => actualizar('descripcionOtrosIngresos', v)}
            />
            <PersonaField label="Puesto Nómina" value={laboral.puestoNomina} editable={editable} onChange={(v) => actualizar('puestoNomina', v)} />
          </div>
        </div>
      </div>
  )
}
