const POSTAGENS = document.querySelector("#postagens");
const TEMPLATE = POSTAGENS.children[0].cloneNode(true);

const POSTAGENS_PADRAO = [
    {
        title: "Compras , Pagamentos, Ouro e Diamantes",
        description: "Aqui você encontra dúvidas de pagamentos, compras gerais no jogo e compras de diamantes.",
        imagem: "./src/assets/icon.png",
        data: new Date()
    },
    {
        title: "Problemas Técnicos",
        description: "Problemas de conexão, lag, problemas com o servidor, queda de FPS, jogo travando, etc.",
        imagem: "./src/assets/icon.png",
        data: new Date()
    },
    {
        title: "Temporada e Eventos",
        description: "Aqui você pode tirar dúvidas sobre detalhes do funcionamento de Eventos e Temporadas",
        imagem: "./src/assets/icon.png",
        data: new Date()
    },
    {
        title: "Acesso à Conta de Jogo",
        description: "Se não estiver conseguindo conectar à conta de jogo, estiver com algum problema cadastral, está tentando migrar sua c...",
        imagem: "./src/assets/icon.png",
        data: new Date()
    },
    {
        title: "Dúvidas no jogo(itens, skins, personagens, etc)",
        description: "Não sabe como funciona determinados recursos do jogo ? veja os artigos que temos sobre free fire para solucionar suas...",
        imagem: "./src/assets/icon.png",
        data: new Date()
    },
]

export const limpar = () => {
    POSTAGENS.innerHTML = '';
}

export const adicionarPostagem = (postagem) => {

    let elemento = TEMPLATE.cloneNode(true);

    elemento.innerHTML = elemento.innerHTML.replaceAll("${title}", postagem.title)
    elemento.innerHTML = elemento.innerHTML.replaceAll("${description}", postagem.description)
    elemento.innerHTML = elemento.innerHTML.replaceAll("${data}", postagem.data.toLocaleDateString())
    elemento.innerHTML = elemento.innerHTML.replaceAll("${img-link}", postagem.imagem)
    elemento.innerHTML = elemento.innerHTML.replaceAll("${img-alt}", postagem.title)

    POSTAGENS.appendChild(elemento)

}

export const carregarDados = () => {

    let data = JSON.parse(localStorage.getItem("dados"));

    if (!data) {
        salvarPadrao();
    }

    POSTAGENS_PADRAO.forEach(el => {
        adicionarPostagem(el)
    })

}

const salvarPadrao = () => {
    localStorage.setItem("dados", JSON.stringify(POSTAGENS_PADRAO))
}