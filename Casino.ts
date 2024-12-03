import * as rsl from "readline-sync";
import { JuegoCasino } from "./JuegoCasino";
import { Jugador } from "./Jugador";
import { Dados } from "./Dados";

//import { Tragamonedas } from "./Tragamonedas";

export class Casino {
  private arrJugadores: Jugador[];
  private arrJuegos: JuegoCasino[];

  constructor(arrJugadores: Jugador[], arrJuegos: JuegoCasino[]) {
    this.arrJugadores = arrJugadores;
    this.arrJuegos = arrJuegos;
  }

  public getArrJugadores(): Jugador[] {
    return this.arrJugadores;
  }

  public setArrJugadores(arrJugadores: Jugador[]): void {
    this.arrJugadores = arrJugadores;
  }

  public getArrJuegos(): JuegoCasino[] {
    return this.arrJuegos;
  }

  public setArrJuegos(arrJuegos: JuegoCasino[]): void {
    this.arrJuegos = arrJuegos;
  }

  //***************** Metodos Para Juegos ************************* */

  agregarJuego(juego: JuegoCasino): void {
    this.arrJuegos.push(juego);
  }

  //*************** Metodos Para Gestion de Jugadores ******************** */

  nuevoJugador(): Jugador {
    console.log("");
    console.log("------ Bienvenido al Alta Del Casino ---------");
    let nombre: string = rsl.question("Ingrese su nombre: ");
    while (!nombre) {
      console.log("El nombre no puede estar vacío.");
      nombre = rsl.question("Ingrese su nombre: ");
    }
    let fichas: number = rsl.questionInt(
      "Ingrese la cantidad de fichas que quiere cargar: "
    );
    while (fichas < 10) {
      console.log("Monto inválido. Debe ser un número mayor a 10 fichas.");
      fichas = parseInt(
        rsl.question("Ingrese la cantidad de fichas que quiere cargar: ")
      );
    }
    let nuevoJugador: Jugador = new Jugador(nombre, fichas);
    this.arrJugadores.push(nuevoJugador);
    console.log(`Jugador ${nombre} registrado con ${fichas} fichas.`);
    return nuevoJugador;
  }

  seleccionJugador(): Jugador {
    console.log("JUGADORES DISPONIBLES: ");
    console.log(this.arrJugadores);
    let nombreUsuario: string = rsl.question(
      "Ingrese Nombre de Jugador o ENTER para cargar un Jugador nuevo: "
    );
    const jugadorFiltrado = this.getArrJugadores().filter(
      (c) => c.getNombre() == nombreUsuario
    );
    //filter devuelve elementos que cumplen la condicion
    const jugador = jugadorFiltrado.length > 0 ? jugadorFiltrado[0] : undefined;
    if (!jugador) {
      console.log("No figura en la lista. Debe darse de alta:");
      const jugador: Jugador = this.nuevoJugador();
      let teclaParaAvanzar: string = rsl.question(
        "Presione ENTER para ir al MENU PRINCIPAL "
      );
      return jugador;
    } else {
      console.log(`Jugador encontrado: ${jugadorFiltrado[0].getNombre()}`);
      let teclaParaAvanzar: string = rsl.question(
        "Presione ENTER para ir al MENU PRINCIPAL"
      );
      return jugador;
    }
  }

  //*****************Metodo Prara Seleccion De Juegos ******************************* */

  mostrarMenu() {
    console.log(
      "****************************************************************************************************"
    );
    console.log(
      "****************************************************************************************************"
    );
    console.log(
      "**                                                                                                **"
    );
    console.log(
      "**   *****    **    *****   **     **   **       **   *****    **   **    **    ****      ****    **"
    );
    console.log(
      "**   **   *   **    **      ** *   **    **     **    **       ***  **    **    **  **   **  **   **"
    );
    console.log(
      "**   *****    **    ****    **   * **     **   **     ****     ** * **    **    **  **   **  **   **"
    );
    console.log(
      "**   **   *   **    **      **    ***      ** **      **       **  ***    **    **  **   **  **   **"
    );
    console.log(
      "**   *****    **    *****   **     **       ***       *****    **   **    **    ****      ****    **"
    );
    console.log(
      "**                                                                                                **"
    );
    console.log(
      "**                 ******      ********        ****.      ****      **     **      ****           **"
    );
    console.log(
      "**                **           **    **       **           **       ** **  **     **  **          **"
    );
    console.log(
      "**       AL       **           ********          *         **       **  ** **     **  **          **"
    );
    console.log(
      "**                **           **    **       .   **       **       **   ****     **  **          **"
    );
    console.log(
      "**                 ******      **    **        ****       ****      **     **      ****           **"
    );
    console.log(
      "**                                                                                                **"
    );
    console.log(
      "**      Seleccione el Juego:                                                                      **"
    );
    console.log(
      "**                                                                                                **"
    );
    console.log(
      "**      1. Tragamonedas (3 Tambores)                  2. Tragamonedas (6 Tambores)                **"
    );
    console.log(
      "**                                                                                                **"
    );
    console.log(
      "**      3. Craps (Dados)                              4. Black Jack                               **"
    );
    console.log(
      "**                                                                                                **"
    );
    console.log(
      "**      5. Ruleta                                     0. SALIR                                    **"
    );
    console.log(
      "**                                                                                                **"
    );
    console.log(
      "****************************************************************************************************"
    );
    console.log(
      "****************************************************************************************************"
    );
  }

  validarEleccion(): number {
    // Se valida la elecccion de juego entre 0 p/salir y 5
    let selecJuego: number = parseInt(
      rsl.question("Seleccione el Juego: "),
      10
    );
    while (selecJuego < 0 || selecJuego > 5 || selecJuego == undefined) {
      console.log("La selección es inválida");
      let reValidarJuego: number = parseInt(
        rsl.question("Seleccione nuevamente el Juego: "),
        10
      );
      selecJuego = reValidarJuego;
    }
    return selecJuego;
  }

  menuDeJuegos() {
    const jugadorSeleccionado = this.seleccionJugador();
    this.mostrarMenu();
    let seleccion: number = this.validarEleccion(); //Se llama a la eleccion de juego y validacion
    while (seleccion != 0) {
      if (seleccion == 1) {
        this.arrJuegos[0].jugar(jugadorSeleccionado);
      } else if (seleccion == 2) {
        this.arrJuegos[1].jugar(jugadorSeleccionado);
      } else if (seleccion == 3) {
        this.arrJuegos[2].jugar(jugadorSeleccionado);
      } else if (seleccion == 4) {
        this.arrJuegos[3].jugar(jugadorSeleccionado);
      } else {
        this.arrJuegos[4].jugar(jugadorSeleccionado);
      }
      // Al finalizar el juego se muestra el menu para poder jugar otro juego.
      this.mostrarMenu();
      console.log(
        jugadorSeleccionado.getNombre(),
        "Su Saldo es: ",
        jugadorSeleccionado.getFichas()
      );
      if (jugadorSeleccionado.getFichas() > 0) {
        seleccion = this.validarEleccion(); //Se llama a la eleccion de juego y validacion
      } else {
        console.log("Saldo insuficiente para seguir jugando ");
        console.log("¡Gracias por su visita! Lo esperamos pronto. ('=') ");
        seleccion = 0;
      }
    }
    console.log("Saliendo del programa...");
  }
}
