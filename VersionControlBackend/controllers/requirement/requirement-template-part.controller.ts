import BaseController from '../base.controller';
import { RequirementTemplatePart } from '../../models/requirement/requirement-template-part.model';

/**
 * 
 * 
 */
export class RequirementTemplatePartController extends BaseController {

    /**
     * call super constructor
     * 
     */
    constructor() {
        super(RequirementTemplatePart, '_id');
    }
}