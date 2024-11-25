import * as rsl from "readline-sync";
import { Casino } from "./Casino";
import { Tragamonedas } from "./Tragamonedas";
import { Jugador } from "./Jugador";
import { JuegoCasino } from "./JuegoCasino";
import { Dados } from "./Dados";
import { BlackJack } from "./blackJack";
import { Ruleta } from "./Ruleta";
import { TragamonedasPlus } from "./TragamonedasPlus";




const arrJugadores: Jugador[] = [
  new Jugador("Facundo", 400),
  new Jugador("Lucas", 400),
  new Jugador("Mayra", 400),
  new Jugador("Melisa", 400),
  new Jugador("Maia", 400),
];


const dados :Dados = new Dados ("Dados",10,"Natural, gana sacando 7 u 11 en el primer tiro. Craps pierde si saca 2,3 u 12 en el primer tiro.. sino tira hasta que repita el prumer tiro' Gana' o saque 7 y pierde lo que suceda primero",0,0,0);
const tragamonedas: Tragamonedas = new Tragamonedas()//("Tragamonedas",5, "Se arroja la palanca si saca 🍒🍒🍒 Gana el juego");
const ruleta: Ruleta = new Ruleta("Ruleta",10, "En un tablero de 36 numeros, repartidos entre rojos, Negros y 0 verde, elige un numero o color, si acierta Gana");
const tragamonedasPlus: Tragamonedas = new Tragamonedas("Tragamonedas",10, "Se arroja la palanca si saca, tres rolos con 🍒🍒🍒 Gana el juego");
const blackJack: BlackJack  = new BlackJack("Black Jack",9, "Obtén un puntaje lo más cercano a 21 sin pasarte, superando al crupier.",[],[],[]);
const arrJuegos : JuegoCasino []=[];

arrJuegos.push(dados);
arrJuegos.push(tragamonedas);
arrJuegos.push(ruleta);
arrJuegos.push(blackJack);
arrJuegos.push(tragamonedasPlus);

const primerCasino: Casino = new Casino (arrJugadores,arrJuegos);
primerCasino.menuDeJuegos();


