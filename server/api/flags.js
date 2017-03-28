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

            return {
                accessible: flag.active
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

            /*return models.Group.findOne({name: object.group_name}).then(group => {
                if (!group) {
                    throw new errors.NotFoundError({message: 'group not found'});
                }

                groupToAdd = group.toJSON();

                return models.Flag.findOne({id: object.id})
            });*/
        }
    }
};

module.exports = flags;