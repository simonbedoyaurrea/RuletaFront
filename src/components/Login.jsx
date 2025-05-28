import React, { useState } from 'react'
import '../styles/login.css'
import { useUsuarioContext } from '../context/UsuarioContext';

export default function Login({handleSocketUsuario}) {

  const [name,setName]=useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      handleSocketUsuario(name)
     }
  };


  return (
    <div className="login-mean-container">
      <div className="login-container">
        <h2 className='login-title'>The Redemption Roulette</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Tu nombre:</label>
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn primary">Continuar</button>
        </form>
      </div>
    </div>
  )
}
