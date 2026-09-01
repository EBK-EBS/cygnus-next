import { create } from 'zustand'
import { PERSONAS_MOCK } from '@/data/personas-mock'
import type { Persona, TipoPersona, EstadoPersona, PersonaRol, EstadoRol } from '@/data/types'

interface PersonasState {
  /** Fuente de verdad reactiva de personas — reemplaza el array mutable de `personas-mock.ts`. */
  personas: Persona[]
  /** Crea una persona (le asigna el siguiente id disponible) y la agrega al estado. */
  crearPersona: (persona: Persona) => Persona
  /** Reemplaza los datos de una persona existente por `datos` (objeto completo o parcial). */
  actualizarPersona: (id: number, datos: Partial<Persona>) => void
  /** Cambia únicamente el estado (Activo/Inactivo) de una persona. */
  cambiarEstado: (id: number, estado: EstadoPersona) => void
  /** Asigna un nuevo rol a una persona existente — nunca crea una persona nueva (PT-PER-001 §12). */
  asignarRol: (personaId: number, rol: Omit<PersonaRol, 'id'>) => void
  /** Actualiza el contexto/fechas de un rol ya asignado. No afecta el estado de la Persona ni de otros roles. */
  actualizarRol: (personaId: number, rolId: number, datos: Partial<PersonaRol>) => void
  /** Cambia el estado de un rol (activar/suspender/terminar) — independiente del estado de Persona (PER-009/PER-041). */
  cambiarEstadoRol: (personaId: number, rolId: number, estado: EstadoRol, causal?: string) => void
}

export const usePersonasStore = create<PersonasState>((set, get) => ({
  personas: PERSONAS_MOCK,

  crearPersona: (persona) => {
    const siguienteId = Math.max(0, ...get().personas.map((p) => p.id)) + 1
    const nuevaPersona: Persona = { ...persona, id: siguienteId }
    set((s) => ({ personas: [...s.personas, nuevaPersona] }))
    return nuevaPersona
  },

  actualizarPersona: (id, datos) =>
    set((s) => ({
      personas: s.personas.map((p) =>
        p.id === id ? { ...p, ...datos, fechaModificacion: new Date().toLocaleDateString('es-CO') } : p,
      ),
    })),

  cambiarEstado: (id, estado) =>
    set((s) => ({
      personas: s.personas.map((p) =>
        p.id === id ? { ...p, estado, fechaModificacion: new Date().toLocaleDateString('es-CO') } : p,
      ),
    })),

  asignarRol: (personaId, rol) =>
    set((s) => ({
      personas: s.personas.map((p) => {
        if (p.id !== personaId) return p
        const siguienteRolId = Math.max(0, ...p.roles.map((r) => r.id)) + 1
        return {
          ...p,
          roles: [...p.roles, { ...rol, id: siguienteRolId }],
          fechaModificacion: new Date().toLocaleDateString('es-CO'),
        }
      }),
    })),

  actualizarRol: (personaId, rolId, datos) =>
    set((s) => ({
      personas: s.personas.map((p) =>
        p.id !== personaId
          ? p
          : {
              ...p,
              roles: p.roles.map((r) => (r.id === rolId ? { ...r, ...datos } : r)),
              fechaModificacion: new Date().toLocaleDateString('es-CO'),
            },
      ),
    })),

  cambiarEstadoRol: (personaId, rolId, estado, causal) =>
    set((s) => ({
      personas: s.personas.map((p) =>
        p.id !== personaId
          ? p
          : {
              ...p,
              roles: p.roles.map((r) =>
                r.id === rolId
                  ? {
                      ...r,
                      estado,
                      causal: causal ?? r.causal,
                      fechaFin: estado === 'Terminado' ? new Date().toLocaleDateString('es-CO') : r.fechaFin,
                    }
                  : r,
              ),
              fechaModificacion: new Date().toLocaleDateString('es-CO'),
            },
      ),
    })),
}))

// ─────────────────────────────────────────────────────────────────────────────
// SELECTORES — funciones puras sobre un array de personas ya obtenido del store
// ─────────────────────────────────────────────────────────────────────────────

/** Busca por texto libre (nombres, apellidos, identificación, email, razón social). */
export function buscarPersonas(personas: Persona[], texto: string): Persona[] {
  const lower = texto.toLowerCase()
  if (!lower) return personas
  return personas.filter(
    (p) =>
      p.nombres.toLowerCase().includes(lower) ||
      p.primerApellido.toLowerCase().includes(lower) ||
      (p.segundoApellido && p.segundoApellido.toLowerCase().includes(lower)) ||
      p.identificacion.numero.toLowerCase().includes(lower) ||
      (p.email && p.email.toLowerCase().includes(lower)) ||
      (p.razonSocial && p.razonSocial.toLowerCase().includes(lower)),
  )
}

/** Cuenta personas por tipo (Natural/Jurídica) — conteo global, sin filtros aplicados. */
export function contarPorTipo(personas: Persona[], tipo: TipoPersona): number {
  return personas.filter((p) => p.tipoPersona === tipo).length
}

/** Cuenta personas activas — conteo global, sin filtros aplicados. */
export function contarActivas(personas: Persona[]): number {
  return personas.filter((p) => p.estado === 'Activo').length
}

/** Busca una persona por id. */
export function buscarPersonaPorId(personas: Persona[], id: number): Persona | undefined {
  return personas.find((p) => p.id === id)
}
