const connection = require('../database/connection');

module.exports = {

  // LISTAGEM DE INCIDENTS
  async index(request, response) {
    // pega a página passada por query
    // caso não exista página, o valor default é 1
    const { page = 1 } = request.query;

    // count vai armazenar o total de incidents no banco
    // SELECT count(*) FROM incidents
    const [count] = await connection('incidents').count();

    // select para pegar somente 5 incidents por vez
    // o offset permite pegar registros de 5 em 5: a partir do 0, a partir do 5, a partir do 10...
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
      ]);

    // retornando o count como um atributo do header/http: X-Total-Count
    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  // CADASTRO DE INCIDENTS
  async create(request, response) {
    const { title, description, value } = request.body;

    // para pegar o id da ong logada
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },

  // EXCLUSÃO DE INCIDENT
  async delete(request, response) {
    const { id } = request.params;

    // para pegar o id da ong logada
    const ong_id = request.headers.authorization;

    // SELECT ong_id FROM incidents WHERE id = $id
    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();
    
    // se o id da ong do incident for diferent do id da ong logada, a exclusão não é permitida
    if (incident.ong_id != ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    // se estiver tudo ok, apagar incident com o id passado
    await connection('incidents').where('id', id).delete();

    // retornando uma resposta http de sucesso, mas sem conteúdo - 204 No Content
    return response.status(204).send();
  }
};