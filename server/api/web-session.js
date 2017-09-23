const Promise = require("bluebird");
const _ = require("lodash");
const models = require("../models");

const webSession = {
  create: (object, options) => {
    // Todo: Validate Object

    // Verify the user
    return models.User.verify(object).then(user => {
      user = user.toJSON();

      const isMaintainer = user.is_maintainer;
      const isOwner = user.is_owner;

      return {
        userId: user.id,
        isMaintainer: isMaintainer,
        isOwner: isOwner
      };
    });
  }
};

module.exports = webSession;
