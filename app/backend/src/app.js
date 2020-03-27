// instanciando uma variável express, que pegará o pacote express
const express = require('express');

// importando o módulo de segurança cors
const cors = require('cors');

// importando errors do celebrate
const { errors } = require('celebrate');

// importando o arquivo com as rotas
const routes = require('./routes');

// inicializando o app
const app = express();

// cors
app.use(cors());

// permitindo que arquivos json sejam compreendidos
app.use(express.json());

// chamando o arquivo de rotas
app.use(routes);

// chamando errors do celebrate
app.use(errors());

// exportando o app
// será usado em server.js
module.exports = app;