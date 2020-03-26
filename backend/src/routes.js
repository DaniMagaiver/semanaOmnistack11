//jshint esversion:6

//Para o código ficar organizado separamos nossas rotas em um arquivo específico para isso.
const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//Importanto a conexão que criamos em um arquivo separado na pasta do banco de dados.
const connection = require('./database/connection');

//Utilizaremos somente as rotas no express
const routes = express.Router();

//Utilizo o método post, pois quand faço login crio uma sessão
routes.post('/sessions', SessionController.create);

//Abstrai todas as regras das rotas para controllers
routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);

routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);
//Estamos exportando nossas rotas para deixar as variáveis disponíveis
module.exports = routes;