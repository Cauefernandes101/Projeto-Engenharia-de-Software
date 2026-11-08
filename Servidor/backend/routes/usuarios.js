const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuarioController");
const verificarLogin = require("../middleware/autenticacao");

router.post("/cadastrar_usuario", controller.cadastrarUsuario);
router.get("/Login", controller.mostrarLogin);
router.post("/logar_usuario", controller.logarUsuario);
router.get("/Perfil", verificarLogin, controller.mostrarPerfil);
router.get("/logout", controller.logout);

module.exports = router;
