const express = require('express')
const app = express()

//indica para o Express que estamos usando Json
app.use (express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
});

//Lista de Heróis
const herois = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"]

// Nova rota > Read All > ler todos os itens

app.get('/herois', function (req, res) {
    res.send(herois)
  });
// referenciando a variável "herois"

// Read by ID (Visualizar um item pelo ID)

app.get('/herois/:id', function (req, res) {
  const id = req.params.id;
  const item = herois[id -1];

  res.send(item)
});

// Create (criar um item)
app.post('/herois', function (req,res) {
  //pegando somente o nome do herói
  const item = req.body.nome;

  //Adicionando item obtido dentro da lista de heróis
  herois.push (item)
  res.send('Item criado com sucesso');
});


//Update (editar um item)
app.put ('/herois/:id', function (req,res) {
// como vou identificar o que será editado - obtendo ID
  const id = req.params.id;
  // o que será editado - pegamos a nova informação
  const item = req.body.nome;

  //atualizamos a informação na lista
  herois [id-1] = item;

  res.send ('Item editado com sucesso')
});

//Delete (remover um item)
app.delete ('/herois/:id', function (req,res) {
//Obtemos o ID do item que será removido
  const id = req.params.id;

  //Removemos o item da lista
  delete herois [id-1];


  res.send ("Item removido com sucesso")
})


app.listen(3000, () => console.log ('aplicação rodando em localhost:3000'))

// () => console.log ('aplicação rodando em localhost:3000')
// apenas dando retorno no console para quando rodar no localhost
