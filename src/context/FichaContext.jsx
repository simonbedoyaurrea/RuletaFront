import React, { createContext, useContext, useState } from 'react';

const FichaContext = createContext();


export const FichaProvider = ({ children }) => {
    const [ficha, setFicha] = useState();
  
    return (
      <FichaContext.Provider value={{ ficha, setFicha }}>
        {children}
      </FichaContext.Provider>
    );
  };
  
  export const useFichaContext = () => {
    return useContext(FichaContext);
  };