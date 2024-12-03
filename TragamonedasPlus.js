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
exports.TragamonedasPlus = void 0;
var Tragamonedas_1 = require("./Tragamonedas");
var rsl = require("readline-sync");
var TragamonedasPlus = /** @class */ (function (_super) {
    __extends(TragamonedasPlus, _super);
    function TragamonedasPlus() {
        var _this = _super.call(this, "Tragamonedas Plus", 20, "Consigue tres 🍒 en cualquiera de las dos filas para ganar.") || this;
        _this.resultadoExtra = [];
        return _this;
    }
    TragamonedasPlus.prototype.jugar = function (jugador) {
        console.log("¡Bienvenido al Tragamonedas Plus!");
        var apuesta;
        while (true) {
            apuesta = parseInt(rsl.question("Ingrese su apuesta (minima ".concat(this.getApuestaMin(), "): ")), 10);
            if (!isNaN(apuesta) && apuesta >= this.getApuestaMin()) {
                break;
            }
            console.log("La apuesta m\u00EDnima es ".concat(this.getApuestaMin(), ". Intente nuevamente."));
        }
        this.realizarApuesta(jugador, apuesta);
        rsl.question("Presione ENTER para retornar al MENU PRINCIPAL.");
    };
    TragamonedasPlus.prototype.realizarApuesta = function (jugador, monto) {
        if (jugador.getFichas() < monto) {
            console.log("".concat(jugador.getNombre(), " no tiene suficientes fichas para apostar."));
            return;
        }
        jugador.apostar(monto);
        this.apuestaActual = monto;
        this.resultadoActual = [
            this.reels[this.generarRandom()],
            this.reels[this.generarRandom()],
            this.reels[this.generarRandom()],
        ];
        this.resultadoExtra = [
            this.reels[this.generarRandom()],
            this.reels[this.generarRandom()],
            this.reels[this.generarRandom()],
        ];
        console.log("Resultado 1:", this.resultadoActual);
        console.log("Resultado 2:", this.resultadoExtra);
        this.resultado(jugador);
    };
    TragamonedasPlus.prototype.resultado = function (jugador) {
        var _this = this;
        var esGanador = [this.resultadoActual, this.resultadoExtra].some(function (res) { return JSON.stringify(res) === JSON.stringify(_this.combinacionGanadora); });
        if (esGanador) {
            var premio = this.apuestaActual * 15;
            jugador.ganarApuesta(premio);
            console.log("\u00A1".concat(jugador.getNombre(), " gan\u00F3 ").concat(premio, " fichas!"));
        }
        else {
            console.log("".concat(jugador.getNombre(), " perdi\u00F3 ").concat(this.apuestaActual, " fichas."));
        }
    };
    return TragamonedasPlus;
}(Tragamonedas_1.Tragamonedas));
exports.TragamonedasPlus = TragamonedasPlus;
