'use-strict';

var express = require('express');
var ruta = express.Router();
var fs = require('../firestore');

ruta.post('/social-login', (req, res) => {
    var nombre = req.body.nombre;
    var email = req.body.email;
    var avatar = req.body.avatar;
    fs.collection('usuarios').where('email', '==', email).get()
        .then(snapshot => {
            var num = snapshot.size;
            if (num == 0) {
                fs.collection('usuarios').doc().set({
                    nombre: nombre,
                    email: email,
                    avatar: avatar,
                });
                fs.collection('usuarios').where('email', '==', email).get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            return res.status(200).send({
                                message: 'Usuario guardado',
                                id: doc.id,
                                data: doc.data(),
                            });
                        });
                    });

            } else {
                snapshot.forEach(doc => {
                    return res.status(200).send({
                        message: 'Usuario encontrado',
                        id: doc.id,
                        data: doc.data(),
                    });
                })
            }
        });

});

module.exports = ruta;