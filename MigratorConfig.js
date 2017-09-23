let config = require("./server/config");
const utils = require("./server/utils");

module.exports = {
  database: config.get("database"),
  migrationPath: __dirname + "/server/data/migrations",
  currentVersion: utils.version.minor
};
