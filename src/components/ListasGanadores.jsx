import React from 'react'
import { useListaGanadoresContext } from '../context/ListaGanadoresContext'
import '../styles/listas-ganadores.css'

export default function ListasGanadores() {

  const {listaGanadores}=useListaGanadoresContext()
  return (
    <div className='contenedor-ganadores'>
        <h2 className='titulo-ganadores'>Ganadores</h2>
        <ul className='lista-ganadores'>
            {listaGanadores.map((ganador,index)=>(
                <li className='ganador-en-lista' key={index} style={{color:ganador.color=="rojo"?'darkred':'darkgray'}}>{ganador.numero} </li>
            ))}
        </ul>
    </div>
  )
}
