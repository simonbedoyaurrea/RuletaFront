import React from "react";
import { useApuestaContext } from "../context/ApuestaContext";

export default function ListaApuestas() {
  const { apuestas } = useApuestaContext();

  return (
    
    <div>
        {apuestas && <>
      <h3>Apuestas Realizadas:</h3>
      <ul>
        {Object.entries(apuestas).map(([numero, ficha]) => (
          <li key={numero}>
            Número: {numero} - Apuesta: {ficha.map(f=> <p>{f.valor}</p>)} dolares
          </li>
        ))}
      </ul></>
}</div>
  );
}