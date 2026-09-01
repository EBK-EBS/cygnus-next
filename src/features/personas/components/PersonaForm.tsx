import { useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import type { Persona, TipoPersona } from '@/data/types'
import { crearPersonaVacia } from '@/data/personas-mock'
import { usePersonasStore, existeIdentificacionDuplicada } from '@/store/personasStore'
import { PersonaTabBar, pestanasParaTipo, type PersonaTabId } from './PersonaTabBar'
import { PERSONA_TAB_COMPONENTS } from './tabs'
import { validarBeneficiarios } from './tabs/FamiliarTab'

interface PersonaFormProps {
  tipoInicial?: TipoPersona
  onGuardar: (persona: Persona) => void
  onCancelar: () => void
}

/**
 * Formulario de creación de Persona — página completa con las 16 pestañas legacy
 * (Natural, Jurídica, Dirección, Laboral, ...). Sólo se usa para crear: editar una
 * persona existente se hace por sección dentro de `PersonaWorkspace`.
 */
export function PersonaForm({ tipoInicial = 'N', onGuardar, onCancelar }: PersonaFormProps) {
  const [form, setForm] = useState<Persona>(() => crearPersonaVacia(tipoInicial))
  const [tab, setTab] = useState<PersonaTabId>('natural')
  const [errores, setErrores] = useState<Record<string, string>>({})

  const tabs = pestanasParaTipo(form.tipoPersona)
  const tabActual = tabs.some((t) => t.id === tab) ? tab : tabs[0].id
  const tabLabel = tabs.find((t) => t.id === tabActual)?.label ?? ''
  const TabComponent = PERSONA_TAB_COMPONENTS[tabActual]

  function actualizarCampo<K extends keyof Persona>(campo: K, valor: Persona[K]) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
    setErrores((prev) => {
      if (!prev[campo as string]) return prev
      const nuevo = { ...prev }
      delete nuevo[campo as string]
      return nuevo
    })
  }

  function cambiarTipoPersona(tipo: TipoPersona) {
    setForm((prev) => ({ ...prev, tipoPersona: tipo }))
    setTab(pestanasParaTipo(tipo)[0].id)
  }

  function validar(): boolean {
    const nuevosErrores: Record<string, string> = {}
    if (!form.identificacion.numero) nuevosErrores['identificacion.numero'] = 'La identificación es obligatoria'
    if (!form.identificacion.tipoId) nuevosErrores['identificacion.tipoId'] = 'El tipo de identificación es obligatorio'
    // PF-01: validación frontend provisional de unicidad, ver `existeIdentificacionDuplicada`.
    if (
      form.identificacion.numero &&
      existeIdentificacionDuplicada(usePersonasStore.getState().personas, form.identificacion.numero, form.id)
    ) {
      nuevosErrores['identificacion.numero'] = 'Esta identificación ya está registrada para otra persona'
    }
    if (form.tipoPersona === 'N' && !form.nombres) nuevosErrores['nombres'] = 'Los nombres son obligatorios'
    if (form.tipoPersona === 'N' && !form.primerApellido) nuevosErrores['primerApellido'] = 'El primer apellido es obligatorio'
    if (form.tipoPersona === 'J' && !form.razonSocial) nuevosErrores['razonSocial'] = 'La razón social es obligatoria'
    // PF-02: suma de porcentaje de beneficiarios, ver `validarBeneficiarios`.
    const mensajeBeneficiarios = validarBeneficiarios(form.familiares)
    if (mensajeBeneficiarios) nuevosErrores['familiares'] = mensajeBeneficiarios
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  function handleGuardar() {
    if (!validar()) {
      setTab(tabs[0].id)
      return
    }
    const nombres = form.tipoPersona === 'J' && !form.nombres ? form.razonSocial ?? '' : form.nombres
    onGuardar({
      ...form,
      nombres,
      fechaCreacion: new Date().toLocaleDateString('es-CO'),
      usuarioCreacion: 'usuario',
    })
  }

  const hayErrores = Object.keys(errores).length > 0

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onCancelar} className="flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink">
          <ArrowLeft className="size-4" />
          Cancelar
        </button>
        <div className="h-4 w-px bg-line" />
        <h2 className="text-lg font-semibold text-ink">Nueva Persona</h2>

        <div className="ml-2 flex gap-3">
          <label className="flex items-center gap-1.5 text-sm text-ink">
            <input type="radio" name="tipoPersona" checked={form.tipoPersona === 'N'} onChange={() => cambiarTipoPersona('N')} />
            Natural
          </label>
          <label className="flex items-center gap-1.5 text-sm text-ink">
            <input type="radio" name="tipoPersona" checked={form.tipoPersona === 'J'} onChange={() => cambiarTipoPersona('J')} />
            Jurídica
          </label>
        </div>

        <div className="flex-1" />
        {hayErrores && (
          <span className="text-xs text-danger">
            {errores['identificacion.numero'] ??
              errores['familiares'] ??
              `Revisa los campos obligatorios en la pestaña "${tabs[0].label}"`}
          </span>
        )}
        <button
          onClick={handleGuardar}
          className="flex items-center gap-1.5 rounded-md bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Save className="size-3" />
          Crear Persona
        </button>
      </div>

      <PersonaTabBar tabs={tabs} active={tabActual} onChange={setTab} />
      <Card className="mb-0">
        <CardHeader title={tabLabel} />
        <div className="p-4">
          <TabComponent persona={form} editable onChange={actualizarCampo} />
        </div>
      </Card>
    </div>
  )
}
