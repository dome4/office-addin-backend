import { RequirementRelation } from "./models/requirement/requirement-relation.model";
import { RequirementTemplatePart } from "./models/requirement/requirement-template-part.model";
import { Requirement } from "./models/requirement/requirement.model";
import * as mongoose from 'mongoose';


/**
* Set to Node.js native promises
* Per http://mongoosejs.com/docs/promises.html
*/
(<any>mongoose).Promise = global.Promise;

/*
 * script to seed an empty database to prevent error
 * 
 */
console.log('---- seeder script started ----');

/*
 * connect to mongodb
 */
require('./mongo').connect();

/*
 * create requirement relations
 * 
 */
let relation1 = new RequirementRelation({

    // random id
    requirementID: '5b17cfb6e3647c2ab05719fa',
    type: 'leitet ab',

    // random id
    targetComponent: '5b17cfb6e3647c2ab05719fa'
});

let relation2 = new RequirementRelation({

    // random id
    requirementID: '5b17cfb6e3647c2ab05719fa',
    type: 'enthält',

    // random id
    targetComponent: '5b17cfb6e3647c2ab05719fa'
});

let relation3 = new RequirementRelation({

    // random id
    requirementID: '5b17cfb6e3647c2ab05719fa',
    type: 'erweitert',

    // random id
    targetComponent: '5b17cfb6e3647c2ab05719fa'
});

/*
 * create requirement template parts
 * 
 */
let part1 = new RequirementTemplatePart({
    version: 1.2,
    value: 'Erster Schablonen-Knoten',
    type: 'dropdown',
    head: true
});

let part2 = new RequirementTemplatePart({
    next: part1._id,
    version: 1.0,
    value: 'Zweiter Schablonen-Knoten',
    type: 'dropdown',
    head: false
});

let part3 = new RequirementTemplatePart({
    next: part2._id,
    version: 1.0,
    value: 'Dritter Schablonen-Knoten',
    type: 'fill in',
    head: false
});

/*
 * create requirements
 * 
 */
let req1 = new Requirement({
    
    version: 1.0,
    description: 'eine neue Anforderung',
    name: 'Erste Anforderung',
    duration: 6.5,
    responsible: 'Herr Maier',
    category: 'Geschäftliche Anforderungen',
    type: 'NFA',
    stakeholder: 'Herr Müller',
    contractor: 'Frau Mustermann',
    dueDate: new Date(),
    status: 'Maßnahme festgelegt',
    reason: 'aus Gründen',
    descriptionParts: [
        part1._id,
        part2._id,
        part3._id
    ],
    relations: [
        relation1._id,
        relation2._id,
        relation3._id
    ],
    priority: 'Must-have',
    keyWords: [
        'requirement',
        'cps',
        'first'
    ],
    acceptanceCriteria: 'Akzepziert',

    // random id
    descriptionTemplate: '5b17cfb6e3647c2ab05719fa'
});

let req2 = new Requirement({

    version: 1.2,
    description: 'eine weitere neue Anforderung',
    name: 'Zweite Anforderung',
    duration: 6.5,
    responsible: 'Herr Maier',
    category: 'Geschäftliche Anforderungen',
    type: 'FA',
    stakeholder: 'Herr Müller',
    contractor: 'Frau Mustermann',
    dueDate: new Date(),
    status: 'Maßnahme festgelegt',
    reason: 'aus Gründen',
    descriptionParts: [
        part1._id
    ],
    relations: [       
        relation2._id,
        relation3._id
    ],
    priority: 'Must-have',
    keyWords: [
        'requirement',
        'cps',
        'first'
    ],
    acceptanceCriteria: 'Akzepziert',

    // random id
    descriptionTemplate: '5b17cfb6e3647c2ab05719fa'
});

/**
 * save docs in correct order
 * 
 */

// save requirement relations first
let promise = relation1.save();

promise
    .then((result) => relation2.save())
    .then((result) => relation3.save())

     // save requirement template parts
    .then((result) => part1.save())
    .then((result) => part2.save())
    .then((result) => part3.save())

    // save requirements
    .then((result) => req1.save())
    .then((result) => req2.save())

    // log if successfully finished
    .then((result) => console.log('---- seeder script finished ---'))

    // exit script
    .then((result) => process.exit(1))

    .catch((error) => console.log(error.message));