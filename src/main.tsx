import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext/AuthContext.tsx'
import { HashRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import { FirestoreProvider } from './context/FirestoreContext/FirestoreContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <FirestoreProvider>
        <HashRouter>
          <MantineProvider>
            <App />
          </MantineProvider>
        </HashRouter>
      </FirestoreProvider>
    </AuthProvider>
  </StrictMode>
)
