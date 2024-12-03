// Interface IApuesta
export interface IApuesta {
  apostar(cantidad: number): void;
  ganarApuesta(cantidad: number): void;
}