import { carregarDados, limpar, editarPostagem, excluirPostagem } from "./postagem.js";

limpar();

document.addEventListener("DOMContentLoaded", () => {
    carregarDados();
})

window.editar = (evento) => {
    editarPostagem(evento);
}

window.excluir = (evento) => {
    if (confirm("Tem certeza que deseja excluir a postagem?")) {
        excluirPostagem(evento);
    } else {
    }
}