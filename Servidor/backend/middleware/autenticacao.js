function verificarLogin(req, res, next) {
    if (!req.session || !req.session.nome) {
        req.session.redirectTo = req.originalUrl;
        if (req.session.redirectTo === "/adicionar_livro") req.session.redirectTo = "/Perfil";
        return res.redirect("/Login");
    }
    next();
}
module.exports = verificarLogin;
