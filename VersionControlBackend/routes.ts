import { Router } from 'express';
import { RequirementController } from './controllers/requirement/requirement.controller';
import { UserController } from './controllers/user.controller';

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

    // users
    router.use('/user', new UserController().singularRoute());
    router.use('/users', new UserController().pluralRoute());

} catch (e) {
    console.error(e);
}

module.exports = router; 