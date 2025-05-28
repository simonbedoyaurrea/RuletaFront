import React, { createContext, useContext, useState } from 'react';

const UsuarioContext = createContext();


export const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState();
  
    return (
      <UsuarioContext.Provider value={{ usuario, setUsuario }}>
        {children}
      </UsuarioContext.Provider>
    );
  };
  
  export const useUsuarioContext = () => {
    return useContext(UsuarioContext);
  };