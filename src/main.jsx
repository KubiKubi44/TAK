import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createUnhead } from 'unhead'
import { UnheadProvider } from '@unhead/react/client'
import './index.css'
import App from './App.jsx'
import './i18n'

const head = createUnhead()

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <StrictMode>
    <UnheadProvider head={head}>
      <App />
    </UnheadProvider>
  </StrictMode>
);
