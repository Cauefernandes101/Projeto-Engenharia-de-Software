const { getColecao } = require("../database/conexao");

async function listarLivros(req, res) {
    try {
        const lista = await getColecao("livros").find({ usuario: req.session.nome }).toArray();
        return res.render("lista_de_livros", { livros: lista });
    } catch (erro) {
        console.error(erro);
        return res.status(500).send("Erro ao listar livros");
    }
}

async function adicionarLivro(req, res) {
    try {
        const { titulo, status, nota, capa, generos, Autor } = req.body;
        if (!titulo || !generos) return res.status(400).send("Preencha título e gêneros.");
        const listaGeneros = String(generos).split(",").map(g => g.trim()).filter(Boolean);
        await getColecao("livros").updateOne(
            { titulo: titulo.trim(), usuario: req.session.nome },
            { $set: { usuario: req.session.nome, titulo: titulo.trim(), Autor, capa, nota, status, generos: listaGeneros } },
            { upsert: true }
        );
        return res.redirect("/lista_de_livros");
    } catch (erro) {
        console.error(erro);
        return res.status(500).send("Erro ao adicionar livro");
    }
}

async function alterarNota(req, res) {
    try {
        const { titulo, nota } = req.body;
        const novaNota = Number(nota);
        if (!Number.isInteger(novaNota) || novaNota < 1 || novaNota > 5)
            return res.status(400).send("Nota inválida");
        await getColecao("livros").updateOne(
            { titulo, usuario: req.session.nome }, { $set: { nota: novaNota } }
        );
        return res.redirect("/lista_de_livros");
    } catch (erro) {
        console.error(erro);
        return res.status(500).send("Erro ao alterar nota");
    }
}

async function removerLivro(req, res) {
    try {
        await getColecao("livros").deleteOne({ titulo: req.body.titulo, usuario: req.session.nome });
        return res.redirect("/lista_de_livros");
    } catch (erro) {
        console.error(erro);
        return res.status(500).send("Erro ao remover livro");
    }
}

async function dadosGeneros(req, res) {
    try {
        const lista = await getColecao("livros").find({ usuario: req.session.nome }).toArray();
        const contagem = {};
        lista.forEach(livro => (livro.generos || []).forEach(g => {
            contagem[g] = (contagem[g] || 0) + 1;
        }));
        return res.json(contagem);
    } catch (erro) {
        console.error(erro);
        return res.status(500).send("Erro ao buscar gêneros");
    }
}
module.exports = { listarLivros, adicionarLivro, alterarNota, removerLivro, dadosGeneros };
