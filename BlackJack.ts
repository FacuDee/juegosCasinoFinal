import * as rls from "readline-sync";
import { JuegoCasino } from "./JuegoCasino";
import { Jugador } from "./Jugador";

export class BlackJack extends JuegoCasino {
  private mazo: string[];
  private manoJugador: string[];
  private manoCrupier: string[];
  private jugador: Jugador;
  private apuesta:number;

  constructor(apuestaMin: number, jugador: Jugador ,apuesta:number) {
    super(
      "BlackJack",
      apuestaMin,
      "Obtén un puntaje lo más cercano a 21 sin pasarte, superando al crupier."
    );
    this.jugador = jugador;
    this.mazo = this.crearMazo();
    this.manoJugador = [];
    this.manoCrupier = [];
    this.apuesta=apuesta;
   }
   
   public setApuesta(apuesta : number) {
    this.apuesta = apuesta;
   }
   
  private crearMazo(): string[] {
    const palos = ["Corazones", "Diamantes", "Tréboles", "Picas"];
    const valores = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    let mazo: string[] = [];
    for (const palo of palos) {
      for (const valor of valores) {
        mazo.push(`${valor} de ${palo}`);
      }
    }
    return this.barajar(mazo);
  }

  private barajar(mazo: string[]): string[] {
    return mazo.sort(() => Math.random() - 0.5);
  }

  private iniciarJuego(): void {
    console.log("Iniciando juego de BlackJack...");
    this.mazo = this.crearMazo();
    this.manoJugador = [];
    this.manoCrupier = [];
  }

  private obtenerValorCarta(carta: string): number {
    const valor = carta.split(" ")[0];
    if (["J", "Q", "K"].indexOf(valor) !== -1) return 10;
    if (valor === "A") return 11; // El manejo del 1/11 será dinámico
    return parseInt(valor);
  }

  // de una mano:
  private calcularPuntaje(mano: string[]): number {
    let total = 0;
    let ases = 0;
    for (const carta of mano) {
      const valor = this.obtenerValorCarta(carta);
      total += valor;
      if (valor === 11) ases++;
    }
    // Para ajustar el valor de los Ases si el puntaje supera 21
    while (total > 21 && ases > 0) {
      total -= 10; // Cambiar un As de 11 a 1
      ases--;
    }
    return total;
  }

  // Repartir cartas iniciales
  private repartirCartas(): void {
    this.manoJugador = [this.mazo.pop()!, this.mazo.pop()!];
    this.manoCrupier = [this.mazo.pop()!, this.mazo.pop()!];
  }

  public turnoJugador(): void {
    console.log(  "Tu mano:", this.manoJugador, "Puntaje:", this.calcularPuntaje(this.manoJugador));
    let decision = rls.question("¿Queres otra carta? (Ingresá 'Pido' o 'Quedo'?: ").toLowerCase();

  // Antes que nada valido si el usuario ingresó una de las dos palabras u otra
    while (decision !== "pido" && decision !== "quedo") {
      console.log("Entrada inválida. Por favor, ingresá 'pido' para pedir otra carta o 'quedo' para mantener tu mano.");
      decision = rls.question("¿Querés otra carta? (Ingresá 'pido' o 'quedo'): ").toLowerCase();
  }

  // una vez que se valida: 
    while (decision === "pido") {
      this.manoJugador.push(this.mazo.pop()!);
      const puntaje = this.calcularPuntaje(this.manoJugador);
      console.log("Tu nueva mano:", this.manoJugador, "Puntaje:", puntaje);
      if (puntaje > 21) {
        console.log("Te pasaste. ¡Quedas afuera!");
        return; // sale si supera
      }

      decision = rls.question("¿Queres otra carta? (Ingresá 'Pido' o 'Quedo') ").toLowerCase();

      // Valido nuevamente,
    while (decision !== "pido" && decision !== "quedo") {
      console.log("Entrada inválida. Por favor, ingresá 'Pido' para pedir otra carta o 'Quedo' para mantener tu mano.");
      decision = rls.question("¿Querés otra carta? (Ingresá 'Pido' o 'Quedo'): ").toLowerCase();
    }
  }
}

private turnoCrupier(): void {
    console.log("Mano del crupier: ", this.manoCrupier);
    while (this.calcularPuntaje(this.manoCrupier) < 17) {
      this.manoCrupier.push(this.mazo.pop()!);
      console.log(
        "El/la crupier toma una carta. Nueva mano: ",
        this.manoCrupier
      );
    }
  }

  private determinarGanador(): boolean {
    const puntajeJugador = this.calcularPuntaje(this.manoJugador);
    const puntajeCrupier = this.calcularPuntaje(this.manoCrupier);
    let perderOGanar:boolean;
    console.log( "Tu puntaje:", puntajeJugador, "Puntaje del crupier:", puntajeCrupier );
      if (puntajeJugador > 21) {
        console.log("Te pasaste. ¡Perdiste! ",this.apuesta," fichas");
        perderOGanar=false;
      } else if (puntajeCrupier > 21 || puntajeJugador > puntajeCrupier) {
        console.log("¡Ganaste! tu apuesta se multiplica un 50%");
        perderOGanar=true;
      } else if (puntajeJugador < puntajeCrupier) {
        perderOGanar=false;
        console.log("Perdiste! ",this.apuesta," fichas");
      } else {
        perderOGanar=false;
        console.log("Empate. Lo siento.. Gana la casa. Perdiste ",this.apuesta," fichas");
      }
    return perderOGanar; //parametro para ganar(True) o perder(false) apuesta
  }

  public validarApuesta(jugador: Jugador): void {
    console.log("Su saldo es de: ", this.jugador.getFichas());
    let eleccionApuesta: number = rls.questionInt(
        "La apuesta mínima es: " + this.getApuestaMin() + "; ¿cuánto desea apostar?: "
    );

    while (eleccionApuesta < this.getApuestaMin() || eleccionApuesta > jugador.getFichas()) {
        console.log(
            "La apuesta no es válida. Debe estar entre " +
            this.getApuestaMin() + " y " + jugador.getFichas()
        );
        eleccionApuesta = rls.questionInt(
            "Por favor, ingrese una apuesta válida: "
        )};

    jugador.apostar(eleccionApuesta); // Una vez q se valida, restamos
    this.setApuesta(eleccionApuesta);
}

  public resultado(): void {
    //método abstracto de la clase padre
    if(this.determinarGanador()){
      let ganancia=Math.floor(this.apuesta*1.5);
      this.jugador.ganarApuesta(ganancia);
      // si gana se le da una ganancia del 50%
    } else {
      let ganancia=0;
      this.jugador.ganarApuesta(ganancia);
    }
  }

  // Iniciar
  public jugar(jugadorSeleccionado:Jugador): void {
    this.jugador=jugadorSeleccionado; // se asigna a jugadorinterno el jugadorSeleccionado en Casino
    this.validarApuesta(this.jugador);
    
    this.iniciarJuego();
    this.repartirCartas();
    this.turnoJugador();

    if (this.calcularPuntaje(this.manoJugador) <= 21) {
      this.turnoCrupier();
      this.resultado();
    }
    jugadorSeleccionado=this.jugador;
    console.log("El jugador ", jugadorSeleccionado.getNombre()," se retira con Saldo final: ", jugadorSeleccionado.getFichas());
    let teclaParaAbanzar: string = rls.question(
      " Presione ENTER para retornar al MENU PRINCIPAL "
    );
  }
}
