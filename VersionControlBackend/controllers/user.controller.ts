import BaseController from './base.controller';
import { User } from '../models/user.model';
import { Router } from 'express';
import { Model } from 'mongoose';
const jwt = require('jsonwebtoken');
var env = require('dotenv').load(); 

/**
 * 
 * 
 */
export class UserController extends BaseController {

    /**
     * call super constructor
     * 
     */
    constructor() {
        super(User, '_id');
    }

    /**
     * override super method
     * routes for only one model
     * 
     */
    singularRoute() {

        const router = super.singularRoute();

        // get one model by id
        router.post('/authenticate', (req, res) => {
            // fixed post issue -> post request has only body not params
            this.createAuthToken(req, res);
        });

        return router;
    }

    /**
     * create an user token which is valid for 24 hours
     * 
     * @param req HttpRequest
     * @param res HttpResponse
     */
    createAuthToken(req, res) {

        var userName: string = null;
        try {

            // try to cast username to lowercase
            userName = req.body.name.toLowerCase();
        } catch (error) {

            res.json({ success: false, message: 'Username wrong' });
        }

        const docquery = User.findOne({
            name: userName
        })
        docquery
            .exec()
            .then((user) => {

                if (!user) {                   

                    // if user not exists
                    res.status(404).json({ success: false, message: 'Authentication failed. User not found.' });
                } else if (user) {

                    // check if password matches
                    if (user['password'] !== req.body.password) {
                        res.status(400).json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } else {

                        // if user is found and password is right
                        // create a token with only our given payload
                        // we don't want to pass in the entire user since that has the password
                        const payload = {
                            admin: user.schema.path('admin')
                        };
                        var token = jwt.sign(payload, process.env.AUTH_SECRET, {

                            // expire time in seconds
                            // 86400 secs = 24 hours
                            expiresIn: 86400
                        });

                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }
                }
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
                return;
            });        // if user exists



    }

    authMiddleware(req, res, next) {

        // ignore middleware for creating the auth token
        if (req.originalUrl.indexOf('/api/user/authenticate') !== -1) {       

            return next();
        } else {
        
            // check header or url parameters or post parameters for token
            var token = req.body.token || req.query.token || req.headers['x-access-token'];

            // decode token
            if (token) {

                // verifies secret and checks exp
                jwt.verify(token, process.env.AUTH_SECRET, (error, decoded) => {
                    if (error) {
                        return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
                    } else {

                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                });

            } else {

                // if there is no token
                // return an error
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });

            } 
        }
    }
}