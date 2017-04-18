const Promise = require('bluebird');
const models = require('../models');
const settingsCache = require('../settings').cache;
const errors = require('../errors');

const settings = {
    index: (options) => {
        // Returns settings as JSON
        let settings = settingsCache.getAll();
        
        return Promise.resolve(settings);
    },

    /*show: (options) => {
        const setting = settingsCache.get(options.key);

        if (!setting) {
            return Promise.reject(errors.NotFoundError({message: 'setting not found'}));
        }

        return Promise.resolve({
            key: options.key,
            value: setting
        });
    },*/

    edit: function edit(object, options) {
        options = options || {};
        let self = this;

        // TODO: This is insanity, I need to figure out a good way
        // to sanitise the input.

        return models.Setting.edit(object);
    }
}

module.exports = settings;