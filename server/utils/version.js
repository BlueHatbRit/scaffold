const version = require("../../package.json").version;

module.exports = {
  full: version,
  minor: version.match(/^(\d+\.)?(\d+)/)[0]
};
