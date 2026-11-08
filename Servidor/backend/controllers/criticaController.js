const fs = require("fs");
const path = require("path");

function escapeHtml(valor) {
    return String(valor).replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);
}

function inserirNoHtml(req, res, marcador, criarHtml) {
    const { resposta, arquivo } = req.body;
    if (!resposta || !arquivo) return res.status(400).send("Resposta ou arquivo ausente.");
    const nomeSeguro = path.basename(arquivo);
    if (nomeSeguro !== arquivo || !nomeSeguro.toLowerCase().endsWith(".html"))
        return res.status(400).send("Nome de arquivo inválido.");

    const caminho = path.join(__dirname, "..", "..", "public", nomeSeguro);
    fs.readFile(caminho, "utf8", (erro, conteudo) => {
        if (erro) return res.status(500).send("Erro ao ler o arquivo.");
        if (!conteudo.includes(marcador))
            return res.status(500).send(`Arquivo não possui o marcador ${marcador}.`);
        const atualizado = conteudo.replace(marcador, criarHtml(resposta, req.session.nome, nomeSeguro) + marcador);
        fs.writeFile(caminho, atualizado, "utf8", erroGravacao => {
            if (erroGravacao) return res.status(500).send("Erro ao salvar conteúdo.");
            return res.redirect(`/${encodeURIComponent(nomeSeguro)}`);
        });
    });
}

function escreverCritica(req, res) {
    inserirNoHtml(req, res, "<!-- CRITICAS-AQUI -->", (texto, usuario, arquivo) => `
<div class="usuario">
  <div class="avatar"><img src="https://i.pinimg.com/564x/c7/ab/cd/c7abcd3ce378191a3dddfa4cdb2be46f.jpg" alt="Avatar"></div>
  <div class="conteudo-critica"><h3>${escapeHtml(usuario)}</h3><p>${escapeHtml(texto)}</p></div>
  <h4>Escreva:</h4>
  <form method="post" action="/Escrever_Resposta">
    <textarea name="resposta" rows="4" cols="80" placeholder="Digite sua Resposta..."></textarea><br>
    <input type="hidden" name="arquivo" value="${escapeHtml(arquivo)}">
    <input type="submit" value="Enviar">
  </form>
</div>
<div class="avaliacao">Avaliação: ☆ ☆ ☆ ☆ ☆</div>
<!-- RESPOSTAS-AQUI -->
`);
}
function escreverResposta(req, res) {
    inserirNoHtml(req, res, "<!-- RESPOSTAS-AQUI -->", (texto, usuario, arquivo) => `
<div class="usuario"><div class="conteudo-critica">
  <h3>Resposta ${escapeHtml(usuario)}</h3><p>${escapeHtml(texto)}</p>
</div></div>
`);
}
module.exports = { escreverCritica, escreverResposta };
