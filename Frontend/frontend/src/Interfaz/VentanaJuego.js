import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VentanaJuego.css';

function VentanaJuego() {
    const navigate = useNavigate();
    const [gameData, setGameData] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(1); // 1 or 2
    const [attempts, setAttempts] = useState(5);
    const [guessedNumber, setGuessedNumber] = useState(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // Recuperar los datos del juego del localStorage
        const savedGameData = localStorage.getItem('gameData');
        if (!savedGameData) {
            // Si no hay datos del juego, redirigir a la pantalla principal
            navigate('/');
            return;
        }
        setGameData(JSON.parse(savedGameData));
    }, [navigate]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        if (!inputValue) {
            alert("Por favor ingresa un número");
            return;
        }
        
        const number = parseInt(inputValue);
        if (number < 1 || number > 100) {
            alert("Por favor ingresa un número entre 1 y 100");
            return;
        }

        // Aquí irá la lógica para verificar el número
        console.log("Número enviado:", number);
        setInputValue(''); // Limpiar el input después de enviar
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className={`game-container ${currentPlayer === 1 ? 'player1-bg' : 'player2-bg'}`}>
            {/* Efectos decorativos de fondo */}
            <div className="background-effect effect-1"></div>
            <div className="background-effect effect-2"></div>

            <div className="attempts-counter">
                Intentos: {attempts}
            </div>
            
            <div className="game-content">
                <h1 className="turn-info">
                    Turno del Jugador {currentPlayer}
                </h1>

                <div className="number-display">
                    {guessedNumber !== null ? guessedNumber : '¿?'}
                </div>

                <div className="input-section">
                    <div className="input-group">
                        <input
                            type="number"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            className="number-input"
                            placeholder="Ingresa un número"
                            min="1"
                            max="100"
                        />
                        <button 
                            className="submit-button"
                            onClick={handleSubmit}
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VentanaJuego;