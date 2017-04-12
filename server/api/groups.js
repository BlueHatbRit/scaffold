const _ = require('lodash');
const models = require('../models');
const errors = require('../errors');

function userIsInGroup(user, groupId) {
    let isInGroup = false;
    if (user.groups && user.groups.length > 0) {

        user.groups.forEach(group => {
            if (group.id === groupId) {
                isInGroup = true;
            }
        });

    }

    return isInGroup;
}

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
                if (!user) {
                    throw new errors.NotFoundError({message: 'user not found'});
                }

                user = user.toJSON();

                let userIsAlreadyInGroup = false;
                // Check to see if the user is already a member of the group
                if (user.groups && user.groups.length > 0) {
                    user.groups.forEach(group => {
                        if (group.id === object.group_id) {
                            userIsAlreadyInGroup = true;
                        }
                    });
                }

                if (!userIsInGroup(user, object.group_id)) {
                    user.groups.push(object.group_id);
                } else {
                    throw new errors.ConflictError({message: 'user is already a member of this group'});
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