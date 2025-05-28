import React from 'react'
import Ficha from './Ficha'
import '../styles/tabla-fichas.css'

export default function TablaFichas() {
  
  return (
    <div className='contenedor-tabla-fichas'>
      <img className='agujero-imagen' src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgryl5BMONEDn8getZtnuVal8Ank3BUB7IX1I_uzaElmTAuAsDbl4TQlg-imc3amQMwVmBvkVUpkMx5SVFp-HvKu8dkWbrIBUndlhxMAkjVlwFxxui4qeiyPCkMbp1bD4msTAiDU61sBqE/s1600/Agujero+de+bala+%25281%2529.png" alt="" />
      <div className='contenedor-fichas'>
          <Ficha seleccionable={true} valor={1} color={'darkslategray'} />
          <Ficha seleccionable={true} valor={5} color={'darkred'} />
          <Ficha seleccionable={true} valor={10} color={'midnightblue'} />
          <Ficha seleccionable={true} valor={25} color={'darkolivegreen'} />
          <Ficha seleccionable={true} valor={100} color={'black'} />
      </div>
    </div>
  )
} 
