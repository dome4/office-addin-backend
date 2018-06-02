import { Schema } from 'mongoose';

/**
 * interface represents requirement temple part objects
 * 
 */
export interface IRequirementTemplatePart {

    next: Schema.Types.ObjectId,
    version: number,
    value: any
}