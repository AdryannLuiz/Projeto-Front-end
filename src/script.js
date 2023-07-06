import { carregarDados, limparTela, editarPostagem, excluirPostagem } from "./postagem.js";
import { swicthModal, gerarPostagem, Modal } from "./tela.js"

const CRIAR_POSTAGEM = document.querySelector('#btnCriarPostagem')

const FECHAR_MODAL = document.querySelector('#modal-close')
const SALVAR_MODAL = document.querySelector('#modal-salvar')


limparTela();

document.addEventListener("DOMContentLoaded", () => {

    carregarDados();

    CRIAR_POSTAGEM.addEventListener("click", () => {
        new Modal(null).abrir()
    })

    FECHAR_MODAL.addEventListener("click", swicthModal)
    SALVAR_MODAL.addEventListener("click", gerarPostagem)
})

window.editar = (id) => {
    editarPostagem(id);
}

window.excluir = (id) => {
    if (confirm("Tem certeza que deseja excluir a postagem?")) {
        excluirPostagem(id);
    }
}

window.onclick = function (evento) {

    const modal = document.querySelector('#criarPostagem')

    if (evento.target == modal) {
        swicthModal()
    }

}