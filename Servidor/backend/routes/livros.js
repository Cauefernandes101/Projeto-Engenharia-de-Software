const express = require("express");
const router = express.Router();
const controller = require("../controllers/livroController");
const verificarLogin = require("../middleware/autenticacao");

router.get("/lista_de_livros", verificarLogin, controller.listarLivros);
router.post("/adicionar_livro", verificarLogin, controller.adicionarLivro);
router.post("/alterar_nota", verificarLogin, controller.alterarNota);
router.post("/remover_livro", verificarLogin, controller.removerLivro);
router.get("/dados_generos", verificarLogin, controller.dadosGeneros);

module.exports = router;
