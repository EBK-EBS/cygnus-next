import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ApiError, CYGNUS_NEXT_TENANT_CODE } from '@/lib/auth'
import { useAuth } from '@/components/auth/auth-context'

const LOGO_SYMBOL = '/images/LogoSimboloCygnusNext.png'
const LOGO_NAME = '/images/Nombre CYGNUS-NEXT.png'

function getDestination(state: unknown): string {
  if (state && typeof state === 'object' && 'from' in state && typeof state.from === 'string') {
    return state.from
  }
  return '/dashboard'
}

export function LoginPage() {
  const { login, isAuthenticated, status } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (status === 'authenticated' && isAuthenticated) return <Navigate to="/dashboard" replace />

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login({ tenantCode: CYGNUS_NEXT_TENANT_CODE, username: username.trim(), password })
      navigate(getDestination(location.state), { replace: true })
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 401) {
        setError('Las credenciales no son válidas. Revisa tu usuario y contraseña.')
      } else if (reason instanceof ApiError) {
        setError(reason.message)
      } else {
        setError('No fue posible iniciar sesión. Intenta nuevamente.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-5 py-10 text-ink">
      <div className="pointer-events-none absolute -left-32 -top-32 size-[28rem] rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-32 size-[32rem] rounded-full bg-brand-600/10 blur-3xl" />

      <section className="relative grid w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-card shadow-drop md:grid-cols-[1fr_1.08fr]">
        <div className="hidden flex-col justify-between bg-brand-600 p-10 text-white md:flex">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <img src={LOGO_SYMBOL} alt="Cygnus" className="h-11 w-11 object-contain" />
              <span className="text-xl font-bold tracking-tight text-white">
                CYGNUS<span className="text-brand-100">-NEXT</span>
              </span>
            </div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-100">Estado de cuenta 360°</p>
            <h1 className="max-w-xs text-3xl font-semibold leading-tight">Toda tu operación, en un mismo lugar.</h1>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-100">
              Accede a la información de tu organización con una sesión segura administrada por Transversales.
            </p>
          </div>
          <p className="text-xs text-brand-100/80">Plataforma Cygnus Next · v17.1.7.1.</p>
        </div>

        <div className="p-7 sm:p-10">
          <div className="mb-8 md:hidden">
            <div className="flex items-center gap-3">
              <img src={LOGO_SYMBOL} alt="Cygnus" className="h-10 w-10 object-contain" />
              <img src={LOGO_NAME} alt="Cygnus Next" className="h-5 max-w-[170px] object-contain" />
            </div>
          </div>

          <div className="mb-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-500">Bienvenido</p>
            <h2 className="text-2xl font-semibold">Inicia sesión</h2>
            <p className="mt-2 text-sm text-muted">Usa las credenciales asignadas por tu organización.</p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Usuario
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                className="rounded-lg border border-line bg-surface px-3.5 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                required
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                className="rounded-lg border border-line bg-surface px-3.5 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                required
              />
            </label>

            {error && (
              <div role="alert" className="rounded-lg border border-danger/25 bg-danger/10 px-3.5 py-3 text-sm text-danger">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
            >
              {submitting ? 'Validando...' : 'Ingresar a Cygnus'}
            </button>
          </form>

          <p className="mt-7 text-center text-xs leading-relaxed text-muted">
            Tu sesión se mantiene activa solo en esta pestaña y expira según la política de seguridad de la plataforma.
          </p>
        </div>
      </section>
    </main>
  )
}
