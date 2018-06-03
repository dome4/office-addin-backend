"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var requirement_controller_1 = require("./controllers/requirement.controller");
/**
 * create router
 *
 */
var router = express_1.Router();
/*
 * cretae requirements routes
 *
 */
try {
    router.use('/requirements', new requirement_controller_1.RequirementController().route());
}
catch (e) {
    console.error(e);
}
module.exports = router;
//# sourceMappingURL=routes.js.map