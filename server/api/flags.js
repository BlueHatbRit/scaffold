const _ = require("lodash");
const crc32 = require("crc-32");
const models = require("../models");
const errors = require("../errors");

function groupIsAlreadyAttachedToFlag(flag, groupId) {
  let isInGroup = false;
  if (flag.groups && flag.groups.length > 0) {
    flag.groups.forEach(group => {
      if (group.id === groupId) {
        isInGroup = true;
      }
    });
  }

  return isInGroup;
}

function userHasAccessToFlag(flag, user) {
  // Access cascades as the following:
  // * flag.active (global kill switch)
  // * flag.groups (group based access)
  // * percentage (percentage based access)
  // If the flag.active is set to false, then
  // group membership will not be queried, etc.
  let accessible = false;

  // Check if the user is within the population
  if (flag.population_percentage !== 0) {
    // Create a string which is unique for the feature + user combination
    // but will never change for that combination either.
    let flagUserString = `${flag.name}-${user.id}`;

    // Hash it to a number and check it against out percentage amount to check access.
    accessible =
      Math.abs(crc32.str(flagUserString)) % 100 < flag.population_percentage;
  }

  // Check if the user has group access
  if (!_.isEmpty(flag.groups)) {
    user.groups.forEach(group => {
      if (_.some(flag.groups, group)) {
        accessible = true;
      }
    });
  }

  // Check if the global kill switch is turned off
  if (!flag.active) {
    accessible = false;
  } else {
    // If the flag is active and there are no group or population
    // settings active, then give the user access.
    if (_.isEmpty(flag.groups) && flag.population_percentage === 0) {
      accessible = true;
    }
  }

  return accessible;
}

const flags = {
  index: options => {
    return models.Flag.fetchAll().then(flags => {
      return flags.toJSON();
    });
  },

  indexAccess: object => {
    const options = {
      withRelated: ["groups"]
    };

    // Check the user in case their groups have been changed
    // since their login. Not the best way to do it but hey-ho
    // it'll do for now.
    let user;
    return models.User
      .findOne({ id: object.user.id }, options)
      .then(upToDateUser => {
        user = upToDateUser.toJSON();
        console.log(user);

        return models.Flags.forge().fetch(options);
      })
      .then(flags => {
        flags = flags.toJSON();

        flags.forEach(flag => {
          flag.accessible = userHasAccessToFlag(flag, user);
          delete flag.active;
          delete flag.groups;
          delete flag.population_percentage;
        });

        return flags;
      });
  },

  show: (object, options) => {
    return models.Flag.findOne(object, options).then(flag => {
      if (flag) {
        return flag.toJSON();
      } else {
        throw new errors.NotFoundError({ message: "flag not found" });
      }
    });
  },

  showAccess: (object, options) => {
    options = options || {};
    options.withRelated = ["groups"];

    return models.User.findOne({ id: object.user.id }).then(user => {
      user = user.toJSON();

      return models.Flag.findOne(object, options).then(flag => {
        flag = flag.toJSON();

        flag.accessible = userHasAccessToFlag(flag, user);

        delete flag.active;
        delete flag.groups;
        delete flag.population_percentage;

        return flag;
      });
    });
  },

  create: (object, options) => {
    return models.Flag.findOne({ name: object.name }).then(flag => {
      if (flag) {
        throw new errors.ConflictError({ message: "flag name already exists" });
      } else {
        return models.Flag.create(object).then(flag => {
          return flag.toJSON();
        });
      }
    });
  },

  update: (object, options) => {
    return models.Flag.edit(object, options).then(flag => {
      if (flag) {
        return flag.toJSON();
      }
    });
  },

  destroy: (object, options) => {
    options = options || {};
    options.withRelated = ["groups"];

    return models.Flag.findOne({ name: object.name }, options).then(flag => {
      if (!flag) {
        throw new errors.NotFoundError({ message: "flag not found" });
      }

      return flag.destroy();
    });
  },

  groups: {
    create: (object, options) => {
      options = options || {};
      let flag;

      return models.Flag
        .findOne({ id: object.id }, options)
        .then(foundFlag => {
          if (foundFlag) {
            flag = foundFlag.toJSON();
          } else {
            throw new errors.NotFoundError({
              message: "flag not found",
              target: "flag"
            });
          }

          return models.Group.findOne({ name: object.group_name });
        })
        .then(group => {
          if (!group) {
            throw new errors.NotFoundError({
              message: "group not found",
              target: "group"
            });
          }

          if (!groupIsAlreadyAttachedToFlag(flag, group.id)) {
            flag.groups.push(group.id);
          } else {
            throw new errors.ConflictError({
              message: "group already has access to flag"
            });
          }

          options.id = flag.id;
          return models.Flag.edit(flag, options).then(editedFlag => {
            return editedFlag.toJSON();
          });
        });
    }
  }
};

module.exports = flags;
