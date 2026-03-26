export default class GeradorDeNumeros {
  constructor(numeroMinimo, numeroMaximo) {
    this.numeroMinimo = Math.ceil(numeroMinimo);
    this.numeroMaximo = Math.floor(numeroMaximo);
  }

  gerar() {
    return (
      Math.floor(Math.random() * (this.numeroMaximo - this.numeroMinimo + 1)) +
      this.numeroMinimo
    );
  }
}
