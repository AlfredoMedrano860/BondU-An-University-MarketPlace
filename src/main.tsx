import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'
import { NotificationContainer } from './components/ui/NotificationContainer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <NotificationContainer />
  </StrictMode>,
)
