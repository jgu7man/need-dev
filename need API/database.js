var admin = require('firebase-admin');
var serviceAccount = require('./need-firebase-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://need-f6bad.firebaseio.com"
});
var db = admin.database();
module.exports = db;