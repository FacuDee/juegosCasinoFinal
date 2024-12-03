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
exports.Dados = void 0;
var rsl = require("readline-sync");
var JuegoCasino_1 = require("./JuegoCasino");
var Dados = /** @class */ (function (_super) {
    __extends(Dados, _super);
    function Dados(nombre, apuestaMin, miniInstruccion, dado1, dado2, apuesta) {
        var _this = _super.call(this, nombre, apuestaMin, miniInstruccion) || this;
        _this.dado1 = dado1;
        _this.dado2 = dado2;
        _this.apuesta = apuesta;
        return _this;
    }
    Dados.prototype.getdado1 = function () {
        return this.dado1;
    };
    Dados.prototype.setdado1 = function (dado1) {
        this.dado1 = dado1;
    };
    Dados.prototype.getdado2 = function () {
        return this.dado2;
    };
    Dados.prototype.setdado2 = function (dado2) {
        this.dado2 = dado2;
    };
    Dados.prototype.getapuesta = function () {
        return this.apuesta;
    };
    Dados.prototype.setapuesta = function (apuesta) {
        this.apuesta = apuesta;
    };
    //************ Ranndom para los Dados *************** */
    Dados.prototype.arrojarDados = function () {
        this.setdado1(Math.floor(Math.random() * 6) + 1);
        console.log("Primer DADO sale ", this.getdado1());
        this.setdado2(Math.floor(Math.random() * 6) + 1);
        console.log("Segundo DADO sale ", this.getdado2());
        var resultado = this.getdado1() + this.getdado2();
        return resultado;
    };
    //**************  Logica del juego  ******************** */
    Dados.prototype.comenzarjugo = function (apuesta) {
        var resultado1;
        resultado1 = this.arrojarDados();
        if (resultado1 == 7 || resultado1 == 11) {
            //  si saca 7 u 11 Gana en el primer tiro
            console.log("El resultado es: ", resultado1);
            apuesta = Math.floor(apuesta * 1.5); // para ajustar
            console.log("Felicitaciones, Natural, Ha Ganado en el Primer tiro ", apuesta, " $");
            console.log("Duplicas la Apuesta ");
        }
        else if (resultado1 == 2 || resultado1 == 3 || resultado1 == 12) {
            // si saca 2,3 o 12 pierde en el primer tigo
            apuesta = 0;
            console.log("El resultado es: ", resultado1);
            console.log("Craps, Ha Perdido el juego ");
        }
        else {
            // Inicia el ciclo POINT, se acumula en resultado1 el valor del Primer tiro
            var resultado2 = void 0;
            resultado2 = 1;
            console.log("Establece un POINT, con el resultado ", resultado1, ", tira nuevamente: ");
            while (resultado2 != resultado1 && resultado2 != 7) {
                // se tira nuevamente hasta que se repita el primer tiro o salga 7 que piede
                var teclaParaAbanzar = rsl.question(" Presione ENTER para Continuar ");
                resultado2 = this.arrojarDados();
                if (resultado1 == resultado2) {
                    apuesta = Math.floor(apuesta * 1.2);
                    console.log("HA GANADO :", apuesta, " ya que el primer tiro :", resultado1, " es igual al nuevo tiro :", resultado2, " es POINT ");
                }
                else if (resultado2 != 7) {
                    console.log("El Point es :", resultado1);
                    console.log("La suma de los dados es ", resultado2, " no coinciden, tira nuevamente: ");
                }
                else {
                    console.log("Ha Perdido el juego, ya que Sacaste ", resultado2, " Seven Out ");
                    apuesta = 0;
                }
            }
        }
        return apuesta;
    };
    Dados.prototype.validarApuesta = function (jugador) {
        var eleccionApuesta = rsl.questionInt("La apuesta minima es " +
            this.getApuestaMin() +
            "; cuanto desea apostar?: ");
        if (eleccionApuesta >= this.getApuestaMin() &&
            eleccionApuesta <= jugador.getFichas()) {
            jugador.apostar(eleccionApuesta); // metodo de Jugador, Se resta apuesta al saldo
        }
        else {
            while (eleccionApuesta < this.getApuestaMin() ||
                eleccionApuesta > jugador.getFichas()) {
                // mayor a saldo y mayor que apuesta minima 5
                jugador.apostar(eleccionApuesta); // metodo de Jugador, Se resta apuesta al saldo
                eleccionApuesta = parseInt(rsl.question("La apuesta minima es " +
                    this.getApuestaMin() +
                    "; cuanto desea apostar?: "), 10);
            }
        }
        this.setapuesta(eleccionApuesta);
    };
    //**************** Comienzo juego   ***************** */
    Dados.prototype.jugar = function (jugador) {
        console.log(this.getMiniInstruccion());
        console.log("Saldo inicial: ", jugador.getFichas());
        this.validarApuesta(jugador); //Pasamos Saldo por parametro
        var ganancia = this.comenzarjugo(this.getapuesta());
        // ganacia *1,5 si gana Natural, *1,2 si gana point, o 0 si pierde.
        jugador.ganarApuesta(ganancia);
        console.log("Saldo final: ", jugador.getFichas());
        this.resultado();
    };
    Dados.prototype.resultado = function () {
        var teclaParaAbanzar = rsl.question(" Presione ENTER para retornar al MENU PRINCIPAL ");
    };
    return Dados;
}(JuegoCasino_1.JuegoCasino));
exports.Dados = Dados;
