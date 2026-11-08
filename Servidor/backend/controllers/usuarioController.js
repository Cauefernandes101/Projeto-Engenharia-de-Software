const { getColecao } = require("../database/conexao");

async function cadastrarUsuario(req, res) {
    try {
        const { nome, senha } = req.body;
        if (!nome || !senha) return res.status(400).send("Campos obrigatórios não preenchidos!");
        const usuarios = getColecao("usuarios");
        if (await usuarios.findOne({ nome: nome.trim() }))
            return res.status(409).send("Esse nome de usuário já está cadastrado.");
        // Mantido compatível com o código original. Use bcrypt/hash antes de publicar.
        await usuarios.insertOne({ nome: nome.trim(), senha });
        return res.redirect("/Login");
    } catch (erro) {
        console.error(erro);
        return res.status(500).send("Erro ao cadastrar usuário");
    }
}

async function logarUsuario(req, res) {
    try {
        const { nome, senha } = req.body;
        if (!nome || !senha) return res.status(400).send("Nome e senha são obrigatórios!");
        const usuario = await getColecao("usuarios").findOne({ nome: nome.trim(), senha });
        if (!usuario) return res.status(401).send("Usuário inválido");
        req.session.nome = usuario.nome;
        const destino = req.session.redirectTo || "/Perfil";
        delete req.session.redirectTo;
        return res.redirect(destino);
    } catch (erro) {
        console.error(erro);
        return res.status(500).send("Erro no servidor");
    }
}

function mostrarPerfil(req, res) {
    res.render("Perfil", { usuario: req.session.nome });
}
function mostrarLogin(req, res) {
    res.render("Login");
}
function logout(req, res) {
    req.session.destroy(erro => {
        if (erro) return res.status(500).send("Erro ao sair");
        res.clearCookie("connect.sid");
        return res.redirect("/Login");
    });
}
module.exports = { cadastrarUsuario, logarUsuario, mostrarPerfil, mostrarLogin, logout };
