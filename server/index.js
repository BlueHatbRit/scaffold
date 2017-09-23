const settings = require("./settings");
const models = require("./models");

function start() {
  models.init();
  console.log("models loaded");

  return settings.init().then(() => {
    return (app = require("./app")());
  });
}

module.exports.start = start;
