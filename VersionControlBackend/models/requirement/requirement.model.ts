﻿import { Schema, model } from 'mongoose';
import { RequirementTemplatePart } from './requirement-template-part.model';
import { RequirementRelation } from './requirement-relation.model';
import { RequirementDescriptionTemplate } from './requirement-description-template.model';

/**
 * requirement schema
 * 
 */
const RequirementSchema: Schema = new Schema(
    {
        // _id is auto-generated by mongodb
        version: Number,
        description: String,      
        name: String,
        duration: Number,
        responsible: String,
        category: {
            type: String,
            enum: [
                'Geschäftliche Anforderungen',
                'Normen und Gesetze',
                'Produkteigenschaften',
                'Anforderungen an den Produktlebenszyklus',
                'Designanforderungen'
            ]
        },
        type: {
            type: String,
            enum: [
                'FA',
                'NFA'
            ]
        },
        stakeholder: String,
        contractor: String,
        dueDate: Date,
        status: {
            type: String,
            enum: [
                'Maßnahme festgelegt',
                'Ablauf defniert',
                'Maßnahmenbearbeitung gestartet',
                'Maßnahme umgesetzt',
                'Maßnahme abgeschlossen'
            ]
        },
        reason: {},
        descriptionParts: [
            {
                // [RequirementTemplatePartSchema] could be equivalent, just seperated files for seperate controllers
                type: Schema.Types.ObjectId,
                ref: 'RequirementTemplatePart'
            }
            ],
        relations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'RequirementRelation'
            }
            ],
        keyWords: [String],
        acceptanceCriteria: String,

        // ToDo write method which compares description template with given description parts
        descriptionTemplate: {            
            type: Schema.Types.ObjectId,
            ref: 'RequirementDescriptionTemplate'
        }
    },
    {
        timestamps: true
    }
);

/**
 * create requirement model and export model
 * 
 */
export const Requirement = model('Requirement', RequirementSchema);

/**
 * custom validation -> mongoose only checks if the ObjectId is valid in general
 * validate if a requirement-template-part-model with the given ObjectId exists
 * 
 */
RequirementSchema.path('descriptionParts').validate( async (values) => {

    // validate flag
    var validateFlag = true;

    // values is an array
    for (let id of values) {

        // check if model with given id exists
        const docquery = await RequirementTemplatePart.findById({ _id: id }, (error, modelInstance) => {

            
            if (!modelInstance) {

                // model does not exist
                validateFlag = false;
            } else {

                // model found -> do nothing
            }
        }); 
    }

    return validateFlag;

}, 'Description part with given id does not exist');

/**
 * custom validation -> mongoose only checks if the ObjectId is valid in general
 * validate if a requirement-relation-model with the given ObjectId exists
 * 
 */
RequirementSchema.path('relations').validate(async (values) => {

    // validate flag
    var validateFlag = true;

    // values is an array
    for (let id of values) {

        // check if model with given id exists
        const docquery = await RequirementRelation.findById({ _id: id }, (error, modelInstance) => {


            if (!modelInstance) {

                // model does not exist
                validateFlag = false;
            } else {

                // model found -> do nothing
            }
        });
    }

    return validateFlag;

}, 'Relation with given id does not exist');