﻿import { Schema, model } from 'mongoose';

/**
 * schema of a requirement description template
 * 
 */
const RequirementDescriptionTemplateSchema: Schema = new Schema(
    {
        // _id is auto-generated by mongodb
        version: Number,
        name: String,
        template: [
            {
                type: String,
                value: {}
            }
        ]
    }
);

/**
 * create requirement description template model and export model
 * 
 */
export const RequirementDescriptionTemplate = model('RequirementDescriptionTemplate', RequirementDescriptionTemplateSchema);