const api = require('../../api');
const errors = require('../../errors');
const settings = require('../../settings').cache;

const usersController = {
    index: (req, res, next) => {
        api.users.index().then(users => {
            res.render('users/index', {
                users: users
            });
        }).catch(next);
    },

    show: (req, res, next) => {
        const options = {id: req.params.id};

        api.users.show(options).then(user => {

            res.render('users/show', user);
        }).catch(next);
    },

    new: (req, res) => {
        const termsExist = !!settings.get('terms');
        res.render('signup', {termsExist: termsExist});
    },

    create: (req, res, next) => {
        const newUser = req.body;

        if (newUser.password !== newUser.confirmPassword) {
            // Reject as the passwords are different
            req.flash('error', "Passwords don't match");

            return res.redirect('/signup');
        }

        delete newUser.confirmPassword;
        return api.users.create(newUser).then(user => {
            req.flash('success', 'Account created, you can now log in');

            res.redirect('/');
        }).catch(errors.ConflictError, err => {
            req.flash('error', 'It seems that email is already in use');

            res.redirect('/signup');
        }).catch(next);
    }
};

module.exports = usersController;