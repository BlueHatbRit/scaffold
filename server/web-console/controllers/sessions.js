const api = require('../../api');
const errors = require('../../errors');

const sessionsController = {
    new: (req, res) => {
        res.render('login');
    },

    create: (req, res, next) => {
        api.webSession.create(req.body).then(userData => {
            req.session.userId = userData.userId;
            req.session.isStaff = userData.isStaff;
            req.flash('success', "Welcome back!");

            res.redirect('/');
        }).catch(errors.NotFoundError, errors.ForbiddenError, notFoundErr => {
            // Don't tell the user if it's the password or email that is incorrect.
            // Is this good practice?
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