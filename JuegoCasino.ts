import { Jugador } from "./Jugador"; //importé la clase

export abstract class JuegoCasino {
  private nombre: string;
  private apuestaMin: number;
  private miniInstruccion: string;

  constructor(nombre: string, apuestaMin: number, miniInstruccion: string) {
    this.nombre = nombre;
    this.apuestaMin = apuestaMin;
    this.miniInstruccion = miniInstruccion;
  }

  abstract jugar(jugador: Jugador): void; //agregué parametros

  abstract resultado(jugador?: Jugador): void;

  public getNombre(): string {
    return this.nombre;
  }

  public getApuestaMin(): number {
    return this.apuestaMin;
  }

  public getMiniInstruccion(): string {
    return this.miniInstruccion;
  }
}
