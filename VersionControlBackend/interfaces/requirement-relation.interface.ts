import { Schema } from 'mongoose';

/**
 * interface represents requirement relation objects
 * 
 */
export interface IRequirementRelation {

    requirementID?: Schema.Types.ObjectId,
    type?: Schema.Types.ObjectId,
    targetComponent?: Schema.Types.ObjectId
}