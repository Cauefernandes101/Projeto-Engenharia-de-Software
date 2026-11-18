# Estante Pública

A Estante Pública é uma aplicação web desenvolvida com o objetivo de incentivar a leitura e facilitar a organização de bibliotecas pessoais. A plataforma permite que os usuários cadastrem livros, organizem suas leituras por status (Planejo Ler, Lendo e Lido), atribuam notas, escrevam críticas e consultem opiniões de outros leitores.

O projeto também disponibiliza um catálogo de livros com informações como título, autor, ano de lançamento, capa, gêneros e sinopse, além de perfis de usuários e ferramentas de busca.

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando HTML, CSS e JavaScript para a interface, Node.js e Express para o servidor, EJS para a renderização de páginas dinâmicas e MongoDB para o armazenamento dos dados.

## Banco de dados

O MongoDB utiliza três coleções principais:

- **catalogo:** armazena as informações dos livros disponíveis na plataforma.
- **livros:** armazena os livros adicionados às bibliotecas pessoais dos usuários, incluindo status e nota.
- **criticas:** armazena as críticas publicadas pelos usuários.

Para iniciar o catálogo, devem ser inseridos os documentos dos livros na coleção `catalogo`, utilizando o MongoDB Compass em Add Data → Insert Document.
(txt com inserts utilizados disponivel)
Exemplo de documento:

```json
{
  "titulo": "Harry Potter e a Pedra Filosofal",
  "Autor": "J. K. Rowling",
  "ano": 1997,
  "capa": "URL_DA_CAPA",
  "generos": ["Fantasia", "Aventura"],
  "sinopse": "Harry Potter descobre que é um bruxo e passa a estudar na Escola de Magia e Bruxaria de Hogwarts."
}
```

Os demais livros devem seguir a mesma estrutura, alterando as informações de cada obra.

A coleção `livros` recebe os registros quando o usuário adiciona uma obra à sua biblioteca pela aplicação. A coleção `criticas` recebe os registros quando um usuário publica uma crítica.

## Como executar

É necessário ter Node.js e MongoDB configurados.

Primeiro, instale as dependências com:

```bash
npm install
```

Configure o arquivo `.env` com os dados de conexão:

```env
MONGODB_URI=sua_string_de_conexao
MONGODB_DATABASE=nome_do_banco
```

Depois, inicie o servidor:

```bash
node server.js
```

Acesse a aplicação pelo endereço local configurado no servidor.

## Desenvolvedores

Cauê e Alexandre.

Estante Pública — Organize suas leituras, compartilhe suas ideias e descubra novas histórias.
