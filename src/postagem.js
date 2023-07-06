import { Modal } from "./tela.js";

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


export const proximoId = () => {

    let maior = Number.MIN_VALUE;

    for (let post of POSTAGENS) {
        if (post.id > maior)
            maior = post.id;
    }

    if (maior === Number.MIN_VALUE)
        return 0;

    return ++maior;
}

export const pegarPostagens = () => {
    return POSTAGENS
}


export const limparTela = () => {
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
        let { title, description, imagem, data, id } = el;
        let post = new Postagem(title, description, imagem, data, id)
        POSTAGENS.push(post)
    })

    mostrarDados(POSTAGENS)

}

export const mostrarDados = (postagens) => {

    limparTela();

    postagens.forEach(el => {
        el.mostrarPostagem(POSTAGENS_TELA)
    })
}

export const editarPostagem = (id) => {
    const postagem = POSTAGENS.find(el => el.id == id);
    postagem.editarPostagem();
};

export const excluirPostagem = (id) => {
    console.log(id)
    POSTAGENS = POSTAGENS.filter(el => el.id != id);
    salvarDados(POSTAGENS);
    carregarDados();
}

export const registrarPostagem = (postagem) => {

    excluirPostagem(postagem.id)
    POSTAGENS.push(postagem)
    salvarDados(POSTAGENS);
    carregarDados();

}

export const editarPostagemItem = (postagem) => {

    excluirPostagem(postagem.id)
    POSTAGENS.push(postagem)
    salvarDados(POSTAGENS);
    carregarDados();

}

export class Postagem {

    constructor(title, description, imagem, data, id) {
        this.title = title;
        this.description = description;
        this.imagem = imagem;
        this.data = data;
        this.id = id;
    }

    mostrarPostagem(tela) {

        console.log(this)

        let elemento = TEMPLATE.cloneNode(true);

        elemento.innerHTML = elemento.innerHTML.replaceAll("${title}", this.title)
        elemento.innerHTML = elemento.innerHTML.replaceAll("${description}", this.description)
        elemento.innerHTML = elemento.innerHTML.replaceAll("${data}", new Date(this.data).toLocaleDateString())
        elemento.innerHTML = elemento.innerHTML.replaceAll("${img-link}", this.imagem)
        elemento.innerHTML = elemento.innerHTML.replaceAll("${img-alt}", this.title)
        elemento.innerHTML = elemento.innerHTML.replaceAll("${id}", this.id)

        elemento.setAttribute("post", this.id)

        tela.appendChild(elemento)

    }

    editarPostagem() {
        new Modal(this).abrir();
    }

}