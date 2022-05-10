const express = require('express')
const app = express()

//indica para o Express que estamos usando Json
app.use(express.json());


//criando a primeira rota da aplicação
app.get('/', function (req, res) {
  res.send('Lista de heróis')
});


//Incluindo uma lista de heróis para ser utilizada em novas rotas
const herois = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"]


// Nova rota: Read All > ler todos os itens da lista de heróis
app.get('/herois', function (req, res) {
  //Exibindo a lista e incluindo o .filter(boolean) para só exibir itens com valor
  res.send(herois.filter(Boolean))
});


//Read by ID: Visualizar um item pelo seu ID
app.get('/herois/:id', function (req, res) {
  //Recebemos o ID que iremos buscar
  const id = req.params.id;
  const item = herois[id - 1];

  //incluindo a lógica para id não encontrado na lista 
  if (!item) {
    //configurando a resposta para ID inexistente
    res.status(404).send('Item não encontrado');
    //encerra a função
    return;
  }
  //retorno para item sendo consultado pelo seu ID
  res.send(item)
});


//Create: criar um novo item na lista
app.post('/herois', function (req, res) {
  //pegando somente o nome do herói
  const item = req.body.nome;

  if (!item) {
    res.status(400).send("Informar a propriedade 'nome' no corpo da requisição");

    //encerra a função:
    return;
  }

  //Adicionando item obtido dentro da lista de heróis
  herois.push(item)
  res.send('Item criado com sucesso');
});


//Update (editar um item)
app.put('/herois/:id', function (req, res) {
  // como vou identificar o que será editado - obtendo ID
  const id = req.params.id;
  // o que será editado - pegamos a nova informação
  const item = req.body.nome;

  //atualizamos a informação na lista
  herois[id - 1] = item;

  res.send('Item editado com sucesso')
});


//Delete (remover um item)
app.delete('/herois/:id', function (req, res) {
  //Obtemos o ID do item que será removido
  const id = req.params.id;

  if (!herois[id - 1]) {
    // Envia uma resposta de não encontrado
    res.status(404).send("Item não encontrado.");

    // Encerra a função
    return;
  }

  //Removemos o item da lista
  delete herois[id - 1];
  res.send("Item removido com sucesso")
})


//Incluindo o console.log apenas para dar retorno no terminal quando rodar 
app.listen(3000, () => console.log('aplicação rodando em localhost:3000'))
