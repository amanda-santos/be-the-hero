const generateUniqueId = require('../utils/generateUniqueId');

// importando a conexão ao banco
const connection = require('../database/connection');

module.exports = {
  // LISTAGEM DE ONGS
  async index(request, response) {
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
  },

  // CADASTRO DE ONGS
  async create(request, response) {
    // pegando os dados da ong
    const { name, email, whatsapp, city, uf } = request.body;

    // gerando id aleatório para a ong
    const id = generateUniqueId();

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    // retornando resposta em json
    return response.json({ id });
  }
}