import React from 'react'
import { create } from 'zustand'

const usePlayersStore = create((set) => ({
    jugadoresTabla:[],
    setJugadoresTabla: (infoJugadores)=>set(()=>({jugadoresTabla:infoJugadores}))

  }))

export default usePlayersStore