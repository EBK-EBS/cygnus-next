import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

/** Toast global — se suscribe al estado del store y se auto-oculta. */
export function Toast() {
  const toast = useUIStore((s) => s.toast)
  const clearToast = useUIStore((s) => s.clearToast)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(clearToast, 2500)
    return () => clearTimeout(t)
  }, [toast, clearToast])

  if (!toast) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-[3000] -translate-x-1/2">
      <div className="animate-fade-in flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm text-card shadow-drop">
        <CheckCircle2 className="size-4 text-brand-500" />
        {toast}
      </div>
    </div>
  )
}