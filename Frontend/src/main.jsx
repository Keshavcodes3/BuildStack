import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/App/index.css'
import App from '../src/App/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
