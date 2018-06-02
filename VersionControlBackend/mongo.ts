const mongoose = require('mongoose');
var env = require('dotenv').load();   

/**
* Set to Node.js native promises
* Per http://mongoosejs.com/docs/promises.html
*/
mongoose.Promise = global.Promise;

// create db connection strings
const mongoUri = `mongodb://${process.env.ACCOUNT_NAME}:${process.env.DB_KEY}@${process.env.ACCOUNT_NAME}.documents.azure.com:${process.env.DB_PORT}/${process.env.DATABASE_NAME}?ssl=true`;

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