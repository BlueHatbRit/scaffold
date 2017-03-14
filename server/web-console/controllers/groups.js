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
        const options = {
            id: req.params.id
        };
        
        // Get the group
        api.groups.show(options).then(group => {

            // Get all users in the group
            return api.groups.users.index(options).then(users => {
                
                return res.render('groups/show', {
                    group: group,
                    users: users
                });
            }).catch(next);
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
                res.redirect('/groups/' + req.params.id);
            }).catch(next);
        }
    }
};

module.exports = groups;