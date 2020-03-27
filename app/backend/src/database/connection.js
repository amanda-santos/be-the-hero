const knex = require('knex');
const configuration = require('../../knexfile');

// se a variável de ambiente/global NODE_ENV for igual a test, a configuração do banco acessado deverá ser configuration.test
// senão, será configuration.development
// isso permite que o sistema use o banco de developmente, se a aplicação estiver executando normalmente
// ou o banco de tests, se estiver executando os testes
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

// aqui é escolhida qual a configuração que será usada
const connection = knex(config);

module.exports = connection;