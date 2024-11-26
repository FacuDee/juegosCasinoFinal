import { JuegoCasino } from "./JuegoCasino";
import { Jugador } from "./Jugador";
import * as rsl from "readline-sync";

export class Tragamonedas extends JuegoCasino {
  reels: string[] = ["🍒", "🍋", "🍉", "🍇", "🍌"];
  combinacionGanadora: string[];
  protected resultadoActual: string[];
  protected apuestaActual: number;

  constructor(nombre: string, apuestaMin: number, miniInstruccion: string) {
    super(nombre, apuestaMin, miniInstruccion);
    this.combinacionGanadora = ["🍒", "🍒", "🍒"];
    this.resultadoActual = [];
    this.apuestaActual = 0;
  }

  jugar(jugador: Jugador): void {
    console.log(
      `¡Bienvenido ${jugador.getNombre()}: jugando al ${this.getNombre()}!`
    );
    let apuesta: number;

    // Pedir al jugador que haga su apuesta
    do {
      apuesta = parseInt(
        rsl.question(`Ingrese su apuesta (minima ${this.getApuesta()}): `),
        10
      );
      if (isNaN(apuesta) || apuesta < this.getApuesta()) {
        console.log("La apuesta no es válida. Intente nuevamente.");
      }
    } while (isNaN(apuesta) || apuesta < this.getApuesta());

    // Realizar la apuesta y calcular el resultado
    this.realizarApuesta(jugador, apuesta);
  }

  getRandom(): number {
    return Math.floor(Math.random() * this.reels.length);
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

    console.log("Resultado:", this.resultadoActual);
    this.resultado(jugador);
  }

  resultado(jugador: Jugador): void {
    if (
      JSON.stringify(this.resultadoActual) ===
      JSON.stringify(this.combinacionGanadora)
    ) {
      const premio = this.apuestaActual * 10;
      jugador.ganarApuesta(premio);
      console.log(`¡${jugador.getNombre()} ganó ${premio} fichas!`);
    } else {
      console.log(
        `${jugador.getNombre()} perdió ${this.apuestaActual} fichas.`
      );
    }
  }
}
