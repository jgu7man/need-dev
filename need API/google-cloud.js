const { Storage } = require('@google-cloud/storage');

const gcloud = new Storage({
    projectId: 'need-243005',
    keyFilename: './Need-google-cloud.json',
});

module.exports = gcloud;