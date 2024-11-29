import   * as rsl from "readline-sync"
import { JuegoCasino } from "./JuegoCasino";
import { Jugador } from "./Jugador";

export class Ruleta extends JuegoCasino{
    private apuesta: number;
    private numeroApostado: number;
 
    constructor(apuestaMin:number,apuesta:number,numeroApostado:number) {
      super ("Ruleta",apuestaMin,"En un tablero de 36 numeros, repartidos entre rojos, Negros y 0 verde, elige un numero o color, si acierta Gana")
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
 

 public girarRuleta(): number{
       let numero: number = Math.floor(Math.random() * 37);
       let numerosColorados = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]; 
 
       console.log(`Ha salido el: ${numero}`);
     
       
         if (numero === 0) {
         console.log("Verde");
            
         } if (numerosColorados.includes(numero)) {
            console.log("Colorado");
         } else {
            console.log("Negro");
         }

         if (numero % 2 === 0 ) {
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
         while (this.apuesta < this.apuestaMin || this.apuesta > jugador.getfichas() ||this.numeroApostado > 36) {
             console.log("Apuesta invalida. Intente nuevamente.");
             this.setApuesta(Number(rsl.question("Ingrese una apuesta valida: ")));
             this.setNumeroApostado(Number(rsl.question("Ingrese un numero entre 0 y 36:")))
         }
         console.log(`Haz apostado ${this.apuesta} al numero ${this.numeroApostado}`);
     }

    public resultado(jugador:Jugador):void {
      let numeroGanador = this.girarRuleta();

      if (numeroGanador === this.numeroApostado) {
          let ganancia = this.apuesta * 35;
         jugador.getFichas() += ganancia;
          console.log(`Acertaste! ${numeroGanador}. Has ganado ${ganancia}.`);
      } else {
          Jugador.getFichas() -= this.apuesta;
          console.log(` No acertaste. Tu nuevo saldo es ${Jugador.getFichas()}.`);
      }
  
      if (Jugador.getFichas() <= 0) {
          console.log("No tienes más saldo para jugar");
      }
  }

 public jugar (jugador:Jugador){
   console.log(this.miniInstruccion); 
   this.validarApuesta(jugador);
   this.resultado(jugador)
   }
  
   }
