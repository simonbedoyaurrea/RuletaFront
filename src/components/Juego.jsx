import React from 'react'
import Ruleta from './Ruleta'
import Tabla from './Tabla'
import TablaFichas from './TablaFichas'
import {FichaProvider} from '../context/FichaContext'
import { ApuestaProvider } from '../context/ApuestaContext'
import ListaApuestas from './ListaApuestas'
import { GanadorProvider } from '../context/GanadorContext'
import Dinero from './Dinero'
import { MoneyProvider } from '../context/MoneyContext'
import ListasGanadores from './ListasGanadores'
import { ListaGanadoresProvider } from '../context/ListaGanadoresContext'
import Titulo from './Titulo'
import ControlesJuego from './ControlesJuego'



export default function Juego() {
  return (
     <div style={{display:'flex',flexWrap:'wrap',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Titulo />
                <div style={{display:'flex',flexDirection:'row',height:'600px',justifyContent:'space-around',width:'100%'}}>
                  <Ruleta />
                  <Tabla />
                  </div>
                <Dinero/>
                <ListasGanadores />
                {/* <ListaApuestas /> */}
    </div>
  )
}
