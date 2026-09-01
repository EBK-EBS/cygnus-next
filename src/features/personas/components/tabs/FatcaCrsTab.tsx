import { PersonaField, PersonaCheckboxField, SeccionTitulo } from '../PersonaField'
import { PAISES } from '@/data/personas-mock'
import type { DatosFATCA } from '@/data/types'
import type { PersonaTabProps } from './types'

const FATCA_VACIO: DatosFATCA = { aplicaFATCA: false, aplicaCRS: false }

/** Pestaña "FATCA/CRS" (`FatcaCRS.png`). */
export function FatcaCrsTab({ persona, editable, onChange }: PersonaTabProps) {
  const fatca = persona.datosFATCA ?? FATCA_VACIO

  function actualizar<K extends keyof DatosFATCA>(campo: K, valor: DatosFATCA[K]) {
    onChange('datosFATCA', { ...fatca, [campo]: valor })
  }

  return (
      <div className="p-4">
        <div className="mb-6 flex items-center gap-8">
          <PersonaCheckboxField label="FATCA" checked={fatca.aplicaFATCA} editable={editable} onChange={(v) => actualizar('aplicaFATCA', v)} />
          <PersonaCheckboxField label="CRS" checked={fatca.aplicaCRS} editable={editable} onChange={(v) => actualizar('aplicaCRS', v)} />
          <PersonaField
            label="Saldo Ahorro Promedio Anual"
            type="number"
            format="currency"
            value={fatca.saldoPromedioAhorro}
            editable={editable}
            className="max-w-[220px]"
            onChange={(v) => actualizar('saldoPromedioAhorro', Number(v))}
          />
        </div>

        <div className="mb-6">
          <SeccionTitulo>Otras Señas en el Extranjero</SeccionTitulo>
          <div className="grid grid-cols-3 gap-4">
            <PersonaField
              label="País de Nacionalidad"
              type="select"
              options={PAISES}
              value={fatca.paisNacionalidadExtranjero}
              editable={editable}
              onChange={(v) => actualizar('paisNacionalidadExtranjero', v)}
            />
            <PersonaField label="Ciudad" value={fatca.ciudadExtranjero} editable={editable} onChange={(v) => actualizar('ciudadExtranjero', v)} />
            <PersonaField
              label="Segunda Nacionalidad"
              type="select"
              options={PAISES}
              value={fatca.segundaNacionalidadExtranjero}
              editable={editable}
              onChange={(v) => actualizar('segundaNacionalidadExtranjero', v)}
            />
          </div>
        </div>

        <div>
          <SeccionTitulo>Otras Identificaciones</SeccionTitulo>
          <div className="grid grid-cols-3 gap-4">
            <PersonaField label="TIN" value={fatca.tin} editable={editable} onChange={(v) => actualizar('tin', v)} />
            <PersonaField label="Vence TIN" type="date" value={fatca.vencimientoTin} editable={editable} onChange={(v) => actualizar('vencimientoTin', v)} />
            <div />
            <PersonaField label="SSN" value={fatca.ssn} editable={editable} onChange={(v) => actualizar('ssn', v)} />
            <PersonaField label="Vence SSN" type="date" value={fatca.vencimientoSsn} editable={editable} onChange={(v) => actualizar('vencimientoSsn', v)} />
            <div />
            <PersonaField label="Green Card" value={fatca.greenCard} editable={editable} onChange={(v) => actualizar('greenCard', v)} />
            <PersonaField label="Vence Green Card" type="date" value={fatca.vencimientoGreenCard} editable={editable} onChange={(v) => actualizar('vencimientoGreenCard', v)} />
            <div />
            <PersonaField label="EIN" value={fatca.ein} editable={editable} onChange={(v) => actualizar('ein', v)} />
            <PersonaField label="Vence EIN" type="date" value={fatca.vencimientoEin} editable={editable} onChange={(v) => actualizar('vencimientoEin', v)} />
            <div />
            <PersonaField label="GIIN" value={fatca.giin} editable={editable} onChange={(v) => actualizar('giin', v)} />
            <PersonaField
              label="Motivo No Reporta"
              type="textarea"
              value={fatca.motivoNoTin}
              editable={editable}
              className="col-span-2"
              onChange={(v) => actualizar('motivoNoTin', v)}
            />
          </div>
        </div>
      </div>
  )
}
