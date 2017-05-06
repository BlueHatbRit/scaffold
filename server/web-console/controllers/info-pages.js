const settings = require('../../settings').cache;
const errors = require('../../errors');

const infoPagesController = {
    index: (req, res) => {
        let welcomeCopy = settings.get('welcomeCopy');
        res.render('index', {welcomeCopy: welcomeCopy});
    },

    terms: (req, res, next) => {
        let terms = settings.get('terms');
        if (terms) {
            res.render('terms', {terms: terms});
        } else {
            // No terms have been set so pretend the page doesn't exist
            next(new errors.NotFoundError({message: 'terms not found'}));
        }
    }
};

module.exports = infoPagesController;