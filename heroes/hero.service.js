const Hero = require('./hero.model');

require('../mongo').connect();

function getHeroes(req, res) {
    const docquery = Hero.find({});
    docquery
        .exec()
        .then(heroes => {
            res.status(200).json(heroes);
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        });
}

module.exports = {
    getHeroes
};