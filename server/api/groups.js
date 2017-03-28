const _ = require('lodash');
const models = require('../models');
const errors = require('../errors');

const groups = {
    index: (options) => {
        return models.Group.fetchAll().then(groups => {
            return groups.toJSON();
        });
    },

    show: (options) => {
        return models.Group.findOne(options).then(group => {
            return group.toJSON();
        });
    },

    users: {
        index: (options) => {
            return models.Users.findAllByGroupId(options).then(users => {
                return users.toJSON();
            });
        },

        create: (object) => {
            return models.User.findOne({email: object.email}).then(user => {
                user = user.toJSON();

                if (!_.includes(user.groups, object.group_id)) {
                    console.log('pushing group');
                    user.groups.push(object.group_id);
                } else {
                    // TODO: Reject the call here
                    //console.log('Already in the group, do something');
                }

                const options = {
                    withRelated: ['groups'],
                    id: user.id
                };
                return models.User.edit(user, options).then(user => {
                    return user.toJSON();
                });
            });
        }
    }
};

module.exports = groups;