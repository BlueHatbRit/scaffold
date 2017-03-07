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
        return models.Flag.findOne({id: options.id}).then(flag => {
            return flag.toJSON();
        });
    },

    showAccess: (options) => {
        return models.Flag.findOne({id: options.id}).then(flag => {
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

    destroy: (object) => {
        return models.Flag.findOne({id: object.id}).then(flag => {
            return flag.destroy();
        }).catch(models.Flag.NotFoundError, () => {
            throw new errors.NotFoundError({message: 'flag not found'});
        });
    }
};

module.exports = flags;