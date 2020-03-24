const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// importando rotas
const routes = express.Router();

// LOGIN
routes.post('/sessions', SessionController.create);

// LISTAGEM DE ONGS
routes.get('/ongs', OngController.index);

// CADASTRO DE ONGS
routes.post('/ongs', OngController.create);

// LISTAGEM DE INCIDENTS
routes.get('/incidents', IncidentController.index);

// CADASTRO DE INCIDENTS
routes.post('/incidents', IncidentController.create);

// EXCLUSÃO DE INCIDENT
routes.delete('/incidents/:id', IncidentController.delete);

// LISTANDO TODOS OS INCIDENTS DE UMA ONG
routes.get('/profile', ProfileController.index);

module.exports = routes;