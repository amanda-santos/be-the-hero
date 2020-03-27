const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  // antes de cada teste começar devemos desfazer as migrations feitas e executá-las novamente no banco de testes
  beforeEach(async () => {
    // await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  // para fechar a conexão com o banco de testes, depois que todos os testes foram executados
  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "ABCD",
        email: "contato@abcd.com.br",
        whatsapp: "31000000000",
        city: "Ouro Branco",
        uf: "MG"
      });

    console.log(response.body);

    // esperamos que a resposta tenha a propriedade id
    expect(response.body).toHaveProperty('id');

    // esperamos que o id tenha 8 caracteres
    expect(response.body.id).toHaveLength(8);
  });

  it('should be able to login', async() => {
    const response = await request(app)
      .post('/sessions')
      .send({
        id: "f28d7226"
      });

      console.log(response.body);

      expect(response.body).toHaveProperty('name');
  });

  it('should be able to create a new incident', async () => {
    const response = await request(app)
      .post('/incidents')
      .set('Authorization', 'f28d7226')
      .send({
        title: "Caso 1",
        description: ".....",
        value: 100
      });

    console.log(response.body);

    // esperamos que a resposta tenha a propriedade id
    expect(response.body).toHaveProperty('id');

  });
})