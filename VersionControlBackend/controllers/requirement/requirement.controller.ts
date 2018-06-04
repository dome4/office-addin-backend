import BaseController from '../base.controller';
import { Requirement } from '../../models/requirement/requirement.model';

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
}