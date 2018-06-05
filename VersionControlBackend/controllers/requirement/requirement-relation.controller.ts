import BaseController from '../base.controller';
import { RequirementRelation } from '../../models/requirement/requirement-relation.model';

/**
 * 
 * 
 */
export class RequirementRelationController extends BaseController {

    /**
     * call super constructor
     * 
     */
    constructor() {
        super(RequirementRelation, '_id');
    }
}