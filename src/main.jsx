import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import { LoaderProvider } from './context/loaderContext.jsx'
import { Analytics } from "@vercel/analytics/next"

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <AuthProvider>
      <LoaderProvider>
        <App />
        <Analytics/>
      </LoaderProvider>
    </AuthProvider>
  </BrowserRouter>

)
