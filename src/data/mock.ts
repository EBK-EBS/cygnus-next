import type {
  Asociado,
  AsociadoEnriquecido,
  Aporte,
  Comprobante,
  Credito,
  Deposito,
  Devolucion,
  Empresa,
  Giro,
  ListaNomina,
  Novedad,
} from './types'

/** Entero aleatorio en [min, max] — utilidad del generador mock. */
function rnd(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const LINEAS_CREDITO = [
  'Libre Inversión',
  'Vehículo',
  'Vivienda',
  'Educación',
  'Crédito Capital Social',
  'Fecooagil',
]
const ESTADOS_CREDITO = ['AL DIA', 'VIGENTE', 'MORA', 'DESEMBOLSAR'] as const
const FORMAS_PAGO = ['Nómina', 'Caja', 'Débito Automático']
const PERIODICIDADES = ['Mensual', 'Quincenal', 'Mensual Comercial']
const TIPOS_APORTE = [
  'Aporte Social',
  'Ahorro Permanente',
  'Ahorro Voluntario',
  'Ahorro Navideño',
]
const TIPOS_DEPOSITO = [
  'CDT 90 días',
  'CDT 180 días',
  'CDT 360 días',
  'Depósito a la Vista',
]
const CONCEPTOS_DEVOLUCION = [
  'Excedente Aportes',
  'Devolución Intereses',
  'Reintegro Seguro',
  'Saldo a Favor',
]

export const ASOCIADOS: Asociado[] = [
  { id: 1, nombre: 'Velez Macias Hanner Alberto', cedula: '1130682153', empresa: 'FECOOMEVA - Fondo Empleados', clienteDesde: '04/28/2022', estado: 'Activo', sueldo: 3430000, ciudad: 'Bogotá', direccion: 'Calle 45 # 12-34', telefono: '3104567890', email: 'hanner.velez@email.com', fechaNacimiento: '15/03/1985', profesion: 'Ingeniero Industrial', score: 65, cupoRotativo: 5000000 },
  { id: 2, nombre: 'Rodriguez Perez Maria Elena', cedula: '5234567890', empresa: 'Empresa XYZ S.A.S.', clienteDesde: '10/15/2020', estado: 'Activo', sueldo: 4200000, ciudad: 'Medellín', direccion: 'Carrera 65 # 32-11', telefono: '3209876543', email: 'maria.rodriguez@email.com', fechaNacimiento: '22/07/1990', profesion: 'Contadora Pública', score: 82, cupoRotativo: 8000000 },
  { id: 3, nombre: 'Gomez Sanchez Carlos Andres', cedula: '1012345678', empresa: 'Constructora ABC Ltda.', clienteDesde: '03/20/2021', estado: 'Activo', sueldo: 2800000, ciudad: 'Cali', direccion: 'Avenida 4N # 8-90', telefono: '3156789012', email: 'carlos.gomez@email.com', fechaNacimiento: '10/11/1988', profesion: 'Arquitecto', score: 71, cupoRotativo: 3500000 },
  { id: 4, nombre: 'Ortiz Gomez Laura Cristina', cedula: '1056781234', empresa: 'Universidad Nacional', clienteDesde: '01/12/2019', estado: 'Activo', sueldo: 5100000, ciudad: 'Bogotá', direccion: 'Carrera 14 # 90-21', telefono: '3001234567', email: 'laura.ortiz@email.com', fechaNacimiento: '05/09/1982', profesion: 'Docente Universitario', score: 88, cupoRotativo: 10000000 },
  { id: 5, nombre: 'Silva Rios David Felipe', cedula: '1122334455', empresa: 'Tech Solutions', clienteDesde: '11/05/2023', estado: 'Activo', sueldo: 6500000, ciudad: 'Bucaramanga', direccion: 'Calle 10 # 20-30', telefono: '3119876543', email: 'david.silva@email.com', fechaNacimiento: '14/02/1995', profesion: 'Desarrollador de Software', score: 75, cupoRotativo: 4500000 },
  { id: 6, nombre: 'Mesa Toro Carolina', cedula: '1098765432', empresa: 'Hospital San Vicente', clienteDesde: '08/08/2018', estado: 'Inactivo', sueldo: 4800000, ciudad: 'Medellín', direccion: 'Carrera 50 # 50-50', telefono: '3201122334', email: 'carolina.mesa@email.com', fechaNacimiento: '30/10/1987', profesion: 'Enfermera Jefe', score: 55, cupoRotativo: 0 },
  { id: 7, nombre: 'Ruiz Andres Mauricio', cedula: '1144556677', empresa: 'Agropecuaria del Valle', clienteDesde: '02/02/2021', estado: 'Activo', sueldo: 2500000, ciudad: 'Palmira', direccion: 'Vereda La Paz Lote 4', telefono: '3151239876', email: 'andres.ruiz@email.com', fechaNacimiento: '12/12/1992', profesion: 'Agrónomo', score: 68, cupoRotativo: 2000000 },
  { id: 8, nombre: 'Jimenez Franco Patricia', cedula: '42000111', empresa: 'Independiente', clienteDesde: '09/09/2015', estado: 'Activo', sueldo: 7000000, ciudad: 'Bogotá', direccion: 'Calle 100 # 15-20', telefono: '3109988776', email: 'patricia.jimenez@email.com', fechaNacimiento: '25/05/1975', profesion: 'Comerciante', score: 92, cupoRotativo: 15000000 },
  { id: 9, nombre: 'Cardona Jorge Ivan', cedula: '71000222', empresa: 'Transportes Nacionales', clienteDesde: '04/10/2020', estado: 'Activo', sueldo: 3100000, ciudad: 'Cali', direccion: 'Calle 5 # 40-10', telefono: '3187766554', email: 'jorge.cardona@email.com', fechaNacimiento: '08/08/1980', profesion: 'Conductor', score: 62, cupoRotativo: 2500000 },
  { id: 10, nombre: 'Rojas Diana Milena', cedula: '1020304050', empresa: 'Alcaldía Municipal', clienteDesde: '07/07/2022', estado: 'Activo', sueldo: 4500000, ciudad: 'Pereira', direccion: 'Carrera 1 # 1-1', telefono: '3005544332', email: 'diana.rojas@email.com', fechaNacimiento: '17/04/1991', profesion: 'Abogada', score: 79, cupoRotativo: 6000000 },
  { id: 11, nombre: 'Castro Julian David', cedula: '1030507090', empresa: 'Bancolombia', clienteDesde: '06/06/2021', estado: 'Activo', sueldo: 5800000, ciudad: 'Bogotá', direccion: 'Carrera 7 # 70-80', telefono: '3123344556', email: 'julian.castro@email.com', fechaNacimiento: '21/01/1989', profesion: 'Analista Financiero', score: 85, cupoRotativo: 8500000 },
  { id: 12, nombre: 'Vargas Sofia Alejandra', cedula: '1150607080', empresa: 'Cámara de Comercio', clienteDesde: '03/03/2023', estado: 'Activo', sueldo: 3900000, ciudad: 'Manizales', direccion: 'Calle 20 # 20-20', telefono: '3167788990', email: 'sofia.vargas@email.com', fechaNacimiento: '03/11/1996', profesion: 'Administradora de Empresas', score: 73, cupoRotativo: 3500000 },
]

const CREDITOS: Credito[] = []
const APORTES: Aporte[] = []
const DEPOSITOS: Deposito[] = []
const DEVOLUCIONES: Devolucion[] = []

ASOCIADOS.forEach((a) => {
  const nCred = rnd(2, 5)
  for (let i = 0; i < nCred; i++) {
    CREDITOS.push({
      radicacion: '10' + rnd(10000, 99999),
      linea: LINEAS_CREDITO[rnd(0, LINEAS_CREDITO.length - 1)],
      saldo: rnd(1000000, 50000000),
      cuota: rnd(50000, 1000000),
      plazo: rnd(12, 72),
      estado: ESTADOS_CREDITO[rnd(0, ESTADOS_CREDITO.length - 1)],
      asociadoId: a.id,
      montoAprobado: rnd(5000000, 60000000),
      tasa: +(rnd(10, 25) / 10).toFixed(2),
      formaPago: FORMAS_PAGO[rnd(0, FORMAS_PAGO.length - 1)],
      periodicidad: PERIODICIDADES[rnd(0, PERIODICIDADES.length - 1)],
      vencimiento: `15/12/202${rnd(6, 9)}`,
    })
  }
  const nApo = rnd(2, 5)
  for (let i = 0; i < nApo; i++) {
    APORTES.push({
      numero: 'AP-' + rnd(10000, 99999),
      tipo: TIPOS_APORTE[rnd(0, TIPOS_APORTE.length - 1)],
      saldo: rnd(500000, 15000000),
      estado: rnd(0, 1) === 0 ? 'ACTIVO' : 'INACTIVO',
      asociadoId: a.id,
    })
  }
  const nDep = rnd(2, 5)
  for (let i = 0; i < nDep; i++) {
    DEPOSITOS.push({
      numero: 'CDT-' + rnd(10000, 99999),
      tipo: TIPOS_DEPOSITO[rnd(0, TIPOS_DEPOSITO.length - 1)],
      saldo: rnd(5000000, 50000000),
      tasa: (rnd(50, 120) / 10).toFixed(1) + '%',
      vencimiento: `20/0${rnd(1, 9)}/202${rnd(6, 8)}`,
      asociadoId: a.id,
    })
  }
  const nDev = rnd(2, 5)
  for (let i = 0; i < nDev; i++) {
    DEVOLUCIONES.push({
      concepto: CONCEPTOS_DEVOLUCION[rnd(0, CONCEPTOS_DEVOLUCION.length - 1)],
      fecha: `0${rnd(1, 9)}/0${rnd(1, 9)}/202${rnd(4, 6)}`,
      valor: rnd(100000, 3000000),
      estado: ['PROCESADA', 'PENDIENTE', 'RECHAZADA'][rnd(0, 2)] as Devolucion['estado'],
      asociadoId: a.id,
    })
  }
})

export const EMPRESA: Empresa = {
  nit: '900123456-7',
  razonSocial: 'Fondo de Empleados FECOOMEVA',
  direccion: 'Carrera 15 # 85-42',
  ciudad: 'Bogotá D.C.',
  telefono: '(601) 2345678',
  correo: 'contacto@fecoomeva.com',
  sector: 'Financiero',
  representanteLegal: 'Alberto Vargas',
  numEmpleados: 450,
}

export const LISTAS: ListaNomina[] = [
  { fecha: '25/08/2026', num: 'L-0892', tipo: 'Nómina', total: 125000000, asoc: 872150, est: 'Procesada' },
  { fecha: '10/08/2026', num: 'L-0885', tipo: 'Masivo', total: 450000000, asoc: 914970, est: 'Procesada' },
]

export const COMPROBANTES: Comprobante[] = [
  { fecha: '25/08/2026', num: 'C-44512', concepto: 'Abono Compra Cartera', debito: 87215, credito: 0 },
  { fecha: '10/08/2026', num: 'C-44498', concepto: 'Abono Fecooagil', debito: 423773, credito: 0 },
]

export const GIROS: Giro[] = [
  { fecha: '25/08/2026', concepto: 'Excedente Cupo', valor: 2500000, dest: 'Hanner Velez', est: 'Pendiente' },
]

export const NOVEDADES: Novedad[] = [
  { fecha: '25/08/2026 10:30', prod: 'Crédito #1026...', campo: 'Saldo', ant: '$4.06M', nue: '$3.97M', usr: 'Sistema' },
  { fecha: '20/08/2026', prod: 'Datos', campo: 'Teléfono', ant: '310...', nue: '310456...', usr: 'Marlon' },
]

/** Cruza cada asociado con sus productos y calcula agregaciones (flatten). */
export function getEnrichedAssociates(): AsociadoEnriquecido[] {
  return ASOCIADOS.map((a) => {
    const c = CREDITOS.filter((x) => x.asociadoId === a.id)
    const ap = APORTES.filter((x) => x.asociadoId === a.id)
    const dp = DEPOSITOS.filter((x) => x.asociadoId === a.id)
    const dv = DEVOLUCIONES.filter((x) => x.asociadoId === a.id)
    return {
      ...a,
      totalDeuda: c.reduce((s, x) => s + x.saldo, 0),
      lineasCredito: c.map((x) => x.linea).join(', ') || 'N/A',
      estadosCredito: [...new Set(c.map((x) => x.estado))].join(', ') || 'N/A',
      totalAportes: ap.reduce((s, x) => s + x.saldo, 0),
      tiposAportes: ap.map((x) => x.tipo).join(', ') || 'N/A',
      totalDepositos: dp.reduce((s, x) => s + x.saldo, 0),
      tiposDepositos: dp.map((x) => x.tipo).join(', ') || 'N/A',
      totalDevoluciones: dv.reduce((s, x) => s + x.valor, 0),
    }
  })
}

/** Créditos de un asociado. */
export function creditosDe(asociadoId: number): Credito[] {
  return CREDITOS.filter((c) => c.asociadoId === asociadoId)
}

/** Aportes de un asociado. */
export function aportesDe(asociadoId: number): Aporte[] {
  return APORTES.filter((a) => a.asociadoId === asociadoId)
}

/** Depósitos de un asociado. */
export function depositosDe(asociadoId: number): Deposito[] {
  return DEPOSITOS.filter((d) => d.asociadoId === asociadoId)
}

/** Devoluciones de un asociado. */
export function devolucionesDe(asociadoId: number): Devolucion[] {
  return DEVOLUCIONES.filter((d) => d.asociadoId === asociadoId)
}

/** Busca un crédito por radicación. */
export function creditoPorRadicacion(radicacion: string): Credito | undefined {
  return CREDITOS.find((c) => c.radicacion === radicacion)
}