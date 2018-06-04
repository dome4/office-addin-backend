"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var requirement_controller_1 = require("./controllers/requirement.controller");
var user_controller_1 = require("./controllers/user.controller");
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
    // auth middleware  
    router.use(function (req, res, next) {
        new user_controller_1.UserController().authMiddleware(req, res, next);
    });
    // requirements
    router.use('/requirement', new requirement_controller_1.RequirementController().singularRoute());
    router.use('/requirements', new requirement_controller_1.RequirementController().pluralRoute());
    // users
    router.use('/user', new user_controller_1.UserController().singularRoute());
    router.use('/users', new user_controller_1.UserController().pluralRoute());
}
catch (e) {
    console.error(e);
}
module.exports = router;
//# sourceMappingURL=routes.js.map