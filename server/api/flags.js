const _ = require('lodash');
const models = require('../models');
const errors = require('../errors');

function groupIsAlreadyAttachedToFlag(flag, groupId) {
    let isInGroup = false;
    if (flag.groups && flag.groups.length > 0) {

        flag.groups.forEach(group => {
            if (group.id === groupId) {
                isInGroup = true;
            }
        });

    }

    return isInGroup;
}

const flags = {
    index: (options) => {
        return models.Flag.fetchAll().then(flags => {
            return flags.toJSON();
        });
    },

    indexAccess: (options) => {
        // Not implemented
    },

    show: (options) => {
        return models.Flag.findOne(options).then(flag => {
            if (flag) {
                return flag.toJSON();
            } else {
                throw new errors.NotFoundError({message: 'flag not found'});
            }
        });
    },

    showAccess: (options) => {
        return models.Flag.findOne(options).then(flag => {
            flag = flag.toJSON();

            // Access cascades as the following:
            // * flag.active (global kill switch)
            // * flag.groups (group based access)
            // * percentage (percentage based access)
            // If the flag.active is set to false, then
            // group membership will not be queried, etc.

            let accessible = false;
            // Check if the user has group access
            if (!_.isEmpty(flag.groups)) {
                options.user.groups.forEach(group => {
                    if (_.some(flag.groups, group)) {
                        accessible = true;
                    }
                });
            }
            
            // Check if the global kill switch is turned off
            if (!flag.active) {
                accessible = false;
            }

            return {
                accessible: accessible
            };
        });
    },

    create: (object, options) => {
        // Todo: Add actual validation, shhh

        return models.Flag.findOne({name: object.name}).then(flag => {
            if (flag) {
                throw new errors.ConflictError({message: 'flag name already exists'});
            } else {
                return models.Flag.create(object).then(flag => {
                    return flag.toJSON();
                });
            }
        });
    },

    update: (object, options) => {
        return models.Flag.edit(object, options).then(flag => {
            if (flag) {
                return flag.toJSON();
            }
        });
    },

    destroy: (object) => {
        return models.Flag.findOne({id: object.id}).then(flag => {
            return flag.destroy();
        }).catch(models.Flag.NotFoundError, () => {
            throw new errors.NotFoundError({message: 'flag not found'});
        });
    },

    groups: {
        create: (object, options) => {
            let flag;

            return models.Flag.findOne({id: object.id}).then(foundFlag => {
                if (foundFlag) {
                    flag = foundFlag.toJSON();
                } else {
                    throw new errors.NotFoundError({message: 'flag not found', target: 'flag'});
                }

                return models.Group.findOne({name: object.group_name});
            }).then(group => {
                if (!group) {
                    throw new errors.NotFoundError({message: 'group not found', target: 'group'});
                }

                if (!groupIsAlreadyAttachedToFlag(flag, group.id)) {
                    flag.groups.push(group.id);
                } else {
                    throw new errors.ConflictError({message: 'group already has access to flag'});
                }

                const options = {
                    withRelated: ['groups'],
                    id: flag.id
                };
                return models.Flag.edit(flag, options).then(editedFlag => {
                    return editedFlag.toJSON();
                });
            });
        }
    }
};

module.exports = flags;