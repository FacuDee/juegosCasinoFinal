import { Tragamonedas } from "./Tragamonedas";
import * as rsl from "readline-sync";
import { Jugador } from "./Jugador";

export class TragamonedasClasico extends Tragamonedas {
  constructor() {
    super("Tragamonedas Clásico", 10, "Consigue tres 🍒 seguidas para ganar.");
  }

  jugar(jugador: Jugador): void {
    console.log("¡Bienvenido al Tragamonedas Clásico!");
    let apuesta: number;

    while (true) {
      apuesta = parseInt(
        rsl.question(`Ingrese su apuesta (minima ${this.getApuesta()}): `),
        10
      );

      if (!isNaN(apuesta) && apuesta >= this.getApuesta()) {
        break;
      }

      console.log(
        `La apuesta mínima es ${this.getApuesta()}. Intente nuevamente.`
      );
    }

    this.realizarApuesta(jugador, apuesta);
    rsl.question("Presione ENTER para retornar al MENU PRINCIPAL.");
  }
}
