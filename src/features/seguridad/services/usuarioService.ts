import { apiRequest } from '@/lib/auth'
import type { Usuario } from '../types'

export interface UsuarioApi {
  codigo: number
  nombre: string
  personaCodigo: number
  tipoUsuarioCodigo: number
  oficinaCodigo: number
  fechaIngreso: string
  fechaEgreso: string | null
  login: string
  estado: string
  activo: boolean
  areaCodigo: number | null
  correo: string | null
  perfilCodigo: number | null
}

interface UsuarioPage {
  content: UsuarioApi[]
}

export interface UsuarioCreateRequest {
  nombre: string
  personaCodigo: number
  tipoUsuarioCodigo: number
  oficinaCodigo: number
  fechaIngreso: string
  login: string
  clave: string
  areaCodigo: number | null
  correo: string
  perfilCodigo: number
}

export interface UsuarioUpdateRequest {
  nombre: string
  tipoUsuarioCodigo: number
  oficinaCodigo: number
  areaCodigo: number | null
  correo: string
  perfilCodigo: number
}

function toUsuario(remote: UsuarioApi, previous?: Usuario): Usuario {
  return {
    id: remote.codigo,
    codigo: remote.codigo,
    personaId: remote.personaCodigo,
    nombre: remote.nombre,
    tipoUsuarioId: remote.tipoUsuarioCodigo,
    oficinaId: remote.oficinaCodigo,
    departamentoId: remote.areaCodigo,
    correo: remote.correo ?? '',
    fechaIngreso: remote.fechaIngreso,
    estado: remote.activo ? 'Activo' : 'Inactivo',
    login: remote.login,
    // C_CLAVE nunca se devuelve por la API.
    clave: '',
    perfilCodigo: remote.perfilCodigo,
    expira: previous?.expira ?? false,
    alertaCada: previous?.alertaCada ?? '',
    alertaUnidad: previous?.alertaUnidad ?? 'Días',
    numAlertas: previous?.numAlertas ?? '',
  }
}

export async function listUsuarios(): Promise<UsuarioApi[]> {
  const page = await apiRequest<UsuarioPage>('/api/v1/usuarios?page=0&size=1000&sort=codigo,asc')
  return page.content
}

export async function createUsuario(request: UsuarioCreateRequest): Promise<UsuarioApi> {
  return apiRequest<UsuarioApi>('/api/v1/usuarios', {
    method: 'POST',
    body: JSON.stringify(request),
  })
}

export async function updateUsuario(codigo: number, request: UsuarioUpdateRequest): Promise<UsuarioApi> {
  return apiRequest<UsuarioApi>(`/api/v1/usuarios/${codigo}`, {
    method: 'PUT',
    body: JSON.stringify(request),
  })
}

export async function changePassword(codigo: number, claveNueva: string): Promise<UsuarioApi> {
  return apiRequest<UsuarioApi>(`/api/v1/usuarios/${codigo}/clave`, {
    method: 'PATCH',
    body: JSON.stringify({ claveNueva }),
  })
}

export async function changeStatus(codigo: number, activo: boolean): Promise<UsuarioApi> {
  return apiRequest<UsuarioApi>(`/api/v1/usuarios/${codigo}/estado`, {
    method: 'PATCH',
    body: JSON.stringify({ activo }),
  })
}

export async function deactivateUsuario(codigo: number): Promise<UsuarioApi> {
  return apiRequest<UsuarioApi>(`/api/v1/usuarios/${codigo}`, { method: 'DELETE' })
}

export function mapUsuario(remote: UsuarioApi, previous?: Usuario): Usuario {
  return toUsuario(remote, previous)
}
