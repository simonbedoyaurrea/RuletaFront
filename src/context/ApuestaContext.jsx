import { createContext, useContext, useState } from "react";


const ApuestaContext =createContext()

export const ApuestaProvider = ({children}) => {

    const [apuestas,setApuestas]=useState({})

   const agregarApuesta = (numero, ficha) => {
   setApuestas((prevApuestas) => ({
    ...prevApuestas,
    [numero]: [...(prevApuestas[numero] || []), ficha], 
  }));
}

    return (
    <ApuestaContext.Provider value={{apuestas,agregarApuesta,setApuestas}}>
        {children}
    </ApuestaContext.Provider>
    )
}

export const useApuestaContext = () =>{
    return useContext(ApuestaContext)
}