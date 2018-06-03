import { Router } from 'express';
import pluralize from "pluralize";
import { createJSONResponse, checkServerError } from './helpers.controller';

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
    model: any = null;
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
     * @param data
     */
    create(data) {
        return this.model
            .create(data)
            .then((modelInstance) => {
                var response = {};
                response[this.modelName] = modelInstance;
                return response;
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
     */
    list() {
        return this.model
            .find({})
            .limit(MAX_RESULTS)
            .then((modelInstances) => {
                var response = {};
                response[pluralize(this.modelName)] = modelInstances;
                return response;
            });
    }

    /**
     * 
     * 
     */
    route() {
        const router = new Router();

        router.get("/", (req, res) => {
            this
                .list()
                .then(createJSONResponse(res))
                .then(null, checkServerError(res));
        });

        router.post("/", (req, res) => {
            this
                .create(req.body)
                .then(createJSONResponse(res))
                .then(null, checkServerError(res));
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
}