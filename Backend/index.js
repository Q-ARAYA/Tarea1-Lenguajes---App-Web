const express = require('express');
const cors = require('cors');
const JuegoNumeros = require('./code/JuegoNumeros');

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
    res.json(resultado);
});

// Ruta para verificar un intento
app.post('/api/verificar-numero', (req, res) => {
    const { numero } = req.body;
    const resultado = juego.verificarIntento(parseInt(numero));
    res.json({ 
        message: resultado,
        success: true 
    });
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
