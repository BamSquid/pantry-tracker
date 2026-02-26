import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext/AuthContext.tsx'
import { HashRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import 'mantine-datatable/styles.layer.css';
import { FirestoreProvider } from './context/FirestoreContext/FirestoreContext.tsx'
import { ModalsProvider } from '@mantine/modals';
import { DatesProvider } from '@mantine/dates'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <FirestoreProvider>
        <HashRouter>
          <MantineProvider>
            <DatesProvider settings={{ locale: 'en' }}>
              <ModalsProvider>
                <App />
              </ModalsProvider>
            </DatesProvider>
          </MantineProvider>
        </HashRouter>
      </FirestoreProvider>
    </AuthProvider>
  </StrictMode>
)
