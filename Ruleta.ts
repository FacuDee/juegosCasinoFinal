import { JuegoCasino } from "./JuegoCasino";
import { Jugador } from "./Jugador";
import * as rls from "readline-sync";




export class Ruleta extends JuegoCasino {
  private numeroApostado: number | undefined;
  private color: string | undefined;
  private paridad: string | undefined;
  private rango: string | undefined;

  constructor(apuestaMin: number) {
    super(
      "Ruleta",
      apuestaMin,
      "En un tablero de 36 números, repartidos entre rojos, negros y un 0 verde, elige un número, color, paridad o rango... si aciertas ¡Ganas!"
    );
    this.numeroApostado = undefined;
    this.color = undefined;
    this.paridad = undefined;
    this.rango = undefined;
  }

  public mostrarColor(numero:number): string {
 const numerosColorados = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    if (numero === 0) {
        return "verde";
    };
   if (numerosColorados.includes(numero)){
    return "rojo";
  } else {
    return "negro";
  }
}
public mostrarParidad(numero: number): string {
    if (numero % 2 === 0) {
        return "par";
    } else {
        return "impar";
    }
}
public mostrarRango(numero: number): string {
    if (numero >= 1 && numero <= 18) {
        return "menor";
    } else if (numero >= 19 && numero <= 36) {
        return "mayor";
    } else {
      return "Fuera de rango";
    }
}

  public girarRuleta(): number {
    const numero = Math.floor(Math.random() * 37);
    console.log(`Ha salido el número: ${numero}`);
    console.log(`El color es: ${this.mostrarColor(numero)}`);
    console.log(`La paridad es: ${this.mostrarParidad(numero)}`);
    console.log(`El rango es: ${this.mostrarRango(numero)}`);
    return numero;
  }

  public jugar(jugador: Jugador): void {
    console.log("Bienvenido al juego de Ruleta");
    console.log(this.getMiniInstruccion());

    // selecciona LA  de apuesta
    console.log("Opciones de apuesta:");
    console.log("1: Numero especifico (0-36)");
    console.log("2: Color (rojo/negro)");
    console.log("3: Par o impar");
    console.log("4: Menor (1-18) o mayor (19-36)");
    const opcion = Number(rls.question("Elige una opcion (1-4): "));

    let tipoApuesta = ""; // Identificador del tipo de apuesta
    switch (opcion) {
        case 1:
            this.numeroApostado = Number(rls.question("Ingresa un numero entre 0 y 36: "));
            tipoApuesta = "numero";
            if (isNaN(this.numeroApostado) || this.numeroApostado < 0 || this.numeroApostado > 36) {
                console.log("Numero invalido. Intentalo de nuevo.");
                return;
            }
            break;
        case 2:
            this.color = rls.question("Elige un color (rojo/negro): ").toLowerCase();
            tipoApuesta = "color";
            if (this.color !== "rojo" && this.color !== "negro") {
                console.log("Color invalido. Intentalo de nuevo.");
                return;
            }
            break;
        case 3:
            this.paridad = rls.question("Elige par o impar: ").toLowerCase();
            tipoApuesta = "paridad";
            if (this.paridad !== "par" && this.paridad !== "impar") {
                console.log("Paridad invalida. Intentalo de nuevo.");
                return;
            }
            break;
        case 4:
            this.rango = rls.question("Elige menor (1-18) o mayor (19-36): ").toLowerCase();
            tipoApuesta = "rango";
            if (this.rango !== "menor" && this.rango !== "mayor") {
                console.log("Rango invalido. Intentalo de nuevo.");
                return;
            }
            break;
        default:
            console.log("Opción no valida.");
            return;
    }
    // Cantidad a apostar
    const cantidad = Number(rls.question("Ingresa la cantidad a apostar: "));
    jugador.apostar(cantidad);

    // Giramos la ruleta
    const numeroRuleta = this.girarRuleta();

    // Resultados
    let gano = false;
    switch (tipoApuesta) {
        case "numero":
            if (this.numeroApostado === numeroRuleta) {
                console.log("¡Acertaste el numero!");
                jugador.ganarApuesta(cantidad * 35);
                gano = true;
            }
            break;
        case "color":
            if (this.color === this.mostrarColor(numeroRuleta)) {
                console.log("¡Acertaste el color!");
                jugador.ganarApuesta(cantidad * 2);
                gano = true;
            }
            break;
        case "paridad":
            if (this.paridad === this.mostrarParidad(numeroRuleta)) {
                console.log("¡Acertaste la paridad!");
                jugador.ganarApuesta(cantidad * 2);
                gano = true;
            }
            break;
        case "rango":
            if (this.rango === this.mostrarRango(numeroRuleta)) {
                console.log("¡Acertaste el rango!");
                jugador.ganarApuesta(cantidad * 2);
                gano = true;
            }
            break;
    }

    if (!gano) {
        console.log("No acertaste. Mejor suerte la proxima vez.");
    }

    console.log(`\n${jugador.getNombre()}, ahora tienes ${jugador.getFichas()} fichas.`);
}

resultado(jugador?: Jugador): void {
  throw new Error("Method not implemented.");
}


  }