var admin = require('firebase-admin');
var serviceAccount = require('./need-firebase-key.json');

var fb = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://need-f6bad.firebaseio.com"
}); 
module.exports = fb;