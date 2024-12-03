"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jugador = void 0;
var Jugador = /** @class */ (function () {
    function Jugador(nombre, fichas) {
        this.nombre = nombre;
        this.fichas = fichas;
    }
    Jugador.prototype.getNombre = function () {
        return this.nombre;
    };
    Jugador.prototype.getFichas = function () {
        return this.fichas;
    };
    Jugador.prototype.apostar = function (cantidad) {
        if (cantidad <= 0) {
            console.log("".concat(this.nombre, " debe apostar una cantidad positiva."));
            return;
        }
        if (this.fichas >= cantidad) {
            this.fichas -= cantidad;
            console.log("".concat(this.nombre, " ha apostado ").concat(cantidad, " fichas."));
        }
        else {
            console.log("".concat(this.nombre, " no tiene suficientes fichas para hacer esta apuesta."));
        }
    };
    Jugador.prototype.ganarApuesta = function (cantidad) {
        this.fichas += cantidad;
        console.log("".concat(this.nombre, " ha ganado ").concat(cantidad, " fichas."));
    };
    return Jugador;
}());
exports.Jugador = Jugador;
