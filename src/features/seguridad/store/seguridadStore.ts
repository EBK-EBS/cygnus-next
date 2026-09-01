import { create } from 'zustand'
import {
  departamentosSeed,
  funcionalidadesSeed,
  oficinasSeed,
  oficinaUsuariosSeed,
  perfilesSeed,
  personasSeed,
  procesosPorPerfilSeed,
  tiposUsuarioSeed,
  usuariosSeed,
} from '../data/mockData'
import type { Departamento, Funcionalidad, Oficina, Opcion, Perfil, PersonaLookup, ProcesoNode, TipoUsuario, Usuario } from '../types'

function nextId(items: Array<{ id: number }>): number {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1
}

function nextCodigo(items: Array<{ codigo: number }>): number {
  return items.reduce((max, item) => Math.max(max, item.codigo), 0) + 1
}

function mapProceso(nodes: ProcesoNode[], codigo: number, fn: (node: ProcesoNode) => ProcesoNode): ProcesoNode[] {
  return nodes.map((n) => (n.codigo === codigo ? fn(n) : { ...n, hijos: mapProceso(n.hijos, codigo, fn) }))
}

function removeProceso(nodes: ProcesoNode[], codigo: number): ProcesoNode[] {
  return nodes.filter((n) => n.codigo !== codigo).map((n) => ({ ...n, hijos: removeProceso(n.hijos, codigo) }))
}

function addProceso(nodes: ProcesoNode[], parentCodigo: number | null, child: ProcesoNode): ProcesoNode[] {
  if (parentCodigo == null) return [...nodes, child]
  return nodes.map((n) =>
    n.codigo === parentCodigo ? { ...n, hijos: [...n.hijos, child] } : { ...n, hijos: addProceso(n.hijos, parentCodigo, child) },
  )
}

function allCodigos(nodes: ProcesoNode[]): number[] {
  return nodes.flatMap((n) => [n.codigo, ...allCodigos(n.hijos)])
}

interface SeguridadState {
  tiposUsuario: TipoUsuario[]
  oficinas: Oficina[]
  departamentos: Departamento[]
  personas: PersonaLookup[]
  usuarios: Usuario[]
  oficinaUsuarios: Record<number, number[]>
  perfiles: Perfil[]
  procesosPorPerfil: Record<number, ProcesoNode[]>
  funcionalidades: Funcionalidad[]

  saveUsuario: (usuario: Omit<Usuario, 'id' | 'codigo'> & { id?: number; codigo?: number }) => Usuario
  deleteUsuario: (id: number) => void
  setOficinaUsuarios: (oficinaId: number, usuarioIds: number[]) => void
  setClaveUsuario: (usuarioId: number, clave: string) => void

  savePerfil: (codigo: number | null, data: { nombre: string; descripcion: string }) => Perfil
  cambiarEstadoPerfil: (codigo: number, activo: boolean) => void
  deletePerfil: (codigo: number) => void
  copiarPerfil: (origenCodigo: number, data: { nombre: string; descripcion: string }) => Perfil

  upsertProceso: (
    perfilCodigo: number,
    data: { codigo: number | null; nombre: string; requiereClave: boolean; clave: string | null },
    parentCodigo: number | null,
  ) => void
  deleteProceso: (perfilCodigo: number, codigo: number) => void

  upsertOpcion: (
    perfilCodigo: number,
    procesoCodigo: number | null,
    data: Omit<Opcion, 'codigo' | 'funcionNombre'> & { codigo: number | null },
  ) => void
  deleteOpcion: (perfilCodigo: number, opcionCodigo: number) => void
  toggleOperacion: (perfilCodigo: number, opcionCodigo: number, operacion: Opcion['operaciones'][number]) => void
}

let nextProcesoCodigo = 900
let nextOpcionCodigo = 9000

export const useSeguridadStore = create<SeguridadState>((set, get) => ({
  tiposUsuario: tiposUsuarioSeed,
  oficinas: oficinasSeed,
  departamentos: departamentosSeed,
  personas: personasSeed,
  usuarios: usuariosSeed,
  oficinaUsuarios: oficinaUsuariosSeed,
  perfiles: perfilesSeed,
  procesosPorPerfil: procesosPorPerfilSeed,
  funcionalidades: funcionalidadesSeed,

  saveUsuario: (usuario) => {
    const id = usuario.id ?? nextId(get().usuarios)
    const codigo = usuario.codigo ?? id
    const saved: Usuario = { ...usuario, id, codigo }
    set((s) => ({
      usuarios: s.usuarios.some((u) => u.id === id) ? s.usuarios.map((u) => (u.id === id ? saved : u)) : [...s.usuarios, saved],
    }))
    return saved
  },

  deleteUsuario: (id) => set((s) => ({ usuarios: s.usuarios.filter((u) => u.id !== id) })),

  setOficinaUsuarios: (oficinaId, usuarioIds) =>
    set((s) => ({ oficinaUsuarios: { ...s.oficinaUsuarios, [oficinaId]: usuarioIds } })),

  setClaveUsuario: (usuarioId, clave) =>
    set((s) => ({ usuarios: s.usuarios.map((u) => (u.id === usuarioId ? { ...u, clave } : u)) })),

  savePerfil: (codigo, data) => {
    const state = get()
    if (codigo != null) {
      const saved: Perfil = { ...state.perfiles.find((p) => p.codigo === codigo)!, ...data }
      set({ perfiles: state.perfiles.map((p) => (p.codigo === codigo ? saved : p)) })
      return saved
    }
    const nuevo: Perfil = { codigo: nextCodigo(state.perfiles), nombre: data.nombre, descripcion: data.descripcion, activo: true }
    set({ perfiles: [...state.perfiles, nuevo], procesosPorPerfil: { ...state.procesosPorPerfil, [nuevo.codigo]: [] } })
    return nuevo
  },

  cambiarEstadoPerfil: (codigo, activo) =>
    set((s) => ({ perfiles: s.perfiles.map((p) => (p.codigo === codigo ? { ...p, activo } : p)) })),

  deletePerfil: (codigo) =>
    set((s) => {
      const { [codigo]: _omit, ...restoProcesos } = s.procesosPorPerfil
      return { perfiles: s.perfiles.filter((p) => p.codigo !== codigo), procesosPorPerfil: restoProcesos }
    }),

  copiarPerfil: (origenCodigo, data) => {
    const state = get()
    const nuevo: Perfil = { codigo: nextCodigo(state.perfiles), nombre: data.nombre, descripcion: data.descripcion, activo: true }
    const arbolOrigen = state.procesosPorPerfil[origenCodigo] ?? []
    const arbolCopiado = JSON.parse(JSON.stringify(arbolOrigen)) as ProcesoNode[]
    set({
      perfiles: [...state.perfiles, nuevo],
      procesosPorPerfil: { ...state.procesosPorPerfil, [nuevo.codigo]: arbolCopiado },
    })
    return nuevo
  },

  upsertProceso: (perfilCodigo, data, parentCodigo) =>
    set((s) => {
      const arbol = s.procesosPorPerfil[perfilCodigo] ?? []
      const actualizado = data.codigo
        ? mapProceso(arbol, data.codigo, (n) => ({ ...n, nombre: data.nombre, requiereClave: data.requiereClave, clave: data.clave }))
        : addProceso(arbol, parentCodigo, {
            codigo: nextProcesoCodigo++,
            nombre: data.nombre,
            requiereClave: data.requiereClave,
            clave: data.clave,
            hijos: [],
            opciones: [],
          })
      return { procesosPorPerfil: { ...s.procesosPorPerfil, [perfilCodigo]: actualizado } }
    }),

  deleteProceso: (perfilCodigo, codigo) =>
    set((s) => ({
      procesosPorPerfil: { ...s.procesosPorPerfil, [perfilCodigo]: removeProceso(s.procesosPorPerfil[perfilCodigo] ?? [], codigo) },
    })),

  upsertOpcion: (perfilCodigo, procesoCodigo, data) =>
    set((s) => {
      const arbol = s.procesosPorPerfil[perfilCodigo] ?? []
      const funcionNombre = s.funcionalidades.find((f) => f.codigo === data.funcionCodigo)?.nombre ?? ''

      if (data.codigo) {
        const actualizado = allCodigos(arbol).includes(data.codigo)
          ? updateOpcionEnArbol(arbol, data.codigo, { ...data, codigo: data.codigo, funcionNombre })
          : arbol
        return { procesosPorPerfil: { ...s.procesosPorPerfil, [perfilCodigo]: actualizado } }
      }

      if (procesoCodigo == null) return {}
      const nuevaOpcion: Opcion = { ...data, codigo: nextOpcionCodigo++, funcionNombre }
      const actualizado = mapProceso(arbol, procesoCodigo, (n) => ({ ...n, opciones: [...n.opciones, nuevaOpcion] }))
      return { procesosPorPerfil: { ...s.procesosPorPerfil, [perfilCodigo]: actualizado } }
    }),

  deleteOpcion: (perfilCodigo, opcionCodigo) =>
    set((s) => {
      const quitarDeNodo = (nodes: ProcesoNode[]): ProcesoNode[] =>
        nodes.map((n) => ({ ...n, opciones: n.opciones.filter((o) => o.codigo !== opcionCodigo), hijos: quitarDeNodo(n.hijos) }))
      return { procesosPorPerfil: { ...s.procesosPorPerfil, [perfilCodigo]: quitarDeNodo(s.procesosPorPerfil[perfilCodigo] ?? []) } }
    }),

  toggleOperacion: (perfilCodigo, opcionCodigo, operacion) =>
    set((s) => {
      const toggleEnNodo = (nodes: ProcesoNode[]): ProcesoNode[] =>
        nodes.map((n) => ({
          ...n,
          opciones: n.opciones.map((o) =>
            o.codigo === opcionCodigo
              ? { ...o, operaciones: o.operaciones.includes(operacion) ? o.operaciones.filter((op) => op !== operacion) : [...o.operaciones, operacion] }
              : o,
          ),
          hijos: toggleEnNodo(n.hijos),
        }))
      return { procesosPorPerfil: { ...s.procesosPorPerfil, [perfilCodigo]: toggleEnNodo(s.procesosPorPerfil[perfilCodigo] ?? []) } }
    }),
}))

function updateOpcionEnArbol(nodes: ProcesoNode[], codigo: number, data: Opcion): ProcesoNode[] {
  return nodes.map((n) => ({
    ...n,
    opciones: n.opciones.map((o) => (o.codigo === codigo ? { ...data } : o)),
    hijos: updateOpcionEnArbol(n.hijos, codigo, data),
  }))
}
