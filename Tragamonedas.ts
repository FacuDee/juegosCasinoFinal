import * as rsl from "readline-sync";
import { JuegoCasino } from "./JuegoCasino";
import { Jugador } from "./Jugador";

export class Tragamonedas extends JuegoCasino {
  reels: string[] = ["🍒", "🍋", "🍉", "🍇", "🍌"];
  combinacionGanadora: string[];

  constructor(nombre: string, apuestaMin: number, miniInstruccion: string) {
    super(nombre, apuestaMin, miniInstruccion);
    this.combinacionGanadora = ["🍒", "🍒", "🍒"];
  }

  jugar(jugador: Jugador): void {
    console.log(
      `¡Bienvenido ${jugador.getnombre()}: jugando al ${this.getNombre()}!`
    );
  }

  getRandom(): number {
    return Math.floor(Math.random() * this.reels.length);
  }

  realizarApuesta(jugador: Jugador, monto: number): void {
    if (jugador.getfichas() < monto) {
      console.log(
        `${jugador.getnombre()} no tiene suficientes fichas para apostar.`
      );
      return;
    }

    jugador.apostar(monto);

    const resultado = [
      this.reels[this.getRandom()],
      this.reels[this.getRandom()],
      this.reels[this.getRandom()],
    ];

    console.log("Resultado:", resultado);
    this.resultado(jugador, resultado, monto);
  }

  resultado(
    jugador: Jugador,
    resultado: string[] | string[][],
    monto: number
  ): void {
    if (
      JSON.stringify(resultado) === JSON.stringify(this.combinacionGanadora)
    ) {
      const premio = monto * 10;
      jugador.ganarApuesta(premio);
      console.log(`¡${jugador.getnombre()} ganó ${premio} fichas!`);
    } else {
      console.log(`${jugador.getnombre()} perdió ${monto} fichas.`);
    }
  }
}
