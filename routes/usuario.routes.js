'use-strict';
var fb = require('../firebase');
var express = require('express');
var ruta = express.Router();

const negociosCol = fb.firestore().collection('negocios');
const eventosCol = fb.firestore().collection('eventos');

ruta.get('/neg-de-usuario/:user?', (req, res) => {
    const user = req.params.user;
    negociosCol.where('idUsuario', '==', user).get().then(docs => {

        var negocios = [];
        docs.forEach(doc => {
            negocios.push({
                nombre: doc.data().nombre,
                imgPerfil: doc.data().imgPerfil,
                idNegocio: doc.data().idNegocio
            });
        });
        return res.status(200).send({
            negocios: negocios
        });
    });
});

ruta.get('/eve-de-usuario/:user?', (req, res) => {
    const user = req.params.user;
    eventosCol.where('usuario', '==', user).get().then(docs => {
        var eventos = docs.size;
        return res.status(200).send({
            eventos: eventos
        })
    });
});


module.exports = ruta;