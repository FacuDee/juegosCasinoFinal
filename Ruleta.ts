import * as rsl from "readline-sync";
import { JuegoCasino } from "./JuegoCasino";
import { Jugador } from "./Jugador";

export class Ruleta extends JuegoCasino {
  private apuesta: number;
  private numeroApostado: number;

  constructor(apuestaMin: number, apuesta: number, numeroApostado: number) {
    super(
      "Ruleta",
      apuestaMin,
      "En un tablero de 36 numeros, repartidos entre rojos, Negros y 0 verde, elige un numero o color, si acierta Gana"
    );
    this.apuesta = apuesta;
    this.numeroApostado = numeroApostado;
  }

  public getApuesta(): number {
    return this.apuesta;
  }

  public setApuesta(NuevaApuesta: number) {
    this.apuesta = NuevaApuesta;
  }

  public getNumeroApostado() {
    return this.numeroApostado;
  }

  public setNumeroApostado(nuevoNumero: number) {
    this.numeroApostado = nuevoNumero;
  }

  public girarRuleta(): number {
    let numero: number = Math.floor(Math.random() * 37);
    let numerosColorados = [
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ];

    console.log(`Ha salido el: ${numero}`);

    if (numero === 0) {
      console.log("Verde");
    }
    if (numerosColorados.indexOf(numero) !== -1) {
      console.log("Colorado");
    } else {
      console.log("Negro");
    }

    if (numero % 2 === 0) {
      console.log("Par");
    } else {
      console.log("Impar");
    }

    if (numero >= 1 && numero <= 18) {
      console.log("Menor");
    } else {
      console.log("Mayor");
    }
    return numero;
  }

  public validarApuesta(jugador: Jugador): void {
    this.setApuesta(Number(rsl.question("Ingrese una apuesta valida: ")));
    this.setNumeroApostado(
      Number(rsl.question("Ingrese un numero entre 0 y 36:"))
    );
    while (
      this.apuesta < this.getApuestaMin() ||
      this.apuesta > jugador.getFichas() ||
      this.numeroApostado > 36 ||
      this.numeroApostado < 0
    ) {
      console.log("Apuesta invalida. Intente nuevamente.");
      this.setApuesta(Number(rsl.question("Ingrese una apuesta valida: ")));
      this.setNumeroApostado(
        Number(rsl.question("Ingrese un numero entre 0 y 36:"))
      );
    }
    jugador.apostar(this.apuesta);
    // console.log(
    //   `Haz apostado ${this.apuesta} al numero ${this.numeroApostado}`
    // );
  }

  public resultado(jugador: Jugador): void {
    let numeroGanador = this.girarRuleta();
    let ganancia: number;

    if (numeroGanador === this.numeroApostado) {
      ganancia = this.apuesta * 35;
      jugador.ganarApuesta(ganancia);
    } else {
      ganancia = 0;

      console.log(` No acertaste. Tu nuevo saldo es ${jugador.getFichas()}.`);
    }

    if (jugador.getFichas() <= 0) {
      console.log("No tienes más saldo para jugar");
    }
    rsl.question("Presione ENTER para retornar al MENU PRINCIPAL.");
  }

  public jugar(jugador: Jugador) {
    console.log(this.getMiniInstruccion());
    this.validarApuesta(jugador);
    this.resultado(jugador);
  }
}
