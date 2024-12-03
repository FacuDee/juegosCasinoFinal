"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackJack = void 0;
var rls = require("readline-sync");
var JuegoCasino_1 = require("./JuegoCasino");
var BlackJack = /** @class */ (function (_super) {
    __extends(BlackJack, _super);
    function BlackJack(apuestaMin, jugador) {
        var _this = _super.call(this, "BlackJack", apuestaMin, "Obtén un puntaje lo más cercano a 21 sin pasarte, superando al crupier.") || this;
        _this.jugador = jugador;
        _this.mazo = _this.crearMazo();
        _this.manoJugador = [];
        _this.manoCrupier = [];
        return _this;
    }
    BlackJack.prototype.crearMazo = function () {
        var palos = ["Corazones", "Diamantes", "Tréboles", "Picas"];
        var valores = [
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "J",
            "Q",
            "K",
            "A",
        ];
        var mazo = [];
        for (var _i = 0, palos_1 = palos; _i < palos_1.length; _i++) {
            var palo = palos_1[_i];
            for (var _a = 0, valores_1 = valores; _a < valores_1.length; _a++) {
                var valor = valores_1[_a];
                mazo.push("".concat(valor, " de ").concat(palo));
            }
        }
        return this.barajar(mazo);
    };
    BlackJack.prototype.barajar = function (mazo) {
        return mazo.sort(function () { return Math.random() - 0.5; });
    };
    BlackJack.prototype.iniciarJuego = function () {
        console.log("Iniciando juego de BlackJack...");
        this.mazo = this.crearMazo();
        this.manoJugador = [];
        this.manoCrupier = [];
    };
    BlackJack.prototype.obtenerValorCarta = function (carta) {
        var valor = carta.split(" ")[0];
        if (["J", "Q", "K"].indexOf(valor) !== -1)
            return 10;
        if (valor === "A")
            return 11; // El manejo del 1/11 será dinámico
        return parseInt(valor);
    };
    // de una mano:
    BlackJack.prototype.calcularPuntaje = function (mano) {
        var total = 0;
        var ases = 0;
        for (var _i = 0, mano_1 = mano; _i < mano_1.length; _i++) {
            var carta = mano_1[_i];
            var valor = this.obtenerValorCarta(carta);
            total += valor;
            if (valor === 11)
                ases++;
        }
        // Para ajustar el valor de los Ases si el puntaje supera 21
        while (total > 21 && ases > 0) {
            total -= 10; // Cambiar un As de 11 a 1
            ases--;
        }
        return total;
    };
    // Repartir cartas iniciales
    BlackJack.prototype.repartirCartas = function () {
        this.manoJugador = [this.mazo.pop(), this.mazo.pop()];
        this.manoCrupier = [this.mazo.pop(), this.mazo.pop()];
    };
    BlackJack.prototype.turnoJugador = function () {
        console.log("Tu mano:", this.manoJugador, "Puntaje:", this.calcularPuntaje(this.manoJugador));
        var decision = rls
            .question("¿Quieres 'pedir' carta o 'quedarte'? (hit/stand): ")
            .toLowerCase();
        while (decision === "Pedir Carta") {
            this.manoJugador.push(this.mazo.pop());
            var puntaje = this.calcularPuntaje(this.manoJugador);
            console.log("Tu nueva mano:", this.manoJugador, "Puntaje:", puntaje);
            if (puntaje > 21) {
                console.log("Te pasaste. ¡Quedas fuera!");
                return;
            }
            decision = rls
                .question("¿Quieres pedir otra carta o quedarte? (hit/stand): ")
                .toLowerCase();
        }
    };
    BlackJack.prototype.turnoCrupier = function () {
        console.log("Mano del crupier:", this.manoCrupier);
        while (this.calcularPuntaje(this.manoCrupier) < 17) {
            this.manoCrupier.push(this.mazo.pop());
            console.log("El/la crupier toma una carta. Nueva mano:", this.manoCrupier);
        }
    };
    BlackJack.prototype.determinarGanador = function () {
        var puntajeJugador = this.calcularPuntaje(this.manoJugador);
        var puntajeCrupier = this.calcularPuntaje(this.manoCrupier);
        console.log("Tu puntaje:", puntajeJugador, "Puntaje del crupier:", puntajeCrupier);
        if (puntajeJugador > 21) {
            console.log("Te pasaste. ¡Perdiste!");
        }
        else if (puntajeCrupier > 21 || puntajeJugador > puntajeCrupier) {
            console.log("¡Ganaste!");
        }
        else if (puntajeJugador < puntajeCrupier) {
            console.log("Perdiste!");
        }
        else {
            console.log("Empate");
        }
    };
    BlackJack.prototype.resultado = function () {
        //método abstracto de la clase padre
        this.determinarGanador();
    };
    // Iniciar
    BlackJack.prototype.jugar = function () {
        if (this.jugador.getFichas() < this.getApuestaMin()) {
            console.log("".concat(this.jugador.getNombre(), " no tiene suficientes fichas para apostar."));
            return;
        }
        this.iniciarJuego();
        this.repartirCartas();
        this.turnoJugador();
        if (this.calcularPuntaje(this.manoJugador) <= 21) {
            this.turnoCrupier();
            this.determinarGanador();
        }
        var teclaParaAbanzar = rls.question(" Presione ENTER para retornar al MENU PRINCIPAL ");
    };
    return BlackJack;
}(JuegoCasino_1.JuegoCasino));
exports.BlackJack = BlackJack;
