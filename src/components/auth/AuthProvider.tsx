import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  clearAccessToken,
  currentUserRequest,
  getAccessToken,
  loginRequest,
  saveAccessToken,
  setUnauthorizedHandler,
} from '@/lib/auth'
import type { AuthUser, LoginCredentials } from '@/lib/auth'
import { AuthContext } from './auth-context'
import type { AuthContextValue, AuthStatus } from './auth-context'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>(() => (getAccessToken() ? 'loading' : 'anonymous'))

  const logout = useCallback(() => {
    clearAccessToken()
    setUser(null)
    setStatus('anonymous')
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(logout)
    return () => setUnauthorizedHandler(undefined)
  }, [logout])

  useEffect(() => {
    const token = getAccessToken()
    if (!token) return

    let active = true
    currentUserRequest(token)
      .then((currentUser) => {
        if (!active) return
        setUser(currentUser)
        setStatus('authenticated')
      })
      .catch(() => {
        if (!active) return
        logout()
      })

    return () => {
      active = false
    }
  }, [logout])

  const login = useCallback(async (credentials: LoginCredentials) => {
    const result = await loginRequest(credentials)
    saveAccessToken(result.accessToken)
    setUser(result.user)
    setStatus('authenticated')
    return result.user
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, status, isAuthenticated: status === 'authenticated', login, logout }),
    [login, logout, status, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
