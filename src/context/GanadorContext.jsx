import React, { createContext, useContext, useState } from 'react';

const GanadorContext = createContext();


export const GanadorProvider = ({ children }) => {
    const [apuestaGanadora, setApuestaGanadora] = useState();
  
    return (
      <GanadorContext.Provider value={{ apuestaGanadora, setApuestaGanadora }}>
        {children}
      </GanadorContext.Provider>
    );
  };
  
  export const useGanadorContext = () => {
    return useContext(GanadorContext);
  };