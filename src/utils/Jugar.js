import { useGanadorContext } from '../context/GanadorContext';
import numerosRuleta from '../../json/Numeros.json';
import { useApuestaContext } from '../context/ApuestaContext';
import { useMoneyContext } from '../context/MoneyContext';

export const Jugar = () => {
  // Los contextos deben estar dentro de la función
  const { dineroDisponible, setDineroDisponible } = useMoneyContext();
  const { apuestaGanadora, setApuestaGanadora } = useGanadorContext();
  const { apuestas } = useApuestaContext();

  const numMin = 0;
  const numMax = 36;

  const numeroGanador = Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
  const infoGanador = numerosRuleta[numeroGanador];

  const apuesta = {
    numero: infoGanador.numero,
    color: infoGanador.color,
    par: infoGanador.numero % 2 === 0,
    primeraDocena: infoGanador.numero > 0 && infoGanador.numero <= 12,
    segundaDocena: infoGanador.numero >= 13 && infoGanador.numero <= 25,
    terceraDocena: infoGanador.numero >= 25 && infoGanador.numero <= 36,
    primeraMitad: infoGanador.numero > 0 && infoGanador.numero <= 18,
    segundaMitad: infoGanador.numero > 19 && infoGanador.numero <= 36,
  };

  CompararApuestas(apuesta, apuestas, setDineroDisponible);
  console.log(apuesta, apuestas);
};

// Pasar `apuestas` y `setDineroDisponible` como argumentos para evitar dependencias globales
const CompararApuestas = (apuestaCorrecta, apuestas, setDineroDisponible) => {
  const apuestaGanadora = Object.entries(apuestas).find(([numero, ficha]) => 
    parseInt(numero) === apuestaCorrecta.numero
  );

  if (apuestaGanadora) {
    const [num, ficha] = apuestaGanadora;
    console.log(`¡Ganaste! Apostaste ${ficha.valor} en el número ${num}`);
    setDineroDisponible(prev => prev + ficha.valor * 35 + ficha.valor);
  } else {
    console.log("No hay apuesta en el número ganador");
  }

  const parGanador = Object.entries(apuestas).filter(([numero]) => 
    numero === "EVEN" || numero === "ODD"
  );

  for (const [paridad, ficha] of parGanador) {
    if ((paridad === "EVEN" && apuestaCorrecta.par) || (paridad === "ODD" && !apuestaCorrecta.par)) {
      console.log(`¡Ganaste por paridad! Apostaste ${ficha.valor} en ${paridad}`);
    }
  }

  const colorGanador = Object.entries(apuestas).filter(([numero]) => 
    numero === "R" || numero === "N"
  );

  for (const [color, ficha] of colorGanador) {
    if ((color === "R" && apuestaCorrecta.color === "rojo") || (color === "N" && apuestaCorrecta.color === "negro")) {
      console.log(`¡Ganaste por color! Apostaste ${ficha.valor} en ${color}`);
    }
  }

  const mitadGanadora = Object.entries(apuestas).filter(([numero]) => 
    numero === "1-18" || numero === "19-36"
  );

  for (const [mitad, ficha] of mitadGanadora) {
    if ((mitad === "1-18" && apuestaCorrecta.primeraMitad) || (mitad === "19-36" && apuestaCorrecta.segundaMitad)) {
      console.log(`¡Ganaste la mitad! Apostaste ${ficha.valor} en ${mitad}`);
    }
  }
};
