var fs = require('../firestore');

var evento = {

    saveEvento: (req, res) => {
        var id = req.body.id;
        var usuario = req.body.usuario;
        var tipoEvento = req.body.tipoEvento;
        var personas = req.body.personas;
        var calidad = req.body.calidad;
        var costo = req.body.costo;
        var estado = req.body.estado;
        var fecha = req.body.fecha;
        fs.collection('eventos').doc(id).set({
                id: id,
                usuario: usuario,
                tipoEvento: tipoEvento,
                personas: personas,
                calidad: calidad,
                costo: costo,
                estado: estado,
                fecha: fecha
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
        var meseros = req.body.meseros;
        var jefe = req.body.jefeMeseros;
        var extras = req.body.extras;
        fs.collection('servicios').doc(id).set({
                id: id,
                meseros: meseros,
                jefeMeseros: jefe,
                extras: extras,
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
        var dateInicio = req.body.dateInicio;
        var dateFinal = req.body.dateFinal;
        var timeInicio = req.body.timeInicio;
        var timeFinal = req.body.timeFinal;
        var lugar = req.body.lugar;
        var direccion = req.body.direccion;
        var colonia = req.body.colonia;
        var ciudad = req.body.ciudad;
        var estado = req.body.estado;
        fs.collection('datosEventos').doc(id).set({
                id: id,
                dateInicio: dateInicio,
                dateFinal: dateFinal,
                timeInicio: timeInicio,
                timeFinal: timeFinal,
                lugar: lugar,
                direccion: direccion,
                colonia: colonia,
                ciudad: ciudad,
                estado: estado,
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
        fs.collection('eventos')
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

        fs.collection('eventos').doc(id).get()
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

        fs.collection('datosEventos').doc(id).get()
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

        fs.collection('servicios').doc(id).get()
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