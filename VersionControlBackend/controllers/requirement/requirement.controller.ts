import BaseController from '../base.controller';
import { Requirement } from '../../models/requirement/requirement.model';
import { RequirementTemplatePart } from '../../models/requirement/requirement-template-part.model';

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

    /**
 * lists all models
 * 
 * @param response HttpResponse
 */
    list(response) {

        const docquery = Requirement.find({}).populate({ path: 'descriptionParts', model: Requirement });
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
}