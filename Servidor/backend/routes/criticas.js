const express = require("express");
const router = express.Router();
const controller = require("../controllers/criticaController");
const verificarLogin = require("../middleware/autenticacao");

router.post("/Escrever_Critica", verificarLogin, controller.escreverCritica);
router.post("/Escrever_Resposta", verificarLogin, controller.escreverResposta);

module.exports = router;
