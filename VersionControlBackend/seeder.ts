import { RequirementRelation } from "./models/requirement/requirement-relation.model";
import { RequirementTemplatePart } from "./models/requirement/requirement-template-part.model";
import { Requirement } from "./models/requirement/requirement.model";

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
(async () => {

   
    // save requirement relations
    await relation1.save((error) => {
        if (error)
            console.log(error);
    });

    await relation2.save((error) => {
        if (error)
            console.log(error);
    });

    await relation3.save((error) => {
        if (error)
            console.log(error);
    });

    // save requirement template parts
    await part1.save((error) => {
        if (error)
            console.log(error);
    });

    await part2.save((error) => {
        if (error)
            console.log(error);
    });

    await part3.save((error) => {
        if (error)
            console.log(error);
    });

    // save requirements
    req1.save((error) => {
        if (error)
            console.log(error);
    });

    await req2.save((error) => {
        if (error)
            console.log(error);
    });
    
})();

//async.waterfall([
//    async (reponse) => {
//        await relation1.save((error) => {
//            if (error)
//                console.log(error);
//        });

//        reponse(null, 'one');
//    },
//    async (reponse, arg1) => {
//        await relation1.save((error) => {
//            if (error)
//                console.log(error);
//        });

//        reponse(null, 'one');
//    }


//], (error, result) => {

//    if (error) {
//        console.log(error);
//        return;
//    }

//    console.log(result);
//    console.log('---- seeder script finished ----');
//    });

// Promises hat auch nicht geklappt -> irgendwiene andere Lösung finden
// typischer Fehler: saveParallel

