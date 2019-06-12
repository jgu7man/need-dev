var fs = require('../firestore');

var evento = {

    saveServicio: (req, res) => {
        var id = req.body.id;
        var meseros = req.body.meseros;
        var jefe = req.body.jefeMeseros;
        var extras = req.body.extras;
        fs.collection('servicios').doc(id).set({
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

    saveEvento: (req, res) => {
        var id = req.body.id;
        var usuario = req.body.usuario;
        var tipoEvento = req.body.tipoEvento;
        var personas = req.body.personas;
        var calidad = req.body.calidad;
        var costo = req.body.costo;
        fs.collection('eventos').doc(id).set({
                usuario: usuario,
                tipoEvento: tipoEvento,
                personas: personas,
                calidad: calidad,
                costo: costo,
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
    }
};


module.exports = evento;