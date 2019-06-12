'use-strict';

var express = require('express');
var ruta = express.Router();
var evento = require('./evento.controller');

ruta.post('/saveServicio', evento.saveServicio);
ruta.post('/saveEvento', evento.saveEvento);
ruta.post('/saveDatos', evento.saveDatos);




module.exports = ruta;