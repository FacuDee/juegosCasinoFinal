export class Ruleta {
    private saldo: number;
    private apuesta: number;
    private numeroApostado: number;
 
    constructor(saldo: number, apuesta: number, numeroApostado: number) {
       this.saldo = saldo;
       this.apuesta = apuesta;
       this.numeroApostado = numeroApostado;
    }
 
    public getSaldo(): number {
       return this.saldo;
    }
 
    public setSaldo(NuevoSaldo: number) {
       this.saldo = NuevoSaldo;
    }
 
    public getApuesta(): number {
       return this.apuesta;
    }
 
    public setApuesta(NuevaApuesta: number) {
       this.apuesta = NuevaApuesta;
    }
 
    public getNumero() {
       return this.numeroApostado;
    }
 
    public setNumero(nuevoNumero: number) {
       this.numeroApostado = nuevoNumero;
    }
 
 
    public apostar() {
     if (this.apuesta > this.saldo) {
        console.log("No tiene suficiente saldo para apostar");
     } else {
        console.log(`Haz apostado ${this.apuesta} al numero ${this.numeroApostado}`);
     }
  }
 
 
    public  girarRuleta(): number{
       let numero: number = Math.floor(Math.random() * 37);
       let numerosColorados = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]; 
 
       console.log(`Ha salido el: ${numero}`);
     
          if (numerosColorados.includes(numero)) {
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
             return numero
          }                 
       
 
        public resultadoApuesta() {
         let numeroGanador = this.GirarRuleta();
 
         if (numeroGanador === this.numeroApostado) {
             let ganancia = this.apuesta * 35;
             this.saldo += ganancia;
             console.log(`Acertaste! ${numeroGanador}. Has ganado ${ganancia}.`);
         } else {
             this.saldo -= this.apuesta;
             console.log(` No acertaste. Tu nuevo saldo es ${this.saldo}.`);
         }
     
         if (this.saldo <= 0) {
             console.log("No tienes más saldo para jugar");
         }
     }
 
     
 }
 
 
 let Ruleta1= new Ruleta(10000, 1000, 7);
 Ruleta1.apostar();
 Ruleta1.resultadoApuesta();
 
 
 