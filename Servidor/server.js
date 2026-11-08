
const express = require("express");
const session = require("express-session");
const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, ".env")
});

// Conexão com o banco de dados
const { conectarBanco } = require("./backend/database/conexao");

// Rotas
const usuariosRoutes = require("./backend/routes/usuarios");
const livrosRoutes = require("./backend/routes/livros");
const criticasRoutes = require("./backend/routes/criticas");

const app = express();

// A raiz agora é a própria pasta onde está o server.js
const raiz = __dirname;

// Arquivos estáticos
app.use(express.static(path.join(raiz, "public")));

// Recebimento de dados
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuração de sessão
app.use(session({
    secret: process.env.SESSION_SECRET || "troque-esta-chave",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    }
}));

// Configuração das páginas EJS
app.set("view engine", "ejs");
app.set("views", path.join(raiz, "view"));

// Registro das rotas
app.use(usuariosRoutes);
app.use(livrosRoutes);
app.use(criticasRoutes);

// Inicialização do servidor
async function iniciarServidor() {
    try {
        await conectarBanco();

        const porta = process.env.PORT || 3000;

        app.listen(porta, () => {
            console.log(`Servidor em http://localhost:${porta}`);
        });

    } catch (erro) {
        console.error("Erro ao iniciar servidor:", erro);
        process.exit(1);
    }
}

iniciarServidor();
