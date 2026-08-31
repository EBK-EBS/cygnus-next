import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { AppLayout } from '@/components/layout/AppLayout'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { LoginPage } from '@/features/auth/LoginPage'

// Code-splitting: las vistas pesadas (recharts) se cargan bajo demanda
const EstadoCuentaPage = lazy(() =>
  import('@/features/estado-cuenta/EstadoCuentaPage').then((m) => ({ default: m.EstadoCuentaPage })),
)
const ReporteadorPage = lazy(() =>
  import('@/features/reporteador/ReporteadorPage').then((m) => ({ default: m.ReporteadorPage })),
)
const KpisPage = lazy(() =>
  import('@/features/kpis/KpisPage').then((m) => ({ default: m.KpisPage })),
)
const CarteraEdadesPage = lazy(() =>
  import('@/features/cartera/CarteraEdadesPage').then((m) => ({ default: m.CarteraEdadesPage })),
)
const AreasNegocioPage = lazy(() =>
  import('@/features/areas-negocio/AreasNegocioPage').then((m) => ({ default: m.AreasNegocioPage })),
)
const ConstruccionPage = lazy(() =>
  import('@/features/construccion/ConstruccionPage').then((m) => ({ default: m.ConstruccionPage })),
)

function lazyPage(element: React.ReactNode) {
  return <Suspense fallback={<div className="p-8 text-muted">Cargando...</div>}>{element}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      {
        path: 'estado-cuenta',
        element: lazyPage(<EstadoCuentaPage />),
        children: [{ path: ':subview', element: lazyPage(<EstadoCuentaPage />) }],
      },
      { path: 'kpis', element: lazyPage(<KpisPage />) },
      { path: 'cartera-edades', element: lazyPage(<CarteraEdadesPage />) },
      { path: 'reporteador', element: lazyPage(<ReporteadorPage />) },
      { path: 'areas-negocio', element: lazyPage(<AreasNegocioPage />) },
      { path: 'personas', element: lazyPage(<ConstruccionPage />) },
      { path: 'construccion/:modulo', element: lazyPage(<ConstruccionPage />) },
      { path: '*', element: <DashboardPage /> },
    ],
  },
])
