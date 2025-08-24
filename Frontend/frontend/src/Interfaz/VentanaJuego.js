import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VentanaJuego.css';

function VentanaJuego() {
    const navigate = useNavigate();
    // Estado del juego sincronizado con el backend
    const [gameState, setGameState] = useState({
        jugadores: { jugador1: '', jugador2: '' },
        ronda: 1,
        intentos: 0,
        numeroSecreto: null,
        message: ''
    });
    const [inputValue, setInputValue] = useState('');

    // Obtener el estado del juego del backend cada segundo
    useEffect(() => {
        const fetchGameState = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/estado-juego');
                const data = await response.json();
                if (data.success) {
                    setGameState(prev => ({
                        ...prev,
                        jugadores: data.jugadores,
                        ronda: data.ronda,
                        intentos: data.intentos,
                    }));
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error al obtener estado del juego:', error);
                navigate('/');
            }
        };
        fetchGameState();
        const interval = setInterval(fetchGameState, 1000);
        return () => clearInterval(interval);
    }, [navigate]);

    // Determinar el jugador actual según la ronda
    const getCurrentPlayer = () => {
        return gameState.ronda % 2 === 1 ? gameState.jugadores.jugador1 : gameState.jugadores.jugador2;
    };

    // Intentos restantes
    const getIntentosRestantes = () => {
        return 5 - gameState.intentos;
    };


    // Estado para saber si se debe avanzar ronda
    const [esperandoRonda, setEsperandoRonda] = useState(false);

    // Enviar intento al backend o avanzar ronda
    const handleSubmit = async () => {
        if (esperandoRonda) {
            // Solo refresca el estado y permite la nueva ronda
            setEsperandoRonda(false);
            setGameState(prev => ({
                ...prev,
                message: '',
                numeroSecreto: null
            }));
            setInputValue('');
            return;
        }
        if (!inputValue) {
            alert("Por favor ingresa un número");
            return;
        }
        const number = parseInt(inputValue);
        if (number < 1 || number > 100) {
            alert("Por favor ingresa un número entre 1 y 100");
            return;
        }
        if (getIntentosRestantes() === 0) {
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/verificar-numero', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numero: number })
            });
            const data = await response.json();
            if (data.success) {
                // Si adivinó o agotó intentos, mostrar el número y esperar avanzar ronda
                if (data.message === "¡Correcto!" || data.message.includes("El número era")) {
                    setEsperandoRonda(true);
                }
                setGameState(prev => ({
                    ...prev,
                    intentos: data.intentos,
                    ronda: data.ronda,
                    message: data.message,
                    numeroSecreto: data.numeroSecreto
                }));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al verificar el número');
        }
        setInputValue('');
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className={`game-container ${gameState.ronda % 2 === 1 ? 'player2-bg' : 'player1-bg'}`}>
            {/* Efectos decorativos de fondo */}
            <div className="background-effect effect-1"></div>
            <div className="background-effect effect-2"></div>

            <div className="attempts-counter">
                Intentos: {getIntentosRestantes()}
            </div>
            <div className="game-content">
                <h1 className="turn-info">
                    Turno de {getCurrentPlayer()}
                </h1>
                <div className="number-display">
                    {esperandoRonda
                        ? (gameState.message === "¡Correcto!" ? '✔' : (gameState.message && gameState.message.includes('agotado') ? 'X' : '¿?'))
                        : '¿?'}
                </div>
                {gameState.message && (
                    <div className="message">
                        {gameState.message}
                    </div>
                )}
                <div className="input-section">
                    <div className="input-group">
                        {esperandoRonda ? (
                            <button 
                                className="submit-button"
                                onClick={handleSubmit}
                            >
                                Comenzar nueva ronda
                            </button>
                        ) : (
                            <>
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    className="number-input"
                                    placeholder="Ingresa un número"
                                    min="1"
                                    max="100"
                                    disabled={getIntentosRestantes() === 0}
                                />
                                <button 
                                    className="submit-button"
                                    onClick={handleSubmit}
                                    disabled={getIntentosRestantes() === 0}
                                >
                                    Aceptar
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VentanaJuego;