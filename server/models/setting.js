const Promise = require('bluebird');
const _ = require('lodash');
const base = require('./base').base;
const registry = require('./base').registry;
const events = require('../events');

let defaultSettings;

function parseDefaultSettings() {
    let defaults = require('../data/schema').defaultSettings;

    _.forEach(defaults, function each(setting, name) {
        setting.key = name;
    });

    return defaults;
}

function getDefaults() {
    if (!defaultSettings) {
        defaultSettings = parseDefaultSettings();
    }

    return defaultSettings;
}

const Setting = base.extend({
    tableName: 'settings',

    emitChange: function emitChange(change) {
        events.emit('settings.' + change, this);
    },

    onCreated: function onCreated(model) {
        console.log('created');
        model.emitChange('created');
    },

    onUpdated: function onUpdated(model) {
        console.log('updated');
        model.emitChange('updated');
    },

    onDestroyed: function onDestroyed(model) {
        model.emitChange('destroyed');
    }
}, {
    populateDefaults: function populateDefaults() {
        let self = this;

        // Get all the settings in the db
        return this.findAll().then(function checkAllSettings(allSettings) {

            // Get the keys of all the ones which exist
            let existingKeys = allSettings.models.map(function mapper(setting) { return setting.get('key')});
            let operations = [];

            // Go through all the defaults, if a setting doesn't exist in the db
            // then create an operation to add it.
            _.each(getDefaults(), function forEachDefault(defaultSetting, defaultSettingKey) {
                let isMissing = existingKeys.indexOf(defaultSettingKey) === -1;
                if (isMissing) {
                    defaultSetting.value = defaultSetting.defaultValue;
                    operations.push(Setting.forge(defaultSetting).save());
                }
            });

            // If there are any operations to run then run them and return
            if (operations.length > 0) {
                return Promise.all(operations).then(function fetchToReturn() {
                    // Return the updated settings
                    return self.fetchAll();
                });
            } else {
                // Nothing to update, just return the settings as they were
                return allSettings;
            }
        });
    }
});

module.exports = {
    Setting: registry.model('Setting', Setting)
};