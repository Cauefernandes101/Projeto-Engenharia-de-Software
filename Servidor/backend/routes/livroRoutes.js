
const express = require("express");
const router = express.Router();

const {
    mostrarLivro,
    escreverCritica
} = require("../controllers/paginaLivroController");

// Abre a página do livro escolhido
router.get("/livro/:titulo", mostrarLivro);

// Publica uma crítica
router.post("/livro/:titulo/criticas", escreverCritica);

module.exports = router;
