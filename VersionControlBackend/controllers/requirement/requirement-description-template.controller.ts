import BaseController from '../base.controller';
import { RequirementDescriptionTemplate } from '../../models/requirement/requirement-description-template.model';

/**
 * 
 * 
 */
export class RequirementDescriptionTemplateController extends BaseController {

    /**
     * call super constructor
     * 
     */
    constructor() {
        super(RequirementDescriptionTemplate, '_id');
    }
}