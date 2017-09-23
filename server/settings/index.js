let model = require("../models/setting").Setting;
let cache = require("./cache");

function init() {
  return model.populateDefaults().then(settings => {
    cache.init(settings);

    console.log("settings initialised");
  });
}

module.exports.init = init;
module.exports.cache = cache;
