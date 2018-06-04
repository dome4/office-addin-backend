﻿import { Schema, model } from 'mongoose';

/**
 * schema of a relation between requirements
 * 
 */
const RequirementRelationSchema: Schema = new Schema(
    {
        // _id is auto-generated by mongodb
        requirementID: Schema.Types.ObjectId,
        type: Schema.Types.ObjectId,
        targetComponent: Schema.Types.ObjectId
    }
);

/**
 * create requirement relation model and export model
 * 
 */
export const RequirementRelation = model('RequirementRelation', RequirementRelationSchema);