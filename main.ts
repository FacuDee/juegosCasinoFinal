import * as rsl from "readline-sync";
import { Casino } from "./Casino";
import { TragamonedasClasico } from "./TragamonedasClasico";
import { Jugador } from "./Jugador";
import { JuegoCasino } from "./JuegoCasino";
import { Dados } from "./Dados";
import { BlackJack } from "./BlackJack";
import { Ruleta } from "./Ruleta";
import { TragamonedasPlus } from "./TragamonedasPlus";

const arrJugadores: Jugador[] = [
  new Jugador("Facundo", 400),
  new Jugador("Lucas", 400),
  new Jugador("Mayra", 400),
  new Jugador("Melisa", 400),
  new Jugador("Maia", 400),
];
//*********** Se inicia y carga el arreglo de jugadores ******************* */

const dados: Dados = new Dados(
  "Dados",
  10,
  "Natural, gana sacando 7 u 11 en el primer tiro. Craps pierde si saca 2,3 u 12 en el primer tiro.. sino tira hasta que repita el prumer tiro' Gana' o saque 7 y pierde lo que suceda primero",
  0,
  0,
  0
);
const tragamonedasClasico: TragamonedasClasico = new TragamonedasClasico();
const tragamonedasPlus: TragamonedasPlus = new TragamonedasPlus();
const ruleta: Ruleta = new Ruleta(15, 15, 0);
const blackJack: BlackJack = new BlackJack(9, arrJugadores[4]);
//********Se construyen las variables de Cadajuego con sus parametros******* */

const arrJuegos: JuegoCasino[] = [];

arrJuegos.push(tragamonedasClasico);
arrJuegos.push(tragamonedasPlus);
arrJuegos.push(dados);
arrJuegos.push(blackJack);
arrJuegos.push(ruleta);

///**********Se inicia y carga el arreglo de Juegos************************* */

const primerCasino: Casino = new Casino(arrJugadores, arrJuegos);

//******* Cargamos el PrimerCasino Con los Erreglos de Jugadores y Juegos ****//
primerCasino.menuDeJuegos();

///********* Llamaos al menu de seleccion, de Casino ********************** */
