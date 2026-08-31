// Tipos de dominio para el módulo de Personas
export type TipoPersona = 'NATURAL' | 'JURIDICA';
export type EstadoPersona = 'ACTIVO' | 'INACTIVO' | 'PENDIENTE';

export interface Identificacion {
  id: number;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  fechaExpedicion?: string;
  fechaVencimiento?: string;
  lugarExpedicion?: string;
  esPrincipal: boolean;
  estado: string;
}

export interface PersonaBase {
  id: number;
  tipoPersona: TipoPersona;
  estado: EstadoPersona;
  fechaRegistro: string;
  fechaActualizacion?: string;
  identificaciones: Identificacion[];
}

export interface PersonaNatural extends PersonaBase {
  tipoPersona: 'NATURAL';
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  fechaNacimiento?: string;
  genero?: string;
  estadoCivil?: string;
  telefonoMovil?: string;
  correoElectronico?: string;
  direccion?: string;
}

export interface PersonaJuridica extends PersonaBase {
  tipoPersona: 'JURIDICA';
  razonSocial: string;
  nombreComercial?: string;
  fechaConstitucion?: string;
  tipoSociedad?: string;
  actividadEconomica?: string;
  telefonoContacto?: string;
  correoContacto?: string;
  direccionNotificacion?: string;
}

export type Persona = PersonaNatural | PersonaJuridica;

export interface BusquedaPersona {
  termino?: string;
  tipoPersona?: TipoPersona | 'TODOS';
}