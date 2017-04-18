const _ = require('lodash');
const events = require('../events');

let cache = {};

const SettingsCache = {
    get: function get(key, options) {
        if (!cache[key]) {
            return;
        }

        try {
            return JSON.parse(cache[key].value);
        } catch (err) {
            return cache[key].value;
        }
    },

    set: function set(key, value) {
        cache[key] = _.cloneDeep(value);
    },

    getAll: function getAll() {
        return _.cloneDeep(cache);
    },

    init: function init(settings) {
        let self = this;

        function updateSettingFromModel(model) {
            self.set(model.get('key'), model.toJSON());
        }

        cache = {};

        // Initialise the cache from the bookshelf models passed to us
        if (settings && settings.models) {
            settings.models.forEach(updateSettingFromModel);
        }

        // Listen for updates from any Setting model in the system,
        // when something changes make sure we add it to the cache
        // for easy access from here.
        events.on('settings.created', updateSettingFromModel);
        events.on('settings.edited', updateSettingFromModel);
        events.on('settings.destroyed', updateSettingFromModel);

        return cache;
    }
}

module.exports = SettingsCache;