const { MongoClient } = require("mongodb");
let db;

async function conectarBanco() {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("Defina MONGODB_URI no .env da pasta principal.");
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(process.env.MONGODB_DATABASE || "exemplo_bd");
    console.log("Conectado ao MongoDB.");
}

function getColecao(nome) {
    if (!db) throw new Error("Banco ainda não conectado.");
    return db.collection(nome);
}
module.exports = { conectarBanco, getColecao };
