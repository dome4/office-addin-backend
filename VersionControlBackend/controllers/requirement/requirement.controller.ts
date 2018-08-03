import BaseController from '../base.controller';
import { Requirement } from '../../models/requirement/requirement.model';

/**
 * max number of results for list()
 * 
 */
const MAX_RESULTS = 100;

/**
 * 
 * 
 */
export class RequirementController extends BaseController {

    /**
     * call super constructor
     * 
     */
    constructor() {
        super(Requirement, '_id');
    }

    /*
     * start
     * override super methods
     */


    /**
     * reads a model by it’s primary key
     * 
     * @param id Rrimary Key
     * @param reponse HttpResponse
     */
    read(id, response) {
        var filter = {};
        filter[this.id] = id;

        const docquery = Requirement
            .findOne(filter)
            .populate('descriptionParts')
            .populate('relations')
            .populate('descriptionTemplate');

        docquery
            .exec()
            .then((modelInstances) => {

                if (modelInstances) {

                    // if model exists
                    response.status(200).json(modelInstances);
                } else {

                    // if model not exists
                    response.status(404).json({ error: 'ressource not found' });
                }

            })
            .catch(error => {
                response.status(500).send(error);
                return;
            });
    }

    /**
     * lists all models
     * 
     * @param response HttpResponse
     */
    list(response) {

        const docquery = Requirement
            .find({})
            .limit(MAX_RESULTS)
            .populate('descriptionParts')
            .populate('relations')
            .populate('descriptionTemplate');
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

    /*
     * end
     * override super methods
     */
}