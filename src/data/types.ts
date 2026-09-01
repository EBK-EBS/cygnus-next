/** Modelo de dominio Cygnus Next — tipos canónicos de la aplicación. */

export type EstadoAsociado = 'Activo' | 'Inactivo'
export type EstadoCredito = 'AL DIA' | 'VIGENTE' | 'MORA' | 'DESEMBOLSAR'
export type EstadoAporte = 'ACTIVO' | 'INACTIVO'
export type EstadoDevolucion = 'PROCESADA' | 'PENDIENTE' | 'RECHAZADA'

export interface Asociado {
  id: number
  nombre: string
  cedula: string
  empresa: string
  clienteDesde: string
  estado: EstadoAsociado
  sueldo: number
  ciudad: string
  direccion: string
  telefono: string
  email: string
  fechaNacimiento: string
  profesion: string
  score: number
  cupoRotativo: number
}

export interface Credito {
  radicacion: string
  linea: string
  saldo: number
  cuota: number
  plazo: number
  estado: EstadoCredito
  asociadoId: number
  montoAprobado: number
  tasa: number
  formaPago: string
  periodicidad: string
  vencimiento: string
}

export interface Aporte {
  numero: string
  tipo: string
  saldo: number
  estado: EstadoAporte
  asociadoId: number
}

export interface Deposito {
  numero: string
  tipo: string
  saldo: number
  tasa: string
  vencimiento: string
  asociadoId: number
}

export interface Devolucion {
  concepto: string
  fecha: string
  valor: number
  estado: EstadoDevolucion
  asociadoId: number
}

export interface Empresa {
  nit: string
  razonSocial: string
  direccion: string
  ciudad: string
  telefono: string
  correo: string
  sector: string
  representanteLegal: string
  numEmpleados: number
}

export interface ListaNomina {
  fecha: string
  num: string
  tipo: string
  total: number
  asoc: number
  est: string
}

export interface Comprobante {
  fecha: string
  num: string
  concepto: string
  debito: number
  credito: number
}

export interface Giro {
  fecha: string
  concepto: string
  valor: number
  dest: string
  est: string
}

export interface Novedad {
  fecha: string
  prod: string
  campo: string
  ant: string
  nue: string
  usr: string
}

/** Asociado enriquecido con agregaciones de sus productos (flatten del original). */
export interface AsociadoEnriquecido extends Asociado {
  totalDeuda: number
  lineasCredito: string
  estadosCredito: string
  totalAportes: number
  tiposAportes: string
  totalDepositos: number
  tiposDepositos: string
  totalDevoluciones: number
}

/** Métricas del score financiero derivadas del score numérico. */
export type SaludFinanciera = 'Excelente' | 'Regular' | 'Riesgo'

export function saludFinanciera(score: number): SaludFinanciera {
  if (score >= 80) return 'Excelente'
  if (score >= 60) return 'Regular'
  return 'Riesgo'
}

// ─────────────────────────────────────────────────────────────────────────────
// MÓDULO DE PERSONAS — Tipos del dominio Persona Única
// ─────────────────────────────────────────────────────────────────────────────

/** Tipo de persona: Natural o Jurídica. */
export type TipoPersona = 'N' | 'J'

/** Estado de una persona en el sistema. */
export type EstadoPersona = 'Activo' | 'Inactivo'

/** Tipo de catálogo simple: código + descripción. */
export interface CatalogoItem {
  codigo: number | string
  descripcion: string
}

/** Identificación de una persona (tipo + número). */
export interface Identificacion {
  tipoId: number
  numero: string
}

/** Dirección física o electrónica de una persona (pestaña Dirección). */
export interface Direccion {
  id: number
  tipo: string
  direccion: string
  ciudad: string
  barrio?: string
  codigoPostal?: string
  principal: boolean
  notificacionSINPE?: boolean
  tipoInmueble?: string
  pagaArriendo?: boolean
  valorArriendo?: number
  monedaArriendo?: string
  telefonoArrendador?: string
  desdeArriendo?: string
  hastaArriendo?: string
  arrendador?: string
  envioCorrespondencia?: boolean
}

/** Dirección electrónica (correo) de la pestaña Dirección. */
export interface DireccionElectronica {
  id: number
  tipo: string
  valor: string
  dominio?: string
  principal: boolean
  notificacionPago?: boolean
}

/** Teléfono de contacto. */
export interface Telefono {
  id: number
  tipo: string
  numero: string
  principal: boolean
  extension?: string
  ciudad?: string
  notificacionPagoElectronico?: boolean
}

/** Representante legal de persona jurídica (pestaña Representante/Firmas). */
export interface RepresentanteLegal {
  id: number
  nombre: string
  apellidos?: string
  cedula: string
  cargo: string
  tipoNombramiento: string
  esRepresentanteLegal?: boolean
  autorizado?: boolean
  limite?: number
  certificado?: string
  fechaNacimiento?: string
  estado?: string
}

/** Socio mayoritario de una persona jurídica (pestaña Representante/Firmas). */
export interface SocioMayoritario {
  id: number
  tipoIdentificacion?: string
  identificacion: string
  nombres: string
  fecha?: string
  paisNacimiento?: string
  estadoCivil?: string
  genero?: string
  direccion?: string
  correoElectronico?: string
}

/** Información laboral de una persona (pestaña Laboral). */
export interface InfoLaboral {
  empresa?: string
  telefonoEmpresa?: string
  pagaduria?: string
  institucionDondeLabora?: string
  formaCobro?: string
  periodicidadCobro?: string
  dependencia?: string
  cargo?: string
  tipoContrato?: string
  salarioDevengado?: number
  salarioLiquido?: number
  salarioNetoCargasSociales?: number
  salarioEmbargado?: number
  fechaIngreso?: string
  actividadEconomica?: string
  sector?: string
  vinculoLaboral?: string
  formaPago?: string
  otrosIngresos?: number
  descripcionOtrosIngresos?: string
  puestoNomina?: string
}

/** Información familiar/beneficiario (pestaña Familiar). */
export interface Familiar {
  id: number
  nombre: string
  apellidos?: string
  tipoIdentificacion?: string
  parentesco: string
  tipoDocumento?: string
  numeroDocumento?: string
  fechaNacimiento?: string
  esBeneficiario?: boolean
  tipoBeneficiario?: string
  porcentajeBeneficio?: number
  sexo?: string
}

/** Documento asociado a una persona (pestaña Documentos). */
export interface DocumentoPersona {
  id: number
  tipo: string
  descripcion: string
  fechaExpedicion?: string
  fechaVigencia?: string
  estado: string
  ruta?: string
  activo?: boolean
  esFisico?: boolean
  usuarioModifica?: string
}

/** Datos FATCA/CRS de una persona (pestaña FATCA/CRS). */
export interface DatosFATCA {
  aplicaFATCA: boolean
  aplicaCRS: boolean
  saldoPromedioAhorro?: number
  tin?: string
  vencimientoTin?: string
  ssn?: string
  vencimientoSsn?: string
  greenCard?: string
  vencimientoGreenCard?: string
  ein?: string
  vencimientoEin?: string
  giin?: string
  motivoNoTin?: string
  paisNacionalidadExtranjero?: string
  ciudadExtranjero?: string
  segundaNacionalidadExtranjero?: string
}

/** Relación de una persona con un PEP (tabla de la pestaña LEYES LA/FT). */
export interface RelacionPEP {
  id: number
  nombres: string
  identificacion?: string
  parentesco?: string
  entidad?: string
  cargo?: string
}

/** Datos PEP (Persona Expuesta Políticamente), pestaña LEYES LA/FT. */
export interface DatosPEP {
  esPEP: boolean
  relacionPEP?: string
  afinidadConsanguinidad?: boolean
  altoRiesgo?: boolean
  presentaRiesgo?: boolean
  nombrePEP?: string
  cargoPEP?: string
  tipoRelacionPEP?: string
  monedaExtranjero?: boolean
  recursosPublicos?: boolean
  cargoOrganizacional?: boolean
  administradorLegal?: boolean
  relacionesPEP: RelacionPEP[]
}

/** Vinculación con cargo político o función pública (LEYES LA/FT). */
export interface VinculacionPolitica {
  id: number
  cual: string
  fechaVinculacion?: string
  fechaDesvinculacion?: string
  actualmente?: boolean
}

/** Cuenta en moneda extranjera declarada (LEYES LA/FT). */
export interface CuentaMonedaExtranjera {
  id: number
  numeroCuenta: string
  banco?: string
  moneda?: string
  pais?: string
  ciudad?: string
}

/** Rango transaccional promedio declarado (LEYES LA/FT). */
export interface PromedioTransaccional {
  id: number
  moneda: string
  rango: string
}

/** Datos de cumplimiento LA/FT (Lavado de Activos y Financiación del Terrorismo). */
export interface DatosLAFT {
  realizaCanjesDineros?: boolean
  detalleActividad?: string
  propositoAfiliacion: string[]
  otroPropositoAfiliacion?: string
  origenFondos: string[]
  otroOrigenFondos?: string
  promediosTransaccionales: PromedioTransaccional[]
  realizaOperacionesExterior?: boolean
  manejaRecursosPublicos?: boolean
  cualesRecursos?: string
  poseeCuentasMonedaExtranjera?: boolean
  cuentasMonedaExtranjera: CuentaMonedaExtranjera[]
  desempenaCargoPolitico?: boolean
  cargosPoliticos: VinculacionPolitica[]
  desempenaFuncionesPublicasOtroPais?: boolean
  funcionesPublicasOtroPais: VinculacionPolitica[]
}

/** Fotos, firma y huella de la persona (pestaña Imágenes). */
export interface ImagenesPersona {
  tipoFoto?: string
  tipoFirma?: string
  observaciones?: string
  actualizarHuella?: boolean
  grabarHuella?: boolean
}

/** Miembro del consejo de administración de la cooperativa estudiantil. */
export interface MiembroConsejo {
  id: number
  codigo?: string
  identificacion: string
  nombres: string
  apellidos?: string
  puesto?: string
  telefono?: string
}

/** Profesor con recargo asociado a la cooperativa estudiantil. */
export interface ProfesorRecargo {
  codigo?: string
  identificacion?: string
  nombres?: string
  primerApellido?: string
  segundoApellido?: string
  fechaNacimiento?: string
  estadoCivil?: string
  paisOrigen?: string
  ciudadNacimiento?: string
  tipoTelefono?: string
  numero?: string
  correoElectronico?: string
  profesion?: string
}

/** Datos de la pestaña Coop. Estudiantil. */
export interface CoopEstudiantilInfo {
  cantidadAsociados?: number
}

/** Curso registrado en la pestaña Cooperativa. */
export interface CursoCooperativo {
  id: number
  fecha: string
  descripcion: string
  entidad?: string
}

/** Capacitación registrada en la pestaña Cooperativa. */
export interface Capacitacion {
  id: number
  codigoActividad?: string
  nombreActividad: string
  duracionHoras?: number
  fechaInicial?: string
  fechaFinal?: string
}

/** Impuesto aplicable a la persona (pestaña Varios 1). */
export interface ImpuestoPersona {
  id: number
  nombre: string
  activo: boolean
}

/** Promotor de servicio asignado a la persona (pestaña Varios 2). */
export interface PromotorServicio {
  codigo?: string
  identificacion?: string
  tipo?: string
  nombre?: string
  apellido?: string
}

/** Cuenta bancaria de la persona (pestaña Varios 2). */
export interface CuentaBancaria {
  id: number
  codigoEntidad?: string
  entidad?: string
  cuenta: string
  digitoChequeo?: string
  tipoCuenta?: string
  codigoSucursal?: string
  sucursal?: string
}

/** Cuenta relacionada de un tercero (pestaña Varios 2). */
export interface CuentaRelacionada {
  id: number
  identificacion: string
  nombres?: string
  apellidos?: string
  entidad?: string
  cuentaCliente?: string
  moneda?: string
}

/** Producto de la cooperativa que la persona desea utilizar (pestaña Varios 2). */
export interface ProductoCooperativaDeseado {
  id: number
  codigo?: string
  descripcion: string
  seleccionado: boolean
}

/** Ítem de información adicional configurable (pestaña Adicional). */
export interface InfoAdicionalItem {
  id: number
  codigo?: string
  descripcion: string
  valor?: string
  descripcionValores?: string
}

/** Referencia comercial o personal (pestaña Adicional). */
export interface ReferenciaComercial {
  id: number
  nombre: string
  telefono?: string
}

/** Persona relacionada con la cooperativa (pestaña Adicional). */
export interface PersonaRelacionadaCooperativa {
  id: number
  codigo?: string
  identificacion?: string
  nombre: string
  vinculo?: string
}

/** Información académica general de la persona (pestaña Info Académica). */
export interface InfoAcademicaPersona {
  universidad?: string
  facultad?: string
  tipoAlumno?: string
  nivelAcademico?: string
  estadoAcademico?: string
  carrera?: string
  sede?: string
  tipoSangre?: string
  rh?: string
  jornada?: string
  sisben?: boolean
  estrato?: string
}

/** Información del período académico vigente (pestaña Info Académica). */
export interface PeriodoAcademico {
  fechaOrdinaria?: string
  valorReciboOrdinario?: number
  fechaExtraordinaria?: string
  valorReciboExtraordinario?: number
  fechaExtemporanea?: string
  valorReciboExtemporaneo?: number
  periodo?: string
  numeroRecibo?: string
  estadoRecibo?: string
  valorAbono?: number
  valorCancelado?: number
}

/** Estado de un Rol — independiente del estado global de la Persona (PT-PER-001 PER-009/PER-041). */
export type EstadoRol = 'Activo' | 'Suspendido' | 'Terminado'

/**
 * Vínculo Persona-Rol (PT-PER-001 §6): una Persona puede tener múltiples roles simultáneos,
 * cada uno con su propia vigencia y estado, sin que terminar un rol afecte a la Persona ni a
 * sus demás roles. `tipoRol` referencia el catálogo abierto `TIPOS_ROL` (no es un enum cerrado,
 * igual que en Legacy `TIPOS_ROL`/`ROLES`). `contexto` guarda únicamente los atributos propios
 * capturados al asignar el rol — no reutiliza ni migra los campos existentes de Persona.
 */
export interface PersonaRol {
  id: number
  tipoRol: string
  estado: EstadoRol
  fechaInicio: string
  fechaFin?: string
  causal?: string
  contexto: Record<string, string>
}

/** Persona — entidad base del módulo Persona Única. */
export interface Persona {
  id: number
  codigoAsociado?: string
  tipoPersona: TipoPersona
  estado: EstadoPersona
  identificacion: Identificacion
  // Roles (PT-PER-001 §6) — Persona ≠ Rol; ver PersonaRol.
  roles: PersonaRol[]
  // Datos comunes
  nombres: string
  primerApellido: string
  segundoApellido?: string
  // Natural
  sexo?: string
  fechaNacimiento?: string
  ciudadNacimiento?: string
  paisNacimiento?: string
  paisSegundaNacionalidad?: string
  estrato?: string
  estadoCivil?: string
  numeroHijos?: number
  nivelEstudio?: string
  mujerFamiliar?: number
  operacionesExternas?: number
  // Jurídica
  razonSocial?: string
  sigla?: string
  rut?: string
  fechaActoConstitutivo?: string
  tipoSociedad?: string
  numeroActoAdministrativo?: string
  numeroEmpleados?: number
  objetoSocial?: string
  paisNacionalidad?: string
  tipoCliente?: string
  segundaNacionalidad?: string
  segmentoAsignado?: string
  nivelRiesgo?: string
  recursosTesoro?: boolean
  clave?: string
  claveInterna?: string
  rolActual?: string
  // Coop. Estudiantil (Natural)
  coopEstudiantil?: CoopEstudiantilInfo
  miembrosConsejo: MiembroConsejo[]
  profesorRecargo?: ProfesorRecargo
  // Comunes
  ciudadExpedicion?: string
  fechaExpedicion?: string
  estadoActual?: string
  digitoChequeo?: string
  residente?: boolean
  // Contacto
  direcciones: Direccion[]
  direccionesElectronicas: DireccionElectronica[]
  telefonos: Telefono[]
  email?: string
  // Laboral
  infoLaboral?: InfoLaboral
  // Familia
  familiares: Familiar[]
  // Representantes (Jurídica)
  representantes: RepresentanteLegal[]
  sociosMayoritarios: SocioMayoritario[]
  // Imágenes
  imagenes?: ImagenesPersona
  // Cooperativa (cursos/capacitaciones)
  cursosCooperativa: CursoCooperativo[]
  capacitaciones: Capacitacion[]
  // Varios 1
  profesion?: string
  aficion?: string
  nickname?: string
  tratamiento?: string
  vecesCodeudor?: number
  contribuyente?: string
  diaPago?: string
  clienteDesde?: string
  fechaRegistro?: string
  oficina?: string
  fechaAfiliacion?: string
  impuestos: ImpuestoPersona[]
  // Varios 2
  promotorServicio?: PromotorServicio
  cuentasBancarias: CuentaBancaria[]
  cuentasRelacionadas: CuentaRelacionada[]
  productosDeseados: ProductoCooperativaDeseado[]
  // Adicional
  infoAdicional: InfoAdicionalItem[]
  referenciasComerciales: ReferenciaComercial[]
  otrasEntidadesServiciosFinancieros?: string
  observacionesAdicional?: string
  personasRelacionadas: PersonaRelacionadaCooperativa[]
  // Info Académica
  infoAcademica?: InfoAcademicaPersona
  periodoAcademico?: PeriodoAcademico
  // Documentos
  documentos: DocumentoPersona[]
  // Cumplimiento
  datosFATCA?: DatosFATCA
  datosPEP?: DatosPEP
  datosLAFT?: DatosLAFT
  // Auditoría
  fechaCreacion: string
  fechaModificacion?: string
  usuarioCreacion: string
  usuarioModificacion?: string
}