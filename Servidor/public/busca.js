
// Livros disponíveis na busca
const livros = [
    { nome: "Harry Potter e a Pedra Filosofal" },
    { nome: "The Hunger Games" },
    { nome: "House of Leaves" },
    { nome: "A Metamorfose" },
    { nome: "Solo Leveling - Livro 1" },
    { nome: "Moby Dick" },
    { nome: "To Kill a Mockingbird" },
    { nome: "The Great Gatsby" },
    { nome: "The Shining" },
    { nome: "The Godfather" },
    { nome: "11/22/63" }
];

const input = document.getElementById("inputLivro");
const lista = document.getElementById("listaSugestoes");

// Verifica se a página possui o campo de busca
if (input && lista) {

    // Mostra sugestões enquanto digita
    input.addEventListener("input", () => {

        const valorBusca = input.value.toLowerCase().trim();

        lista.innerHTML = "";

        if (valorBusca.length === 0) {
            lista.style.display = "none";
            return;
        }

        const filtrados = livros.filter(livro =>
            livro.nome.toLowerCase().includes(valorBusca)
        );

        if (filtrados.length > 0) {

            lista.style.display = "block";

            filtrados.forEach(livro => {

                const div = document.createElement("div");
                div.classList.add("sugestao-item");
                div.textContent = livro.nome;

                div.addEventListener("click", () => {
                    window.location.href =
                        "/livro/" + encodeURIComponent(livro.nome);
                });

                lista.appendChild(div);
            });

        } else {
            lista.style.display = "none";
        }
    });

    // Abre o livro ao pressionar ENTER
    input.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            const valorBusca = input.value.toLowerCase().trim();

            const encontrado = livros.find(livro =>
                livro.nome.toLowerCase() === valorBusca
            );

            if (encontrado) {
                window.location.href =
                    "/livro/" + encodeURIComponent(encontrado.nome);
            }
        }
    });

    // Fecha a lista ao clicar fora
    document.addEventListener("click", (e) => {

        if (!input.contains(e.target) && !lista.contains(e.target)) {
            lista.style.display = "none";
        }
    });
}
