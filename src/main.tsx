import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Importa le pagine principali
import Home from './pages/Home'
import Assessment from './pages/Assessment'
import Thanks from './pages/Thanks'

// Importa gli stili globali Tailwind
import './styles/globals.css'

// Definizione delle route principali
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/assessment',
    element: <Assessment />,
  },
  {
    path: '/grazie',
    element: <Thanks />,
  },
])

// Rendering dell'applicazione React
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
