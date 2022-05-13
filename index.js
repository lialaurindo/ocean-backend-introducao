const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017'
const dbName = 'ocean_bancodedados_13_05_2022';

async function main () {
console.log ('Conectando com banco de dados...')
const client = await MongoClient.connect (url);
const db = client.db(dbName);
const collection = db.collection(herois);
console.log ('Conexão com o banco de dados realizada com sucesso');

const app = express()

//indica para o Express que estamos usando Json
app.use(express.json());



//criando a primeira rota da aplicação
app.get('/', function (req, res) {
  res.send('Lista de heróis')
});


//Declarando uma lista de heróis para ser utilizada em novas rotas
const herois = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"]


// Nova rota: Read All > ler todos os itens da lista de heróis
app.get('/herois', async function (req, res) {
  //Exibindo a lista e incluindo o .filter(boolean) para só exibir itens com valor
  const documentos = await collection.find().toArray();
  res.send(documentos)
});


//Read by ID: Visualizar um item pelo seu ID
app.get('/herois/:id', function (req, res) {
  //Recebemos o ID que iremos buscar
  const id = req.params.id;
  const item = await collection.findOne({_id: new ObjectId(id)});

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
app.post('/herois', async function (req, res) {
  //pegando somente o nome do herói
  const item = req.body;

  if (!item) {
    res.status(400).send("Informar a propriedade 'nome' no corpo da requisição");

    //encerra a função:
    return;
  }

  //Adicionando item obtido dentro da lista de heróis
  await collection.insertOne(item);
  res.send(item);
});


//Update (editar um item)
app.put('/herois/:id', async function (req, res) {
  // como vou identificar o que será editado - obtendo ID
  const id = req.params.id;
  // o que será editado - pegamos a nova informação

  const itemEncontrado = await collection.findOne({_id: new ObjectId(id)});

// pegamos a nova informação que está sendo enviada
  const item = req.body.nome;

  //atualizamos a informação na lista
  collection.updateOne(
    {_id: new ObjectId(id)},
    {
      $set: item,
    }
  );

  res.send(item)
});


//Delete (remover um item)
app.delete('/herois/:id', async function (req, res) {
  //Obtemos o ID do item que será removido
  const id = req.params.id;

const itemEncontrando = await collection.findOne({_id: new ObjectId(id)});


  if (itemEncontrado) {
    // Envia uma resposta de não encontrado
    res.status(404).send("Item não encontrado.");

    // Encerra a função
    return;
  }

  //Removemos o item da lista
 await collection.deleteOne ({_id: new ObjectId(id)});
  res.send("Item removido com sucesso")
})


//Incluindo o console.log apenas para dar retorno no terminal quando rodar 
app.listen(3000, () => console.log('aplicação rodando em localhost:3000'))

}

main (); 