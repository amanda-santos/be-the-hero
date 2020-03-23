// instanciando uma variável express, que pegará o pacote express
const express = require('express');

// inicializando o app
const app = express();

// rota principal do app
app.get('/', (request, response) => {

  // retornando resposta em texto comum
  // return response.send('Hello World');

  // retornando resposta em json
  return response.json({
    evento: 'Semana OmniStack 11.0',
    aluna: 'Amanda Santos'
  });
  
});

// cadastrando a porta que será usada pelo app
app.listen(3333);