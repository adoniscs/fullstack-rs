class GeradorDeNumeros {
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

class NumeroSorteado extends GeradorDeNumeros {
  numerosSorteados = [];
  numero = 0;

  constructor(quantidade, minimo, maximo) {
    super(minimo, maximo);
    this.quantidade = quantidade;
  }

  sorteio() {
    for (let i = 0; i < this.quantidade; i++) {
      this.numero = super.gerar();
      this.numerosSorteados.push(this.numero);
    }

    return this.numerosSorteados;
  }
}

const novoSorteio = new NumeroSorteado(5, 1, 100);
console.log(novoSorteio.sorteio());
