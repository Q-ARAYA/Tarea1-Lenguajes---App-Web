
class JuegoNumeros {
    constructor() {
        this.numeroSecreto = null;
        this.intentos = 0;
        this.ronda = 1;
        this.jugadores = {
            jugador1: null,
            jugador2: null
        };
    }


    iniciarJuego(jugador1, jugador2) {
        this.numeroSecreto = this.generarNumeroSecreto();
        this.intentos = 0;
        this.ronda = 1;
        const numParaAsignarJugador = this.generarNumeroSecreto();
        if (numParaAsignarJugador % 2 === 0) {
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
            this.intentos = 0;
            this.ronda += 1;
            this.numeroSecreto = this.generarNumeroSecreto();
            return "¡Correcto!";
        }
        this.intentos += 1;
        if (this.intentos >= 5) {
            const num = this.numeroSecreto;
            this.intentos = 0;
            this.ronda += 1;
            this.numeroSecreto = this.generarNumeroSecreto();
            return `Has agotado tus intentos. El número era ${num}.`;
        }
        return numero < this.numeroSecreto ? "El número es mayor" : "El número es menor";
    }
}

module.exports = JuegoNumeros;
