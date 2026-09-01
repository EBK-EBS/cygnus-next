import type {
  Persona,
  CatalogoItem,
  TipoPersona,
  PersonaRol,
} from './types'

// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGOS MOCK — datos de demostración para selects/combos
// ─────────────────────────────────────────────────────────────────────────────

export const TIPOS_IDENTIFICACION: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Cédula de Ciudadanía' },
  { codigo: 2, descripcion: 'Tarjeta de Identidad' },
  { codigo: 3, descripcion: 'Cédula de Extranjería' },
  { codigo: 4, descripcion: 'NIT' },
  { codigo: 5, descripcion: 'Pasaporte' },
  { codigo: 6, descripcion: 'RIF' },
]

export const ESTADOS_CIVILES: CatalogoItem[] = [
  { codigo: 'S', descripcion: 'Soltero(a)' },
  { codigo: 'C', descripcion: 'Casado(a)' },
  { codigo: 'D', descripcion: 'Divorciado(a)' },
  { codigo: 'V', descripcion: 'Viudo(a)' },
  { codigo: 'U', descripcion: 'Unión Libre' },
]

export const NIVEL_ESTUDIOS: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Primaria' },
  { codigo: 2, descripcion: 'Secundaria' },
  { codigo: 3, descripcion: 'Técnico' },
  { codigo: 4, descripcion: 'Tecnológico' },
  { codigo: 5, descripcion: 'Profesional' },
  { codigo: 6, descripcion: 'Especialización' },
  { codigo: 7, descripcion: 'Maestría' },
  { codigo: 8, descripcion: 'Doctorado' },
]

export const PROFESIONES: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Ingeniero' },
  { codigo: 2, descripcion: 'Contador Público' },
  { codigo: 3, descripcion: 'Abogado' },
  { codigo: 4, descripcion: 'Médico' },
  { codigo: 5, descripcion: 'Arquitecto' },
  { codigo: 6, descripcion: 'Administrador de Empresas' },
  { codigo: 7, descripcion: 'Economista' },
  { codigo: 8, descripcion: 'Docente' },
  { codigo: 9, descripcion: 'Enfermero(a)' },
  { codigo: 10, descripcion: 'Desarrollador de Software' },
]

export const TIPOS_CONTRATO: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Término Indefinido' },
  { codigo: 2, descripcion: 'Término Fijo' },
  { codigo: 3, descripcion: 'Obra o Labor' },
  { codigo: 4, descripcion: 'Prestación de Servicios' },
  { codigo: 5, descripcion: 'Aprendizaje' },
]

export const CIUDADES: CatalogoItem[] = [
  { codigo: 11001, descripcion: 'Bogotá D.C.' },
  { codigo: 5001, descripcion: 'Medellín' },
  { codigo: 76109, descripcion: 'Cali' },
  { codigo: 68001, descripcion: 'Bucaramanga' },
  { codigo: 66001, descripcion: 'Pereira' },
  { codigo: 17001, descripcion: 'Manizales' },
  { codigo: 73001, descripcion: 'Ibagué' },
  { codigo: 41001, descripcion: 'Neiva' },
  { codigo: 54001, descripcion: 'Cúcuta' },
  { codigo: 23001, descripcion: 'Montería' },
  { codigo: 8001, descripcion: 'Barranquilla' },
  { codigo: 47001, descripcion: 'Santa Marta' },
  { codigo: 20001, descripcion: 'Valledupar' },
  { codigo: 76001, descripcion: 'Palmira' },
  { codigo: 63001, descripcion: 'Armenia' },
]

export const TIPOS_DIR: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Residencia' },
  { codigo: 2, descripcion: 'Correspondencia' },
  { codigo: 3, descripcion: 'Laboral' },
  { codigo: 4, descripcion: 'Electrónica' },
]

export const TIPOS_TEL: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Móvil' },
  { codigo: 2, descripcion: 'Fijo' },
  { codigo: 3, descripcion: 'Laboral' },
]

export const PARENTESCOS: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Cónyuge' },
  { codigo: 2, descripcion: 'Hijo(a)' },
  { codigo: 3, descripcion: 'Padre' },
  { codigo: 4, descripcion: 'Madre' },
  { codigo: 5, descripcion: 'Hermano(a)' },
  { codigo: 6, descripcion: 'Otro' },
]

export const CARGOS: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Analista' },
  { codigo: 2, descripcion: 'Coordinador' },
  { codigo: 3, descripcion: 'Gerente' },
  { codigo: 4, descripcion: 'Director' },
  { codigo: 5, descripcion: 'Asistente' },
]

export const DEPENDENCIAS: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Recursos Humanos' },
  { codigo: 2, descripcion: 'Financiera' },
  { codigo: 3, descripcion: 'Comercial' },
  { codigo: 4, descripcion: 'Operaciones' },
]

export const PAGADURIAS: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Pagaduría Nómina Central' },
  { codigo: 2, descripcion: 'Pagaduría Regional' },
]

export const SECTORES: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Servicios' },
  { codigo: 2, descripcion: 'Comercio' },
  { codigo: 3, descripcion: 'Industria' },
  { codigo: 4, descripcion: 'Educación' },
  { codigo: 5, descripcion: 'Salud' },
]

export const ACTIVIDADES_ECONOMICAS: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Servicios Financieros' },
  { codigo: 2, descripcion: 'Comercio al por Menor' },
  { codigo: 3, descripcion: 'Construcción' },
  { codigo: 4, descripcion: 'Educación' },
  { codigo: 5, descripcion: 'Transporte' },
]

export const FORMAS_PAGO: CatalogoItem[] = [
  { codigo: 'N', descripcion: 'Nómina' },
  { codigo: 'C', descripcion: 'Consignación' },
  { codigo: 'E', descripcion: 'Efectivo' },
  { codigo: 'CH', descripcion: 'Cheque' },
]

export const TIPOS_CLIENTE: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Asociado' },
  { codigo: 2, descripcion: 'Ahorrador' },
  { codigo: 3, descripcion: 'Empleado' },
]

export const ORIGENES_FONDOS: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Salario' },
  { codigo: 2, descripcion: 'Ahorro' },
  { codigo: 3, descripcion: 'Herencia' },
  { codigo: 4, descripcion: 'Venta de Bienes' },
  { codigo: 5, descripcion: 'Otro' },
]

export const PROPOSITOS_AFILIACION: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Ahorro' },
  { codigo: 2, descripcion: 'Crédito' },
  { codigo: 3, descripcion: 'Beneficios Sociales' },
  { codigo: 4, descripcion: 'Otro' },
]

export const PAISES: CatalogoItem[] = [
  { codigo: 'CO', descripcion: 'Colombia' },
  { codigo: 'US', descripcion: 'Estados Unidos' },
  { codigo: 'VE', descripcion: 'Venezuela' },
  { codigo: 'EC', descripcion: 'Ecuador' },
  { codigo: 'ES', descripcion: 'España' },
]

export const TIPOS_SOCIEDAD: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Sociedad Anónima' },
  { codigo: 2, descripcion: 'Sociedad Limitada' },
  { codigo: 3, descripcion: 'Sociedad por Acciones Simplificada' },
  { codigo: 4, descripcion: 'Asociación' },
]

export const TIPOS_IMAGEN: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Foto' },
  { codigo: 2, descripcion: 'Firma' },
]

export const TIPOS_INMUEBLE: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Casa' },
  { codigo: 2, descripcion: 'Apartamento' },
  { codigo: 3, descripcion: 'Local Comercial' },
  { codigo: 4, descripcion: 'Finca' },
]

export const MONEDAS: CatalogoItem[] = [
  { codigo: 'COP', descripcion: 'Peso Colombiano' },
  { codigo: 'USD', descripcion: 'Dólar Americano' },
  { codigo: 'EUR', descripcion: 'Euro' },
]

export const DOMINIOS_EMAIL: CatalogoItem[] = [
  { codigo: 1, descripcion: '@gmail.com' },
  { codigo: 2, descripcion: '@hotmail.com' },
  { codigo: 3, descripcion: '@outlook.com' },
]

export const VINCULOS_LABORALES: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Empleado' },
  { codigo: 2, descripcion: 'Independiente' },
  { codigo: 3, descripcion: 'Pensionado' },
  { codigo: 4, descripcion: 'Desempleado' },
]

export const TIPOS_BENEFICIARIO: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Principal' },
  { codigo: 2, descripcion: 'Sustituto' },
]

export const PRODUCTOS_COOPERATIVA: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Cuenta de Ahorros' },
  { codigo: 2, descripcion: 'Crédito de Consumo' },
  { codigo: 3, descripcion: 'CDAT' },
  { codigo: 4, descripcion: 'Seguro Exequial' },
]

export const UNIVERSIDADES: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Universidad Nacional' },
  { codigo: 2, descripcion: 'Universidad del Valle' },
  { codigo: 3, descripcion: 'Universidad de Antioquia' },
]

export const FACULTADES_CARRERAS: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Ingeniería de Sistemas' },
  { codigo: 2, descripcion: 'Administración de Empresas' },
  { codigo: 3, descripcion: 'Contaduría Pública' },
  { codigo: 4, descripcion: 'Derecho' },
]

export const TIPOS_ALUMNO: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Regular' },
  { codigo: 2, descripcion: 'Transferencia' },
  { codigo: 3, descripcion: 'Intercambio' },
]

export const ESTADOS_ACADEMICOS: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Activo' },
  { codigo: 2, descripcion: 'Retirado' },
  { codigo: 3, descripcion: 'Graduado' },
]

export const SEDES: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Sede Principal' },
  { codigo: 2, descripcion: 'Sede Norte' },
]

export const JORNADAS: CatalogoItem[] = [
  { codigo: 1, descripcion: 'Diurna' },
  { codigo: 2, descripcion: 'Nocturna' },
  { codigo: 3, descripcion: 'Fin de Semana' },
]

/**
 * Catálogo abierto de tipos de rol (equivalente a `TIPOS_ROL` en Legacy) — no es un enum
 * cerrado en el modelo de datos (`PersonaRol.tipoRol: string`), se puede ampliar aquí sin
 * tocar el resto del código. Solo se incluyen roles con evidencia real: "Asociado" (rol
 * implícito dominante en todo el módulo) y "Empleado" (Legacy: Rol 11 "Colaborador").
 */
export const TIPOS_ROL: CatalogoItem[] = [
  { codigo: 'Asociado', descripcion: 'Asociado' },
  { codigo: 'Empleado', descripcion: 'Empleado' },
]

export const TIPOS_SANGRE: CatalogoItem[] = [
  { codigo: 'O+', descripcion: 'O+' },
  { codigo: 'O-', descripcion: 'O-' },
  { codigo: 'A+', descripcion: 'A+' },
  { codigo: 'A-', descripcion: 'A-' },
  { codigo: 'B+', descripcion: 'B+' },
  { codigo: 'AB+', descripcion: 'AB+' },
]

// ─────────────────────────────────────────────────────────────────────────────
// VALORES BASE — arrays vacíos compartidos por toda persona nueva
// ─────────────────────────────────────────────────────────────────────────────

/** Arrays requeridos por `Persona` que no siempre vienen con datos de ejemplo. */
function personaArraysBase() {
  return {
    roles: [] as PersonaRol[],
    miembrosConsejo: [],
    direccionesElectronicas: [],
    sociosMayoritarios: [],
    cursosCooperativa: [],
    capacitaciones: [],
    impuestos: [],
    cuentasBancarias: [],
    cuentasRelacionadas: [],
    productosDeseados: [],
    infoAdicional: [],
    referenciasComerciales: [],
    personasRelacionadas: [],
  }
}

/** Crea una `Persona` en blanco (todos los arrays vacíos) lista para el formulario de creación. */
export function crearPersonaVacia(tipo: TipoPersona): Persona {
  return {
    id: 0,
    tipoPersona: tipo,
    estado: 'Activo',
    identificacion: { tipoId: 1, numero: '' },
    nombres: '',
    primerApellido: '',
    ...personaArraysBase(),
    direcciones: [],
    telefonos: [],
    familiares: [],
    representantes: [],
    documentos: [],
    residente: true,
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    datosLAFT: {
      propositoAfiliacion: [],
      origenFondos: [],
      promediosTransaccionales: [],
      cuentasMonedaExtranjera: [],
      cargosPoliticos: [],
      funcionesPublicasOtroPais: [],
    },
    fechaCreacion: new Date().toLocaleDateString('es-CO'),
    usuarioCreacion: 'usuario',
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PERSONAS MOCK — datos de demostración
// ─────────────────────────────────────────────────────────────────────────────

let nextId = 1

export const PERSONAS_MOCK: Persona[] = [
  // ── PERSONAS NATURALES ──────────────────────────────────────────────────
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-001',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '28/04/2022', contexto: {} }],
    tipoPersona: 'N',
    estado: 'Activo',
    identificacion: { tipoId: 1, numero: '1130682153' },
    nombres: 'Hanner Alberto',
    primerApellido: 'Vélez',
    segundoApellido: 'Macías',
    sexo: 'M',
    fechaNacimiento: '15/03/1985',
    ciudadNacimiento: 'Bogotá D.C.',
    paisNacimiento: 'Colombia',
    estadoCivil: 'S',
    estrato: '3',
    numeroHijos: 2,
    ciudadExpedicion: 'Bogotá D.C.',
    fechaExpedicion: '10/06/2005',
    estadoActual: 'Activo',
    digitoChequeo: '5',
    residente: true,
    email: 'hanner.velez@email.com',
    nivelEstudio: 'Profesional',
    profesion: 'Ingeniero',
    aficion: 'Ciclismo',
    nickname: 'Hanner',
    tratamiento: 'Señor',
    vecesCodeudor: 1,
    contribuyente: 'Sí',
    diaPago: '30',
    clienteDesde: '28/04/2022',
    fechaRegistro: '28/04/2022',
    oficina: 'Sede Principal',
    fechaAfiliacion: '28/04/2022',
    impuestos: [
      { id: 1, nombre: 'Retención en la Fuente', activo: true },
      { id: 2, nombre: 'GMF (4x1000)', activo: true },
    ],
    direcciones: [
      {
        id: 1,
        tipo: 'Residencia',
        direccion: 'Calle 45 # 12-34',
        ciudad: 'Bogotá D.C.',
        barrio: 'Chapinero',
        principal: true,
        tipoInmueble: 'Apartamento',
        pagaArriendo: false,
        envioCorrespondencia: true,
      },
    ],
    direccionesElectronicas: [
      { id: 1, tipo: 'Personal', valor: 'hanner.velez', dominio: '@gmail.com', principal: true, notificacionPago: true },
    ],
    telefonos: [
      { id: 1, tipo: 'Móvil', numero: '3104567890', principal: true, notificacionPagoElectronico: true },
    ],
    infoLaboral: {
      empresa: 'FECOOMEVA - Fondo de Empleados',
      telefonoEmpresa: '6013456789',
      pagaduria: 'Pagaduría Nómina Central',
      institucionDondeLabora: 'FECOOMEVA',
      formaCobro: 'Nómina',
      periodicidadCobro: 'Quincenal',
      dependencia: 'Operaciones',
      cargo: 'Ingeniero Industrial',
      tipoContrato: 'Término Indefinido',
      salarioDevengado: 3430000,
      salarioLiquido: 3000000,
      salarioNetoCargasSociales: 2750000,
      salarioEmbargado: 0,
      fechaIngreso: '28/04/2022',
      actividadEconomica: 'Servicios',
      sector: 'Servicios',
      vinculoLaboral: 'Empleado',
      formaPago: 'Nómina',
      puestoNomina: 'PN-0452',
    },
    familiares: [
      { id: 1, nombre: 'María Elena', apellidos: 'Pérez', parentesco: 'Cónyuge', fechaNacimiento: '20/05/1987', esBeneficiario: true, tipoBeneficiario: 'Principal', porcentajeBeneficio: 50, sexo: 'F' },
      { id: 2, nombre: 'Santiago', apellidos: 'Vélez Pérez', parentesco: 'Hijo(a)', fechaNacimiento: '10/08/2015', esBeneficiario: true, tipoBeneficiario: 'Sustituto', porcentajeBeneficio: 25, sexo: 'M' },
    ],
    representantes: [],
    imagenes: { tipoFoto: 'Foto', tipoFirma: 'Firma', observaciones: 'Documentos biométricos actualizados en 2024.' },
    cursosCooperativa: [
      { id: 1, fecha: '15/02/2023', descripcion: 'Inducción Cooperativismo', entidad: 'FECOOMEVA' },
    ],
    capacitaciones: [
      { id: 1, codigoActividad: 'CAP-01', nombreActividad: 'Educación Financiera', duracionHoras: 8, fechaInicial: '10/03/2023', fechaFinal: '10/03/2023' },
    ],
    promotorServicio: { codigo: 'PS-12', identificacion: '80123456', tipo: 'Asesor Comercial', nombre: 'Laura', apellido: 'Méndez' },
    cuentasBancarias: [
      { id: 1, codigoEntidad: '001', entidad: 'Bancolombia', cuenta: '1234567890', digitoChequeo: '3', tipoCuenta: 'Ahorros', codigoSucursal: '045', sucursal: 'Chapinero' },
    ],
    cuentasRelacionadas: [],
    productosDeseados: [
      { id: 1, codigo: '1', descripcion: 'Cuenta de Ahorros', seleccionado: true },
      { id: 2, codigo: '2', descripcion: 'Crédito de Consumo', seleccionado: false },
    ],
    infoAdicional: [
      { id: 1, codigo: 'A1', descripcion: 'Referido por', valor: 'Campaña digital', descripcionValores: 'N/A' },
    ],
    referenciasComerciales: [
      { id: 1, nombre: 'Almacén El Ahorro', telefono: '6014567890' },
    ],
    otrasEntidadesServiciosFinancieros: 'Banco Davivienda (cuenta de ahorros)',
    observacionesAdicional: 'Cliente vinculado por convenio empresarial.',
    personasRelacionadas: [],
    documentos: [
      { id: 1, tipo: 'Cédula', descripcion: 'Cédula de Ciudadanía', fechaExpedicion: '10/06/2005', estado: 'Vigente', activo: true, esFisico: true, usuarioModifica: 'sistema' },
    ],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    datosLAFT: {
      realizaCanjesDineros: false,
      propositoAfiliacion: ['Ahorro', 'Crédito'],
      origenFondos: ['Salario'],
      promediosTransaccionales: [{ id: 1, moneda: 'COP', rango: '$1.000.000 - $5.000.000' }],
      realizaOperacionesExterior: false,
      manejaRecursosPublicos: false,
      poseeCuentasMonedaExtranjera: false,
      cuentasMonedaExtranjera: [],
      desempenaCargoPolitico: false,
      cargosPoliticos: [],
      desempenaFuncionesPublicasOtroPais: false,
      funcionesPublicasOtroPais: [],
    },
    fechaCreacion: '04/28/2022',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-002',
    // Persona de ejemplo con multirol e histórico, para poder probar visualmente el módulo Roles.
    roles: [
      { id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '10/15/2020', contexto: {} },
      {
        id: 2,
        tipoRol: 'Empleado',
        estado: 'Terminado',
        fechaInicio: '01/03/2019',
        fechaFin: '30/06/2021',
        causal: 'Retiro voluntario',
        contexto: {},
      },
    ],
    tipoPersona: 'N',
    estado: 'Activo',
    identificacion: { tipoId: 1, numero: '5234567890' },
    nombres: 'María Elena',
    primerApellido: 'Rodríguez',
    segundoApellido: 'Pérez',
    sexo: 'F',
    fechaNacimiento: '22/07/1990',
    ciudadNacimiento: 'Medellín',
    paisNacimiento: 'Colombia',
    estadoCivil: 'C',
    estrato: '4',
    numeroHijos: 1,
    ciudadExpedicion: 'Medellín',
    fechaExpedicion: '15/09/2010',
    estadoActual: 'Activo',
    residente: true,
    email: 'maria.rodriguez@email.com',
    direcciones: [
      { id: 2, tipo: 'Residencia', direccion: 'Carrera 65 # 32-11', ciudad: 'Medellín', barrio: 'El Poblado', principal: true },
      { id: 3, tipo: 'Laboral', direccion: 'Carrera 43 # 1-50', ciudad: 'Medellín', principal: false },
    ],
    telefonos: [
      { id: 2, tipo: 'Móvil', numero: '3209876543', principal: true },
      { id: 3, tipo: 'Fijo', numero: '6045551234', principal: false },
    ],
    infoLaboral: {
      empresa: 'Empresa XYZ S.A.S.',
      cargo: 'Contadora Pública',
      tipoContrato: 'Término Indefinido',
      salarioDevengado: 4200000,
      salarioLiquido: 3800000,
      fechaIngreso: '15/10/2020',
      actividadEconomica: 'Comercio',
      formaPago: 'Nómina',
    },
    familiares: [],
    representantes: [],
    documentos: [
      { id: 2, tipo: 'Cédula', descripcion: 'Cédula de Ciudadanía', fechaExpedicion: '15/09/2010', estado: 'Vigente' },
    ],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '10/15/2020',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-003',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '03/20/2021', contexto: {} }],
    tipoPersona: 'N',
    estado: 'Activo',
    identificacion: { tipoId: 1, numero: '1012345678' },
    nombres: 'Carlos Andrés',
    primerApellido: 'Gómez',
    segundoApellido: 'Sánchez',
    sexo: 'M',
    fechaNacimiento: '10/11/1988',
    ciudadNacimiento: 'Cali',
    paisNacimiento: 'Colombia',
    estadoCivil: 'S',
    estrato: '3',
    ciudadExpedicion: 'Cali',
    fechaExpedicion: '20/01/2008',
    estadoActual: 'Activo',
    residente: true,
    email: 'carlos.gomez@email.com',
    direcciones: [
      { id: 4, tipo: 'Residencia', direccion: 'Avenida 4N # 8-90', ciudad: 'Cali', principal: true },
    ],
    telefonos: [
      { id: 4, tipo: 'Móvil', numero: '3156789012', principal: true },
    ],
    infoLaboral: {
      empresa: 'Constructora ABC Ltda.',
      cargo: 'Arquitecto',
      tipoContrato: 'Término Fijo',
      salarioDevengado: 2800000,
      salarioLiquido: 2500000,
      fechaIngreso: '20/03/2021',
    },
    familiares: [],
    representantes: [],
    documentos: [],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '03/20/2021',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-004',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '01/12/2019', contexto: {} }],
    tipoPersona: 'N',
    estado: 'Activo',
    identificacion: { tipoId: 1, numero: '1056781234' },
    nombres: 'Laura Cristina',
    primerApellido: 'Ortiz',
    segundoApellido: 'Gómez',
    sexo: 'F',
    fechaNacimiento: '05/09/1982',
    ciudadNacimiento: 'Bogotá D.C.',
    paisNacimiento: 'Colombia',
    estadoCivil: 'V',
    estrato: '5',
    numeroHijos: 3,
    ciudadExpedicion: 'Bogotá D.C.',
    fechaExpedicion: '12/12/2002',
    estadoActual: 'Activo',
    residente: true,
    email: 'laura.ortiz@email.com',
    direcciones: [
      { id: 5, tipo: 'Residencia', direccion: 'Carrera 14 # 90-21', ciudad: 'Bogotá D.C.', barrio: 'Chicó', principal: true },
    ],
    telefonos: [
      { id: 5, tipo: 'Móvil', numero: '3001234567', principal: true },
    ],
    infoLaboral: {
      empresa: 'Universidad Nacional',
      cargo: 'Docente Universitario',
      tipoContrato: 'Término Indefinido',
      salarioDevengado: 5100000,
      salarioLiquido: 4600000,
      fechaIngreso: '01/01/2019',
      actividadEconomica: 'Educación',
      formaPago: 'Nómina',
    },
    familiares: [],
    representantes: [],
    documentos: [],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '01/12/2019',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-005',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '11/05/2023', contexto: {} }],
    tipoPersona: 'N',
    estado: 'Activo',
    identificacion: { tipoId: 1, numero: '1122334455' },
    nombres: 'David Felipe',
    primerApellido: 'Silva',
    segundoApellido: 'Ríos',
    sexo: 'M',
    fechaNacimiento: '14/02/1995',
    ciudadNacimiento: 'Bucaramanga',
    paisNacimiento: 'Colombia',
    estadoCivil: 'S',
    estrato: '4',
    ciudadExpedicion: 'Bucaramanga',
    fechaExpedicion: '18/06/2015',
    estadoActual: 'Activo',
    residente: true,
    email: 'david.silva@email.com',
    direcciones: [
      { id: 6, tipo: 'Residencia', direccion: 'Calle 10 # 20-30', ciudad: 'Bucaramanga', principal: true },
    ],
    telefonos: [
      { id: 6, tipo: 'Móvil', numero: '3119876543', principal: true },
    ],
    infoLaboral: {
      empresa: 'Tech Solutions',
      cargo: 'Desarrollador de Software',
      tipoContrato: 'Término Indefinido',
      salarioDevengado: 6500000,
      salarioLiquido: 5800000,
      fechaIngreso: '05/11/2023',
    },
    familiares: [],
    representantes: [],
    documentos: [],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '11/05/2023',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-006',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '08/08/2018', contexto: {} }],
    tipoPersona: 'N',
    estado: 'Inactivo',
    identificacion: { tipoId: 1, numero: '1098765432' },
    nombres: 'Carolina',
    primerApellido: 'Mesa',
    segundoApellido: 'Toro',
    sexo: 'F',
    fechaNacimiento: '30/10/1987',
    ciudadNacimiento: 'Medellín',
    paisNacimiento: 'Colombia',
    estadoCivil: 'C',
    estrato: '3',
    numeroHijos: 2,
    ciudadExpedicion: 'Medellín',
    fechaExpedicion: '05/05/2007',
    estadoActual: 'Inactivo',
    residente: true,
    email: 'carolina.mesa@email.com',
    direcciones: [
      { id: 7, tipo: 'Residencia', direccion: 'Carrera 50 # 50-50', ciudad: 'Medellín', principal: true },
    ],
    telefonos: [
      { id: 7, tipo: 'Móvil', numero: '3201122334', principal: true },
    ],
    infoLaboral: {
      empresa: 'Hospital San Vicente',
      cargo: 'Enfermera Jefe',
      tipoContrato: 'Término Indefinido',
      salarioDevengado: 4800000,
      salarioLiquido: 4300000,
      fechaIngreso: '08/08/2018',
    },
    familiares: [],
    representantes: [],
    documentos: [],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '08/08/2018',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-007',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '02/02/2021', contexto: {} }],
    tipoPersona: 'N',
    estado: 'Activo',
    identificacion: { tipoId: 1, numero: '1144556677' },
    nombres: 'Andrés Mauricio',
    primerApellido: 'Ruiz',
    segundoApellido: undefined,
    sexo: 'M',
    fechaNacimiento: '12/12/1992',
    ciudadNacimiento: 'Palmira',
    paisNacimiento: 'Colombia',
    estadoCivil: 'S',
    estrato: '2',
    ciudadExpedicion: 'Cali',
    fechaExpedicion: '22/03/2012',
    estadoActual: 'Activo',
    residente: true,
    email: 'andres.ruiz@email.com',
    direcciones: [
      { id: 8, tipo: 'Residencia', direccion: 'Vereda La Paz Lote 4', ciudad: 'Palmira', principal: true },
    ],
    telefonos: [
      { id: 8, tipo: 'Móvil', numero: '3151239876', principal: true },
    ],
    infoLaboral: {
      empresa: 'Agropecuaria del Valle',
      cargo: 'Agrónomo',
      tipoContrato: 'Término Indefinido',
      salarioDevengado: 2500000,
      salarioLiquido: 2200000,
      fechaIngreso: '02/02/2021',
    },
    familiares: [],
    representantes: [],
    documentos: [],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '02/02/2021',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-008',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '09/09/2015', contexto: {} }],
    tipoPersona: 'N',
    estado: 'Activo',
    identificacion: { tipoId: 1, numero: '42000111' },
    nombres: 'Patricia',
    primerApellido: 'Jiménez',
    segundoApellido: 'Franco',
    sexo: 'F',
    fechaNacimiento: '25/05/1975',
    ciudadNacimiento: 'Bogotá D.C.',
    paisNacimiento: 'Colombia',
    estadoCivil: 'D',
    estrato: '5',
    numeroHijos: 2,
    ciudadExpedicion: 'Bogotá D.C.',
    fechaExpedicion: '10/08/1995',
    estadoActual: 'Activo',
    residente: true,
    email: 'patricia.jimenez@email.com',
    direcciones: [
      { id: 9, tipo: 'Residencia', direccion: 'Calle 100 # 15-20', ciudad: 'Bogotá D.C.', barrio: 'Chicó Norte', principal: true },
    ],
    telefonos: [
      { id: 9, tipo: 'Móvil', numero: '3109988776', principal: true },
    ],
    infoLaboral: {
      empresa: 'Independiente',
      cargo: 'Comerciante',
      tipoContrato: 'Término Indefinido',
      salarioDevengado: 7000000,
      salarioLiquido: 6200000,
      fechaIngreso: '01/01/2010',
    },
    familiares: [],
    representantes: [],
    documentos: [],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '09/09/2015',
    usuarioCreacion: 'sistema',
  },
  // ── PERSONAS JURÍDICAS ──────────────────────────────────────────────────
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-009',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '15/03/2005', contexto: {} }],
    tipoPersona: 'J',
    estado: 'Activo',
    identificacion: { tipoId: 4, numero: '900123456-7' },
    nombres: 'Fondo de Empleados FECOOMEVA',
    primerApellido: '',
    razonSocial: 'Fondo de Empleados FECOOMEVA',
    sigla: 'FECOOMEVA',
    rut: '900123456',
    fechaActoConstitutivo: '15/03/2005',
    tipoSociedad: 'Asociación',
    numeroActoAdministrativo: 'RES-0452-2005',
    numeroEmpleados: 450,
    objetoSocial: 'Fondo de empleados para la administración de servicios financieros a asociados',
    paisNacionalidad: 'Colombia',
    tipoCliente: 'Asociado',
    segmentoAsignado: 'Corporativo',
    nivelRiesgo: 'Bajo',
    recursosTesoro: false,
    clave: '****',
    claveInterna: '****',
    rolActual: 'Empresa Afiliada',
    ciudadExpedicion: 'Bogotá D.C.',
    fechaExpedicion: '15/03/2005',
    estadoActual: 'Activo',
    residente: true,
    email: 'contacto@fecoomeva.com',
    direcciones: [
      { id: 10, tipo: 'Correspondencia', direccion: 'Carrera 15 # 85-42', ciudad: 'Bogotá D.C.', barrio: 'Chapinero', principal: true },
    ],
    telefonos: [
      { id: 10, tipo: 'Fijo', numero: '6012345678', principal: true },
    ],
    infoLaboral: undefined,
    familiares: [],
    representantes: [
      { id: 1, nombre: 'Alberto', apellidos: 'Vargas', cedula: '79876543', cargo: 'Representante Legal', tipoNombramiento: 'Nombrado', esRepresentanteLegal: true, autorizado: true, limite: 500000000, certificado: 'Sí', fechaNacimiento: '12/04/1975', estado: 'Activo' },
    ],
    sociosMayoritarios: [
      { id: 1, tipoIdentificacion: 'Cédula de Ciudadanía', identificacion: '80123456', nombres: 'Roberto Martínez', fecha: '15/03/2005', paisNacimiento: 'Colombia', estadoCivil: 'Casado', genero: 'M', direccion: 'Carrera 15 # 85-42', correoElectronico: 'roberto.martinez@fecoomeva.com' },
    ],
    documentos: [
      { id: 3, tipo: 'NIT', descripcion: 'NIT', fechaExpedicion: '15/03/2005', estado: 'Vigente', activo: true, esFisico: true, usuarioModifica: 'sistema' },
      { id: 4, tipo: 'Acta', descripcion: 'Acta Constitutiva', fechaExpedicion: '15/03/2005', estado: 'Vigente', activo: true, esFisico: true, usuarioModifica: 'sistema' },
    ],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '15/03/2005',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-010',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '10/15/2020', contexto: {} }],
    tipoPersona: 'J',
    estado: 'Activo',
    identificacion: { tipoId: 4, numero: '800987654-3' },
    nombres: 'Empresa XYZ S.A.S.',
    primerApellido: '',
    razonSocial: 'Empresa XYZ S.A.S.',
    sigla: 'XYZ',
    fechaActoConstitutivo: '20/06/2010',
    tipoSociedad: 'Sociedad por Acciones Simplificada',
    numeroEmpleados: 120,
    objetoSocial: 'Comercio al por mayor y al por menor de productos varios',
    ciudadExpedicion: 'Medellín',
    fechaExpedicion: '20/06/2010',
    estadoActual: 'Activo',
    residente: true,
    email: 'info@empresaxyz.com',
    direcciones: [
      { id: 11, tipo: 'Correspondencia', direccion: 'Carrera 43 # 1-50', ciudad: 'Medellín', principal: true },
    ],
    telefonos: [
      { id: 11, tipo: 'Fijo', numero: '6045551234', principal: true },
    ],
    infoLaboral: undefined,
    familiares: [],
    representantes: [
      { id: 2, nombre: 'Roberto Martínez', cedula: '80123456', cargo: 'Gerente General', tipoNombramiento: 'Elected' },
    ],
    documentos: [
      { id: 5, tipo: 'NIT', descripcion: 'NIT', fechaExpedicion: '20/06/2010', estado: 'Vigente' },
    ],
    datosFATCA: { aplicaFATCA: true, aplicaCRS: false, tin: 'US123456789', vencimientoTin: '31/12/2027' },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '10/15/2020',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-011',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '04/10/2020', contexto: {} }],
    tipoPersona: 'N',
    estado: 'Activo',
    identificacion: { tipoId: 1, numero: '71000222' },
    nombres: 'Jorge Ivan',
    primerApellido: 'Cardona',
    segundoApellido: undefined,
    sexo: 'M',
    fechaNacimiento: '08/08/1980',
    ciudadNacimiento: 'Cali',
    paisNacimiento: 'Colombia',
    estadoCivil: 'C',
    estrato: '2',
    ciudadExpedicion: 'Cali',
    fechaExpedicion: '01/01/2000',
    estadoActual: 'Activo',
    residente: true,
    email: 'jorge.cardona@email.com',
    direcciones: [
      { id: 12, tipo: 'Residencia', direccion: 'Calle 5 # 40-10', ciudad: 'Cali', principal: true },
    ],
    telefonos: [
      { id: 12, tipo: 'Móvil', numero: '3187766554', principal: true },
    ],
    infoLaboral: {
      empresa: 'Transportes Nacionales',
      cargo: 'Conductor',
      tipoContrato: 'Término Indefinido',
      salarioDevengado: 3100000,
      salarioLiquido: 2800000,
      fechaIngreso: '10/04/2020',
    },
    familiares: [],
    representantes: [],
    documentos: [],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '04/10/2020',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-012',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '07/07/2022', contexto: {} }],
    tipoPersona: 'N',
    estado: 'Activo',
    identificacion: { tipoId: 1, numero: '1020304050' },
    nombres: 'Diana Milena',
    primerApellido: 'Rojas',
    segundoApellido: undefined,
    sexo: 'F',
    fechaNacimiento: '17/04/1991',
    ciudadNacimiento: 'Pereira',
    paisNacimiento: 'Colombia',
    estadoCivil: 'S',
    estrato: '3',
    ciudadExpedicion: 'Pereira',
    fechaExpedicion: '12/09/2011',
    estadoActual: 'Activo',
    residente: true,
    email: 'diana.rojas@email.com',
    direcciones: [
      { id: 13, tipo: 'Residencia', direccion: 'Carrera 1 # 1-1', ciudad: 'Pereira', principal: true },
    ],
    telefonos: [
      { id: 13, tipo: 'Móvil', numero: '3005544332', principal: true },
    ],
    infoLaboral: {
      empresa: 'Alcaldía Municipal',
      cargo: 'Abogada',
      tipoContrato: 'Término Indefinido',
      salarioDevengado: 4500000,
      salarioLiquido: 4000000,
      fechaIngreso: '07/07/2022',
      actividadEconomica: 'Servicios',
      formaPago: 'Nómina',
    },
    familiares: [],
    representantes: [],
    documentos: [],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '07/07/2022',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-013',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '03/20/2021', contexto: {} }],
    tipoPersona: 'J',
    estado: 'Activo',
    identificacion: { tipoId: 4, numero: '900555123-8' },
    nombres: 'Constructora ABC Ltda.',
    primerApellido: '',
    razonSocial: 'Constructora ABC Ltda.',
    sigla: 'ABC',
    fechaActoConstitutivo: '10/03/2008',
    tipoSociedad: 'Sociedad Limitada',
    numeroEmpleados: 85,
    objetoSocial: 'Construcción de edificaciones y obras civiles',
    ciudadExpedicion: 'Cali',
    fechaExpedicion: '10/03/2008',
    estadoActual: 'Activo',
    residente: true,
    email: 'info@constructoraabc.com',
    direcciones: [
      { id: 14, tipo: 'Correspondencia', direccion: 'Avenida 3N # 10-20', ciudad: 'Cali', principal: true },
    ],
    telefonos: [
      { id: 14, tipo: 'Fijo', numero: '6023334444', principal: true },
    ],
    infoLaboral: undefined,
    familiares: [],
    representantes: [
      { id: 3, nombre: 'Pedro López', cedula: '10987654', cargo: 'Representante Legal', tipoNombramiento: 'Elected' },
    ],
    documentos: [
      { id: 6, tipo: 'NIT', descripcion: 'NIT', fechaExpedicion: '10/03/2008', estado: 'Vigente' },
    ],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '03/20/2021',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-014',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '06/06/2021', contexto: {} }],
    tipoPersona: 'N',
    estado: 'Activo',
    identificacion: { tipoId: 1, numero: '1030507090' },
    nombres: 'Julián David',
    primerApellido: 'Castro',
    segundoApellido: undefined,
    sexo: 'M',
    fechaNacimiento: '21/01/1989',
    ciudadNacimiento: 'Bogotá D.C.',
    paisNacimiento: 'Colombia',
    estadoCivil: 'S',
    estrato: '4',
    ciudadExpedicion: 'Bogotá D.C.',
    fechaExpedicion: '15/05/2009',
    estadoActual: 'Activo',
    residente: true,
    email: 'julian.castro@email.com',
    direcciones: [
      { id: 15, tipo: 'Residencia', direccion: 'Carrera 7 # 70-80', ciudad: 'Bogotá D.C.', barrio: 'Kennedy', principal: true },
    ],
    telefonos: [
      { id: 15, tipo: 'Móvil', numero: '3123344556', principal: true },
    ],
    infoLaboral: {
      empresa: 'Bancolombia',
      cargo: 'Analista Financiero',
      tipoContrato: 'Término Indefinido',
      salarioDevengado: 5800000,
      salarioLiquido: 5200000,
      fechaIngreso: '06/06/2021',
      actividadEconomica: 'Servicios',
      formaPago: 'Nómina',
    },
    familiares: [],
    representantes: [],
    documentos: [],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '06/06/2021',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-015',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '03/03/2023', contexto: {} }],
    tipoPersona: 'N',
    estado: 'Activo',
    identificacion: { tipoId: 1, numero: '1150607080' },
    nombres: 'Sofía Alejandra',
    primerApellido: 'Vargas',
    segundoApellido: undefined,
    sexo: 'F',
    fechaNacimiento: '03/11/1996',
    ciudadNacimiento: 'Manizales',
    paisNacimiento: 'Colombia',
    estadoCivil: 'S',
    estrato: '3',
    ciudadExpedicion: 'Manizales',
    fechaExpedicion: '20/07/2016',
    estadoActual: 'Activo',
    residente: true,
    email: 'sofia.vargas@email.com',
    direcciones: [
      { id: 16, tipo: 'Residencia', direccion: 'Calle 20 # 20-20', ciudad: 'Manizales', principal: true },
    ],
    telefonos: [
      { id: 16, tipo: 'Móvil', numero: '3167788990', principal: true },
    ],
    infoLaboral: {
      empresa: 'Cámara de Comercio',
      cargo: 'Administradora de Empresas',
      tipoContrato: 'Término Indefinido',
      salarioDevengado: 3900000,
      salarioLiquido: 3500000,
      fechaIngreso: '03/03/2023',
    },
    familiares: [],
    representantes: [],
    documentos: [],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '03/03/2023',
    usuarioCreacion: 'sistema',
  },
  {
    id: nextId++,
    ...personaArraysBase(),
    codigoAsociado: 'ASOC-016',
    roles: [{ id: 1, tipoRol: 'Asociado', estado: 'Activo', fechaInicio: '04/10/2020', contexto: {} }],
    tipoPersona: 'J',
    estado: 'Inactivo',
    identificacion: { tipoId: 4, numero: '800888999-1' },
    nombres: 'Transportes Nacionales S.A.',
    primerApellido: '',
    razonSocial: 'Transportes Nacionales S.A.',
    sigla: 'TRANSNAC',
    fechaActoConstitutivo: '05/08/2000',
    tipoSociedad: 'Sociedad Anónima',
    numeroEmpleados: 200,
    objetoSocial: 'Transporte terrestre de carga y pasajeros a nivel nacional',
    ciudadExpedicion: 'Cali',
    fechaExpedicion: '05/08/2000',
    estadoActual: 'Inactivo',
    residente: true,
    email: 'info@transnac.com',
    direcciones: [
      { id: 17, tipo: 'Correspondencia', direccion: 'Carrera 20 # 5-100', ciudad: 'Cali', principal: true },
    ],
    telefonos: [
      { id: 17, tipo: 'Fijo', numero: '6024445555', principal: true },
    ],
    infoLaboral: undefined,
    familiares: [],
    representantes: [
      { id: 4, nombre: 'Fernando García', cedula: '71234567', cargo: 'Representante Legal', tipoNombramiento: 'Elected' },
    ],
    documentos: [],
    datosFATCA: { aplicaFATCA: false, aplicaCRS: false },
    datosPEP: { esPEP: false, relacionesPEP: [] },
    fechaCreacion: '04/10/2020',
    usuarioCreacion: 'sistema',
  },
]

// Las funciones de consulta/mutación reactivas (buscar, filtrar, contar, crear,
// actualizar, cambiar estado) viven en `@/store/personasStore.ts` — este archivo
// sólo aporta la semilla de datos (`PERSONAS_MOCK`), los catálogos y `crearPersonaVacia`.
