'use-strict';

var express = require('express');
var ruta = express.Router();
var evento = require('./evento.controller');

ruta.post('/saveServicio', evento.saveServicio);
ruta.post('/saveEvento', evento.saveEvento);
ruta.post('/saveDatos', evento.saveDatos);
ruta.get('/getEventos/:userId?', evento.getEventos);
ruta.get('/eventoSolo/:id?', evento.getEventoSolo);
ruta.get('/datosEvento/:id?', evento.getDatos);
ruta.get('/servicioEvento/:id?', evento.getServicio);




module.exports = ruta;