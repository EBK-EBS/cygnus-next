import { create } from 'zustand'
import {
  changePassword,
  changeStatus,
  createUsuario,
  deactivateUsuario,
  listUsuarios,
  mapUsuario,
  updateUsuario,
} from '../services/usuarioService'
import type { UsuarioApi } from '../services/usuarioService'
import {
  departamentosSeed,
  funcionalidadesSeed,
  oficinasSeed,
  oficinaUsuariosSeed,
  perfilesSeed,
  personasSeed,
  procesosPorPerfilSeed,
  tiposUsuarioSeed,
} from '../data/mockData'
import type { Departamento, Funcionalidad, Oficina, Opcion, Perfil, PersonaLookup, ProcesoNode, TipoUsuario, Usuario } from '../types'

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
  usuariosLoading: boolean
  usuariosLoaded: boolean
  usuariosError: string | null
  oficinaUsuarios: Record<number, number[]>
  perfiles: Perfil[]
  procesosPorPerfil: Record<number, ProcesoNode[]>
  funcionalidades: Funcionalidad[]

  loadUsuarios: () => Promise<void>
  saveUsuario: (usuario: Omit<Usuario, 'id' | 'codigo'> & { id?: number; codigo?: number }) => Promise<Usuario>
  deleteUsuario: (id: number) => Promise<void>
  setOficinaUsuarios: (oficinaId: number, usuarioIds: number[]) => void
  setClaveUsuario: (usuarioId: number, clave: string) => Promise<void>

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
  usuarios: [],
  usuariosLoading: false,
  usuariosLoaded: false,
  usuariosError: null,
  oficinaUsuarios: oficinaUsuariosSeed,
  perfiles: perfilesSeed,
  procesosPorPerfil: procesosPorPerfilSeed,
  funcionalidades: funcionalidadesSeed,

  loadUsuarios: async () => {
    if (get().usuariosLoading) return
    set({ usuariosLoading: true, usuariosError: null })
    try {
      const remoteUsuarios = await listUsuarios()
      const previous = new Map(get().usuarios.map((usuario) => [usuario.id, usuario]))
      set({
        usuarios: remoteUsuarios.map((remote) => mapUsuario(remote, previous.get(remote.codigo))),
        usuariosLoading: false,
        usuariosLoaded: true,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudieron cargar los usuarios.'
      set({ usuariosLoading: false, usuariosError: message })
      throw error
    }
  },

  saveUsuario: async (usuario) => {
    const previous = usuario.id == null ? undefined : get().usuarios.find((item) => item.id === usuario.id)
    let remote: UsuarioApi
    if (usuario.id == null) {
      if (usuario.personaId == null || usuario.tipoUsuarioId == null || usuario.oficinaId == null || usuario.perfilCodigo == null || !usuario.fechaIngreso) {
        throw new Error('Persona, tipo, oficina, perfil y fecha de ingreso son obligatorios.')
      }
      remote = await createUsuario({
        nombre: usuario.nombre,
        personaCodigo: usuario.personaId,
        tipoUsuarioCodigo: usuario.tipoUsuarioId,
        oficinaCodigo: usuario.oficinaId,
        fechaIngreso: usuario.fechaIngreso,
        login: usuario.login,
        clave: usuario.clave,
        perfilCodigo: usuario.perfilCodigo,
        areaCodigo: usuario.departamentoId,
        correo: usuario.correo,
      })
      if (usuario.estado === 'Inactivo') remote = await changeStatus(remote.codigo, false)
    } else {
      if (usuario.tipoUsuarioId == null || usuario.oficinaId == null || usuario.perfilCodigo == null) {
        throw new Error('Tipo, oficina y perfil son obligatorios.')
      }
      remote = await updateUsuario(usuario.id, {
        nombre: usuario.nombre,
        tipoUsuarioCodigo: usuario.tipoUsuarioId,
        oficinaCodigo: usuario.oficinaId,
        perfilCodigo: usuario.perfilCodigo,
        areaCodigo: usuario.departamentoId,
        correo: usuario.correo,
      })
      if (usuario.clave.trim()) remote = await changePassword(usuario.id, usuario.clave)
      if ((usuario.estado === 'Activo') !== (previous?.estado === 'Activo')) {
        remote = await changeStatus(usuario.id, usuario.estado === 'Activo')
      }
    }

    const fallbackUsuario: Usuario = previous
      ? { ...previous, ...usuario, id: remote.codigo, codigo: remote.codigo }
      : { ...usuario, id: remote.codigo, codigo: remote.codigo }
    const saved = mapUsuario(remote, fallbackUsuario)
    set((state) => ({
      usuarios: state.usuarios.some((item) => item.id === saved.id)
        ? state.usuarios.map((item) => (item.id === saved.id ? saved : item))
        : [...state.usuarios, saved],
    }))
    return saved
  },

  deleteUsuario: async (id) => {
    const previous = get().usuarios.find((usuario) => usuario.id === id)
    const remote = await deactivateUsuario(id)
    const saved = mapUsuario(remote, previous)
    set((state) => ({ usuarios: state.usuarios.map((item) => (item.id === id ? saved : item)) }))
  },

  setOficinaUsuarios: (oficinaId, usuarioIds) =>
    set((s) => ({ oficinaUsuarios: { ...s.oficinaUsuarios, [oficinaId]: usuarioIds } })),

  setClaveUsuario: async (usuarioId, clave) => {
    const remote = await changePassword(usuarioId, clave)
    const previous = get().usuarios.find((usuario) => usuario.id === usuarioId)
    const saved = mapUsuario(remote, previous)
    set((state) => ({ usuarios: state.usuarios.map((item) => (item.id === usuarioId ? saved : item)) }))
  },

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
