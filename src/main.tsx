import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.scss'
import Home from './pages/home/Home.tsx'
import PWABadge from './components/ui/pwa-badge/PWABadge.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
    <PWABadge />
  </StrictMode>,
)
