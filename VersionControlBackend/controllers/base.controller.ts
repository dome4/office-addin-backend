import { Router } from 'express';
import { createJSONResponse, checkServerError } from './helpers.controller';
import { Model, Document } from 'mongoose';



/**
 * max number of results for list()
 * 
 */
const MAX_RESULTS = 100;


/**
 * 
 * 
 */
export default class BaseController {

    // ToDo data types
    model: Model<Document> = null;
    modelName: string = null;
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
        this.modelName = model.modelName.toLowerCase();
        this.id = id;
    }

    /**
     * create a MongoDB record
     * 
     * @param data Request Body
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
     * @param id
     */
    read(id) {
        var filter = {};
        filter[this.id] = id;

        return this.model
            .findOne(filter)
            .then((modelInstance) => {
                var response = {};
                response[this.modelName] = modelInstance;
                return response;
            });
    }

    /**
     * update an existing model
     * 
     * @param id
     * @param data
     */
    update(id, data) {
        var filter = {};
        filter[this.id] = id;

        return this.model
            .findOne(filter)
            .then((modelInstance) => {
                for (var attribute in data) {
                    if (data.hasOwnProperty(attribute) && attribute !== this.id && attribute !== "_id") {
                        modelInstance[attribute] = data[attribute];
                    }
                }

                return modelInstance.save();
            })
            .then((modelInstance) => {
                var response = {};
                response[this.modelName] = modelInstance;
                return response;
            });
    }

    /**
     * delete an existing model
     * 
     * @param id
     */
    delete(id) {
        const filter = {};
        filter[this.id] = id;

        return this.model
            .remove(filter)
            .then(() => {
                return {};
            })
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

        router.get("/:id", (req, res) => {
            this
                .read(req.params.id)
                .then(createJSONResponse(res))
                .then(null, checkServerError(res));
        });

        router.put("/:id", (req, res) => {
            this
                .update(req.params.id, req.body)
                .then(createJSONResponse(res))
                .then(null, checkServerError(res));
        });

        router.delete("/:id", (req, res) => {
            this
                .delete(req.params.id)
                .then(createJSONResponse(res))
                .then(null, checkServerError(res));
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