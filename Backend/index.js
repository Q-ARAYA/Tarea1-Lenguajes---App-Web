const express = require('express');
const cors = require('cors');
const JuegoNumeros = require('./Code/JuegoNumeros');

const app = express();
const PORT = 5000;


const juego = new JuegoNumeros();


app.use(cors());
app.use(express.json());


app.get('/api/test', (req, res) => {
    res.json({ message: 'Conexión exitosa con el backend!' });
});

// Ruta para iniciar el juego
app.post('/api/iniciar-juego', (req, res) => {
    const { jugador1, jugador2 } = req.body;
    const resultado = juego.iniciarJuego(jugador1, jugador2);
    res.json({
        ...resultado,
        jugadores: juego.jugadores
    });
});

// Ruta para obtener el estado del juego
app.get('/api/estado-juego', (req, res) => {
    res.json({
        success: true,
        jugadores: juego.jugadores,
        ronda: juego.ronda,
        intentos: juego.intentos,
        numeroSecreto: juego.numeroSecreto
    });
});

// Ruta para verificar intento
app.post('/api/verificar-numero', (req, res) => {
    const { numero } = req.body;
    const resultado = juego.verificarIntento(parseInt(numero));
    res.json({ 
        message: resultado,
        success: true,
        intentos: juego.intentos,
        ronda: juego.ronda,
        rondaGeneral: juego.rondaGeneral,
        numeroSecreto: juego.numeroSecreto
    });
});

// Ruta para consultar el ganador
app.get('/api/ganador', (req, res) => {
    const ganador = juego.indicarGanador();
    res.json({
        success: true,
        ganador,
        rondasHistorial: juego.historialRondas
    });
});

// Ruta para obtener el historial completo
app.get('/api/historial', (req, res) => {
    res.json({
        success: true,
        historial: juego.obtenerHistorial()
    });
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
