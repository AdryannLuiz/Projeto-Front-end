import { carregarDados, limpar } from "./postagem.js";

const POSTAGENS = document.querySelector("#postagens");

limpar();

document.addEventListener("DOMContentLoaded", () => {
    carregarDados();
})