const mongoose = require('mongoose');
/**
* Set to Node.js native promises
* Per http://mongoosejs.com/docs/promises.html
*/
mongoose.Promise = global.Promise;

// environment variables
const env = require('./env/environment');
const accountName = process.env.ACCOUNT_NAME || env.ACCOUNT_NAME;
const databaseName = process.env.DATABASE_NAME || env.DATABASE_NAME;
const key = process.env.KEY || env.KEY;
const port = process.env.PORT || env.PORT;

// eslint-disable-next-line max-len
const mongoUri = `mongodb://${accountName}:${key}@${accountName}.documents.azure.com:${port}/${databaseName}?ssl=true`;

function connect() {
    mongoose.set('debug', true);
    return mongoose.connect(mongoUri);
}

module.exports = {
    connect,
    mongoose
};