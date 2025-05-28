import React, { createContext, useContext, useState } from 'react';

const ListaGanadoresContext = createContext();


export const ListaGanadoresProvider = ({ children }) => {
    const [listaGanadores, setListaGanadores] = useState([]);

    const agregarGanador = (numero, color) => {
        setListaGanadores((prevApuestas) => {
            const nuevaLista = prevApuestas.length >= 10 
                ? [...prevApuestas.slice(1), { numero, color }] 
                : [...prevApuestas, { numero, color }];
    
            return nuevaLista;
        });
    };
  
    return (
      <ListaGanadoresContext.Provider value={{ listaGanadores, agregarGanador}}>
        {children}
      </ListaGanadoresContext.Provider>
    );
  };
  
  export const useListaGanadoresContext = () => {
    return useContext(ListaGanadoresContext);
  };