const api = require('../../api');
const errors = require('../../errors');

const sessionsController = {
    new: (req, res) => {
        res.render('login');
    },

    create: (req, res, next) => {
        return api.webSession.create(req.body).then(userData => {
            req.session.userId = userData.userId;
            req.session.isOwner = userData.isOwner;
            req.session.isMaintainer = userData.isMaintainer;
            
            req.flash('success', "Welcome back!");

            res.redirect('/');
        }).catch(errors.NotFoundError, errors.ForbiddenError, notFoundErr => {
            req.flash('error', "Your email address and password combination are incorrect.");

            res.redirect('/login');
        }).catch(next);
    },

    destroy: (req, res) => {
        req.session.destroy(err => {
            res.redirect('/');
        });
    }
};

module.exports = sessionsController;