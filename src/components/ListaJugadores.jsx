import React from 'react'
import usePlayersStore from '../context/JugadoresContext'


export default function ListaJugadores() {
    const {jugadoresTabla}=usePlayersStore()
  return (
    <div className='bg-amber-800 p-8'>
        <ul>
            {jugadoresTabla.map(j=> <li>{j.jugador}{j.dinero}</li>)}
        </ul>
    </div>
  )
}
