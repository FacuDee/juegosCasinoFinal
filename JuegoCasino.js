"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JuegoCasino = void 0;
var JuegoCasino = /** @class */ (function () {
    function JuegoCasino(nombre, apuestaMin, miniInstruccion) {
        this.nombre = nombre;
        this.apuestaMin = apuestaMin;
        this.miniInstruccion = miniInstruccion;
    }
    JuegoCasino.prototype.getNombre = function () {
        return this.nombre;
    };
    JuegoCasino.prototype.getApuestaMin = function () {
        return this.apuestaMin;
    };
    JuegoCasino.prototype.getMiniInstruccion = function () {
        return this.miniInstruccion;
    };
    return JuegoCasino;
}());
exports.JuegoCasino = JuegoCasino;
