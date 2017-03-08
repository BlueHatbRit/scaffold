const Promise = require('bluebird');
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
            return flag.toJSON();
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
    }
};

module.exports = flags;