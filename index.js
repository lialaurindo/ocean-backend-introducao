const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

//Lista de Heróis
const herois = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"]

// Nova rota > Read All > ler todos os itens

app.get('/herois', function (req, res) {
    res.send(herois)
  })
// referenciando a variável "herois"

app.listen(3000, () => console.log ('aplicação rodando em localhost:3000'))

// () => console.log ('aplicação rodando em localhost:3000')
// apenas dando retorno no console para quando rodar no localhost