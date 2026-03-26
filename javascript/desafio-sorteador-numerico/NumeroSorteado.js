import GeradorDeNumeros from "./GeradorDeNumeros.js";

export default class NumeroSorteado extends GeradorDeNumeros {
  numerosSorteados = [];
  numero = 0;
  permiteNumeroRepetido = false;

  constructor(quantidade, minimo, maximo, permiteNumeroRepetido) {
    super(minimo, maximo);
    this.quantidade = quantidade;
    this.permiteNumeroRepetido = permiteNumeroRepetido;
  }

  sorteio() {
    if (
      !this.permiteNumeroRepetido &&
      this.quantidade > this.numeroMaximo - this.numeroMinimo + 1
    ) {
      return `Quantidade de números superior a quantidade de possibilidades de números a serem sorteados.`;
    }

    if (this.quantidade <= 0) {
      return `Quantidade de números a serem sorteados precisa ser maior que zero.`;
    }

    while (this.numerosSorteados.length < this.quantidade) {
      this.numero = super.gerar();

      if (this.permiteNumeroRepetido) {
        this.numerosSorteados.push(this.numero);
      } else if (!this.numerosSorteados.includes(this.numero)) {
        this.numerosSorteados.push(this.numero);
      }
    }

    return this.numerosSorteados;
  }
}
