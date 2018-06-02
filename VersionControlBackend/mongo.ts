const mongoose = require('mongoose');

/**
* Set to Node.js native promises
* Per http://mongoosejs.com/docs/promises.html
*/
mongoose.Promise = global.Promise;

// environment variables
var accountName = null;
var databaseName = null;
var key = null;
var db_port = null;

/**
 * use environment variables or alternatively variables of environment.js file
 */
try {
    if (process.env.ACCOUNT_NAME && process.env.DATABASE_NAME && process.env.KEY && process.env.PORT) {
        accountName = process.env.ACCOUNT_NAME;
        databaseName = process.env.DATABASE_NAME;
        key = process.env.KEY;
        db_port = process.env.DB_PORT;
    } else {

        const env = require('./env/environment');

        accountName = env.ACCOUNT_NAME;
        databaseName = env.DATABASE_NAME;
        key = env.KEY;
        db_port = env.DB_PORT;
    }
} catch (e) {
    // check if the environment.js file is missing
    if (e instanceof Error && e.message.indexOf('Cannot find module') != -1) {
        console.error('----------------------------------------------------------');
        console.error('environment variables missing and environment.js not found or another error occured');
        console.error(e.message);
        console.error('----------------------------------------------------------');
    } else {
        throw e;
    }
}


// create db connection strings
const mongoUri = `mongodb://${accountName}:${key}@${accountName}.documents.azure.com:${db_port}/${databaseName}?ssl=true`;

/**
 * connect to mongoDB
 * 
 */
function connect() {
    mongoose.set('debug', true);
    return mongoose.connect(mongoUri);
}

/**
 * export connect function and mongoose object
 *
 */
module.exports = {
    connect,
    mongoose
};