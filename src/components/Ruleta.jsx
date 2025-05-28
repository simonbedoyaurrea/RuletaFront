import React, { useEffect, useState } from 'react';
import '../styles/ruleta.css';
import { useGanadorContext } from '../context/GanadorContext';
import ruletagrados from '../../json/ruletagrados.json';
import { motion } from 'framer-motion';
import Tabla from './Tabla';
import TablaFichas from './TablaFichas';
import ImagenRuleta from '../assets/ruleta.png'

export default function Ruleta() {
  const { apuestaGanadora } = useGanadorContext();
  const [grados, setGrados] = useState(0);
  // const [setGirando] = useState(false);
  const [angle, setAngle] = useState(0);
  const [anglebolita, setAnglebolita] = useState(0);
    

  useEffect(() => {
    if (apuestaGanadora) {
      const resultado = ruletagrados.find(n => n.number === apuestaGanadora.numero);
      
      if (resultado) {
        const nuevoGrado = resultado.degrees;
        // setGirando(true);
        const rotacionRandom = Math.floor(((Math.random()*10)+1)*9.72)
        setAngle((prevAngle) => prevAngle + 3* 360 + rotacionRandom);
        setAnglebolita((prevAngle) => prevAngle + 6 * 360 + rotacionRandom-(nuevoGrado-grados-360));
        setGrados(nuevoGrado)
      }
    }
  }, [apuestaGanadora]);

  return (
    <div className="container">
    <div className="contenedor-dos">
        <div className="orbit">
            <div className="ball" style={{
                transform: `rotate(${anglebolita}deg) translatey(-180px) rotate(${-angle}deg)`, // Evita que quede al revés
                boxShadow: `${Math.sin(angle * (Math.PI / 180)) * 5}px ${Math.cos(angle * (Math.PI / 180)) * 5}px 8px rgba(0, 0, 0, 0.5)`
      }}></div>
        </div>

        <motion.img
            src={ImagenRuleta}
            alt="Ruleta"
            animate={{ rotate: angle}}
            transition={{ duration: 4, ease: "easeOut" }} // 5s para el giro, frenado suave
            className="ruleta"
        />

    </div>
    <TablaFichas />
  </div>
  );
}
