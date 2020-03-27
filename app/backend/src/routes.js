const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// importando rotas
const routes = express.Router();

// LOGIN com validação do campo
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  })
}),SessionController.create);

// LISTAGEM DE ONGS
routes.get('/ongs', OngController.index);

// CADASTRO DE ONGS com validação dos campos
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

// LISTAGEM DE INCIDENTS com validação da página passada por parâmetro na url
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}),IncidentController.index);

// CADASTRO DE INCIDENTS com validação dos campos + validação de authorization
routes.post('/incidents',  celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().min(2).max(20),
    description: Joi.string().required().min(2).max(200),
    value: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}),IncidentController.create);

// EXCLUSÃO DE INCIDENT com validação do parâmetro passado por url
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete);

// LISTANDO TODOS OS INCIDENTS DE UMA ONG com validação do authorization do header
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);

module.exports = routes;