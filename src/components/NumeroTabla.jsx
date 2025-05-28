import React from "react";
import Ficha from "./Ficha";
import { useFichaContext } from "../context/FichaContext";
import { useApuestaContext } from "../context/ApuestaContext";
import { useMoneyContext } from "../context/MoneyContext";

export default function NumeroTabla({ numero }) {
  const { ficha } = useFichaContext();
  const { apuestas, agregarApuesta } = useApuestaContext();
  const {setDineroDisponible,setDineroApostado}=useMoneyContext()

  const apuestaActual = apuestas[numero.numero] || []; 

  const handleApuesta = () => {
    if (ficha) {
      agregarApuesta(numero.numero, ficha);
      setDineroDisponible((prev) => prev - ficha.valor);
      setDineroApostado((prev)=> prev + ficha.valor)
    }
  };


  return (
    <div
      onClick={handleApuesta}
      className={`${numero.color} contenedor-numero`}
      style={{ color: "rgb(167, 145, 73)", position: "relative" }}
    >
      {numero.numero}
      {apuestaActual.map((apuesta, index) => (
        <Ficha key={index} valor={apuesta.valor} color={apuesta.color} tamaño={'menor'}  />
      ))}
    </div>
  );
}



