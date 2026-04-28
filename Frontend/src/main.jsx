import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import { Router } from "./App/app.routes.jsx"
import { Provider } from 'react-redux'
import store from './App/App.store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={Router} />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1e1e2e',
          color: '#cdd6f4',
          border: '1px solid #313244',
          borderRadius: '12px',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
        },
        success: {
          iconTheme: { primary: '#a6e3a1', secondary: '#1e1e2e' },
        },
        error: {
          iconTheme: { primary: '#f38ba8', secondary: '#1e1e2e' },
        },
        loading: {
          iconTheme: { primary: '#89b4fa', secondary: '#1e1e2e' },
        },
      }}
    />
  </Provider>
)