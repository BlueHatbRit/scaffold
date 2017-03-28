const api = require('../../api');
const errors = require('../../errors');

function convertActiveToBool(active) {
    return (active !== 'undefined' && active === 'true');
}

const flags = {
    index: (req, res, next) => {
        api.flags.index().then(flags => {
            return res.render('flags/index', {
                flags: flags
            });
        }).catch(next);
    },

    new: (req, res) => {
        res.render('flags/new');
    },

    create: (req, res, next) => {
        // Hack to avoid front end crap...
        req.body.active = convertActiveToBool(req.body.active);

        api.flags.create(req.body).then(flag => {
            req.flash('success', 'Flag created');

            return res.redirect('/flags');
        }).catch(next);
    },

    edit: (req, res, next) => {
        
        api.flags.show({id: req.params.id}).then(flag => {
            // Should the check box be checked?
            if (flag.active) {
                flag.activeChecked = 'checked';
            }

            res.render('flags/edit', flag);
        }).catch(next);
    },

    update: (req, res, next) => {
        // Ensure the ID updated is the one from the URL only.
        const options = {id: req.params.id};
        
        req.body.active = convertActiveToBool(req.body.active);

        api.flags.update(req.body, options).then(flag => {
            req.flash('success', 'Successfully updated');

            res.redirect('/flags');
        }).catch(next);
    }
}

module.exports = flags;