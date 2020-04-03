const express = require('express');
const routes = express.Router();
const CandidatosController = require('./controller/CandidatosController');
const EleitoresController = require('./controller/EleitoresController');

routes.get('/candidatos', CandidatosController.index);
routes.post('/candidatos', CandidatosController.create);
routes.put('/', CandidatosController.votar);
routes.delete('/candidatos', CandidatosController.deletar);

routes.get('/', EleitoresController.index);
routes.post('/', EleitoresController.create);
routes.delete('/', EleitoresController.deletar);

module.exports = routes;