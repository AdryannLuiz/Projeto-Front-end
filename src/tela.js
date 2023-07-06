import { proximoId, pegarPostagens, Postagem, editarPostagemItem } from "./postagem.js"

const INPUT_TITLE = document.querySelector('#titulo')
const INPUT_DESCRIPTION = document.querySelector('#descricao')
const INPUT_IMG = document.querySelector('#img')
const INPUT_DATE = document.querySelector('#data')

const ERROR_TITLE = document.querySelector('#erro-titulo')
const ERROR_DESCRIPTION = document.querySelector('#erro-descricao')
const ERROR_IMG = document.querySelector('#erro-img')
const ERROR_DATE = document.querySelector('#erro-data')

export const swicthModal = () => {

    const modal = document.querySelector('#criarPostagem')

    const actualStyle = modal.style.display

    if (actualStyle == 'block') {
        modal.style.display = 'none'
    } else {
        modal.style.display = 'block'
    }

    ERROR_TITLE.innerHTML = ""
    ERROR_DESCRIPTION.innerHTML = ""
    ERROR_IMG.innerHTML = ""
    ERROR_DATE.innerHTML = ""

    INPUT_TITLE.value = ""
    INPUT_DESCRIPTION.value = ""
    INPUT_IMG.value = ""
    INPUT_DATE.value = ""
}

export const gerarPostagem = () => {

    const modal = document.querySelector('#criarPostagem')

    let proxId = modal.getAttribute("post");
    let editar = true;

    ERROR_TITLE.innerHTML = ""
    ERROR_DESCRIPTION.innerHTML = ""
    ERROR_IMG.innerHTML = ""
    ERROR_DATE.innerHTML = ""

    if (!proxId) {
        proxId = proximoId();
        editar = false;
    }

    let estaErrado = false;

    let postagem = new Postagem(
        INPUT_TITLE.value,
        INPUT_DESCRIPTION.value,
        INPUT_IMG.value,
        `${INPUT_DATE.value}T00:00:00.000Z`,
        proxId
    )

    let postagens = pegarPostagens();

    if (editar) {
        console.log(proxId)
        postagens = postagens.filter(el => el.id != proxId);
    }

    if (!postagem.title || postagem.title.length === 0 || postagens.find(el => {
        return el.title == postagem.title
    })) {

        if (!postagem.title || postagem.title.length === 0) {
            ERROR_TITLE.innerHTML = "Título inválido.";
        } else {
            ERROR_TITLE.innerHTML = "Já existe uma postagem com esse título.";
        }
        estaErrado = true;
    }

    if (!editar && postagens.find(el => {
        return new Date(el.data).getTime() > new Date(postagem.data).getTime()
    })) {
        ERROR_DATE.innerHTML = "Data inválida, insira uma data mais recente.";
        estaErrado = true;
    }

    if (!postagem.imagem || postagem.imagem.length === 0) {
        ERROR_IMG.innerHTML = "Insira um link de imagem.";
        estaErrado = true;
    }

    if (!postagem.description || postagem.description.length === 0) {
        ERROR_DESCRIPTION.innerHTML = "Insira uma descrição.";
        estaErrado = true;
    }

    if (!estaErrado) {
        swicthModal();
        editarPostagemItem(postagem);
    }

}

export class Modal {

    constructor(postagem) {
        this.postagem = postagem;
    }

    abrir() {

        const modal = document.querySelector('#criarPostagem')
        modal.style.display = 'block'
        modal.removeAttribute("post")

        if (this.postagem) {

            INPUT_TITLE.value = this.postagem.title;
            INPUT_DESCRIPTION.value = this.postagem.description;
            INPUT_IMG.value = this.postagem.imagem;

            modal.setAttribute("post", this.postagem.id)

            console.log(this.postagem.data)

            let a = new Date(this.postagem.data);

            let year = a.toLocaleString("default", { year: "numeric" });
            let month = a.toLocaleString("default", { month: "2-digit" });
            let day = a.toLocaleString("default", { day: "2-digit" });

            let formattedDate = year + "-" + month + "-" + day;

            console.log(formattedDate)

            INPUT_DATE.value = formattedDate;
        }

        ERROR_TITLE.innerHTML = ""
        ERROR_DESCRIPTION.innerHTML = ""
        ERROR_IMG.innerHTML = ""
        ERROR_DATE.innerHTML = ""
    }

}