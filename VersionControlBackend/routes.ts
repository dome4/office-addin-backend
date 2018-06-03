import { Router } from 'express';
import { RequirementController } from './controllers/requirement.controller';

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
    router.use('/requirement', new RequirementController().singularRoute());
    router.use('/requirements', new RequirementController().pluralRoute());
} catch (e) {
    console.error(e);
}

module.exports = router; 