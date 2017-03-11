const api = require('../../api');

const usersController = {
    index: (req, res, next) => {
        api.users.index().then(users => {
            res.render('users/index', {
                users: users
            });
        }).catch(next);
    },

    new: (req, res) => {
        res.render('signup');
    },

    create: (req, res) => {
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
        }).catch(e => {
            req.flash('error', 'Registration failed');
            res.redirect('/signup');
        });
    },

    edit: (req, res, next) => {
        const options = {id: req.params.id};

        api.users.show(options).then(user => {

            res.render('users/edit', user);
        }).catch(next);
    }
};

module.exports = usersController;