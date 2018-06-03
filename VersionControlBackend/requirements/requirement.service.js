const Requirement = require('./requirement.model');

/*
 * connect to mongodb
 */
// require('../mongo').connect();

/*
 * get all requirements of the database
 */
function getRequirements(req, res) {
    const docquery = Requirement.find({});
    docquery
        .exec()
        .then(requirements => {
            res.status(200).json(requirements);
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        });
}

/*
 * get one requirement of the database
 */
function getRequirement(req, res) {
    Requirement.findOne({ _id: req.params.id }, (error, requirement) => {
        if (checkServerError(res, error)) return;
        if (!checkFound(res, requirement)) return;

        res.status(200).json(requirement);
    });
}

/*
 * post new requirement 
 */
function postRequirement(req, res) {
    const originalRequirement = { name: req.body.name, description: req.body.description, jsonModel: req.body.jsonModel };
    const requirement = new Requirement(originalRequirement);
    requirement.save(error => {
        if (checkServerError(res, error)) {
            //abort on error
            return;
        }

        res.status(201).json(requirement);
        console.log('Requirement created successfully!');
    });
}

/*
 * update an existing requirement
 */
function putRequirement(req, res) {
    const originalRequirement = {
        name: req.body.name,
        description: req.body.description,
        jsonModel: req.body.jsonModel
    };

    Requirement.findOne({ _id: req.params.id }, (error, requirement) => {
        if (checkServerError(res, error)) return;
        if (!checkFound(res, requirement)) return;

        requirement.name = originalRequirement.name;
        requirement.description = originalRequirement.description;
        requirement.jsonModel = originalRequirement.jsonModel;
        requirement.save(error => {
            if (checkServerError(res, error)) return;
            res.status(200).json(requirement);
            console.log('Requirement updated successfully!');
        });
    });
}

/*
 * delete an existing requirement
 */
function deleteRequirement(req, res) {
    Requirement.findOneAndRemove({ _id: req.params.id })
        .then(requirement => {
            if (!checkFound(res, requirement)) return;
            res.status(200).json(requirement);
            console.log('Requirement deleted successfully!');
        })
        .catch(error => {
            if (checkServerError(res, error)) return;
        });
}

/*
 * if an server error occurs, send an status 500 error response
 */
function checkServerError(res, error) {
    if (error) {
        res.status(500).send(error);
        return error;
    }
}

/*
 * check if requirement exists
 */
function checkFound(res, requirement) {
    if (!requirement) {
        res.status(404).send('Requirement not found.');
        return;
    }
    return requirement;
}

/*
 * export functions
 */
module.exports = {
    getRequirements,
    getRequirement,
    postRequirement,
    putRequirement,
    deleteRequirement
};