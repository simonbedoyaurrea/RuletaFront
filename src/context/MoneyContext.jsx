import React, { createContext, useContext, useState } from 'react';

const MoneyContext=createContext()

export const MoneyProvider =({children})=>{

    const [dineroDisponible,setDineroDisponible]=useState(5000)
    const [dineroApostado,setDineroApostado]=useState(0)
    
    return(
    <MoneyContext.Provider value={{dineroDisponible,setDineroDisponible,dineroApostado,setDineroApostado}}>
        {children}
    </MoneyContext.Provider>
    )
    
}

export const useMoneyContext =()=>{
    return useContext(MoneyContext)
}