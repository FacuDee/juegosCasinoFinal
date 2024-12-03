"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Casino_1 = require("./Casino");
var TragamonedasClasico_1 = require("./TragamonedasClasico");
var Jugador_1 = require("./Jugador");
var Dados_1 = require("./Dados");
var BlackJack_1 = require("./BlackJack");
var Ruleta_1 = require("./Ruleta");
var TragamonedasPlus_1 = require("./TragamonedasPlus");
var arrJugadores = [
    new Jugador_1.Jugador("Facundo", 400),
    new Jugador_1.Jugador("Lucas", 400),
    new Jugador_1.Jugador("Mayra", 400),
    new Jugador_1.Jugador("Melisa", 400),
    new Jugador_1.Jugador("Maia", 400),
];
//*********** Se inicia y carga el arreglo de jugadores ******************* */
var dados = new Dados_1.Dados("Dados", 10, "Natural, gana sacando 7 u 11 en el primer tiro. Craps pierde si saca 2,3 u 12 en el primer tiro.. sino tira hasta que repita el prumer tiro' Gana' o saque 7 y pierde lo que suceda primero", 0, 0, 0);
var tragamonedasClasico = new TragamonedasClasico_1.TragamonedasClasico();
var tragamonedasPlus = new TragamonedasPlus_1.TragamonedasPlus();
var ruleta = new Ruleta_1.Ruleta(15, 15, 0);
var blackJack = new BlackJack_1.BlackJack(9, arrJugadores[4]);
//********Se construyen las variables de Cadajuego con sus parametros******* */
var arrJuegos = [];
arrJuegos.push(tragamonedasClasico);
arrJuegos.push(tragamonedasPlus);
arrJuegos.push(dados);
arrJuegos.push(blackJack);
arrJuegos.push(ruleta);
///**********Se inicia y carga el arreglo de Juegos************************* */
var primerCasino = new Casino_1.Casino(arrJugadores, arrJuegos);
//******* Cargamos el PrimerCasino Con los Erreglos de Jugadores y Juegos ****//
primerCasino.menuDeJuegos();
///********* Llamaos al menu de seleccion, de Casino ********************** */
