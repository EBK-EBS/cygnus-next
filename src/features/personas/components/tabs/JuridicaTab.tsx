import { PersonaField, PersonaCheckboxField } from '../PersonaField'
import { PAISES, TIPOS_CLIENTE, TIPOS_SOCIEDAD } from '@/data/personas-mock'
import type { PersonaTabProps } from './types'

/**
 * Campos específicos de Persona Jurídica (`Juridica.png`), sin los campos comunes de
 * Persona Única (esos viven en `PersonaIdentificacionFields`/`PersonaDatosGeneralesFields`).
 */
export function JuridicaTab({ persona, editable, onChange }: PersonaTabProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <PersonaField label="Rut" value={persona.rut} editable={editable} onChange={(v) => onChange('rut', v)} />
      <PersonaField
        label="Razón Social"
        value={persona.razonSocial}
        editable={editable}
        required
        className="col-span-2"
        onChange={(v) => onChange('razonSocial', v)}
      />
      <PersonaField label="Sigla" value={persona.sigla} editable={editable} onChange={(v) => onChange('sigla', v)} />
      <PersonaField label="Fecha Constitución" type="date" value={persona.fechaActoConstitutivo} editable={editable} onChange={(v) => onChange('fechaActoConstitutivo', v)} />
      <PersonaField
        label="País de Nacionalidad"
        type="select"
        options={PAISES}
        value={persona.paisNacionalidad}
        editable={editable}
        onChange={(v) => onChange('paisNacionalidad', v)}
      />
      <PersonaField
        label="Tipo Cliente"
        type="select"
        options={TIPOS_CLIENTE}
        value={persona.tipoCliente}
        editable={editable}
        onChange={(v) => onChange('tipoCliente', v)}
      />
      <PersonaField label="Segmento Asignado" value={persona.segmentoAsignado} editable={editable} onChange={(v) => onChange('segmentoAsignado', v)} />
      <PersonaField label="Nivel de Riesgo" value={persona.nivelRiesgo} editable={editable} onChange={(v) => onChange('nivelRiesgo', v)} />
      <PersonaField
        label="Tipo de Sociedad"
        type="select"
        options={TIPOS_SOCIEDAD}
        value={persona.tipoSociedad}
        editable={editable}
        onChange={(v) => onChange('tipoSociedad', v)}
      />
      <PersonaField
        label="Segunda Nacionalidad"
        type="select"
        options={PAISES}
        value={persona.segundaNacionalidad}
        editable={editable}
        onChange={(v) => onChange('segundaNacionalidad', v)}
      />
      <PersonaField label="Nro. Acto Administrativo" value={persona.numeroActoAdministrativo} editable={editable} onChange={(v) => onChange('numeroActoAdministrativo', v)} />
      <PersonaCheckboxField label="Recursos Tesoro" checked={persona.recursosTesoro} editable={editable} onChange={(v) => onChange('recursosTesoro', v)} />
      <PersonaField
        label="Cantidad Empleados"
        type="number"
        value={persona.numeroEmpleados}
        editable={editable}
        onChange={(v) => onChange('numeroEmpleados', Number(v))}
      />
      <PersonaField label="Clave" value={persona.clave} editable={editable} onChange={(v) => onChange('clave', v)} />
      <PersonaField label="Clave Interna" value={persona.claveInterna} editable={editable} onChange={(v) => onChange('claveInterna', v)} />
      <PersonaField
        label="Rol Actual"
        value={persona.rolActual}
        editable={editable}
        onChange={(v) => onChange('rolActual', v)}
      />
      <PersonaField
        label="Objeto Social"
        type="textarea"
        value={persona.objetoSocial}
        editable={editable}
        className="col-span-4"
        onChange={(v) => onChange('objetoSocial', v)}
      />
    </div>
  )
}
