import { Tragamonedas } from "./Tragamonedas";
import * as rsl from "readline-sync";
import { Jugador } from "./Jugador";

export class TragamonedasPlus extends Tragamonedas {
  constructor() {
    super(
      "Tragamonedas Plus",
      20,
      "Consigue tres 🍒 en cualquiera de las dos filas para ganar."
    );
  }

  jugar(jugador: Jugador): void {
    console.log("¡Bienvenido al Tragamonedas Plus!");
    let apuesta: number;

    while (true) {
      apuesta = parseInt(rsl.question("Ingrese su apuesta: "), 10);

      if (!isNaN(apuesta) && apuesta >= this.getApuestaMin()) {
        break;
      }

      console.log(
        `La apuesta mínima es ${this.getApuestaMin()}. Intente nuevamente.`
      );
    }

    this.realizarApuesta(jugador, apuesta);
    rsl.question("Presione ENTER para retornar al MENU PRINCIPAL.");
  }

  realizarApuesta(jugador: Jugador, monto: number): void {
    if (jugador.getfichas() < monto) {
      console.log(
        `${jugador.getnombre()} no tiene suficientes fichas para apostar.`
      );
      return;
    }

    jugador.apostar(monto);

    const resultado1 = [
      this.reels[this.getRandom()],
      this.reels[this.getRandom()],
      this.reels[this.getRandom()],
    ];
    const resultado2 = [
      this.reels[this.getRandom()],
      this.reels[this.getRandom()],
      this.reels[this.getRandom()],
    ];

    console.log("Resultado 1:", resultado1);
    console.log("Resultado 2:", resultado2);

    this.resultado(jugador, [resultado1, resultado2], monto);
  }

  resultado(jugador: Jugador, resultado: string[][], monto: number): void {
    const esGanador = resultado.some(
      (res) => JSON.stringify(res) === JSON.stringify(this.combinacionGanadora)
    );

    if (esGanador) {
      const premio = monto * 15;
      jugador.ganarApuesta(premio);
      console.log(`¡${jugador.getnombre()} ganó ${premio} fichas!`);
    } else {
      console.log(`${jugador.getnombre()} perdió ${monto} fichas.`);
    }
  }
}
