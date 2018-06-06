import * as mongoose from 'mongoose';
var env = require('dotenv').load();   

/**
* Set to Node.js native promises
* Per http://mongoosejs.com/docs/promises.html
*/
(<any>mongoose).Promise = global.Promise;

/**
 * connect to mongoDB
 * 
 */
function connect() {
    mongoose.set('debug', true);
    mongoose.connect(process.env.DB_URL);

    // log when successfully connected
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection successfull');
    }); 

    // log connection errors
    mongoose.connection.on('error', (error) => {
        console.log('Mongoose default connection error: ' + error);
    }); 

    // log when the connection is disconnected
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose default connection disconnected');
    });
}

/**
 * export connect function and mongoose object
 *
 */
module.exports = {
    connect,
    mongoose
};