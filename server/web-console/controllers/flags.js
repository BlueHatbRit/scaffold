const api = require('../../api');

const flags = {
    index: (req, res) => {
        api.flags.index().then(flags => {
            return res.render('flags/index', {
                flags: flags
            });
        });
    },

    new: (req, res) => {
        res.render('flags/new');
    },

    create: (req, res) => {
        api.flags.create(req.body).then(flag => {
            req.flash('success', 'Flag created');

            return res.redirect('/flags');
        });
    }
}

module.exports = flags;