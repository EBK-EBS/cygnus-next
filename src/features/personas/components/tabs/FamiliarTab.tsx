import { EditableChildTable, type ChildColumn } from '../EditableChildTable'
import { TIPOS_IDENTIFICACION, PARENTESCOS, TIPOS_BENEFICIARIO } from '@/data/personas-mock'
import type { Familiar } from '@/data/types'
import type { PersonaTabProps } from './types'

/**
 * PF-02 — Regla ya existente en Legacy (`INFORME_LEVANTAMIENTO_PERSONAS_LEGACY.md`,
 * línea 1192): "El porcentaje de beneficiarios debe sumar 100%". Solo aplica cuando
 * existen beneficiarios (`esBeneficiario`); si no hay ninguno, no se valida nada.
 * `porcentajeBeneficio` ya es `number | undefined` en el tipo `Familiar` — un
 * beneficiario sin porcentaje capturado (`undefined`) aporta 0 a la suma porque
 * todavía no tiene un valor asignado, no porque se trate como dato inválido.
 */
export function validarBeneficiarios(familiares: Familiar[]): string | null {
  const beneficiarios = familiares.filter((f) => f.esBeneficiario)
  if (beneficiarios.length === 0) return null
  const suma = beneficiarios.reduce((acc, f) => acc + (f.porcentajeBeneficio ?? 0), 0)
  if (suma !== 100) {
    return `La suma del porcentaje de beneficiarios debe ser 100% (actualmente ${suma}%)`
  }
  return null
}

const columnas: Array<ChildColumn<Familiar>> = [
  { key: 'nombre', header: 'Nombres' },
  { key: 'apellidos', header: 'Apellidos' },
  { key: 'tipoIdentificacion', header: 'Tipo Identificación', type: 'select', options: TIPOS_IDENTIFICACION },
  { key: 'numeroDocumento', header: 'Identificación' },
  { key: 'fechaNacimiento', header: 'Fecha de Nacimiento', type: 'date' },
  { key: 'sexo', header: 'Género', type: 'select', options: [{ codigo: 'M', descripcion: 'M' }, { codigo: 'F', descripcion: 'F' }] },
  { key: 'esBeneficiario', header: 'Beneficiario', type: 'checkbox' },
  { key: 'parentesco', header: 'Parentesco', type: 'select', options: PARENTESCOS },
  { key: 'tipoBeneficiario', header: 'Tipo Beneficiario', type: 'select', options: TIPOS_BENEFICIARIO },
  { key: 'porcentajeBeneficio', header: '% Beneficio', type: 'number' },
]

/** Pestaña "Familiar" (`Familiar.png`). */
export function FamiliarTab({ persona, editable, onChange }: PersonaTabProps) {
  return (
      <div className="p-4">
        <EditableChildTable
          columns={columnas}
          rows={persona.familiares}
          editable={editable}
          onChange={(rows) => onChange('familiares', rows)}
          crearFila={(id) => ({ id, nombre: '', parentesco: '' })}
          emptyMessage="Sin familiares/beneficiarios registrados"
          addLabel="Agregar familiar"
        />
      </div>
  )
}
