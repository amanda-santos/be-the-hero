const knex = require('knex');
const configuration = require('../../knexfile');

// aqui é escolhida qual a configuração que será usada, nesse caso de desenvolvimento
const connection = knex(configuration.development);

module.exports = connection;