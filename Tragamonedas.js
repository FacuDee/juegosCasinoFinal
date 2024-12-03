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
exports.Tragamonedas = void 0;
var JuegoCasino_1 = require("./JuegoCasino");
var rsl = require("readline-sync");
var Tragamonedas = /** @class */ (function (_super) {
    __extends(Tragamonedas, _super);
    function Tragamonedas(nombre, apuestaMin, miniInstruccion) {
        var _this = _super.call(this, nombre, apuestaMin, miniInstruccion) || this;
        _this.reels = ["🍒", "🍋", "🍉", "🍇", "🍌"];
        _this.combinacionGanadora = ["🍒", "🍒", "🍒"];
        _this.resultadoActual = [];
        _this.apuestaActual = 0;
        return _this;
    }
    Tragamonedas.prototype.generarRandom = function () {
        return Math.floor(Math.random() * this.reels.length);
    };
    Tragamonedas.prototype.jugar = function (jugador) {
        console.log("\u00A1Bienvenido ".concat(jugador.getNombre(), ": jugando al ").concat(this.getNombre(), "!"));
        var apuesta;
        // Pedir al jugador que haga su apuesta
        do {
            apuesta = parseInt(rsl.question("Ingrese su apuesta (minima ".concat(this.getApuestaMin(), "): ")), 10);
            if (isNaN(apuesta) || apuesta < this.getApuestaMin()) {
                console.log("La apuesta no es válida. Intente nuevamente.");
            }
        } while (isNaN(apuesta) || apuesta < this.getApuestaMin());
        // Realizar la apuesta y calcular el resultado
        this.realizarApuesta(jugador, apuesta);
    };
    Tragamonedas.prototype.realizarApuesta = function (jugador, monto) {
        if (jugador.getFichas() < monto) {
            console.log("No tiene suficientes fichas para apostar.");
            return;
        }
        jugador.apostar(monto);
        this.apuestaActual = monto;
        this.resultadoActual = [
            this.reels[this.generarRandom()],
            this.reels[this.generarRandom()],
            this.reels[this.generarRandom()],
        ];
        console.log("Resultado:", this.resultadoActual);
        this.resultado(jugador);
    };
    Tragamonedas.prototype.resultado = function (jugador) {
        if (JSON.stringify(this.resultadoActual) ===
            JSON.stringify(this.combinacionGanadora)) {
            var premio = this.apuestaActual * 10;
            jugador.ganarApuesta(premio);
            console.log("Ganaste ".concat(premio, " fichas!"));
        }
        else {
            console.log("Perdiste ".concat(this.apuestaActual, " fichas."));
        }
    };
    return Tragamonedas;
}(JuegoCasino_1.JuegoCasino));
exports.Tragamonedas = Tragamonedas;
