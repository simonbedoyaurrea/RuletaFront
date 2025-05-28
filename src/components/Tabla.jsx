import React from 'react'
import numerosRuleta from '../../json/Numeros.json'
import '../styles/tabla.css'
import NumeroTabla from './NumeroTabla'
import ReglaApuesta from './ReglaApuesta'

export default function Tabla() {
  return (
    <div >
      <div className="tabla-completa">
        <div className="encabezado">
          <NumeroTabla numero={numerosRuleta[0]} />
        </div>
        <div className="tabla-numeros">
          {numerosRuleta.slice(1, 37).map((numero, i) => (
            <NumeroTabla numero={numero} key={i} />
          ))}
        </div>
      </div>
      <div className='contenedor-reglas-apuesta'>
        <ReglaApuesta titulo="1st 12" />
        <ReglaApuesta titulo="2nd 12" />
        <ReglaApuesta titulo="3rd 12" />
        <ReglaApuesta titulo="ODD" />
        <ReglaApuesta titulo="EVEN" />
        <ReglaApuesta titulo="1-18" />
        <ReglaApuesta titulo="19-36" />
        <ReglaApuesta titulo="R" />
        <ReglaApuesta titulo="N" />
        <ReglaApuesta titulo="2 to 1" />
        <ReglaApuesta titulo="2 to 1" />
        <ReglaApuesta titulo="2 to 1" />
      </div>
    </div>
  )
}
