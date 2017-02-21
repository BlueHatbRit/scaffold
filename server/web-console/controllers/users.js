const api = require('../../api');

const usersController = {
    new: (req, res) => {
        res.render('register');
    },

    create: (req, res) => {
        const newUser = req.body;

        if (newUser.password !== newUser.confirmPassword) {
            // Reject as the passwords are different
            return res.sendStatus(401);
        }

        delete newUser.confirmPassword;
        return api.users.create(newUser).then(user => {
            res.redirect('/');
        }).catch(e => {
            res.redirect('/signup');
        });

        res.sendStatus(201);
    }
};

module.exports = usersController;