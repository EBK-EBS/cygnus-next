import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useUIStore } from '@/store/uiStore'
import './index.css'
import App from './App.tsx'

// Aplica el dark mode al <html> cuando el estado cambia
useUIStore.subscribe((s) => {
  document.documentElement.classList.toggle('dark', s.darkMode)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)