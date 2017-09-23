const Promise = require("bluebird");
const models = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config");

const sessions = {
  create: (object, options) => {
    // Todo: Validate the presence of a username and password

    // Verify the user
    return models.User.verify(object).then(user => {
      const authResponse = {
        token: jwt.sign({ user: user }, config.get("auth").secret)
      };

      return authResponse;
    });
  }
};

module.exports = sessions;
