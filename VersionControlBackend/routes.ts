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
    router.use('/requirements', new RequirementController().route());
} catch (e) {
    console.error(e);
}

module.exports = router; 