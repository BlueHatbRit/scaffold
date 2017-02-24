const api = require('../../api');

const sessionsController = {
    new: (req, res) => {
        res.render('login');
    },

    create: (req, res) => {
        api.webSession.create(req.body).then(userData => {
            req.session.userId = userData.userId;
            req.session.isStaff = userData.isStaff;
            req.flash('success', "You're now logged in!");

            res.redirect('/');
        }).catch(e => {
            req.flash('error', 'Login failed');

            res.redirect('/login');
        });
    },

    destroy: (req, res) => {
        req.session.destroy(err => {
            res.redirect('/');
        });
    }
};

module.exports = sessionsController;