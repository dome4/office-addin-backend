const Requirement = require('./requirement.model');

require('../mongo').connect();

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

function postRequirement(req, res) {
    const originalRequirement = { id: req.body.id, name: req.body.name, content: req.body.content };
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

function checkServerError(res, error) {
    if (error) {
        res.status(500).send(error);
        return error;
    }
}

function putRequirement(req, res) {
    const originalRequirement = {
        id: parseInt(req.params.id, 10),
        name: req.body.name,
        content: req.body.content
    };
    Requirement.findOne({ id: originalRequirement.id }, (error, requirement) => {
        if (checkServerError(res, error)) return;
        if (!checkFound(res, requirement)) return;

        requirement.name = originalRequirement.name;
        requirement.content = originalRequirement.content;
        requirement.save(error => {
            if (checkServerError(res, error)) return;
            res.status(200).json(requirement);
            console.log('Requirement updated successfully!');
        });
    });
}

function deleteRequirement(req, res) {
    const id = parseInt(req.params.id, 10);
    Requirement.findOneAndRemove({ id: id })
        .then(requirement => {
            if (!checkFound(res, requirement)) return;
            res.status(200).json(requirement);
            console.log('Requirement deleted successfully!');
        })
        .catch(error => {
            if (checkServerError(res, error)) return;
        });
}

function checkFound(res, requirement) {
    if (!requirement) {
        res.status(404).send('Requirement not found.');
        return;
    }
    return requirement;
}

module.exports = {
    getRequirements,
    postRequirement,
    putRequirement,
    deleteRequirement
};