import {
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  ChartPie,
  Coins,
  Database,
  FileSearch,
  FolderOpen,
  Gauge,
  HandCoins,
  Handshake,
  Landmark,
  Lock,
  PieChart,
  ScrollText,
  Settings,
  Shield,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

/**
 * Árbol de navegación de Cygnus Next — fiel al menú de 4 niveles del HTML original.
 * Cada nodo es una rama (children) o una hoja con destino (route | construccion).
 * El render es RECURSIVO: agregar módulos futuros es solo datos, no JSX.
 */

export type NavRoute =
  | 'dashboard'
  | 'estado-cuenta'
  | 'kpis'
  | 'cartera-edades'
  | 'reporteador'
  | 'areas-negocio'
  | 'personas'
  | 'seguridad-perfiles'
  | 'seguridad-usuarios'
  | 'seguridad-asignacion-oficina'
  | 'seguridad-cambio-clave'
  | 'canonico'
  | 'construccion'

export interface NavLeaf {
  label: string
  route?: NavRoute
  /** Subvista destino cuando route === 'estado-cuenta'. */
  subview?: string
  /** Módulo mostrado en la vista de construcción. */
  construccion?: string
  icon?: LucideIcon
}

export interface NavNode {
  label: string
  icon?: LucideIcon
  /** Abierto por defecto (fiel al HTML original). */
  open?: boolean
  children: Array<NavNode | NavLeaf>
}

const G: Array<{ g1: string; g2: string }> = [
  { g1: 'Gestión G1', g2: 'Gestión G2' },
]

const R: Array<{ r1: string; r2: string }> = [
  { r1: 'R1', r2: 'R2' },
]

const P: Array<{ p1: string; p2: string }> = [
  { p1: 'P1', p2: 'P2' },
]

/** Rama estándar Gestión / Reportes / Parámetros (G-R-P) usada por casi todos los módulos. */
function grp(modulo: string): NavNode[] {
  return [
    {
      label: 'Gestión',
      children: [
        { label: G[0].g1, construccion: `${G[0].g1} - ${modulo}` },
        { label: G[0].g2, construccion: `${G[0].g2} - ${modulo}` },
      ],
    },
    {
      label: 'Reportes',
      children: [
        { label: R[0].r1, construccion: `Reporte ${R[0].r1} - ${modulo}` },
        { label: R[0].r2, construccion: `Reporte ${R[0].r2} - ${modulo}` },
      ],
    },
    {
      label: 'Parámetros',
      children: [
        { label: P[0].p1, construccion: `Parámetro ${P[0].p1} - ${modulo}` },
        { label: P[0].p2, construccion: `Parámetro ${P[0].p2} - ${modulo}` },
      ],
    },
  ]
}

export const NAV_TREE: NavNode[] = [
  {
    label: 'Dashboard',
    icon: ChartPie,
    open: true,
    children: [
      { label: 'General-Usuario', route: 'dashboard' },
      { label: 'Indicadores', route: 'kpis' },
      {
        label: 'Reporteador',
        children: [
          { label: 'Crear Reportes', route: 'reporteador' },
          { label: 'Reportes creados', construccion: 'Reportes creados' },
          { label: 'Capa de Usuario', construccion: 'Capa de Usuario' },
        ],
      },
    ],
  },
  {
    label: 'Core Business',
    icon: Briefcase,
    open: true,
    children: [
      {
        label: 'Personas',
        icon: Users,
        children: [
          {
            label: 'Gestión',
            children: [
              { label: 'Administración', route: 'personas' },
              { label: 'Inactivación', construccion: 'Inactivación de Personas' },
            ],
          },
          {
            label: 'Reportes',
            children: [
              { label: 'R1', construccion: 'Reporte R1 - Personas' },
              { label: 'R2', construccion: 'Reporte R2 - Personas' },
            ],
          },
          {
            label: 'Parámetros',
            children: [
              { label: 'P1', construccion: 'Parámetro P1 - Personas' },
              { label: 'P2', construccion: 'Parámetro P2 - Personas' },
            ],
          },
        ],
      },
      {
        label: 'Aportes',
        icon: Coins,
        children: [
          {
            label: 'Gestión',
            children: [
              { label: 'Creación Aportes', construccion: 'Creación Aportes' },
              { label: 'Revalorización aportes', construccion: 'Revalorización aportes' },
            ],
          },
          {
            label: 'Reportes',
            children: [
              { label: 'R1', construccion: 'Reporte R1 - Aportes' },
              { label: 'R2', construccion: 'Reporte R2 - Aportes' },
            ],
          },
          {
            label: 'Parámetros',
            children: [
              { label: 'P1', construccion: 'Parámetro P1 - Aportes' },
              { label: 'P2', construccion: 'Parámetro P2 - Aportes' },
            ],
          },
        ],
      },
      {
        label: 'Crédito',
        icon: HandCoins,
        children: [
          {
            label: 'Gestión',
            children: [
              { label: 'G1', construccion: 'Gestión G1 - Crédito' },
              { label: 'G2', construccion: 'Gestión G2 - Crédito' },
            ],
          },
          {
            label: 'Reportes',
            children: [
              { label: 'R1', construccion: 'Reporte R1 - Crédito' },
              { label: 'R2', construccion: 'Reporte R2 - Crédito' },
            ],
          },
          {
            label: 'Parámetros',
            children: [
              { label: 'P1', construccion: 'Parámetro P1 - Crédito' },
              { label: 'P2', construccion: 'Parámetro P2 - Crédito' },
            ],
          },
        ],
      },
      {
        label: 'Cartera',
        icon: Wallet,
        open: true,
        children: [
          {
            label: 'Gestión',
            open: true,
            children: [
              { label: 'Cartera por edades', route: 'cartera-edades' },
              { label: 'Estado de cuenta', route: 'estado-cuenta', subview: 'productos' },
            ],
          },
          ...grp('Cartera').slice(1),
        ],
      },
      {
        label: 'Tesorería',
        icon: Landmark,
        children: grp('Tesorería'),
      },
      {
        label: 'Contabilidad',
        icon: BookOpen,
        children: grp('Contabilidad'),
      },
      {
        label: 'Modelo Canónico',
        icon: Database,
        children: [
          { label: 'Explorador Canónico', route: 'canonico' },
        ],
      },
    ],
  },
  {
    label: 'Captaciones',
    icon: Coins,
    children: [
      {
        label: 'Ahorros Vista',
        children: grp('Ahorros Vista'),
      },
      {
        label: 'CDAT´s',
        children: grp('CDAT´s'),
      },
    ],
  },
  {
    label: 'Colocaciones',
    icon: Handshake,
    children: [
      {
        label: 'Garantías',
        children: grp('Garantías'),
      },
      {
        label: 'Cobranzas',
        children: grp('Cobranzas'),
      },
    ],
  },
  {
    label: 'ERP',
    icon: Building2,
    children: [
      {
        label: 'Facturación',
        children: grp('Facturación'),
      },
      {
        label: 'Proveedores',
        children: grp('Proveedores'),
      },
    ],
  },
  {
    label: 'Riesgos',
    icon: Shield,
    children: [
      {
        label: 'Sarlaft',
        children: grp('Sarlaft'),
      },
      {
        label: 'Sarc',
        children: grp('Sarc'),
      },
      {
        label: 'Scoring',
        children: grp('Scoring'),
      },
    ],
  },
  {
    label: 'Gestión Cooperativa',
    icon: Wrench,
    children: [
      {
        label: 'Auxilios',
        children: grp('Auxilios'),
      },
      {
        label: 'Organismos',
        children: grp('Organismos'),
      },
    ],
  },
  {
    label: 'Configuración',
    icon: Settings,
    children: [
      {
        label: 'Administración',
        icon: Building2,
        children: grp('Admin'),
      },
      {
        label: 'Seguridad',
        icon: Lock,
        children: [
          {
            label: 'Gestion',
            children: [
              { label: 'Admin.Perfiles', route: 'seguridad-perfiles' },
              { label: 'Admin.Usuarios', route: 'seguridad-usuarios' },
              { label: 'Asignación de Usuarios a Oficina', route: 'seguridad-asignacion-oficina' },
              { label: 'Cambio de Clave', route: 'seguridad-cambio-clave' },
              { label: 'Areas de negocio', route: 'areas-negocio' },
              { label: 'Dominios de Negocio', construccion: 'Dominios de Negocio' },
              { label: 'Opciones de Negocio', construccion: 'Opciones de Negocio' },
            ],
          },
          {
            label: 'Reportes',
            children: [
              { label: 'Reporte de perfiles/Usuarios/accesos', construccion: 'Reporte de perfiles/Usuarios/accesos' },
              { label: 'Reporte de Opciones por área y domino', construccion: 'Reporte de Opciones por área y domino' },
            ],
          },
          {
            label: 'Parámetros',
            children: [
              { label: 'Tipos de perfil', construccion: 'Tipos de perfil' },
              { label: 'Tipos de Usuarios', construccion: 'Tipos de Usuarios' },
            ],
          },
        ],
      },
      {
        label: 'Auditoria',
        icon: FileSearch,
        children: [
          {
            label: 'Gestion',
            children: [
              { label: 'Auditorias en Operaciones/transacciones', construccion: 'Auditorias en Operaciones/transacciones' },
              { label: 'Auditorias de Usuarios y procesos', construccion: 'Auditorias de Usuarios y procesos' },
              { label: 'Auditorias por acceso no permitidos', construccion: 'Auditorias por acceso no permitidos' },
              { label: 'Cruce Operativo - contable', construccion: 'Cruce Operativo - contable' },
            ],
          },
          {
            label: 'Reportes',
            children: [
              { label: 'Reporte de Auditorias Vs Usuarios', construccion: 'Reporte de Auditorias Vs Usuarios' },
              { label: 'Reporte de Operaciones sospechosas', construccion: 'Reporte de Operaciones sospechosas' },
            ],
          },
          {
            label: 'Parámetros',
            children: [
              { label: 'Tipos de auditoria', construccion: 'Tipos de auditoria' },
              { label: 'Tipos de traza', construccion: 'Tipos de traza' },
              { label: 'Auditorias AdHoc', construccion: 'Auditorias AdHoc' },
            ],
          },
        ],
      },
    ],
  },
]

/** Iconos usados por el menú original para las ramas principales. */
export const NAV_ICONS: Record<string, LucideIcon> = {
  home: ChartPie,
  pie: PieChart,
  briefcase: Briefcase,
  users: Users,
  coins: Coins,
  wallet: Wallet,
  hand: HandCoins,
  land: Landmark,
  book: BookOpen,
  handshake: Handshake,
  building: Building2,
  shield: Shield,
  wrench: Wrench,
  settings: Settings,
  lock: Lock,
  search: FileSearch,
  folder: FolderOpen,
  gauge: Gauge,
  bars: BarChart3,
  scroll: ScrollText,
  database: Database,
}