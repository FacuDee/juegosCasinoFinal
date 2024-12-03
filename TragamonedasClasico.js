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
exports.TragamonedasClasico = void 0;
var Tragamonedas_1 = require("./Tragamonedas");
var rsl = require("readline-sync");
var TragamonedasClasico = /** @class */ (function (_super) {
    __extends(TragamonedasClasico, _super);
    function TragamonedasClasico() {
        return _super.call(this, "Tragamonedas Clásico", 10, "Consigue tres 🍒 seguidas para ganar.") || this;
    }
    TragamonedasClasico.prototype.jugar = function (jugador) {
        console.log("¡Bienvenido al Tragamonedas Clásico!");
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
    return TragamonedasClasico;
}(Tragamonedas_1.Tragamonedas));
exports.TragamonedasClasico = TragamonedasClasico;
