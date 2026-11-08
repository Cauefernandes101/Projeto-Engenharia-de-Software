 // Aba de search
const livros = [
    { nome: "Harry Potter", url: "harrypotter_pedrafilosofal.html" },
    { nome: "Hunger Games", url: "hungergames.html" },
    { nome: "House of Leaves", url: "houseofleaves.html" },
    { nome: "A Metamorfose", url: "metamorfose.html" },
    { nome: "Solo Leveling", url: "sololeveling.html"},
    { nome: "Moby Dick", url: "mobydick.html"},
    { nome: "To Kill a Mockingbird", url: "osoleoparatodos.html"},
    { nome: "The Great Gatsby", url: "thegreatgatsby.html"},
    { nome: "The Shining", url: "theshining.html"},
    { nome: "11/22/63", url: "112263.html"},

];

const input = document.getElementById("inputLivro");
const lista = document.getElementById("listaSugestoes");

// mostrar as sugestões enquanto digita
input.addEventListener("input", () => {
    const valorBusca = input.value.toLowerCase();
    lista.innerHTML = ""; 

    if (valorBusca.length > 0) {
        // Acessa livro.nome para filtrar
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
                    window.location.href = livro.url;
                });

                lista.appendChild(div);
            });
        } else {
            lista.style.display = "none";
        }
    } else {
        lista.style.display = "none";
    }
});

// Lógica para o ENTER 
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const encontrado = livros.find(l => 
            l.nome.toLowerCase() === input.value.toLowerCase()
        );
        if (encontrado) {
            window.location.href = encontrado.url;
        }
    }
});

// Fecha a lista ao clicar fora
document.addEventListener("click", (e) => {
    if (e.target !== input) {
        lista.style.display = "none";
    }
});