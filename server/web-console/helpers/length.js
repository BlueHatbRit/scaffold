const _ = require("lodash");

const length = function length(object) {
  if (_.isArray(object)) {
    // Return the length if the array
    return object.length;
  } else {
    // If it's an object then return the number of keys
    return _.keys(object).length;
  }
};

module.exports = length;
