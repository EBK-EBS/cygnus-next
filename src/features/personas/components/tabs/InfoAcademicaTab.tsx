import { PersonaField, PersonaCheckboxField, SeccionTitulo } from '../PersonaField'
import {
  UNIVERSIDADES,
  FACULTADES_CARRERAS,
  TIPOS_ALUMNO,
  ESTADOS_ACADEMICOS,
  SEDES,
  JORNADAS,
  TIPOS_SANGRE,
} from '@/data/personas-mock'
import type { InfoAcademicaPersona, PeriodoAcademico } from '@/data/types'
import type { PersonaTabProps } from './types'

/** Pestaña "Info Académica" (`InfoAcademica.png`). */
export function InfoAcademicaTab({ persona, editable, onChange }: PersonaTabProps) {
  const info = persona.infoAcademica ?? {}
  const periodo = persona.periodoAcademico ?? {}

  function actualizarInfo<K extends keyof InfoAcademicaPersona>(campo: K, valor: InfoAcademicaPersona[K]) {
    onChange('infoAcademica', { ...info, [campo]: valor })
  }
  function actualizarPeriodo<K extends keyof PeriodoAcademico>(campo: K, valor: PeriodoAcademico[K]) {
    onChange('periodoAcademico', { ...periodo, [campo]: valor })
  }

  return (
      <div className="p-4">
        <div className="mb-6">
          <SeccionTitulo>Información General</SeccionTitulo>
          <div className="grid grid-cols-4 gap-3">
            <PersonaField
              label="Universidad"
              type="select"
              options={UNIVERSIDADES}
              value={info.universidad}
              editable={editable}
              onChange={(v) => actualizarInfo('universidad', v)}
            />
            <PersonaField
              label="Facultad"
              type="select"
              options={FACULTADES_CARRERAS}
              value={info.facultad}
              editable={editable}
              onChange={(v) => actualizarInfo('facultad', v)}
            />
            <PersonaField
              label="Tipo Alumno"
              type="select"
              options={TIPOS_ALUMNO}
              value={info.tipoAlumno}
              editable={editable}
              onChange={(v) => actualizarInfo('tipoAlumno', v)}
            />
            <PersonaField
              label="Nivel Académico"
              type="select"
              options={ESTADOS_ACADEMICOS}
              value={info.nivelAcademico}
              editable={editable}
              onChange={(v) => actualizarInfo('nivelAcademico', v)}
            />
            <PersonaField
              label="Estado Académico"
              type="select"
              options={ESTADOS_ACADEMICOS}
              value={info.estadoAcademico}
              editable={editable}
              onChange={(v) => actualizarInfo('estadoAcademico', v)}
            />
            <PersonaField
              label="Carrera"
              type="select"
              options={FACULTADES_CARRERAS}
              value={info.carrera}
              editable={editable}
              onChange={(v) => actualizarInfo('carrera', v)}
            />
            <PersonaField
              label="Sede"
              type="select"
              options={SEDES}
              value={info.sede}
              editable={editable}
              onChange={(v) => actualizarInfo('sede', v)}
            />
            <PersonaField
              label="Jornada"
              type="select"
              options={JORNADAS}
              value={info.jornada}
              editable={editable}
              onChange={(v) => actualizarInfo('jornada', v)}
            />
            <PersonaField
              label="Tipo de Sangre"
              type="select"
              options={TIPOS_SANGRE}
              value={info.tipoSangre}
              editable={editable}
              onChange={(v) => actualizarInfo('tipoSangre', v)}
            />
            <PersonaField
              label="RH"
              type="select"
              options={[{ codigo: '+', descripcion: '+' }, { codigo: '-', descripcion: '-' }]}
              value={info.rh}
              editable={editable}
              onChange={(v) => actualizarInfo('rh', v)}
            />
            <PersonaCheckboxField label="Sisben" checked={info.sisben} editable={editable} onChange={(v) => actualizarInfo('sisben', v)} />
            <PersonaField label="Estrato" value={info.estrato} editable={editable} onChange={(v) => actualizarInfo('estrato', v)} />
          </div>
        </div>

        <div>
          <SeccionTitulo>Información del Período Académico</SeccionTitulo>
          <div className="grid grid-cols-4 gap-3">
            <PersonaField label="Fecha Ordinaria" type="date" value={periodo.fechaOrdinaria} editable={editable} onChange={(v) => actualizarPeriodo('fechaOrdinaria', v)} />
            <PersonaField
              label="Valor Recibo Ordinario"
              type="number"
              format="currency"
              value={periodo.valorReciboOrdinario}
              editable={editable}
              onChange={(v) => actualizarPeriodo('valorReciboOrdinario', Number(v))}
            />
            <PersonaField label="Fecha Extraordinaria" type="date" value={periodo.fechaExtraordinaria} editable={editable} onChange={(v) => actualizarPeriodo('fechaExtraordinaria', v)} />
            <PersonaField
              label="Valor Recibo Extraordinario"
              type="number"
              format="currency"
              value={periodo.valorReciboExtraordinario}
              editable={editable}
              onChange={(v) => actualizarPeriodo('valorReciboExtraordinario', Number(v))}
            />
            <PersonaField label="Fecha Extemporánea" type="date" value={periodo.fechaExtemporanea} editable={editable} onChange={(v) => actualizarPeriodo('fechaExtemporanea', v)} />
            <PersonaField
              label="Valor Recibo Extemporáneo"
              type="number"
              format="currency"
              value={periodo.valorReciboExtemporaneo}
              editable={editable}
              onChange={(v) => actualizarPeriodo('valorReciboExtemporaneo', Number(v))}
            />
            <PersonaField label="Período" value={periodo.periodo} editable={editable} onChange={(v) => actualizarPeriodo('periodo', v)} />
            <PersonaField label="Número de Recibo" value={periodo.numeroRecibo} editable={editable} onChange={(v) => actualizarPeriodo('numeroRecibo', v)} />
            <PersonaField
              label="Estado del Recibo"
              type="select"
              options={[{ codigo: 'P', descripcion: 'Pendiente' }, { codigo: 'C', descripcion: 'Cancelado' }, { codigo: 'A', descripcion: 'Abonado' }]}
              value={periodo.estadoRecibo}
              editable={editable}
              onChange={(v) => actualizarPeriodo('estadoRecibo', v)}
            />
            <PersonaField
              label="Valor Abono"
              type="number"
              format="currency"
              value={periodo.valorAbono}
              editable={editable}
              onChange={(v) => actualizarPeriodo('valorAbono', Number(v))}
            />
            <PersonaField
              label="Valor Cancelado"
              type="number"
              format="currency"
              value={periodo.valorCancelado}
              editable={editable}
              onChange={(v) => actualizarPeriodo('valorCancelado', Number(v))}
            />
          </div>
        </div>
      </div>
  )
}
