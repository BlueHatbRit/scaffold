const Promise = require("bluebird");
const _ = require("lodash");
const models = require("../models");
const settingsCache = require("../settings").cache;
const errors = require("../errors");

const settings = {
  index: options => {
    // Returns settings as JSON
    let settings = settingsCache.getAll();

    return Promise.resolve(settings);
  },

  update: function update(object, options) {
    options = options || {};
    let self = this;

    // TODO: This is insanity, I need to figure out a good way
    // to sanitise the input.

    return models.Setting.edit(object).then(settingsArray => {
      const settingsAsJson = _.keyBy(
        _.invokeMap(settingsArray, "toJSON"),
        "key"
      );

      return settingsAsJson;
    });
  }
};

module.exports = settings;
