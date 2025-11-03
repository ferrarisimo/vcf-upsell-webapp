import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home'
import Assessment from './pages/Assessment'
import Thanks from './pages/Thanks'

import './styles/globals.css'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/assessment', element: <Assessment /> },
  { path: '/grazie', element: <Thanks /> },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
