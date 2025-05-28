import React, { useEffect, useState } from 'react'
import Juego from './Juego';
import { useMoneyContext } from '../context/MoneyContext';
import { useApuestaContext } from '../context/ApuestaContext';
import { useListaGanadoresContext } from '../context/ListaGanadoresContext';
import io from 'socket.io-client'
import { useGanadorContext } from '../context/GanadorContext';
import numerosRuleta from '../../json/Numeros.json'
import { useFichaContext } from '../context/FichaContext';
import Login from './Login';
import { useUsuarioContext } from '../context/UsuarioContext';
import Lobby from './Lobby';
import { FaPaste } from 'react-icons/fa';
import ControlesJuego from './ControlesJuego';
import usePlayersStore from '../context/JugadoresContext';
import ListaJugadores from './ListaJugadores';

const socket = io.connect('http://localhost:3009');

export default function Auxiliar() {
    const {setDineroDisponible,dineroDisponible,dineroApostado,setDineroApostado} =useMoneyContext()
    const{apuestas,setApuestas}=useApuestaContext()
    const{agregarGanador}=useListaGanadoresContext()
    const {apuestaGanadora,setApuestaGanadora}=useGanadorContext()
     const { ficha } = useFichaContext();
    const {usuario,setUsuario}= useUsuarioContext()
    const {jugadoresTabla,setJugadoresTabla}=usePlayersStore()


    const [estaJugando,setEstaJugando]=useState(false)
    const [roomActual,setRoomActual]=useState()

    

  
useEffect(() => {
  socket.on('jugarr',(nro)=>{
    Jugar(nro)
  })

  socket.on('tabla_puntuacion',(data)=>{

    setJugadoresTabla(data)

  })

  socket.on('usuario_creado',(user)=>{
    setUsuario(user)
  })
  socket.on('room_creado', (room)=>{
    setRoomActual(room)
  })

  socket.on('room_unida', (room)=>{
    setRoomActual(room)
  })



return () => {
  socket.off('jugarr')
  socket.off('usuario_creado')
  socket.off('room_creado')
  socket.off('room_unida')
  socket.off('tabla_puntuacion')


}
}, [apuestaGanadora,apuestas,roomActual,dineroDisponible])







const Jugar=(numero)=>{

setEstaJugando(true)

const numeroGanador=numero

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

agregarGanador(apuesta.numero,apuesta.color)

setTimeout(() => {
    setApuestas({})
    setDineroApostado(0)
    setEstaJugando(false)
}, 3000);
}

const CompararApuestas = (apuestaCorrecta) => {
  let totalGanancias = 0;

  // Ganancia por número exacto
  const apuestaGanadora = Object.entries(apuestas).find(([numero, ficha]) => 
    parseInt(numero) === apuestaCorrecta.numero
  );

  if (apuestaGanadora) {
    const [num, fichas] = apuestaGanadora; 
    const ganado = fichas.reduce((total, ficha) => total + (ficha.valor * 35) + ficha.valor, 0);
    totalGanancias += ganado;
    console.log(`¡Ganaste! Apostaste en el número ${num} y ganaste ${ganado}`);
  } else {
    console.log("No hay apuesta en el número ganador");
  }

  // Ganancia por paridad
  const parGanador = Object.entries(apuestas).filter(([numero, ficha]) => 
    numero === "EVEN" || numero === "ODD"
  );

  if (parGanador.length > 0) {
    for (const [paridad, fichas] of parGanador) {
      if ((paridad === "EVEN" && apuestaCorrecta.par) || (paridad === "ODD" && !apuestaCorrecta.par)) {
        const ganado = fichas.reduce((total, ficha) => total + (ficha.valor * 1) + ficha.valor, 0);
        totalGanancias += ganado;
        console.log(`¡Ganaste por paridad! Apostaste ${fichas.reduce((t,f)=>f.valor+ t,0)} en ${paridad} y ganaste ${ganado}`);
      }
    }
  }

  // Ganancia por color
  const colorGanador = Object.entries(apuestas).filter(([numero, ficha]) => 
    numero === "R" || numero === "N"
  );

  if (colorGanador.length > 0) {
    for (const [color, fichas] of colorGanador) {
      if ((color === "R" && apuestaCorrecta.color === "rojo") || 
          (color === "N" && apuestaCorrecta.color === "negro")) {
        const ganado = fichas.reduce((total, ficha) => total + (ficha.valor * 1) + ficha.valor, 0);
        totalGanancias += ganado;
        console.log(`¡Ganaste por color! Apostaste ${fichas.reduce((t,f)=>f.valor+ t,0)} en ${color} y ganaste ${ganado}`);
      }
    }
  }

  // Ganancia por mitad
  const mitadGanadora = Object.entries(apuestas).filter(([numero, ficha]) => 
    numero === "1-18" || numero === "19-36"
  );

  if (mitadGanadora.length > 0) {
    for (const [mitad, fichas] of mitadGanadora) {
      if ((mitad === "1-18" && apuestaCorrecta.primeraMitad) || 
          (mitad === "19-36" && apuestaCorrecta.segundaMitad)) {
        const ganado = fichas.reduce((total, ficha) => total + (ficha.valor * 1) + ficha.valor, 0);
        totalGanancias += ganado;
        console.log(`¡Ganaste la mitad! Apostaste ${fichas.reduce((t,f)=>f.valor+ t,0)} en ${mitad} y ganaste ${ganado}`);
      }
    }
  }

  // Actualiza el estado y emite el dinero actualizado
  const nuevoDinero = dineroDisponible + totalGanancias;
  setDineroDisponible(nuevoDinero);
  handleSocketTablaDinero(nuevoDinero);
}

const handleSocketTablaDinero = (dineroActualizado) => {
  const infoEnviada = {
    room: roomActual,
    dinero: dineroActualizado
  };
 
  socket.emit('actualizar_tabla', infoEnviada);
}


const handleSocketUsuario=(usuario)=>{
  socket.emit('crear_usuario',usuario)
}
const handleSocketJugar=()=>{
  socket.emit('jugar_ruleta',roomActual)
}
const handleSocketRoom=()=>{
  socket.emit('crear_room')
}

const handleSocketUnirseRoom=(roomId)=>{
  socket.emit('unirse_room',roomId)
}

if(!usuario){
  return(
    <Login handleSocketUsuario={handleSocketUsuario} />
  )
}

if(usuario && !roomActual){
  return(
  <Lobby handleSocketRoom={handleSocketRoom}  handleSocketUnirseRoom={handleSocketUnirseRoom} usuario={usuario} />
)
}


return (
<>
  <Juego />
  {/* <button onClick={handleSocketJugar} disabled={estaJugando} style={{background:'blue',padding:'20px'}}> jueguelo parcero</button> */}
  <ControlesJuego handleSocketJugar={handleSocketJugar} />
  <div className='info-usuario'>
    <p>usuario: <span>{usuario}</span></p>
    <p onClick={() => navigator.clipboard.writeText(roomActual)} style={{cursor:'pointer'}} >room:<span>{roomActual}</span><FaPaste className='icono-pegar' /></p>
  </div>
  <ListaJugadores />
</>
)
}

