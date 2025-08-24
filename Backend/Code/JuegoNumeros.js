class JuegoNumeros {
    constructor() {
        this.numeroSecreto = null;
        this.jugadores = {
            jugador1: null,
            jugador2: null
        };
    }

    iniciarJuego(jugador1, jugador2) {
        this.numeroSecreto = this.generarNumeroSecreto();
        const numParaAsignarJugador = this.generarNumeroSecreto();
        if (numParaAsignarJugador%2 === 0) {
                this.jugadores.jugador1 = jugador1;
                this.jugadores.jugador2 = jugador2;
            } else {
                this.jugadores.jugador1 = jugador2;
                this.jugadores.jugador2 = jugador1;
            }
        console.log("Jugador 1: " + this.jugadores.jugador1 + ", Jugador 2: " + this.jugadores.jugador2 + ", Numero Secreto: " + this.numeroSecreto);
        this.jugadores.jugadorActual = jugador1;
        
        return {
            success: true,
            message: `Juego iniciado: ${jugador1} vs ${jugador2}`,
            numeroSecreto: this.numeroSecreto
        };
    }

    generarNumeroSecreto() {
        return Math.floor(Math.random() * 100) + 1; // Número entre 1 y 100
    }

    
    verificarIntento(numero) {
        if (numero === this.numeroSecreto) {
            return "¡Correcto!";
        }
        return numero < this.numeroSecreto ? "El número es mayor" : "El número es menor";
    }
}

module.exports = JuegoNumeros;
