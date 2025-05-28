import React, { useState } from 'react'
import numerosRuleta from '../../json/Numeros.json'
import { useApuestaContext } from '../context/ApuestaContext'
import { useMoneyContext } from '../context/MoneyContext'
import { useListaGanadoresContext } from '../context/ListaGanadoresContext'
import '../styles/controlesjuego.css'
import { useGanadorContext } from '../context/GanadorContext'

export default function ControlesJuego({handleSocketJugar}) {

    const {setDineroDisponible,dineroApostado,setDineroApostado} =useMoneyContext()
      const{apuestas,setApuestas}=useApuestaContext()
      const{agregarGanador}=useListaGanadoresContext()
      const {setApuestaGanadora}=useGanadorContext()

      const [estaJugando,setEstaJugando]=useState(false)
    
      const numMin=0
      const numMax=36

      //hecho en servidor
    const Jugar=()=>{

        setEstaJugando(true)

        const numeroGanador=Math.floor(Math.random()*(numMax-numMin+1))+numMin
  
        const infoGanador=numerosRuleta[numeroGanador]

        setApuestaGanadora(infoGanador)
  
        const apuesta={
          numero:infoGanador.numero,
          color:infoGanador.color,
          par:infoGanador.numero%2==0?true:false,
          primeraDocena:infoGanador.numero>0 && infoGanador.numero<=12,
          segundaDocena:infoGanador.numero>=13 && infoGanador.numero<=25,
          terceraDocena:infoGanador.numero>=25 && infoGanador.numero<=36,
          primeraMitad:infoGanador.numero>0 && infoGanador.numero<=18,
          segundaMitad:infoGanador.numero>19 && infoGanador.numero<=36,
        }
        CompararApuestas(apuesta)
        console.log(apuesta,apuestas)
        agregarGanador(apuesta.numero,apuesta.color)

        setTimeout(() => {
            setApuestas({})
            setDineroApostado(0)
            setEstaJugando(false)
        }, 1000);
  
  
    }
  
  
    const CompararApuestas = (apuestaCorrecta) => {
  
      // aqui se filtran por numero ganador
      const apuestaGanadora = Object.entries(apuestas).find(([numero, ficha]) => 
        parseInt(numero) === apuestaCorrecta.numero
      );
    
      if (apuestaGanadora) {
        const [num, fichas] = apuestaGanadora; 
      
        const totalGanado = fichas.reduce((total, ficha) => total + (ficha.valor * 35) + ficha.valor, 0);
      
        console.log(`¡Ganaste! Apostaste en el número ${num} y ganaste ${totalGanado}`);
      
        setDineroDisponible((prev) => prev + totalGanado);
      } else {
        console.log("No hay apuesta en el número ganador");
      }
    
      // aqui se filtran por paridad ganadora
      const parGanador = Object.entries(apuestas).filter(([numero, ficha]) => 
        numero === "EVEN" || numero === "ODD"
      );
    
      
      if (parGanador.length > 0) {
        for (const [paridad, fichas] of parGanador) {
          if ((paridad === "EVEN" && apuestaCorrecta.par) || (paridad === "ODD" && !apuestaCorrecta.par)) {
            const totalGanado = fichas.reduce((total, ficha) => total + (ficha.valor * 1) + ficha.valor, 0);
            setDineroDisponible((prev) => prev + totalGanado);
            console.log(`¡Ganaste por paridad! Apostaste ${fichas.reduce((total,f)=>f.valor+ total,0)} dolares  en ${paridad} y ganaste ${totalGanado} dolares`);
           
          }
        }
      }
  
      //aqui se filtran por color ganador
      const colorGanador = Object.entries(apuestas).filter(([numero, ficha]) => 
        numero === "R" || numero === "N"
      );
    
      
      if (colorGanador.length > 0) {
        for (const [color, fichas] of colorGanador) {
          if ((color === "R" && apuestaCorrecta.color==="rojo") || (color === "N" && apuestaCorrecta.color==="negro")) {
            const totalGanado = fichas.reduce((total, ficha) => total + (ficha.valor * 1) + ficha.valor, 0);
            setDineroDisponible((prev) => prev + totalGanado);
            console.log(`¡Ganaste por color! Apostaste ${fichas.reduce((total,f)=>f.valor+ total,0)} dolares  en ${color} y ganaste ${totalGanado} dolares`);
          }
        }
      }
  
      //aqui se filtran por mitad ganadora
      const mitadGanadora = Object.entries(apuestas).filter(([numero, ficha]) => 
        numero === "1-18" || numero === "19-36"
      );
  
      
      if (mitadGanadora.length > 0) {
        for (const [mitad, fichas] of mitadGanadora) {
          if ((mitad === "1-18" && apuestaCorrecta.primeraMitad) || (mitad === "19-36" && apuestaCorrecta.segundaMitad)) {
            const totalGanado = fichas.reduce((total, ficha) => total + (ficha.valor * 1) + ficha.valor, 0);
            setDineroDisponible((prev) => prev + totalGanado);
            console.log(`¡Ganaste la mitad! Apostaste ${fichas.reduce((total,f)=>f.valor+ total,0)} en ${mitad} y ganaste ${totalGanado} dolares`);
          }
        }
      }
  
  
  
    };

    const EliminarApuestas=()=>{

        //eliminamos las apuestas hechas
        setApuestas({})
        //se devuelve el dinero apostado
        setDineroDisponible((prev)=> prev+dineroApostado)

        //el dinero apostado vuelve a 0
        setDineroApostado(0)

    }

  return ( 
    <div className='contenedor-ruleta'>
      <button className='boton-jugar' onClick={!estaJugando?handleSocketJugar:null} disabled={estaJugando}>Jugar</button>
      <button className='boton-eliminar-fichas' disabled={estaJugando} onClick={()=>estaJugando?null:EliminarApuestas()}>Eliminar</button>
    </div>
  )
}
