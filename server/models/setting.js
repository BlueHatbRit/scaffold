const Promise = require("bluebird");
const _ = require("lodash");
const base = require("./base").base;
const registry = require("./base").registry;
const events = require("../events");
const errors = require("../errors");

let defaultSettings;

function parseDefaultSettings() {
  let defaults = require("../data/schema").defaultSettings;

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

const Setting = base.extend(
  {
    tableName: "settings",

    emitChange: function emitChange(change) {
      events.emit("settings." + change, this);
    },

    onCreated: function onCreated(model) {
      model.emitChange("created");
    },

    onUpdated: function onUpdated(model) {
      model.emitChange("updated");
    },

    onDestroyed: function onDestroyed(model) {
      model.emitChange("destroyed");
    }
  },
  {
    populateDefaults: function populateDefaults() {
      let self = this;

      // Get all the settings in the db
      return this.findAll().then(function checkAllSettings(allSettings) {
        // Get the keys of all the ones which exist
        let existingKeys = allSettings.models.map(function mapper(setting) {
          return setting.get("key");
        });
        let operations = [];

        // Go through all the defaults, if a setting doesn't exist in the db
        // then create an operation to add it.
        _.each(getDefaults(), function forEachDefault(
          defaultSetting,
          defaultSettingKey
        ) {
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
    },

    edit: function edit(data, options) {
      let self = this;

      // Accept arrays of settings to edit, treat
      // single edits the same way.
      if (!Array.isArray(data)) {
        data = [data];
      }

      return Promise.map(data, function(item) {
        return Setting.forge({ key: item.key })
          .fetch(options)
          .then(function then(setting) {
            let saveData = {};

            if (setting) {
              if (item.hasOwnProperty("value")) {
                saveData.value = item.value;
              }

              return setting.save(saveData, options);
            }

            return Promise.reject(
              new errors.NotFoundError({
                message: `setting "${item.key}" not found`
              })
            );
          });
      });
    }
  }
);

module.exports = {
  Setting: registry.model("Setting", Setting)
};
