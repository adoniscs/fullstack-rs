import readline from "node:readline/promises";
import fs from "node:fs/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const ARQUIVO_DADOS = "contatos.json";
let listaDeContatos = [];
let contatoID = 0;

async function carregarContatos() {
    try {
        const dados = await fs.readFile(ARQUIVO_DADOS, "utf8");
        listaDeContatos = JSON.parse(dados);

        if (listaDeContatos.length > 0) {
            const ultimoContato = listaDeContatos[listaDeContatos.length - 1];
            contatoID = ultimoContato.id;
        }
    } catch (error) {
        if (error.code !== "ENOENT") {
            console.log("Erro ao carregar lista de contatos: ", error.message);
        }
    }
}

async function salvarContatos() {
    try {
        const dadosEmTexto = JSON.stringify(listaDeContatos, null, 2);
        await fs.writeFile(ARQUIVO_DADOS, dadosEmTexto);
    } catch (error) {
        console.log("Erro ao salvar contato: ", error.message);
    }
}

async function menu() {
    while (true) {
        console.log(
            "\n1. Adicionar um contato\n2. Listar todos os contatos\n3. Editar um contato\n" +
                "4. Favoritar/Desfavorita um contato\n5. Visualizar contato favoritos\n6. Deletar um contato\n7. Sair",
        );
        const opcao = (
            await rl.question(`\nEscolha uma opção entre (1-7): `)
        ).trim();

        switch (opcao) {
            case "1":
                await adicionarContato();
                break;
            case "2":
                visualizarContato();
                break;
            case "3":
                await editarContato();
                break;
            case "4":
                await favoritarContato();
                break;
            case "5":
                visualizarContatoFavorito();
                break;
            case "6":
                await deletarContato();
                break;
            case "7":
                console.log("Agenda finalizada. Até mais! =)");
                rl.close();
                return;
            default:
                console.log("Opção inválida. Tente novamente.");
                break;
        }
    }
}

async function adicionarContato() {
    const id = ++contatoID;

    const nome = await rl.question("Informe o nome: ");
    if (!nome.trim()) {
        console.log("Preencha o nome para prosseguir.");
        return;
    }

    const telefone = await rl.question("Informe um número de telefone: ");
    if (!telefone.trim()) {
        console.log("Preencha o telefone para prosseguir.");
        return;
    }

    const email = await rl.question("Informe um endereço de email: ");
    if (!email.trim()) {
        console.log("Preencha o email para prosseguir.");
        return;
    }

    const contato = {
        id,
        nome,
        telefone,
        email,
        favorito: false,
    };

    listaDeContatos.push(contato);
    await salvarContatos();
    console.log("Contato adicionado com sucesso.");
}

function visualizarContato() {
    if (!listaDeContatos.length) {
        console.log(
            "\nLista de contato vazia. Adicione um novo contato a lista.",
        );
        return;
    }

    listaDeContatos.forEach((contato) => {
        const { id, nome, telefone, email, favorito } = contato;
        const contatoFavorito = favorito ? "❤️" : " ";
        console.log(
            `${id}. [${contatoFavorito} ], ${nome}, ${telefone}, ${email}`,
        );
    });
}

async function editarContato() {
    if (!listaDeContatos.length) {
        console.log(
            "\nLista de contato vazia. Adicione um novo contato a lista.",
        );
        return;
    }

    visualizarContato();
    const idEscolhido = await rl.question(
        "Informe o ID do contato que deseja atualizar: ",
    );

    const contato = listaDeContatos.find(
        (item) => item.id === parseInt(idEscolhido),
    );

    if (!contato) {
        console.log("Contato não encontrado. Tente novamente!");
        return;
    }

    const itemParaAtualizar = await rl.question(
        "Qual item da agenda deseja atualizar? (nome, telefone ou email): ",
    );

    const campo = itemParaAtualizar.trim().toLowerCase();
    const camposValidos = ["nome", "telefone", "email"];

    if (!camposValidos.includes(campo)) {
        console.log(
            "Campo inválido. Use nome, telefone ou email. Tente novamente!",
        );
        return;
    }

    contato[campo] = await rl.question(`Informe o ${campo} atualizado: `);
    await salvarContatos();
    console.log(`Contato ${contato.id} atualizado com sucesso.`);
}

async function deletarContato() {
    if (!listaDeContatos.length) {
        console.log(
            "\nLista de contato vazia. Adicione um novo contato a lista.",
        );
        return;
    }

    visualizarContato();
    const idEscolhido = parseInt(
        await rl.question("Informe o ID do contato que deseja deletar: "),
        10, // radix
    );

    const indice = listaDeContatos.findIndex((item) => item.id === idEscolhido);

    if (indice === -1) {
        console.log("Contato inválido. Tente novamente!");
        return;
    }

    const resposta = await rl.question(
        `Tem certeza que deseja escluir o contato ${idEscolhido}? (S/N): `,
    );

    if (resposta.trim().toLowerCase() === "n") {
        console.log("Exclusão cancelada.");
    } else if (resposta.trim().toLowerCase() === "s") {
        listaDeContatos.splice(indice, 1);
        await salvarContatos();
        console.log("Contato deletado com sucesso.");
    } else {
        console.log("Opção inválida. Escolha S para sim e N para não.");
    }
}

async function favoritarContato() {
    if (!listaDeContatos.length) {
        console.log(
            "\nLista de contato vazia. Adicione um novo contato a lista.",
        );
        return;
    }

    visualizarContato();
    const idContato = parseInt(
        await rl.question("Informe o ID do contato que deseja favoritar: "),
        10,
    );

    const contato = listaDeContatos.find((item) => item.id === idContato);

    if (!contato) {
        console.log("Contato inválido. Tente novamente!");
        return;
    }

    contato.favorito = !contato.favorito;
    await salvarContatos();
    console.log("Contato atualizado com sucesso.");
    visualizarContato();
}

function visualizarContatoFavorito() {
    if (!listaDeContatos.length) {
        console.log(
            "\nLista de contato vazia. Adicione um novo contato a lista.",
        );
        return;
    }

    const contatosFavoritos = listaDeContatos.filter(
        (contato) => contato.favorito,
    );

    if (!contatosFavoritos.length) {
        console.log(`\nNenhum contato favorito na lista.`);
        return;
    }

    contatosFavoritos.forEach((contatoFavorito) => {
        const { id, nome, telefone, email } = contatoFavorito;
        console.log(`${id}). ${nome}, ${telefone}, ${email}`);
    });
}

async function iniciar() {
    await carregarContatos();
    await menu();
}

await iniciar();
