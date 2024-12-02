import { IApuesta } from "./IApuesta";

export class Jugador implements IApuesta {
  private nombre: string;
  private fichas: number;

  constructor(nombre: string, fichas: number) {
    this.nombre = nombre;
    this.fichas = fichas;
  }

  getNombre(): string {
    return this.nombre;
  }

  getFichas(): number {
    return this.fichas;
  }

  apostar(cantidad: number): void {
    if (cantidad <= 0) {
      console.log(`${this.nombre} debe apostar una cantidad positiva.`);
      return;
    }
    if (this.fichas >= cantidad) {
      this.fichas -= cantidad;
      console.log(`${this.nombre} ha apostado ${cantidad} fichas.`);
    } else {
      console.log(
        `${this.nombre} no tiene suficientes fichas para hacer esta apuesta.`
      );
    }
  }

  ganarApuesta(cantidad: number): void {
    this.fichas += cantidad;
    console.log(`${this.nombre} ha ganado ${cantidad} fichas.`);
  }
}
