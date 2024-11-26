import { Tragamonedas } from "./Tragamonedas";
import * as rsl from "readline-sync";
import { Jugador } from "./Jugador";

export class TragamonedasPlus extends Tragamonedas {
  private resultadoExtra: string[];

  constructor() {
    super(
      "Tragamonedas Plus",
      20,
      "Consigue tres 🍒 en cualquiera de las dos filas para ganar."
    );
    this.resultadoExtra = [];
  }

  jugar(jugador: Jugador): void {
    console.log("¡Bienvenido al Tragamonedas Plus!");
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

  realizarApuesta(jugador: Jugador, monto: number): void {
    if (jugador.getFichas() < monto) {
      console.log(
        `${jugador.getNombre()} no tiene suficientes fichas para apostar.`
      );
      return;
    }

    jugador.apostar(monto);
    this.apuestaActual = monto;

    this.resultadoActual = [
      this.reels[this.getRandom()],
      this.reels[this.getRandom()],
      this.reels[this.getRandom()],
    ];
    this.resultadoExtra = [
      this.reels[this.getRandom()],
      this.reels[this.getRandom()],
      this.reels[this.getRandom()],
    ];

    console.log("Resultado 1:", this.resultadoActual);
    console.log("Resultado 2:", this.resultadoExtra);

    this.resultado(jugador);
  }

  resultado(jugador: Jugador): void {
    const esGanador = [this.resultadoActual, ...this.resultadoExtra].some(
      (res) => JSON.stringify(res) === JSON.stringify(this.combinacionGanadora)
    );

    if (esGanador) {
      const premio = this.apuestaActual * 15;
      jugador.ganarApuesta(premio);
      console.log(`¡${jugador.getNombre()} ganó ${premio} fichas!`);
    } else {
      console.log(
        `${jugador.getNombre()} perdió ${this.apuestaActual} fichas.`
      );
    }
  }
}
