import { Router } from 'express';
import { createJSONResponse, checkServerError } from './helpers.controller';
import { Model, Document, model } from 'mongoose';

/**
 * max number of results for list()
 * 
 */
const MAX_RESULTS = 100;

/**
 * base controller
 * 
 */
export default class BaseController {

    // controller variables
    model: Model<Document> = null;
    id: any = null;

    /**
     * constructor
     * 
     * @param model Mongoose model
     * @param id primary key of the model that will be used for searching, removing and reading
     *       
     */
    constructor(model, id) {
        this.model = model;       
        this.id = id;
    }

    /**
     * create a MongoDB record
     * 
     * @param data Request Body
     * @param reponse HttpResponse
     */
    create(data, response) {
        this.model
            .create(data,
            (error, modelInstance) => {

                if (error) {
                    // log error and send status 500 response
                    console.log(error);
                    response.status(500).send(error);
                    return;

                } else {
                    // log success and send created model instance
                    response.status(201).json(modelInstance);
                    console.log('modelInstance created successfully!');
                }  
            });
    }

    /**
     * reads a model by it’s primary key
     * 
     * @param id Rrimary Key
     * @param reponse HttpResponse
     */
    read(id, response) {
        var filter = {};
        filter[this.id] = id;

        const docquery = this.model.findOne(filter)
        docquery
            .exec()
            .then((modelInstances) => {
                response.status(200).json(modelInstances);
            })
            .catch(error => {
                response.status(500).send(error);
                return;
            });
    }

    /**
     * update an existing model
     * 
     * @param id Rrimary Key
     * @param data Request Body
     * @param reponse HttpResponse
     */
    update(id, data, response) {
        var filter = {};
        filter[this.id] = id;

        const docquery = this.model.findOne(filter)
        docquery
            .exec()
            .then((modelInstance) => {                   

                // update existing model
                Object.keys(data)
                    .forEach((attribute) => {

                        if (attribute !== this.id && attribute !== "_id" && attribute !== "timestamp") {

                            if (modelInstance[attribute]) {

                                // update existing attributes
                                modelInstance[attribute] = data[attribute];
                            }
                            else if (modelInstance.schema.path(attribute)) {

                                // schema has attribute bus was not used before in model
                                modelInstance[attribute] = data[attribute];

                            } else {

                                // attribute not in schema
                                throw new Error(`attribute not in schema: ${attribute}`);                                
                            }
                        }
                    });

                return modelInstance.save();
            })
            .then((modelInstance) => {

                // return model
                response.status(200).json(modelInstance);
                console.log('modelInstance updated successfully!');
            }).catch((error) => {

                // send error message
                response.status(500).json({ error: error.message });              
                return;
            });
    }

    /**
     * delete an existing model
     * 
     * @param id
     * @param reponse HttpResponse
     */
    delete(id, response) {   
        var filter = {};
        filter[this.id] = id;

        const docquery = this.model.findOne(filter);
        docquery
            .exec()
            .then((modelInstance) => {

                // remove model
                modelInstance.remove();

                response.status(200).json(modelInstance);
                console.log('Requirement deleted successfully!');
            })
            .catch(error => {
                response.status(404).send({ error: error.message });
                return;
            });
    }

    /**
     * lists all models
     * 
     * @param response HttpResponse
     */
    list(response) {

        const docquery = this.model.find({}).limit(MAX_RESULTS);
        docquery
            .exec()
            .then((modelInstances) => {
                response.status(200).json(modelInstances);
            })
            .catch(error => {
                response.status(500).send(error);
                return;
            });
    }

    /**
     * routes for only one model
     * 
     */
    singularRoute() {
        const router = new Router();      

        // create a new model
        router.post("/", (req, res) => {
            this.create(req.body, res);                
        });

        // get one model by id
        router.get("/:id", (req, res) => {
            this.read(req.params.id, res);
        });

        // update one model by id
        router.put("/:id", (req, res) => {            
            this.update(req.params.id, req.body, res);
        });

        // delete one model by id
        router.delete("/:id", (req, res) => {
            this.delete(req.params.id, res);
        });

        return router;
    } 

    /**
     * routes for a few models
     * 
     */
    pluralRoute() {
        const router = new Router();

        // get all models
        router.get("/", (req, res) => {
            this.list(res);
        });

        return router;
    }
}