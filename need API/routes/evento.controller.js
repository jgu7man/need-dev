var fb = require('../firebase');

var evento = {

    saveEvento: (req, res) => {
        var id = req.body.id;

        fb.firestore().collection('eventos').doc(id).set({
                id: req.body.id,
                usuario: req.body.usuario,
                tipoEvento: req.body.tipoEvento,
                personas: req.body.personas,
                calidad: req.body.calidad,
                costo: req.body.costo,
                estado: req.body.estado,
                fecha: req.body.fecha
            })
            .then(() => {
                return res.status(200).send({
                    message: ' evento guardado satisfactoriamente'
                });
            })
            .catch((error) => {
                return res.status(200).send({
                    message: 'no se pudo guardar evento ' + error
                });
            });
    },

    saveServicio: (req, res) => {
        var id = req.body.id;

        fb.firestore().collection('servicios').doc(id).set({
                id: req.body.id,
                meseros: req.body.meseros,
                jefeMeseros: req.body.jefe,
                extras: req.body.extras,
            })
            .then(() => {
                return res.status(200).send({
                    message: 'servicio guardado satisfactoriamente'
                });
            })
            .catch((error) => {
                return res.status(200).send({
                    message: 'no se pudo guardar servicio ' + error
                });
            });

    },

    saveDatos: (req, res) => {
        var id = req.body.id;

        fb.firestore().collection('datosEventos').doc(id).set({
                id: req.body.id,
                dateInicio: req.body.dateInicio,
                dateFinal: req.body.dateFinal,
                timeInicio: req.body.timeInicio,
                timeFinal: req.body.timeFinal,
                lugar: req.body.lugar,
                direccion: req.body.direccion,
                colonia: req.body.colonia,
                ciudad: req.body.ciudad,
                estado: req.body.estado,
            })
            .then(() => {
                return res.status(200).send({
                    message: 'datos del evento guardado satisfactoriamente'
                });
            })
            .catch((error) => {
                return res.status(200).send({
                    message: 'no se pudo guardar datos del evento ' + error
                });
            });
    },

    getEventos: (req, res) => {
        var userId = req.params.userId;
        if (userId == null) return res.status(404).send({ message: 'no hay id' });
        fb.firestore().collection('eventos')
            .where('usuario', '==', userId).get()
            .then(snapshot => {
                var eventos = [];
                snapshot.forEach(doc => {
                    eventos.push(doc.data());
                });
                return res.status(200).send(eventos);
            });
    },

    getEventoSolo: (req, res) => {
        var id = req.params.id;
        if (id == null) return res.status(404).send({ message: 'no hay id' });

        fb.firestore().collection('eventos').doc(id).get()
            .then(doc => {
                if (!doc.exists) {
                    return res.status(200).send({
                        message: 'No se encontró evento'
                    });
                } else {
                    return res.status(200).send(doc.data());
                }
            })
    },

    getDatos: (req, res) => {
        var id = req.params.id;
        if (id == null) { return res.status(404).send({ message: 'no hay id' }); }

        fb.firestore().collection('datosEventos').doc(id).get()
            .then(doc => {
                if (!doc.exists) {
                    return res.status(200).send({
                        message: 'No se encontró evento'
                    });
                } else {
                    return res.status(200).send(doc.data());
                }
            })
    },

    getServicio: (req, res) => {
        var id = req.params.id;
        if (id == null) { return res.status(404).send({ message: 'no hay id' }); }

        fb.firestore().collection('servicios').doc(id).get()
            .then(doc => {
                if (!doc.exists) {
                    return res.status(200).send({
                        message: 'No se encontró evento'
                    });
                } else {
                    return res.status(200).send(doc.data());
                }
            })
    }
};


module.exports = evento;