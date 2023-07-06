const POSTAGENS_TELA = document.querySelector("#postagens");
const TEMPLATE = POSTAGENS_TELA.children[0].cloneNode(true);

const BARRA_BUSCA = document.querySelector("#barra-busca");

const POSTAGENS_PADRAO = [

    {
        title: "Compras , Pagamentos, Ouro e Diamantes",
        description: "Aqui você encontra dúvidas de pagamentos, compras gerais no jogo e compras de diamantes.",
        imagem: "./src/assets/icon.png",
        data: new Date(),
        id: 0
    },
    {
        title: "Problemas Técnicos",
        description: "Problemas de conexão, lag, problemas com o servidor, queda de FPS, jogo travando, etc.",
        imagem: "./src/assets/icon.png",
        data: new Date(),
        id: 1
    },
    {
        title: "Temporada e Eventos",
        description: "Aqui você pode tirar dúvidas sobre detalhes do funcionamento de Eventos e Temporadas",
        imagem: "./src/assets/icon.png",
        data: new Date(),
        id: 2
    },
    {
        title: "Acesso à Conta de Jogo",
        description: "Se não estiver conseguindo conectar à conta de jogo, estiver com algum problema cadastral, está tentando migrar sua c...",
        imagem: "./src/assets/icon.png",
        data: new Date(),
        id: 3
    },
    {
        title: "Dúvidas no jogo(itens, skins, personagens, etc)",
        description: "Não sabe como funciona determinados recursos do jogo ? veja os artigos que temos sobre free fire para solucionar suas...",
        imagem: "./src/assets/icon.png",
        data: new Date(),
        id: 4
    },

]

let POSTAGENS = []

const salvarDados = (postagens) => {
    localStorage.setItem("dados", JSON.stringify(postagens))
}

const salvarPadrao = () => {
    salvarDados(POSTAGENS_PADRAO)
}

BARRA_BUSCA.addEventListener("input", (evento) => {

    let dados = evento.target.value;

    if (!dados || dados === '') {
        mostrarDados(POSTAGENS)
        return;
    }

    mostrarDados(
        POSTAGENS.filter(el =>
            el.title.toLowerCase().includes(dados.toLowerCase()) ||
            el.description.toLowerCase().includes(dados.toLowerCase())
        )
    )

})

export const limpar = () => {
    POSTAGENS_TELA.innerHTML = '';
}

export const adicionarPostagem = (postagem) => {

    let elemento = TEMPLATE.cloneNode(true);

    elemento.innerHTML = elemento.innerHTML.replaceAll("${title}", postagem.title)
    elemento.innerHTML = elemento.innerHTML.replaceAll("${description}", postagem.description)
    elemento.innerHTML = elemento.innerHTML.replaceAll("${data}", new Date(postagem.data).toLocaleDateString())
    elemento.innerHTML = elemento.innerHTML.replaceAll("${img-link}", postagem.imagem)
    elemento.innerHTML = elemento.innerHTML.replaceAll("${img-alt}", postagem.title)
    elemento.innerHTML = elemento.innerHTML.replaceAll("${id}", postagem.id)

    elemento.setAttribute("post", postagem.id)

    POSTAGENS_TELA.appendChild(elemento)

}

export const carregarDados = () => {

    let data = JSON.parse(localStorage.getItem("dados"));

    if (!data) {
        salvarPadrao();
        data = JSON.parse(localStorage.getItem("dados"));
    }

    if (data.length === 0 && confirm("Deseja carregar os dados padrão da página?")) {
        salvarPadrao();
        data = JSON.parse(localStorage.getItem("dados"));
    }

    POSTAGENS = [];

    data.forEach(el => {
        POSTAGENS.push(el)
    })


    console.log(POSTAGENS);

    mostrarDados(POSTAGENS)

}

export const mostrarDados = (postagens) => {

    limpar();

    postagens.forEach(el => {
        adicionarPostagem(el)
    })
}

export const editarPostagem = (id) => {
    const postagem = POSTAGENS.find(el => el.id === id);

    if (postagem) {
        const titulo = prompt("Digite o novo título", postagem.title);
        const descricao = prompt("Digite a nova descrição", postagem.description);
        const data = prompt("Digite a nova data", postagem.data);
        const imagem = prompt("Digite o URL da nova imagem", postagem.imagem);

        if (titulo && descricao) {
            postagem.title = titulo;
            postagem.description = descricao;
            postagem.data = data;
            postagem.imagem = imagem;

            salvarDados(POSTAGENS);
            carregarDados();
        }
    }
};

export const excluirPostagem = (id) => {
    POSTAGENS = POSTAGENS.filter(el => el.id !== id);
    salvarDados(POSTAGENS);
    carregarDados();
}