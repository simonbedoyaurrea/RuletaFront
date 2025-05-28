import React from 'react'
import { useMoneyContext } from '../context/MoneyContext'
import '../styles/dinero.css'

export default function Dinero() {

    const {dineroDisponible} =useMoneyContext()
  return (
    <div className='contenedor-dinero'>
        <h2 className='titulo-dinero'>Dinero Disponible</h2>
        <p>${dineroDisponible}</p>
    </div>
  )
}
