class JuegoNumeros {
    constructor() {
        this.numeroSecreto = null;
        this.ronda = 0;
        this.jugadores = {
            jugador1: null,
            jugador2: null
        };
        this.intentos = 0;
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
            this.avanzarRonda();
            return "¡Correcto!";
        }
        this.intentos += 1;
        if (this.intentos >= 5) {
            this.avanzarRonda();
            return `Has agotado tus intentos. El número era ${this.numeroSecreto}.`;
        }
        return numero < this.numeroSecreto ? "El número es mayor" : "El número es menor";
    }

    avanzarRonda() {
        this.ronda += 1;
        this.intentos = 0;
        if (this.ronda > 6) {
            terminarJuego();  
        }
    }

    terminarJuego() {
        this.numeroSecreto = null;
        this.ronda = 0;
        this.jugadores = {
            jugador1: null,
            jugador2: null
        };
        indicarGanador();
    }

    indicarGanador() {
        if (this.intentos.jugador1 < this.intentos.jugador2) {
            return `${this.jugadores.jugador1} gana!`;
        } else if (this.intentos.jugador2 < this.intentos.jugador1) {
            return `${this.jugadores.jugador2} gana!`;
        } else {
            return "¡Es un empate!";
        }
    }
}



module.exports = JuegoNumeros;
