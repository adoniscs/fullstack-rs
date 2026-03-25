class MyCustomError {
  constructor(message) {
    this.message = "Classe se erro customizada: " + message;
  }
}

try {
  // throw new Error("Erro aqui genericao...");
  throw new MyCustomError("Erro personalizado lançado!");
} catch (error) {
  if (error instanceof MyCustomError) {
    console.log(error.message);
  } else {
    console.log("Não foi possível executar!");
  }
}
