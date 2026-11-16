import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@/components/ui/provider'
import { Toaster } from '@/components/ui/toaster'
import Router from '@/routes/Router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Router />
      <Toaster />
    </Provider>
  </StrictMode>
)
