const express = require('express');
const routes = express.Router();
const CandidatosController = require('./controller/CandidatosController');
const EleitoresController = require('./controller/EleitoresController');

routes.get('/candidatos', CandidatosController.index);
routes.post('/candidatos', CandidatosController.create);
routes.put('/votar/:id', CandidatosController.votar);
routes.delete('/candidatos/:id', CandidatosController.delete);

routes.get('/eleitores', EleitoresController.index);
routes.post('/eleitores', EleitoresController.create);
routes.delete('/eleitores/:id', EleitoresController.delete);

module.exports = routes;