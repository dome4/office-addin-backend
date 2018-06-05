import { Router } from 'express';
import { RequirementController } from './controllers/requirement/requirement.controller';
import { UserController } from './controllers/user.controller';
import { RequirementTemplatePartController } from './controllers/requirement/requirement-template-part.controller';
import { RequirementRelationController } from './controllers/requirement/requirement-relation.controller';

/**
 * create router
 * 
 */
var router = Router();

/*
 * cretae requirements routes
 * 
 */
try {

    // auth middleware  
    router.use((req, res, next) => {
        new UserController().authMiddleware(req, res, next);
    });
    
    // requirements
    router.use('/requirement', new RequirementController().singularRoute());
    router.use('/requirements', new RequirementController().pluralRoute());

    // requirement template parts
    router.use('/requirement-part', new RequirementTemplatePartController().singularRoute());
    router.use('/requirement-parts', new RequirementTemplatePartController().pluralRoute());

    // requirement relations
    router.use('/requirement-relation', new RequirementRelationController().singularRoute());
    router.use('/requirement-relations', new RequirementRelationController().pluralRoute());

    // users
    router.use('/user', new UserController().singularRoute());
    router.use('/users', new UserController().pluralRoute());

} catch (e) {
    console.error(e);
}

module.exports = router; 