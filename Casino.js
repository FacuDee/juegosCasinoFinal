"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
var rsl = require("readline-sync");
var Jugador_1 = require("./Jugador");
//import { Tragamonedas } from "./Tragamonedas";
var Casino = /** @class */ (function () {
    function Casino(arrJugadores, arrJuegos) {
        this.arrJugadores = arrJugadores;
        this.arrJuegos = arrJuegos;
    }
    Casino.prototype.getArrJugadores = function () {
        return this.arrJugadores;
    };
    Casino.prototype.setArrJugadores = function (arrJugadores) {
        this.arrJugadores = arrJugadores;
    };
    Casino.prototype.getArrJuegos = function () {
        return this.arrJuegos;
    };
    Casino.prototype.setArrJuegos = function (arrJuegos) {
        this.arrJuegos = arrJuegos;
    };
    //***************** Metodos Para Juegos ************************* */
    Casino.prototype.agregarJuego = function (juego) {
        this.arrJuegos.push(juego);
    };
    //*************** Metodos Para Gestion de Jugadores ******************** */
    Casino.prototype.nuevoJugador = function () {
        console.log("");
        console.log("------ Bienvenido al Alta Del Casino ---------");
        var nombre = rsl.question("Ingrese su nombre: ");
        while (!nombre) {
            console.log("El nombre no puede estar vacío.");
            nombre = rsl.question("Ingrese su nombre: ");
        }
        var fichas = rsl.questionInt("Ingrese la cantidad de fichas que quiere cargar: ");
        while (fichas < 10) {
            console.log("Monto inválido. Debe ser un número mayor a 10 fichas.");
            fichas = parseInt(rsl.question("Ingrese la cantidad de fichas que quiere cargar: "));
        }
        var nuevoJugador = new Jugador_1.Jugador(nombre, fichas);
        this.arrJugadores.push(nuevoJugador);
        console.log("Jugador ".concat(nombre, " registrado con ").concat(fichas, " fichas."));
        return nuevoJugador;
    };
    Casino.prototype.seleccionJugador = function () {
        console.log("JUGADORES DISPONIBLES: ");
        console.log(this.arrJugadores);
        var nombreUsuario = rsl.question("Ingrese Nombre de Jugador o ENTER para cargar un Jugador nuevo: ");
        var jugadorFiltrado = this.getArrJugadores().filter(function (c) { return c.getNombre() == nombreUsuario; });
        //filter devuelve elementos que cumplen la condicion
        var jugador = jugadorFiltrado.length > 0 ? jugadorFiltrado[0] : undefined;
        if (!jugador) {
            console.log("No figura en la lista. Debe darse de alta:");
            var jugador_1 = this.nuevoJugador();
            var teclaParaAvanzar = rsl.question("Presione ENTER para ir al MENU PRINCIPAL ");
            return jugador_1;
        }
        else {
            console.log("Jugador encontrado: ".concat(jugadorFiltrado[0].getNombre()));
            var teclaParaAvanzar = rsl.question("Presione ENTER para ir al MENU PRINCIPAL");
            return jugador;
        }
    };
    //*****************Metodo Prara Seleccion De Juegos ******************************* */
    Casino.prototype.mostrarMenu = function () {
        console.log("****************************************************************************************************");
        console.log("****************************************************************************************************");
        console.log("**                                                                                                **");
        console.log("**   *****    **    *****   **     **   **       **   *****    **   **    **    ****      ****    **");
        console.log("**   **   *   **    **      ** *   **    **     **    **       ***  **    **    **  **   **  **   **");
        console.log("**   *****    **    ****    **   * **     **   **     ****     ** * **    **    **  **   **  **   **");
        console.log("**   **   *   **    **      **    ***      ** **      **       **  ***    **    **  **   **  **   **");
        console.log("**   *****    **    *****   **     **       ***       *****    **   **    **    ****      ****    **");
        console.log("**                                                                                                **");
        console.log("**                 ******      ********        ****.      ****      **     **      ****           **");
        console.log("**                **           **    **       **           **       ** **  **     **  **          **");
        console.log("**       AL       **           ********          *         **       **  ** **     **  **          **");
        console.log("**                **           **    **       .   **       **       **   ****     **  **          **");
        console.log("**                 ******      **    **        ****       ****      **     **      ****           **");
        console.log("**                                                                                                **");
        console.log("**      Seleccione el Juego:                                                                      **");
        console.log("**                                                                                                **");
        console.log("**      1. Tragamonedas (3 Tambores)                  2. Tragamonedas (6 Tambores)                **");
        console.log("**                                                                                                **");
        console.log("**      3. Craps (Dados)                              4. Black Jack                               **");
        console.log("**                                                                                                **");
        console.log("**      5. Ruleta                                     0. SALIR                                    **");
        console.log("**                                                                                                **");
        console.log("****************************************************************************************************");
        console.log("****************************************************************************************************");
    };
    Casino.prototype.validarEleccion = function () {
        // Se valida la elecccion de juego entre 0 p/salir y 5
        var selecJuego = parseInt(rsl.question("Seleccione el Juego: "), 10);
        while (selecJuego < 0 || selecJuego > 5 || selecJuego == undefined) {
            console.log("La selección es inválida");
            var reValidarJuego = parseInt(rsl.question("Seleccione nuevamente el Juego: "), 10);
            selecJuego = reValidarJuego;
        }
        return selecJuego;
    };
    Casino.prototype.menuDeJuegos = function () {
        var jugadorSeleccionado = this.seleccionJugador();
        this.mostrarMenu();
        var seleccion = this.validarEleccion(); //Se llama a la eleccion de juego y validacion
        while (seleccion != 0) {
            if (seleccion == 1) {
                this.arrJuegos[0].jugar(jugadorSeleccionado);
            }
            else if (seleccion == 2) {
                this.arrJuegos[1].jugar(jugadorSeleccionado);
            }
            else if (seleccion == 3) {
                this.arrJuegos[2].jugar(jugadorSeleccionado);
            }
            else if (seleccion == 4) {
                this.arrJuegos[3].jugar(jugadorSeleccionado);
            }
            else {
                this.arrJuegos[4].jugar(jugadorSeleccionado);
            }
            // Al finalizar el juego se muestra el menu para poder jugar otro juego.
            this.mostrarMenu();
            console.log(jugadorSeleccionado.getNombre(), "Su Saldo es: ", jugadorSeleccionado.getFichas());
            if (jugadorSeleccionado.getFichas() > 0) {
                seleccion = this.validarEleccion(); //Se llama a la eleccion de juego y validacion
            }
            else {
                console.log("Saldo insuficiente para seguir jugando ");
                console.log("¡Gracias por su visita! Lo esperamos pronto. ('=') ");
                seleccion = 0;
            }
        }
        console.log("Saliendo del programa...");
    };
    return Casino;
}());
exports.Casino = Casino;
