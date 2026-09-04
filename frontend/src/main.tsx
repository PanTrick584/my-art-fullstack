import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './App.tsx'
import { ApiProvider } from './api/ApiContext.tsx'
import { AuthProvider } from './api/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ApiProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </ApiProvider>
        </BrowserRouter>
    </StrictMode>,
)
