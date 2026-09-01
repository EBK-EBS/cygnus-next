import type {
  Departamento,
  Funcionalidad,
  Oficina,
  Perfil,
  PersonaLookup,
  ProcesoNode,
  TipoUsuario,
  Usuario,
} from '../types'

/**
 * Datos de demostración para el módulo de Seguridad — sin backend.
 * Los perfiles y su árbol de procesos/opciones también son mock (a diferencia
 * del proyecto original, que ya conectaba Perfiles a un API real).
 */

export const tiposUsuarioSeed: TipoUsuario[] = [
  { id: 1, codigo: '21', nombre: 'Soporte Técnico', descripcion: 'Personal de soporte y sistemas', activo: true },
  { id: 2, codigo: '10', nombre: 'Empleado', descripcion: 'Empleado de la cooperativa', activo: true },
  { id: 3, codigo: '30', nombre: 'Gerencial', descripcion: 'Personal gerencial / directivo', activo: true },
  { id: 4, codigo: '40', nombre: 'Auditor', descripcion: 'Auditoría interna o externa', activo: true },
]

export const oficinasSeed: Oficina[] = [
  { id: 1, codigo: '1', nombre: 'Oficina Principal' },
  { id: 2, codigo: '407', nombre: 'BOQUETE' },
  { id: 3, codigo: '102', nombre: 'DAVID' },
  { id: 4, codigo: '205', nombre: 'SANTIAGO' },
  { id: 5, codigo: '310', nombre: 'CHITRÉ' },
]

export const departamentosSeed: Departamento[] = [
  { id: 1, codigo: '01', nombre: 'Sistemas' },
  { id: 2, codigo: '02', nombre: 'Crédito' },
  { id: 3, codigo: '03', nombre: 'Contabilidad' },
  { id: 4, codigo: '04', nombre: 'Atención al Cliente' },
]

export const personasSeed: PersonaLookup[] = [
  { id: 1, cedula: '0-CACSA', nombre: 'CACSA XXXXXXXXXXXX XXXXXXXXXXXX' },
  { id: 2, cedula: '8-123-456', nombre: 'RAUL A. RANGEL' },
  { id: 3, cedula: '4-567-890', nombre: 'ROBERTO MIGUEL SALDAÑA' },
  { id: 4, cedula: '2-345-678', nombre: 'MARISSA PARDO' },
  { id: 5, cedula: '9-876-543', nombre: 'CARLOS DIAZ' },
  { id: 6, cedula: '1-111-222', nombre: 'NESTOR BONILLA' },
  { id: 7, cedula: '3-444-555', nombre: 'VANESSA MARINA MACHUCA' },
  { id: 8, cedula: '6-777-888', nombre: 'HORACIO RODRIGO SANCHEZ' },
]

export const perfilesSeed: Perfil[] = [
  { codigo: 1, nombre: 'ADMINISTRADOR', descripcion: 'Acceso total al sistema', activo: true },
  { codigo: 2, nombre: 'GERENCIAL', descripcion: 'Perfil directivo / gerencial', activo: true },
  { codigo: 3, nombre: 'OFICIAL DE NEGOCIOS', descripcion: 'Gestión de crédito y cartera', activo: true },
  { codigo: 4, nombre: 'ATENCIÓN AL CLIENTE', descripcion: 'Consulta y atención en oficina', activo: true },
  { codigo: 5, nombre: 'AUDITORÍA', descripcion: 'Consulta y reportes de auditoría', activo: false },
]

export const funcionalidadesSeed: Funcionalidad[] = [
  { codigo: 1, identificador: 'CB-PER', nombre: 'Administración de Personas' },
  { codigo: 2, identificador: 'CB-CRE', nombre: 'Gestión de Crédito' },
  { codigo: 3, identificador: 'CB-CAR', nombre: 'Cartera por Edades' },
  { codigo: 4, identificador: 'SEG-USR', nombre: 'Administración de Usuarios' },
  { codigo: 5, identificador: 'SEG-PER', nombre: 'Administración de Perfiles' },
  { codigo: 6, identificador: 'RPT-GEN', nombre: 'Reporteador General' },
]

/** Árbol de procesos/opciones por código de perfil. Solo el perfil ADMINISTRADOR trae datos de ejemplo. */
export const procesosPorPerfilSeed: Record<number, ProcesoNode[]> = {
  1: [
    {
      codigo: 101,
      nombre: 'Core Business',
      requiereClave: false,
      clave: null,
      hijos: [
        {
          codigo: 102,
          nombre: 'Personas',
          requiereClave: false,
          clave: null,
          hijos: [],
          opciones: [
            {
              codigo: 1001,
              funcionCodigo: 1,
              funcionNombre: 'Administración de Personas',
              nombre: 'Administración',
              icono: 'users',
              tecla: '',
              requiereClave: false,
              clave: null,
              operaciones: ['CONSULTAR', 'MODIFICAR', 'INSERTAR', 'BORRAR'],
            },
          ],
        },
        {
          codigo: 103,
          nombre: 'Crédito',
          requiereClave: true,
          clave: '1234',
          hijos: [],
          opciones: [
            {
              codigo: 1002,
              funcionCodigo: 2,
              funcionNombre: 'Gestión de Crédito',
              nombre: 'Gestión G1',
              icono: '',
              tecla: '',
              requiereClave: false,
              clave: null,
              operaciones: ['CONSULTAR', 'MODIFICAR'],
            },
          ],
        },
      ],
      opciones: [],
    },
    {
      codigo: 104,
      nombre: 'Configuración',
      requiereClave: false,
      clave: null,
      hijos: [
        {
          codigo: 105,
          nombre: 'Seguridad',
          requiereClave: false,
          clave: null,
          hijos: [],
          opciones: [
            {
              codigo: 1003,
              funcionCodigo: 4,
              funcionNombre: 'Administración de Usuarios',
              nombre: 'Admin. Usuarios',
              icono: '',
              tecla: 'U',
              requiereClave: false,
              clave: null,
              operaciones: ['CONSULTAR', 'MODIFICAR', 'INSERTAR', 'BORRAR'],
            },
            {
              codigo: 1004,
              funcionCodigo: 5,
              funcionNombre: 'Administración de Perfiles',
              nombre: 'Admin. Perfiles',
              icono: '',
              tecla: 'P',
              requiereClave: false,
              clave: null,
              operaciones: ['CONSULTAR', 'MODIFICAR', 'INSERTAR', 'BORRAR'],
            },
          ],
        },
      ],
      opciones: [],
    },
  ],
  2: [],
  3: [],
  4: [],
  5: [],
}

export const usuariosSeed: Usuario[] = [
  {
    id: 1,
    codigo: 1,
    personaId: 1,
    nombre: 'ADMINISTRADOR',
    tipoUsuarioId: 1,
    oficinaId: 2,
    departamentoId: 1,
    correo: 'irodrigu@cacsa.com.pa',
    fechaIngreso: '2002-08-11',
    estado: 'Activo',
    login: 'sysadm',
    clave: '123456',
    perfilCodigo: 1,
    expira: false,
    alertaCada: '',
    alertaUnidad: 'Días',
    numAlertas: '',
  },
  {
    id: 2,
    codigo: 2,
    personaId: 2,
    nombre: 'RAUL A. RANGEL',
    tipoUsuarioId: 3,
    oficinaId: 1,
    departamentoId: 2,
    correo: 'raul.rangel@cacsa.com.pa',
    fechaIngreso: '2015-03-02',
    estado: 'Activo',
    login: 'rrangel',
    clave: '123456',
    perfilCodigo: 2,
    expira: true,
    alertaCada: 15,
    alertaUnidad: 'Días',
    numAlertas: 3,
  },
  {
    id: 3,
    codigo: 3,
    personaId: 3,
    nombre: 'ROBERTO MIGUEL SALDAÑA',
    tipoUsuarioId: 2,
    oficinaId: 3,
    departamentoId: 2,
    correo: 'rsaldana@cacsa.com.pa',
    fechaIngreso: '2018-07-19',
    estado: 'Activo',
    login: 'msal',
    clave: '123456',
    perfilCodigo: 3,
    expira: false,
    alertaCada: '',
    alertaUnidad: 'Días',
    numAlertas: '',
  },
  {
    id: 4,
    codigo: 4,
    personaId: 5,
    nombre: 'CARLOS DIAZ',
    tipoUsuarioId: 2,
    oficinaId: 2,
    departamentoId: 4,
    correo: 'cdiaz@cacsa.com.pa',
    fechaIngreso: '2020-01-10',
    estado: 'Activo',
    login: 'cdiaz',
    clave: '123456',
    perfilCodigo: 4,
    expira: false,
    alertaCada: '',
    alertaUnidad: 'Días',
    numAlertas: '',
  },
  {
    id: 5,
    codigo: 5,
    personaId: 6,
    nombre: 'NESTOR BONILLA',
    tipoUsuarioId: 4,
    oficinaId: 1,
    departamentoId: 3,
    correo: 'nbonilla@cacsa.com.pa',
    fechaIngreso: '2016-11-23',
    estado: 'Inactivo',
    login: 'nbonilla',
    clave: '123456',
    perfilCodigo: 5,
    expira: false,
    alertaCada: '',
    alertaUnidad: 'Días',
    numAlertas: '',
  },
]

/** Asignación de usuarios a oficinas (adicional a la oficina primaria del usuario). */
export const oficinaUsuariosSeed: Record<number, number[]> = {
  1: [1, 2, 5],
  2: [1, 4],
  3: [3],
  4: [],
  5: [],
}
