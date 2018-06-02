import { Schema } from 'mongoose';
import { IRequirementRelation } from './requirement-relation.interface';
import { IRequirementTemplatePart } from './requirement-template-part.interface';

/**
 * interface represents requirement objects
 * 
 */
export interface IRequirement {

    version?: number,
    description?: string,
    timestamp?: Date,
    name?: string,
    duration?: number,
    responsible?: Schema.Types.ObjectId,
    category?: Schema.Types.ObjectId,
    type?: Schema.Types.ObjectId,
    stakeholder?: Schema.Types.ObjectId,
    contractor?: Schema.Types.ObjectId,
    dueDate?: Date,
    status?: Schema.Types.ObjectId,
    reason?: any,
    descriptionParts?: IRequirementTemplatePart[],
    relations?: IRequirementRelation[],
    priority?: number,
    keyWords?: string,
    acceptanceCriteria?: string,
    descriptionTemplate?: Schema.Types.ObjectId
}