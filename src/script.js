import { carregarDados, limpar, editarPostagem, excluirPostagem } from "./postagem.js";
import { swicthModal, criarPostagem } from "./tela.js"

const CRIAR_POSTAGEM = document.querySelector('#btnCriarPostagem')

const FECHAR_MODAL = document.querySelector('#modal-close')
const SALVAR_MODAL = document.querySelector('#modal-salvar')


limpar();

document.addEventListener("DOMContentLoaded", () => {
    carregarDados();

    CRIAR_POSTAGEM.addEventListener("click", swicthModal)

    FECHAR_MODAL.addEventListener("click", swicthModal)
    SALVAR_MODAL.addEventListener("click", criarPostagem)
})

window.editar = (id) => {
    editarPostagem(id);
}

window.excluir = (id) => {
    if (confirm("Tem certeza que deseja excluir a postagem?")) {
        excluirPostagem(id);
    }
}

window.addPostagem = () => {
    if (confirm("Tem certeza que deseja excluir a postagem?")) {
        excluirPostagem(evento);
    }
}

window.onclick = function (evento) {

    const modal = document.querySelector('#criarPostagem')

    if (evento.target == modal) {
        swicthModal()
    }

}