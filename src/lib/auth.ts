export interface AuthUser {
  id: string
  username: string
  displayName: string
  enabled: boolean
  tenantCode: string
  roles: string[]
  permissions: string[]
}

interface LoginResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  user: AuthUser
}

export interface LoginCredentials {
  tenantCode: string
  username: string
  password: string
}

export const CYGNUS_NEXT_TENANT_CODE = 'cygnus-next'

interface RequestOptions extends RequestInit {
  token?: string | null
}

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const ACCESS_TOKEN_KEY = 'transversales.accessToken'
const configuredBaseUrl = import.meta.env.VITE_TRANSVERSALES_API_URL?.trim()
const API_BASE_URL = (configuredBaseUrl || 'http://localhost:8080').replace(/\/$/, '')

let unauthorizedHandler: (() => void) | undefined

export function setUnauthorizedHandler(handler: (() => void) | undefined): void {
  unauthorizedHandler = handler
}

export function getAccessToken(): string | null {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY)
}

export function saveAccessToken(token: string): void {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function clearAccessToken(): void {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
}

export function getApiBaseUrl(): string {
  return API_BASE_URL
}

async function responseMessage(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as { detail?: string; message?: string }
    return payload.detail || payload.message || `La operación devolvió HTTP ${response.status}`
  } catch {
    return `La operación devolvió HTTP ${response.status}`
  }
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token = getAccessToken(), ...requestInit } = options
  const headers = new Headers(requestInit.headers)
  headers.set('Accept', 'application/json')

  if (requestInit.body && !(requestInit.body instanceof FormData) && !(requestInit.body instanceof Blob)) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...requestInit, headers })
  } catch {
    throw new ApiError('No se pudo conectar con el servicio de Transversales.', 0)
  }

  if (response.status === 401 && token) unauthorizedHandler?.()
  if (!response.ok) throw new ApiError(await responseMessage(response), response.status)
  if (response.status === 204) return undefined as T

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('json')) return undefined as T
  return (await response.json()) as T
}

export function loginRequest(credentials: LoginCredentials): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/api/v1/auth/login', {
    method: 'POST',
    token: null,
    body: JSON.stringify(credentials),
  })
}

export function currentUserRequest(token: string): Promise<AuthUser> {
  return apiRequest<AuthUser>('/api/v1/auth/me', { token })
}
