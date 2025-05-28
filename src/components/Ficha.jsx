import React from 'react'
import '../styles/ficha.css'
import { useFichaContext } from '../context/FichaContext'
import { motion, AnimatePresence} from 'framer-motion'


export default function Ficha({valor,color,seleccionable,tamaño}) {

  

    const {setFicha}=useFichaContext()
  return (
    <>
    <AnimatePresence>
    <motion.div onClick={seleccionable? (()=>setFicha({valor,color})):undefined} className="ficha" style={{ backgroundColor: `${color}`,scale:tamaño=='menor'?0.4:1 }}
      key="box"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }} // Animación al salir
      transition={{ duration: 0.5 }}
      >
        {valor}
      </ motion.div>
    
    </AnimatePresence>
    </>
  )
}
