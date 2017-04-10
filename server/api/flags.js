const _ = require('lodash');
const models = require('../models');
const errors = require('../errors');

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

        return models.Flag.create(object).then(flag => {
            return flag.toJSON();
        });
    },

    update: (object, options) => {
        return models.Flag.edit(object, options).then(flag => {
            if (flag) {
                return flag.toJSON();
            } else {
                throw new errors.NotFoundError({message: 'flag not found'});
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
                    throw new errors.NotFoundError({message: 'flag not found'});
                }

                return models.Group.findOne({name: object.group_name});
            }).then(group => {
                if (!group) {
                    throw new errors.NotFoundError({message: 'group not found'});
                }

                if (!_.includes(flag.groups, group.id)) {
                    console.log('pushing group');
                    flag.groups.push(group.id);
                } else {
                    // Return some sort of error?
                    console.log('Flag already has group');
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