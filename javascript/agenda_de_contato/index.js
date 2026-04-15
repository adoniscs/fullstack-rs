import readline from "node:readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const listaDeContatos = [];

async function menu() {
    const opcao = await rl.question(
        `
    1. Adicionar um contato
    2. Listar todos os contatos
    3. Editar um contato
    4. Favoritar um contato
    5. Visualizar contato favoritos
    6. Deletar um contato
    7. Sair
    `,
    );

    switch (opcao) {
        case "1":
            await adicionarContato();
            await menu();
            break;
        case "2":
            visualizarContato();
            await menu();
            break;
        case "3":
            console.log("Editar um contato");
            break;
        case "4":
            console.log("Favoritar um contato");
            break;
        case "5":
            console.log("Visualizar contato favoritos");
            break;
        case "6":
            console.log("Deletar um contato");
            break;
        case "7":
            console.log("Sair");
            rl.close();
            break;
        default:
            console.log("Opção inválida. Tente novamente.");
            menu();
            break;
    }
}

async function adicionarContato() {
    const nome = await rl.question("Informe o nome: ");
    const telefone = await rl.question("Informe um número de telefone: ");
    const email = await rl.question("Informe um endereço de email: ");

    const contato = {
        nome: nome,
        telefone: telefone,
        email: email,
        favorito: false,
    };

    listaDeContatos.push(contato);
    console.log("Contato adicionado com sucesso.");
    return;
}

function visualizarContato() {
    if (!listaDeContatos.length) {
        console.log(
            "\nLista de contato vazia. Adicione um novo contato a lista.",
        );
    }

    listaDeContatos.map((contato, indice) => {
        const indiceAjustado = indice + 1;
        const favorito = contato.favorito ? "❤️" : " ";
        console.log(
            `\n${indiceAjustado}. [${favorito}], ${contato.nome}, ${contato.telefone}, ${contato.email}`,
        );
    });

    return;
}

menu();
