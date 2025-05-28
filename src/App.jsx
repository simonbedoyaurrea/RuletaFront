import React, { useEffect, useState } from 'react'
import './App.css'
import Juego from './components/Juego'
import io from 'socket.io-client'
import { MoneyProvider, useMoneyContext } from './context/MoneyContext';
import { ApuestaProvider, useApuestaContext } from './context/ApuestaContext';
import { ListaGanadoresProvider, useListaGanadoresContext } from './context/ListaGanadoresContext';
import { GanadorProvider, useGanadorContext } from './context/GanadorContext';
import numerosRuleta from '../json/Numeros.json'
import Auxiliar from './components/Auxiliar';
import { FichaProvider } from './context/FichaContext';
import { UsuarioProvider } from './context/UsuarioContext';






export default function App() {


  return (
    <>
    <ApuestaProvider>
    <FichaProvider >
    <GanadorProvider>
      <UsuarioProvider>
            <MoneyProvider>
            <ListaGanadoresProvider>
            <Auxiliar />
            </ListaGanadoresProvider>
            </ MoneyProvider>
            </UsuarioProvider>
            </ GanadorProvider>
            </FichaProvider >
            </ ApuestaProvider>
    </>
  )
}
