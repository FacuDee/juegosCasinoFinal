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
exports.Ruleta = void 0;
var rsl = require("readline-sync");
var JuegoCasino_1 = require("./JuegoCasino");
var Ruleta = /** @class */ (function (_super) {
    __extends(Ruleta, _super);
    function Ruleta(apuestaMin, apuesta, numeroApostado) {
        var _this = _super.call(this, "Ruleta", apuestaMin, "En un tablero de 36 numeros, repartidos entre rojos, Negros y 0 verde, elige un numero o color, si acierta Gana") || this;
        _this.apuesta = apuesta;
        _this.numeroApostado = numeroApostado;
        return _this;
    }
    Ruleta.prototype.getApuesta = function () {
        return this.apuesta;
    };
    Ruleta.prototype.setApuesta = function (NuevaApuesta) {
        this.apuesta = NuevaApuesta;
    };
    Ruleta.prototype.getNumeroApostado = function () {
        return this.numeroApostado;
    };
    Ruleta.prototype.setNumeroApostado = function (nuevoNumero) {
        this.numeroApostado = nuevoNumero;
    };
    Ruleta.prototype.girarRuleta = function () {
        var numero = Math.floor(Math.random() * 37);
        var numerosColorados = [
            1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
        ];
        console.log("Ha salido el: ".concat(numero));
        if (numero === 0) {
            console.log("Verde");
        }
        if (numerosColorados.indexOf(numero) !== -1) {
            console.log("Colorado");
        }
        else {
            console.log("Negro");
        }
        if (numero % 2 === 0) {
            console.log("Par");
        }
        else {
            console.log("Impar");
        }
        if (numero >= 1 && numero <= 18) {
            console.log("Menor");
        }
        else {
            console.log("Mayor");
        }
        return numero;
    };
    Ruleta.prototype.validarApuesta = function (jugador) {
        this.setApuesta(Number(rsl.question("Ingrese una apuesta valida: ")));
        this.setNumeroApostado(Number(rsl.question("Ingrese un numero entre 0 y 36:")));
        while (this.apuesta < this.getApuestaMin() ||
            this.apuesta > jugador.getFichas() ||
            this.numeroApostado > 36 ||
            this.numeroApostado < 0) {
            console.log("Apuesta invalida. Intente nuevamente.");
            this.setApuesta(Number(rsl.question("Ingrese una apuesta valida: ")));
            this.setNumeroApostado(Number(rsl.question("Ingrese un numero entre 0 y 36:")));
        }
        jugador.apostar(this.apuesta);
        // console.log(
        //   `Haz apostado ${this.apuesta} al numero ${this.numeroApostado}`
        // );
    };
    Ruleta.prototype.resultado = function (jugador) {
        var numeroGanador = this.girarRuleta();
        var ganancia;
        if (numeroGanador === this.numeroApostado) {
            ganancia = this.apuesta * 35;
            jugador.ganarApuesta(ganancia);
        }
        else {
            ganancia = 0;
            console.log(" No acertaste. Tu nuevo saldo es ".concat(jugador.getFichas(), "."));
        }
        if (jugador.getFichas() <= 0) {
            console.log("No tienes más saldo para jugar");
        }
        rsl.question("Presione ENTER para retornar al MENU PRINCIPAL.");
    };
    Ruleta.prototype.jugar = function (jugador) {
        console.log(this.getMiniInstruccion());
        this.validarApuesta(jugador);
        this.resultado(jugador);
    };
    return Ruleta;
}(JuegoCasino_1.JuegoCasino));
exports.Ruleta = Ruleta;
