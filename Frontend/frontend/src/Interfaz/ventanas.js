// ventanas.js
import React, { useState } from "react";
import { FaCrown, FaUser } from "react-icons/fa";
import './ventanas.css';

export default function VentanaPrincipal() {
  const [jugador1, setJugador1] = useState("");
  const [jugador2, setJugador2] = useState("");

  const iniciarJuego = async () => {
    if (jugador1.trim() === "" || jugador2.trim() === "") {
      alert("⚠️ Ambos jugadores deben ingresar su nombre.");
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/iniciar-juego', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jugador1, jugador2 })
      });

      const data = await response.json();
      
      if (data.success) {
        
        localStorage.setItem('gameData', JSON.stringify({
          jugador1: jugador1,
          jugador2: jugador2,
          numeroSecreto: data.numeroSecreto 
        }));
        
        // Navegar a la ventana de juego
        window.location.href = '/juego';
      } else {
        alert('❌ Error al iniciar el juego');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error de conexión con el servidor');
    }
  };

  return (
    <div className="container">
      {/* Efectos de fondo */}
      <div className="background-effect-1" />
      <div className="background-effect-2" />

      {/* Título */}
      <div className="title-container">
        <FaCrown className="crown-icon" />
        <h1 className="title">Batalla de Numeros</h1>
      </div>

      {/* Formulario de jugadores */}
      <div className="players-container">
        {/* Jugador 1 */}
        <div className="player-section">
          <FaUser className="player-icon player-icon-1" />
          <h2 className="player-title">Jugador 1</h2>
          <input
            type="text"
            value={jugador1}
            onChange={(e) => setJugador1(e.target.value)}
            placeholder="Nombre del jugador"
            className="player-input"
            maxLength={20}
          />
        </div>

        {/* Botón Iniciar */}
        <div className="start-button-container">
          <button onClick={iniciarJuego} className="start-button">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Iniciar Partida
            </span>
          </button>
        </div>

        {/* Jugador 2 */}
        <div className="player-section">
          <FaUser className="player-icon player-icon-2" />
          <h2 className="player-title">Jugador 2</h2>
          <input
            type="text"
            value={jugador2}
            onChange={(e) => setJugador2(e.target.value)}
            placeholder="Nombre del jugador"
            className="player-input"
            maxLength={20}
          />
        </div>
      </div>
    </div>
  );
}
