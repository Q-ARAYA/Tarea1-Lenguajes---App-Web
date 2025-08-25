const fs = require('fs');
const path = require('path');


class JuegoNumeros {
    constructor() {
        this.numeroSecreto = null;
        this.intentos = 0;
        this.ronda = 1; // Ronda interna
        this.rondaGeneral = 1; // Ronda general
        this.jugadores = {
            jugador1: null,
            jugador2: null,
            intentos1: 0,
            intentos2: 0
        };
        this.resultadoFinal = null;
        this.historialRondas = []; // Historial por ronda general
        this.numeroSecretoParaJugador1 = null;
        this.numeroSecretoParaJugador2 = null;
        this.resultadoRondaParaJugador1 = null;
        this.resultadoRondaParaJugador2 = null;

        this.rutaHistorialGlobal = path.join(__dirname, 'historialGlobal.json');
    }

    iniciarJuego(jugador1, jugador2) {
        this.numeroSecretoParaJugador1 = this.generarNumeroSecreto();
        this.numeroSecretoParaJugador2 = this.generarNumeroSecreto();
        this.intentos = 0;
        this.ronda = 1;
        this.rondaGeneral = 1;
        this.jugadores = {
            jugador1: jugador1,
            jugador2: jugador2,
            intentos1: 0,
            intentos2: 0
        };
        this.resultadoFinal = null;
        this.historialRondas = [];
        this.resultadoRondaParaJugador1 = null;
        this.resultadoRondaParaJugador2 = null;
        this.jugadores.jugadorActual = jugador1;

        console.log(`Juego iniciado: ${jugador1} vs ${jugador2}`);
        console.log(`Jugador1 secreto: ${this.numeroSecretoParaJugador1}, Jugador2 secreto: ${this.numeroSecretoParaJugador2}`);
        return {
            success: true,
            message: `Juego iniciado: ${jugador1} vs ${jugador2}`,
        };
    }

    generarNumeroSecreto() {
        return Math.floor(Math.random() * 100) + 1;
    }

    verificarIntento(numero) {
        const numeroSecretoActual = this.ronda % 2 === 1 ? this.numeroSecretoParaJugador1 : this.numeroSecretoParaJugador2;

        let mensaje = "";
        if (numero === numeroSecretoActual) {
            mensaje = "¡Correcto!";
            if (this.ronda % 2 === 1) {
                this.resultadoRondaParaJugador1 = "✔";
            } else {
                this.resultadoRondaParaJugador2 = "✔";
            }
        } else {
            if (this.ronda % 2 === 1) {
                this.jugadores.intentos1 += 1;
            } else {
                this.jugadores.intentos2 += 1;
            }
            if (this.intentos + 1 >= 5) {
                mensaje = `Has agotado tus intentos. El número era ${numeroSecretoActual}.`;
                if (this.ronda % 2 === 1) {
                    this.resultadoRondaParaJugador1 = "X";
                } else {
                    this.resultadoRondaParaJugador2 = "X";
                }
            } else {
                mensaje = numero < numeroSecretoActual ? "El número es mayor" : "El número es menor";
            }
        }

        this.intentos += 1;

        // Si acertó o agotó intentos, reinicia contador y avanza ronda
        if (mensaje === "¡Correcto!" || mensaje.includes("Has agotado")) {
            this.intentos = 0;
            if (this.ronda % 2 === 0) {
                this.guardarHistorialRonda();
            }
            this.avanzarRonda();
        }

        return mensaje;
    }

    guardarHistorialRonda() {
        // Se guarda después de que jugador 2 termina su turno
        this.historialRondas.push({
            rondaGeneral: this.rondaGeneral,
            numeroSecretoJugador1: this.numeroSecretoParaJugador1,
            intentosJugador1: this.jugadores.intentos1,
            resultadoRondaParaJugador1: this.resultadoRondaParaJugador1,
            numeroSecretoJugador2: this.numeroSecretoParaJugador2,
            intentosJugador2: this.jugadores.intentos2,
            resultadoRondaParaJugador2: this.resultadoRondaParaJugador2
        });
        this.rondaGeneral += 1;

        // Reiniciar los resultados de la ronda
        this.resultadoRondaParaJugador1 = null;
        this.resultadoRondaParaJugador2 = null;
        this.numeroSecretoParaJugador1 = this.generarNumeroSecreto();
        this.numeroSecretoParaJugador2 = this.generarNumeroSecreto();
        console.log(`Jugador1 secreto: ${this.numeroSecretoParaJugador1}, Jugador2 secreto: ${this.numeroSecretoParaJugador2}`);
    }

    avanzarRonda() {
        this.ronda += 1;
        this.numeroSecreto = this.ronda % 2 === 1 ? this.numeroSecretoParaJugador1 : this.numeroSecretoParaJugador2;

        if (this.ronda > 6) { // 6 rondas internas = 3 rondas generales
            this.terminarJuego();
        }
    }

    terminarJuego() {
        this.resultadoFinal = this.indicarGanador();
        this.agregarPartidaAlHistorialGlobal();
    }

    indicarGanador() {
        if (this.resultadoFinal) return this.resultadoFinal;

        if (this.jugadores.intentos1 < this.jugadores.intentos2) return this.jugadores.jugador1;
        else if (this.jugadores.intentos2 < this.jugadores.intentos1) return this.jugadores.jugador2;
        else return "¡Es un empate!";
    }

    obtenerHistorial() {
        return this.historialRondas;
    }

    agregarPartidaAlHistorialGlobal() {
        const datosPartida = {
            fecha: new Date().toISOString(),
            jugadores: this.jugadores,
            resultadoFinal: this.resultadoFinal,
            historialRondas: this.historialRondas
        };

        // Leer archivo existente
        let historialGlobal = [];
        if (fs.existsSync(this.rutaHistorialGlobal)) {
            const contenido = fs.readFileSync(this.rutaHistorialGlobal, 'utf8');
            if (contenido) historialGlobal = JSON.parse(contenido);
        }

        // Agregar nueva partida
        historialGlobal.push(datosPartida);

        // Guardar nuevamente
        fs.writeFileSync(this.rutaHistorialGlobal, JSON.stringify(historialGlobal, null, 2));
        console.log("Historial global actualizado con la última partida.");
    }
}

module.exports = JuegoNumeros;
