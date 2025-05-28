import React, { useState } from 'react'
import Ficha from './Ficha';
import { useFichaContext } from '../context/FichaContext';
import { useApuestaContext } from "../context/ApuestaContext";
import { useMoneyContext } from '../context/MoneyContext';

export default function ReglaApuesta({titulo}) {
     const { ficha } = useFichaContext();
     const { apuestas, agregarApuesta } = useApuestaContext();
     const {setDineroDisponible,setDineroApostado}=useMoneyContext()
    
     const apuestaActual = apuestas[titulo] || []; 

     const handleApuesta = () => {
      if (ficha) {
        agregarApuesta(titulo, ficha);
        setDineroDisponible((prev) => prev - ficha.valor);
        setDineroApostado((prev)=> prev + ficha.valor)
      }
    };

  return (
    <div className="regla-apuesta" onClick={handleApuesta}>
        {titulo}
        {apuestaActual.map((apuesta, index) => (
                <Ficha key={index} valor={apuesta.valor} color={apuesta.color} />
              ))}
    </div>
  )
}

