import { JuegoCasino } from "./JuegoCasino";
import { Jugador } from

export class BlackJack extends JuegoCasino {
    private mazo: string[];
    private manoJugador: string[]; 
    private manoCrupier: string[];


    /*constructor(apuestaMin: number, private jugador: Jugador) {
  super("BlackJack", apuestaMin, "Obtén un puntaje lo más cercano a 21 sin pasarte, superando al crupier.");
  this.mazo = this.crearMazo();
  this.manoJugador = [];
  this.manoCrupier = [];
} */ 
  constructor(apuestaMin: number, jugador: Jugador) {
    super("BlackJack", apuestaMin, "Obtén un puntaje lo más cercano a 21 sin pasarte, superando al crupier."
    );
    this.mazo = this.crearMazo();
    this.manoJugador = [];
    this.manoCrupier = [];
  }

  private crearMazo(): string[] {
    const palos = ["Corazones", "Diamantes", "Tréboles", "Picas"];
    const valores = [
      "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A",
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
    if (["J", "Q", "K"].includes(valor)) return 10;
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
  };

  public turnoJugador(): void {
    console.log("Tu mano:", this.manoJugador, "Puntaje:", this.calcularPuntaje(this.manoJugador));
    let decision = prompt("¿Quieres 'pedir' carta o 'quedarte'? (hit/stand)")?.toLowerCase();

    while (decision === "Pedir Carta") {
      this.manoJugador.push(this.mazo.pop()!);
      const puntaje = this.calcularPuntaje(this.manoJugador);
      console.log("Tu nueva mano:", this.manoJugador, "Puntaje:", puntaje);

      if (puntaje > 21) {
        console.log("Te pasaste. ¡Quedas fuera!");
        return;
      }

      decision = prompt("¿Queres pedir otra carta o quedarte?)")?.toLowerCase();
    }
  }

  private turnoCrupier(): void {
    console.log("Mano del crupier:", this.manoCrupier);

    while (this.calcularPuntaje(this.manoCrupier) < 17) {
      this.manoCrupier.push(this.mazo.pop()!);
      console.log("El/la crupier toma una carta. Nueva mano:", this.manoCrupier);
    }
  }

  private determinarGanador(): void {
    const puntajeJugador = this.calcularPuntaje(this.manoJugador);
    const puntajeCrupier = this.calcularPuntaje(this.manoCrupier);

    console.log("Tu puntaje:", puntajeJugador, "Puntaje del crupier:", puntajeCrupier);

    if (puntajeJugador > 21) {
      console.log("Te pasaste. ¡Perdiste!");
    } else if (puntajeCrupier > 21 || puntajeJugador > puntajeCrupier) {
      console.log("¡Ganaste!");
    } else if (puntajeJugador < puntajeCrupier) {
      console.log("Perdiste!");
    } else {
      console.log("Empate");
    }
  }

public resultado(): void { //método abstracto de la clase padre
    // Llamo a determinarGanador() y retorno el resultado
    return this.determinarGanador(); 
    /* me da error porque en el método abstracto es un void, pero como
    no está extendida esta clase en las demás, no sé cómo prefieren que lo hagamos*/
    }
 
// Iniciar
  public jugar(): void {
    this.iniciarJuego();
    this.repartirCartas();
    this.turnoJugador();
    if (this.calcularPuntaje(this.manoJugador) <= 21) {
      this.turnoCrupier();
      this.determinarGanador();
    }
  }
}; 