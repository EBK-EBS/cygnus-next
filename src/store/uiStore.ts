import { create } from 'zustand'
import { ASOCIADOS } from '@/data/mock'
import type { Asociado } from '@/data/types'

interface UIState {
  /** Asociado seleccionado actualmente (contexto global de la app). */
  currentAsoc: Asociado
  darkMode: boolean
  sidebarMini: boolean
  rightSidebarMini: boolean
  profileMini: boolean
  toast: string | null
  asociadosModalOpen: boolean
  setCurrentAsoc: (id: number) => void
  setAsociadosModal: (open: boolean) => void
  toggleDarkMode: () => void
  toggleSidebar: () => void
  toggleRightSidebar: () => void
  toggleProfileMini: () => void
  showToast: (msg: string) => void
  clearToast: () => void
}

export const useUIStore = create<UIState>((set) => ({
  currentAsoc: ASOCIADOS[0],
  darkMode: false,
  sidebarMini: false,
  rightSidebarMini: false,
  profileMini: false,
  toast: null,
  asociadosModalOpen: false,
  setCurrentAsoc: (id) =>
    set(() => {
      const found = ASOCIADOS.find((a) => a.id === id)
      return found ? { currentAsoc: found } : {}
    }),
  setAsociadosModal: (open) => set({ asociadosModalOpen: open }),
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
  toggleSidebar: () => set((s) => ({ sidebarMini: !s.sidebarMini })),
  toggleRightSidebar: () => set((s) => ({ rightSidebarMini: !s.rightSidebarMini })),
  toggleProfileMini: () => set((s) => ({ profileMini: !s.profileMini })),
  showToast: (msg) => set({ toast: msg }),
  clearToast: () => set({ toast: null }),
}))

/** Aplica la clase .dark al <html> cuando el estado cambia. */
export function applyDarkModeClass(enabled: boolean): void {
  document.documentElement.classList.toggle('dark', enabled)
}