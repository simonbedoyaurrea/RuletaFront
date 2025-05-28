import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApuestaProvider } from './context/ApuestaContext.jsx'
import { FichaProvider } from './context/FichaContext.jsx'
import { GanadorProvider } from './context/GanadorContext.jsx'
import { MoneyProvider } from './context/MoneyContext.jsx'
import { ListaGanadoresProvider } from './context/ListaGanadoresContext.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> 
  </StrictMode>,
)
