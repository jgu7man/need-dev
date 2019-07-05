'use-strict';

var express = require('express');
var fb = require('../firebase');

var ruta = express.Router();

ruta.post('/social-login', async(req, res) => {
    const {nombre, email, avatar, uid} = req.body;
    let userRef = await fb.firestore().doc(`usuarios/${uid}`);
    let data = {
      uid,
      email,
      nombre,
      avatar, 
    };

    userRef.set(data, {merge: true})
      .then(user => {
        if(user){
          res.status(201).json({
            message: "User register or updated successfully",
            usuario: data
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err.message,
          message: "An error has occurred"
        });
      })
});

ruta.get('/getUser/:uid', async(req,res)=> {
  let uid = req.params.uid;
  await fb.firestore().collection('usuarios').doc(uid).get()
    .then(doc => {
      if(doc.exists){
        res.status(200).json({
          usuario: doc.data()
        })
      } else {
        res.status(404).json({
          message: "usuario no encontrado con ese ID"
        })
      }
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        error: "Internal error",
        message: "error buscando en el documento de usuarios"
      })
    });
});

module.exports = ruta;