import React, { useState } from 'react'
import '../styles/Lobby.css'

export default function Lobby({handleSocketRoom,handleSocketUnirseRoom,usuario}) {
    const [roomToJoin, setRoomToJoin] = useState('');

     const handleJoinRoom = (e) => {
       e.preventDefault();
       if (roomToJoin.trim()) {
        handleSocketUnirseRoom(roomToJoin);
       }
    };

    
  
    return (
      <div className="lobby-mean-container">
        <div className="lobby-container">
          <p className="welcome">Bienvenido, {usuario}!</p>

            <div className="options">
                
              <div className="option-card">
                <h3>Crear una sala</h3>
                <p>Crea una nueva partida e invita a un amigo</p>
                <button className="btn primary" onClick={handleSocketRoom} >Crear sala</button>
              </div>
            
              <div className="option-card">
                <h3>Unirse a una sala</h3>
                <form onSubmit={handleJoinRoom} >
                  <div className="input-group">
                    <label htmlFor="roomId">Código de sala:</label>
                    <input
                      type="text"
                      id="roomId"
                      value={roomToJoin}
                      onChange={(e) => setRoomToJoin(e.target.value.toUpperCase())}
                      placeholder="Ej: ABC123"
                      required
                    />
                  </div>
                  <button type="submit" className="btn primary" >
                    Unirse
                  </button>
                </form>
              </div>
            </div>
          
        </div>
      </div>
    );
}
