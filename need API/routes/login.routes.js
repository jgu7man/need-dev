'use-strict';

var express = require('express');
var ruta = express.Router();
var fb = require('../firebase');

ruta.post('/social-login', async(req, res) => {
    var nombre = req.body.nombre;
    var email = req.body.email;
    var avatar = req.body.avatar;
    await fb.firestore.collection('usuarios').where('email', '==', email).get()
        .then(async snapshot => {
            var num = snapshot.size;
            if (num == 0) {
                await fb.firestore.collection('usuarios').add({
                    nombre: nombre,
                    email: email,
                    avatar: avatar,
                }).then(ref => {
                    return res.status(200).send({
                        message: 'Usuario guardado',
                        id: ref.id,
                        data: ref.data(),
                    });
                });
                // fb.firestore.collection('usuarios').where('email', '==', email).get()
                //     .then(snapshot => {
                //         snapshot.forEach(doc => {
                //             return res.status(200).send({
                //                 message: 'Usuario guardado',
                //                 id: doc.id,
                //                 data: doc.data(),
                //             });
                //         });
                //     });

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