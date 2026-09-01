export type OperacionCodigo = 'CONSULTAR' | 'MODIFICAR' | 'INSERTAR' | 'BORRAR'

export interface Opcion {
  codigo: number
  funcionCodigo: number | null
  funcionNombre: string
  nombre: string
  icono?: string
  tecla?: string
  requiereClave: boolean
  clave?: string | null
  operaciones: OperacionCodigo[]
}

export interface ProcesoNode {
  codigo: number
  nombre: string
  requiereClave: boolean
  clave?: string | null
  hijos: ProcesoNode[]
  opciones: Opcion[]
}

export interface Funcionalidad {
  codigo: number
  identificador: string
  nombre: string
}

export interface Perfil {
  codigo: number
  nombre: string
  descripcion: string
  activo: boolean
}

export interface TipoUsuario {
  id: number
  codigo: string
  nombre: string
  descripcion: string
  activo: boolean
}

export interface Oficina {
  id: number
  codigo: string
  nombre: string
}

export interface Departamento {
  id: number
  codigo: string
  nombre: string
}

export interface PersonaLookup {
  id: number
  cedula: string
  nombre: string
}

export interface Usuario {
  id: number
  codigo: number
  personaId: number | null
  nombre: string
  tipoUsuarioId: number | null
  oficinaId: number | null
  departamentoId: number | null
  correo: string
  fechaIngreso: string
  estado: 'Activo' | 'Inactivo'
  login: string
  clave: string
  perfilCodigo: number | null
  expira: boolean
  alertaCada: number | ''
  alertaUnidad: 'Días' | 'Meses'
  numAlertas: number | ''
}

export interface LookupOption {
  id: number
  codigo: string | number
  nombre: string
}
