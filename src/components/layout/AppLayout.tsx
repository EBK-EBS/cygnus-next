import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { RightSidebar } from './RightSidebar'
import { AsociadosModal } from './AsociadosModal'
import { Toast } from '@/components/ui/Toast'
import { useUIStore } from '@/store/uiStore'

/** Shell de la aplicación: Navbar + Sidebar + contenido + Asistente IA. */
export function AppLayout() {
  const sidebarMini = useUIStore((s) => s.sidebarMini)
  const rightSidebarMini = useUIStore((s) => s.rightSidebarMini)
  const profileMini = useUIStore((s) => s.profileMini)

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface text-ink">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar mini={sidebarMini} />
        <main
          className={`flex flex-1 flex-col gap-4 overflow-y-auto p-5 ${
            profileMini ? '' : ''
          }`}
        >
          <Outlet />
        </main>
        <RightSidebar mini={rightSidebarMini} />
      </div>
      <AsociadosModal />
      <Toast />
    </div>
  )
}