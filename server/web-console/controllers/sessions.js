const api = require('../../api');

const sessionsController = {
    new: (req, res) => {
        res.render('login');
    },

    create: (req, res) => {
        api.session.create(req.body).then(token => {
            console.log(token);
            res.redirect('/');
        }).catch(e => {
            console.log('login failed');
            res.redirect('/login');
        })
    }
};

module.exports = sessionsController;