import { Bell, Bot, CircleHelp, House, LogOut, Moon, Sun, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/components/auth/auth-context'
import { Dropdown, DropdownHeader, DropdownItem } from '@/components/ui/Dropdown'
import { useUIStore } from '@/store/uiStore'

const NAV_LOGO = '/images/LogoSimboloCygnusNext.png'
const NAV_NOMBRE = '/images/Nombre CYGNUS-NEXT.png'

/**
 * Barra superior — fiel al navbar original con logos, notificaciones,
 * tema, asistente IA y menú de usuario.
 */
export function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const darkMode = useUIStore((s) => s.darkMode)
  const toggleDarkMode = useUIStore((s) => s.toggleDarkMode)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const toggleRightSidebar = useUIStore((s) => s.toggleRightSidebar)
  const showToast = useUIStore((s) => s.showToast)
  const openModal = () => navigate('/asociados')
  const userLabel = user?.displayName || user?.username || 'Usuario'
  const userInitials = userLabel
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <nav className="relative z-[1000] flex h-[50px] items-center justify-between border-b border-line bg-card px-5">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          title="Colapsar Menú"
          className="mr-1 flex size-8 items-center justify-center rounded text-muted transition-colors hover:text-brand-500"
        >
          <House className="size-4" />
        </button>
        <img src={NAV_LOGO} alt="Cygnus Logo" className="mx-2 h-8 object-contain" />
        <img src={NAV_NOMBRE} alt="Cygnus Next" className="h-[18px] object-contain" />
        <span className="ml-2.5 text-xs text-muted">Versión 17.1.7.1.</span>
      </div>

      <div className="flex items-center gap-3.5">
        <button
          onClick={() => navigate('/dashboard')}
          title="Ir a Inicio"
          className="text-muted transition-colors hover:text-brand-500"
        >
          <House className="size-4.5" />
        </button>

        <Dropdown
          trigger={
            <button title="Ayuda" className="text-muted transition-colors hover:text-brand-500">
              <CircleHelp className="size-4.5" />
            </button>
          }
        >
          <div className="min-w-[300px] px-4 py-3 text-[0.8rem] leading-relaxed">
            <h4 className="mb-2.5 text-brand-500">Centro de Ayuda</h4>
            <p><strong>Imprimir:</strong> Genera extracto en PDF.</p>
            <p><strong>Refrescar:</strong> Recarga datos del asociado.</p>
            <p><strong>Novedades:</strong> Historial de cambios.</p>
            <p><strong>Simulación:</strong> Calcula plan de pagos.</p>
          </div>
        </Dropdown>

        <Dropdown
          trigger={
            <button title="Notificaciones" className="relative text-muted transition-colors hover:text-brand-500">
              <Bell className="size-4.5" />
              <span className="absolute -right-2 -top-1.5 rounded-full bg-danger px-1 py-px text-[0.6rem] font-bold text-white">
                3
              </span>
            </button>
          }
        >
          <DropdownHeader>Notificaciones Recientes</DropdownHeader>
          <DropdownItem>Crédito #169612 en trámite</DropdownItem>
          <DropdownItem>Crédito en análisis</DropdownItem>
          <div className="border-t border-line py-2 text-center text-brand-500">
            Marcar leídas
          </div>
        </Dropdown>

        <button
          onClick={toggleDarkMode}
          title="Cambiar tema"
          className="text-muted transition-colors hover:text-brand-500"
        >
          {darkMode ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
        </button>

        <button
          onClick={toggleRightSidebar}
          title="Colapsar Asistente IA Global"
          className="text-muted transition-colors hover:text-brand-500"
        >
          <Bot className="size-4.5" />
        </button>

        <Dropdown
          trigger={
            <div className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-ink">
              <span>{userLabel}</span>
              <span className="flex size-[30px] items-center justify-center rounded-full bg-[#6366f1] font-semibold text-white">
                {userInitials || 'US'}
              </span>
            </div>
          }
        >
          <DropdownHeader>Mi Cuenta</DropdownHeader>
          <DropdownItem onClick={() => showToast('Cargando Mis Datos...')}>Mis datos</DropdownItem>
          <DropdownItem onClick={() => showToast('Cargando Mi Seguridad...')}>Mi Seguridad</DropdownItem>
          <DropdownItem onClick={() => showToast('Cargando Mis Autorizaciones...')}>Mis Autorizaciones</DropdownItem>
          <div className="my-1.5 border-t border-line" />
          <DropdownItem icon={<Users className="size-4" />} onClick={openModal}>
            Cambiar Asociado (Demo)
          </DropdownItem>
          <DropdownItem
            icon={<LogOut className="size-4 text-danger" />}
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
          >
            <span className="text-danger">Cerrar sesión</span>
          </DropdownItem>
        </Dropdown>
      </div>
    </nav>
  )
}
