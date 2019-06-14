'use-strict';

var express = require('express');
var app = express();
const port = process.env.PORT || 3800;

// BODY PARSER
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// RUTAS RUTAS RUTAS RUTAS
var login = require('./routes/login.routes');
app.use('/', login);

var evento = require('./routes/evento.routes');
app.use('/', evento);

app.listen(port, () => {
    console.log(`Corriendo servidor en http://localhost:${port}`);
});
