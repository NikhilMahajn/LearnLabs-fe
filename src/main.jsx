import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import { LoaderProvider } from './context/loaderContext.jsx'
import { inject } from '@vercel/analytics'

import './index.css'
import App from './App.jsx'

// Initialize Vercel Web Analytics
inject()

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <AuthProvider>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </AuthProvider>
  </BrowserRouter>

)
