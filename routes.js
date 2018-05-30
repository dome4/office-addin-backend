const express = require('express');
const router = express.Router();
const heroService = require('./controllers/hero.controller');
const requirementService = require('./controllers/requirement.controller'); 

// Heroes routes
router.get('/heroes', (req, res) => {
    heroService.getHeroes(req, res);
});

router.post('/hero', (req, res) => {
    heroService.postHero(req, res);
});

router.put('/hero/:id', (req, res) => {
    heroService.putHero(req, res);
});

router.delete('/hero/:id', (req, res) => {
    heroService.deleteHero(req, res);
});

// Requirement routes
router.get('/requirements', (req, res) => {
    requirementService.getRequirements(req, res);
});

router.get('/requirement/:id', (req, res) => {
    requirementService.getRequirement(req, res);
});

router.post('/requirement', (req, res) => {
    requirementService.postRequirement(req, res);
});

router.put('/requirement/:id', (req, res) => {
    requirementService.putRequirement(req, res);
});

router.delete('/requirement/:id', (req, res) => {
    requirementService.deleteRequirement(req, res);
});

module.exports = router;