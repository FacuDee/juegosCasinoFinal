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

const dados :Dados = new Dados ("Dados",10,"Natural, gana sacando 7 u 11 en el primer tiro. Craps pierde si saca 2,3 u 12 en el primer tiro.. sino tira hasta que repita el prumer tiro' Gana' o saque 7 y pierde lo que suceda primero",0,0,0);
const tragamonedasClasico: TragamonedasClasico = new TragamonedasClasico("Tragamonedas Clasico",10, " Se arroja la palanca si saca 🍒🍒🍒 Gana el juego. ");
const tragamonedasPlus: TragamonedasPlus = new TragamonedasPlus("Tragamonedas Plus",15, " Consigue tres 🍒 en cualquiera de las dos filas para ganar. ");
const ruleta: Ruleta = new Ruleta("Ruleta",10, "En un tablero de 36 numeros, repartidos entre rojos, Negros y 0 verde, elige un numero o color, si acierta Gana",100,10,10);
const blackJack: BlackJack  = new BlackJack("Black Jack",9, "Obtén un puntaje lo más cercano a 21 sin pasarte, superando al crupier.",[],[],[]);
//********Se construyen las variables de Cadajuego con sus parametros******* */

const arrJuegos : JuegoCasino []=[];

arrJuegos.push(tragamonedasClasico);
arrJuegos.push(tragamonedasPlus);
arrJuegos.push(dados);
arrJuegos.push(blackJack);
arrJuegos.push(ruleta);


///**********Se inicia y carga el arreglo de Juegos************************* */

const primerCasino: Casino = new Casino (arrJugadores,arrJuegos);

//******* Cargamos el PrimerCasino Con los Erreglos de Jugadores y Juegos ****//
primerCasino.menuDeJuegos();

///********* Llamaos al menu de seleccion, de Casino ********************** */

