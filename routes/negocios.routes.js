'use-strict';
var fb = require('../firebase');
var express = require('express');
var ruta = express.Router();
var storage = require('../google-cloud');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({ uploadDir: './negocios img' });
var FileSystem = require('fs');

const dbRef = fb.firestore().collection('negocios');


ruta.post('/saveNegocio', (req, res) => {
    dbRef.add({
        idUsuario: req.body.idUsuario,
        nombre: req.body.nombre,
        imgPerfil: req.body.imgPerfil,
        categoria: req.body.categoria,
        telefono: req.body.telefono,
        email: req.body.email,
        sitioweb: req.body.sitioweb,
        descripcion: req.body.descripcion,
        direccion: req.body.direccion,
        colonia: req.body.colonia,
        ciudad: req.body.ciudad
    }).then((ref) => {
        console.log(ref.id);
        ref.update({ idNegocio: ref.id });
        fb.firestore().collection('usuarios').doc(req.body.idUsuario).update({
            negocio: true
        });
        return res.status(200).send({
            mensaje: 'negocio guardado',
            id: ref.id
        });
    });
});

ruta.post('/saveImage/:id?', multipartyMiddleware, async(req, res) => {
    const negId = req.params.id;
    var rutaLocal = req.files.imagen.path;
    var rutaSplit = rutaLocal.split('\\');
    const nombreArchivo = rutaSplit[1];
    const urlArchivo = 'https://storage.cloud.google.com/rootneed/' + nombreArchivo;
    const bucket = 'rootneed';

    await storage
        .bucket(bucket)
        .upload(rutaLocal)
        .then(() => {
            console.log(`${rutaLocal} subido a ${bucket}.`);
        });

    await dbRef.doc(negId).update({
        imgPerfil: urlArchivo
    });

    FileSystem.unlink(rutaLocal, (e) => {
        console.log('archivo borrado');
    });

    return res.status(200).send({
        mensaje: 'la imagen se ha subido a la ruta:',
        url: urlArchivo
    });

});

ruta.post('/updateNegocio/:neg?', (req, res) => {
    const idNegocio = req.params.neg;
    dbRef.doc(idNegocio).update({
        nombre: req.body.nombre,
        imgPerfil: req.body.imgPerfil,
        categoria: req.body.categoria,
        telefono: req.body.telefono,
        email: req.body.email,
        sitioweb: req.body.sitioweb,
        descripcion: req.body.descripcion,
        direccion: req.body.direccion,
        colonia: req.body.colonia,
        ciudad: req.body.ciudad
    }).then(ref => {
        return res.status(200).send({
            mensaje: 'negocio actualizado',
            idNegocio: idNegocio
        });
    });
});

ruta.get('/getNegocios/:catego?', (req, res) => {
    var catego = decodeURI(req.params.catego);
    dbRef.where('categoria', '==', catego).get().then(snapshot => {
        var negocios = [];
        snapshot.forEach(doc => {
            negocios.push(doc.data());
        });

        return res.status(200).send({
            negocios: negocios
        });
    });
});

ruta.get('/getNegocio/:neg?', (req, res) => {
    const idNegocio = req.params.neg;
    fb.firestore().doc(`negocios/${idNegocio}`).get()
        .then(doc => {
            return res.status(200).send({
                idNegocio: doc.id,
                negocio: doc.data()
            });
        });
});



ruta.post('/imagesNegocio/:id?', multipartyMiddleware, async(req, res) => {
    const files = req.files.imagen;
    const filesArray = Array.isArray(files);
    const negId = req.params.id;
    const bucket = 'rootneed';
    const images = [];

    if (filesArray == false) {
        var rutaLocal = req.files.imagen.path;
        var rutaSplit = rutaLocal.split('\\');
        var nombreArchivo = rutaSplit[1];
        const urlArchivo = 'https://storage.cloud.google.com/rootneed/' + nombreArchivo;
        await storage
            .bucket(bucket)
            .upload(rutaLocal)
            .then(() => {
                console.log(`${rutaLocal} subido a ${bucket}.`);
            });
        images.push(urlArchivo);
    } else {
        await req.files.imagen.forEach(img => {

            var rutaLocal = img.path;
            var rutaSplit = rutaLocal.split('\\');
            var nombreArchivo = rutaSplit[1];
            const urlArchivo = 'https://storage.cloud.google.com/rootneed/' + nombreArchivo;

            storage
                .bucket(bucket)
                .upload(rutaLocal)
                .then(() => {
                    console.log(`${rutaLocal} subido a ${bucket}.`);
                });
            images.push(urlArchivo);

            setTimeout(() => {
                FileSystem.unlink(rutaLocal, (e) => {
                    console.log('archivo borrado');
                });
            }, 10000);
        });
    }

    const uploaded = [];
    await dbRef.doc(negId).get()
        .then(doc => {
            // comproba si existen imagenes
            if (doc.data().images) {
                // si existen tomar el Array
                doc.data().images.forEach(img => {
                    uploaded.push(img);
                });
                // sumarlo al nuevo Array
                var toDB = uploaded.concat(images);
                console.log('se añadieron: ', images);
                // actualizar base de datos
                dbRef.doc(negId).update({
                    images: toDB
                });
            } else {
                dbRef.doc(negId).update({
                    images: images
                });
                console.log('se subieron: ', images);
            }
        });

    return await res.status(200).send({
        mensaje: 'imágenes nuevas subidas a la base de datos',
        url: images
    });

});

ruta.post('/rate/:neg?/:rater?', (req, res) => {
    var id = req.params.neg;
    var rater = req.params.rater;
    var rateDoc = dbRef.doc(id).collection('ratings').doc(rater);
    rateDoc.get().then(doc => {
        if (!doc.exists) {
            rateDoc.set({ rate: true });
            return res.status(200).send({
                rated: true
            });
        } else {
            rateDoc.delete();
            return res.status(200).send({
                rated: false
            });
        }
    });

});

ruta.get('/get-ratings/:neg?', (req, res) => {
    var id = req.params.neg;
    var rateDoc = dbRef.doc(id).collection('ratings');

    rateDoc.get().then(docs => {
        var ratings = docs.size;
        return res.status(200).send({
            ratings: ratings,
        });
    });
});

ruta.get('/get-rater/:neg?/:rater?', (req, res) => {
    var id = req.params.neg;
    var rater = req.params.rater;
    var rateDoc = dbRef.doc(id).collection('ratings');

    rateDoc.doc(rater).get().then(doc => {
        if (doc.exists) {
            return res.status(200).send({
                isRater: true
            });
        } else {
            return res.status(200).send({
                isRater: false
            });
        }
    });

});

ruta.post('/comentar/:neg?/:coment?', (req, res) => {
    var id = req.params.neg;
    var coment = req.params.coment;

    dbRef.doc(id).get().then(doc => {
        if (!doc.data().comentarios) {
            dbRef.doc(id).update({
                comentarios: [coment]
            });
            return res.status(200).send({
                mensaje: 'se agregó un nuevo comentario'
            });
        } else {
            var comentarios = doc.data().comentarios,
                newComent = [coment],
                allComents = comentarios.concat(newComent);
            dbRef.doc(id).update({
                comentarios: allComents
            });

            return res.status(200).send({
                mensaje: 'se agregaron los comentarios'
            });
        }
    });
});

ruta.get('/getComentarios/:id?', (req, res) => {
    var id = req.params.id;
    dbRef.doc(id).get().then(doc => {
        var comentarios = doc.data().comentarios;
        return res.status(200).send({
            comentarios: comentarios
        })
    });
});

module.exports = ruta;