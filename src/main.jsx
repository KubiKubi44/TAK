import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createUnhead } from 'unhead'
import { UnheadProvider } from '@unhead/react/client'
import './index.css'
import App from './App.jsx'
import './i18n'

const head = createUnhead()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UnheadProvider head={head}>
      <App />
    </UnheadProvider>
  </StrictMode>,
)
