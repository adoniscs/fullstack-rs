import readline from "node:readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const listaDeContatos = [];
let contatoID = 0;

async function menu() {
    while (true) {
        const opcao = (
            await rl.question(
                `
1. Adicionar um contato
2. Listar todos os contatos
3. Editar um contato
4. Favoritar um contato
5. Visualizar contato favoritos
6. Deletar um contato
7. Sair
`,
            )
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
    console.log("Contato adicionado com sucesso.");
}

function visualizarContato() {
    if (!listaDeContatos.length) {
        console.log(
            "\nLista de contato vazia. Adicione um novo contato a lista.",
        );
    }

    listaDeContatos.map((contato) => {
        const { id, nome, telefone, email, favorito } = contato;
        const contatoFavorito = favorito ? "❤️" : " ";
        console.log(
            `${id}. [${contatoFavorito} ], ${nome}, ${telefone}, ${email}`,
        );
    });

    return;
}

async function editarContato() {
    if (!listaDeContatos.length) {
        console.log(
            "\nLista de contato vazia. Adicione um novo contato a lista.",
        );
    } else {
        visualizarContato();
        const indice = await rl.question(
            "Informe o índice que deseja atualizar: ",
        );

        if (indice < 1 || indice > listaDeContatos.length) {
            console.log("Contato não encontrado. Tente novamente!");
            return;
        } else {
            const itemParaAtualizar = await rl.question(
                "Qual item da agenda deseja atualizar? (nome, telefone ou email): ",
            );

            const campo = itemParaAtualizar.trim().toLowerCase();
            const camposValidos = ["nome", "telefone", "email"];
            const contato = listaDeContatos.find(
                (item) => item.id === parseInt(indice),
            );

            if (!camposValidos.includes(campo)) {
                console.log(
                    "Campo inválido. Use nome, telefone ou email. Tente novamente!",
                );
                return;
            }

            const novoValor = await rl.question(
                `Informe o ${campo} atualizado: `,
            );

            contato[campo] = novoValor;

            console.log(`Contato ${contato.id} atualizado com sucesso.`);
            return;
        }
    }
    return;
}

async function deletarContato() {
    if (!listaDeContatos.length) {
        console.log(
            "\nLista de contato vazia. Adicione um novo contato a lista.",
        );
        return;
    }

    visualizarContato();

    const itemParaDeletar = parseInt(
        await rl.question("Informe o índice do contato que deseja deletar: "),
        10, // radix
    );

    const indice = listaDeContatos.findIndex(
        (item) => item.id === itemParaDeletar,
    );

    if (indice === -1) {
        console.log("Contato inválido. Tente novamente!");
        return;
    }

    listaDeContatos.splice(indice, 1);
    console.log("Contato deletado com sucesso.");

    return;
}

async function favoritarContato() {
    if (!listaDeContatos.length) {
        console.log(
            "\nLista de contato vazia. Adicione um novo contato a lista.",
        );
        return;
    }

    visualizarContato();
    const contatoParaFavoritar = parseInt(
        await rl.question("Informe o índice do contato que deseja favoritar: "),
        10,
    );

    const indiceContato = listaDeContatos.find(
        (item) => item.id === contatoParaFavoritar,
    );

    if (!indiceContato) {
        console.log("Contato inválido. Tente novamente!");
        return;
    } else {
        indiceContato["favorito"] = true;
        console.log("Contato atualizado com sucesso.");
        visualizarContato();
    }

    return;
}

function visualizarContatoFavorito() {
    if (!listaDeContatos.length) {
        console.log(
            "\nLista de contato vazia. Adicione um novo contato a lista.",
        );
        return;
    }

    let contatosFavoritos = listaDeContatos.filter(
        (contato) => contato.favorito,
    );

    if (!contatosFavoritos.length) {
        console.log(`\nNenhum contato favorito na lista.`);
        return;
    }

    contatosFavoritos.map((contato) => {
        const { id, nome, telefone, email } = contato;
        console.log(`${id}). ${nome}, ${telefone}, ${email}`);
    });

    return;
}

menu();
