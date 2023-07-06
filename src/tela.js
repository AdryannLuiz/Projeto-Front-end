import { proximoId, pegarPostagens, registrarPostagem } from "./postagem.js"

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

export const criarPostagem = () => {

    ERROR_TITLE.innerHTML = ""
    ERROR_DESCRIPTION.innerHTML = ""
    ERROR_IMG.innerHTML = ""
    ERROR_DATE.innerHTML = ""

    let proxId = proximoId();
    let estaErrado = false;

    let postagem = {
        title: INPUT_TITLE.value,
        description: INPUT_DESCRIPTION.value,
        imagem: INPUT_IMG.value,
        data: `${INPUT_DATE.value}T00:00:00.000Z`,
        id: proxId
    }

    let postagens = pegarPostagens();

    if (postagens.find(el => {
        return el.title === postagem.title
    })) {
        ERROR_TITLE.innerHTML = "Já existe uma postagem com esse título.";
        estaErrado = true;
    }

    if (postagens.find(el => {
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
        registrarPostagem(postagem);
    }

}