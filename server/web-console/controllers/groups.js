const api = require('../../api');
const errors = require('../../errors');

const groups = {
    index: (req, res, next) => {
        api.groups.index().then(groups => {
            res.render('groups/index', {
                groups: groups
            });
        }).catch(next);
    },

    show: (req, res, next) => {
        const object = {
            id: req.params.id
        };

        const options = {
            withRelated: ['users']
        };
        
        // Get the group
        api.groups.show(object, options).then(group => {
            return res.render('groups/show', {
                group: group,
                users: group.users
            });
        }).catch(next);
    },

    new: (req, res, next) => {
        res.render('groups/new');
    },

    create: (req, res, next) => {
        const object = req.body;

        return api.groups.create(object).then(group => {
            req.flash('success', 'Group created');

            res.redirect(`/groups/${group.id}`);
        }).catch(next);
    },

    destroy: (req, res, next) => {
        const object = {
            id: req.params.id
        };

        const options = {
            withRelated: ['users', 'flags']
        };

        return api.groups.destroy(object, options).then(() => {
            res.sendStatus(204);
        }).catch(next);
    },

    users: {
        new: (req, res, next) => {
            const options = {
                id: req.params.id
            };

            api.groups.show(options).then(group => {
                return res.render('groups/users/new', group);
            });
        },

        create: (req, res, next) => {
            const object = {
                email: req.body.email,
                group_id: req.params.id
            };

            api.groups.users.create(object).then(user => {
                req.flash('success', 'User successfully added to group');

                res.redirect('/groups/' + object.group_id);
            }).catch(errors.NotFoundError, notFoundErr => {
                req.flash('error', "That user doesn't exist");

                res.redirect(`/groups/${object.group_id}/users/new`);
            }).catch(errors.ConflictError, validationErr => {
                req.flash('error', "That user is already in this group");

                res.redirect(`/groups/${object.group_id}/users/new`);
            }).catch(next);
        },

        destroy: (req, res, next) => {
            const object = {
                group_id: req.params.group_id,
                user_id: req.params.user_id
            };

            return api.groups.users.destroy(object).then(() => {
                res.sendStatus(204);
            }).catch(next);
        }
    }
};

module.exports = groups;