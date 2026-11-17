
const { getColecao } = require("../database/conexao");

// Exibe a página de um livro e suas críticas
async function mostrarLivro(req, res) {
    try {
        const titulo = req.params.titulo;

        const livro = await getColecao("catalogo").findOne({
            titulo: titulo
        });

        if (!livro) {
            return res.status(404).send("Livro não encontrado.");
        }

        const criticas = await getColecao("criticas")
            .find({ livroTitulo: livro.titulo })
            .sort({ data: -1 })
            .toArray();

        res.render("livro", {
            livro,
            criticas
        });

    } catch (erro) {
        console.error("Erro ao mostrar livro:", erro);
        res.status(500).send("Erro ao carregar a página do livro.");
    }
}

// Registra uma crítica para o livro
async function escreverCritica(req, res) {
    try {
        const titulo = req.params.titulo;
        const texto = req.body.texto;

        if (!req.session.nome) {
            return res.redirect("/Login");
        }

        if (!texto || !texto.trim()) {
            return res.redirect(
                "/livro/" + encodeURIComponent(titulo)
            );
        }

        const livro = await getColecao("catalogo").findOne({
            titulo: titulo
        });

        if (!livro) {
            return res.status(404).send("Livro não encontrado.");
        }

        await getColecao("criticas").insertOne({
            livroTitulo: livro.titulo,
            usuario: req.session.nome,
            texto: texto.trim(),
            nota: 0,
            data: new Date()
        });

        res.redirect("/livro/" + encodeURIComponent(titulo));

    } catch (erro) {
        console.error("Erro ao publicar crítica:", erro);
        res.status(500).send("Erro ao publicar a crítica.");
    }
}

// Exporta as funções para o arquivo de rotas
module.exports = {
    mostrarLivro,
    escreverCritica
};
