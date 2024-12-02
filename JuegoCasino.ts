import { Jugador } from "./Jugador"; //importé la clase

export abstract class JuegoCasino {
  private nombre: string;
  private apuesta: number;
  private miniInstruccion: string;

  constructor(nombre: string, apuesta: number, miniInstruccion: string) {
    this.nombre = nombre;
    this.apuesta = apuesta;
    this.miniInstruccion = miniInstruccion;
  }

  abstract jugar(jugador: Jugador): void; //agregué parametros

  abstract resultado(jugador?: Jugador): void;

  public getNombre(): string {
    return this.nombre;
  }

  public getApuesta(): number {
    return this.apuesta;
  }

  public getMiniInstruccion(): string {
    return this.miniInstruccion;
  }
}
