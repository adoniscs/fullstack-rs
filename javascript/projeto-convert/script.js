// Cotação de moedas do dia
const USD = 5.24;
const EUR = 6.06;
const GBP = 7;

// obtendo os elementos do formulario
const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const currency = document.querySelector("#currency");
const footer = document.querySelector("main footer");
const description = document.querySelector("#description");
const result = document.querySelector("#result");

// manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;

  amount.value = amount.value.replace(hasCharactersRegex, "");
});

// captura o evento de submit (enviar) do formulario
form.onsubmit = (event) => {
  event.preventDefault();

  // Valida se de fato o campo valor foi preenchido
  if (!amount.value) {
    return alert("Valor é obrigatório. Favor informar!");
  }

  // valida se de fato foi selecionado uma tipo de moeda para conversão
  if (!currency.value) {
    return alert("O tipo de moeda é obrigatório. Favor informar!");
  }

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;

    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;

    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};

// função para converter a moeda
function convertCurrency(amount, price, symbol) {
  try {
    // exibindo a cotação da moeda selecionada
    description.textContent = `${symbol}1 = ${formatCurrencyBRL(price)}`;

    // calcula o total
    let total = amount * price;

    // exibe o resultado total formatado
    result.textContent = formatCurrencyBRL(total);

    // aplica a classe que exibe o footer para mostrar o resultado
    footer.classList.add("show-result");
  } catch (error) {
    // remove a classe do footer removendo ele da tela
    footer.classList.remove("show-result");
    alert("Não foi possível converter. Tente novamente mais tarde.");
  }
}

// formata a moeda em real brasileiro
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
