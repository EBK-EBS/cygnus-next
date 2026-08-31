import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './auth-context'

function AuthLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-6 text-ink">
      <div className="flex items-center gap-3 rounded-xl border border-line bg-card px-5 py-4 text-sm shadow-drop">
        <span className="size-2.5 animate-pulse rounded-full bg-brand-500" />
        Verificando sesión...
      </div>
    </main>
  )
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { status, isAuthenticated } = useAuth()
  const location = useLocation()

  if (status === 'loading') return <AuthLoading />
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return children
}
