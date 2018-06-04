import BaseController from './base.controller';
import { User } from '../models/user.model';
import { Router } from 'express';
import { Model } from 'mongoose';
const jwt = require('jsonwebtoken');

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
     * routes for authentication
     * 
     */
    authenticateRoute() {

        const router = new Router(); 

        // get one model by id
        router.post("/", (req, res) => {
            // fixed post issue -> post request has only body not params
            this.createAuthToken(req, res);
        });

        return router;
    }


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

                    //const UserModel: Model<User> = null;

                    console.log('db test');
                    console.log(user.password);
                    console.log('db test');

                                // check if password matches
                    if (user.schema.path('password') !== req.body.password) {
                        res.status(400).json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } else {

                        // if user is found and password is right
                        // create a token with only our given payload
                        // we don't want to pass in the entire user since that has the password
                        const payload = {
                            admin: user.schema.path('admin')
                        };
                        var token = jwt.sign(payload, app.get('superSecret'), {
                            expiresInMinutes: 1440 // expires in 24 hours
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
}