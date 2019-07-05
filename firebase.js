const admin = require('firebase-admin');
const serviceAccount = require('./need-firebase-key.json');

const fb = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://need-f6bad.firebaseio.com"
}); 

module.exports = fb;