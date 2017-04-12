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
            req.flash('success', 'Flag created!');

            return res.redirect('/flags');
        }).catch(errors.ConflictError, (err) => {
            req.flash('error', 'A flag with that name already exists!');

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
    },

    groups: {
        new: (req, res, next) => {
            api.flags.show({id: req.params.id}).then(flag => {
                res.render('flags/groups/new', flag);
            }).catch(next);
        },

        create: (req, res, next) => {
            const obj = {
                id: req.params.id,
                group_name: req.body.group_name
            };

            api.flags.groups.create(obj).then(flag => {
                req.flash('success', 'Group given access to flag');

                res.redirect('/flags/' + flag.id + '/edit');
            }).catch(errors.NotFoundError, notFoundErr => {
                // Flag could have been removed by another user while this is happening
                // so we need to account for that.
                req.flash('error', `That ${notFoundErr.target} doesn't exist`);

                if (notFoundErr.target === 'flag') {
                    // Can't redirect to the flag if it doesn't exist
                    res.redirect('/flags');
                } else {
                    res.redirect(`/flags/${obj.id}/edit`);
                }
            }).catch(errors.ConflictError, conflictError => {
                req.flash('error', "That group already has access to this flag");

                res.redirect(`/flags/${obj.id}/edit`);
            })
        }
    }
}

module.exports = flags;