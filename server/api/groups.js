const _ = require('lodash');
const models = require('../models');
const modelUtils = require('../models/utils');
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

    show: (object, options) => {
        return models.Group.findOne(object, options).then(group => {
            return group.toJSON();
        });
    },

    create: (object, options) => {
        return models.Group.findOne({name: object.name}).then(group => {
            if (group) {
                throw new errors.ConflictError({message: 'group already exists'});
            }
            
            return models.Group.create(object).then(group => {
                return group.toJSON();
            });
        });
    },

    destroy: (object, options) => {
        return models.Group.findOne(object, options).then(group => {
            if (!group) {
                throw new errors.NotFoundError({message: 'group not found'});
            }
            
            return group.destroy();
        });
    },

    users: {
        create: (object) => {
            return models.User.findOne({email: object.email}, {withRelated: ['groups']}).then(user => {
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
                
                return models.User.edit(user, options).then(updatedUser => {
                    return updatedUser.toJSON();
                });
            });
        },

        destroy: (object) => {
            let groupToRemove;

            return models.Group.findOne({id: object.group_id}).then(group => {
                if (!group) {
                    throw new errors.NotFoundError({message: 'group not found'});
                }

                groupToRemove = group.toJSON();

                return models.User.findOne({id: object.user_id});
            }).then(user => {
                if (!user) {
                    throw new errors.NotFoundError({message: 'user not found'});
                }

                user = user.toJSON();

                return modelUtils.detach(models.User, user.id, 'groups', [groupToRemove]);
            });
        }
    }
};

module.exports = groups;