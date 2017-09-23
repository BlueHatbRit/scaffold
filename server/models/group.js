const Promise = require("bluebird");
const base = require("./base").base;
const registry = require("./base").registry;
const modelUtils = require("./utils");

let Group = base.extend(
  {
    tableName: "groups",

    users: function users() {
      return this.belongsToMany("User");
    },

    flags: function flags() {
      return this.belongsToMany("Flag");
    },

    onDestroying: function onDestroying(model, options) {
      let relatedUsers = this.related("users").toJSON();

      return modelUtils
        .detach(Group, model.toJSON().id, "users", relatedUsers)
        .then(() => {
          let relatedFlags = model.related("flags").toJSON();

          return modelUtils.detach(
            Group,
            model.toJSON().id,
            "flags",
            relatedFlags
          );
        });
    },

    toJSON: function toJSON(options) {
      options = options || {};
      let attribs = base.prototype.toJSON.call(this, options);

      attribs.users = this.related("users").toJSON();
      attribs.users.forEach(u => {
        delete u.created_at;
        delete u.updated_at;
        delete u.groups;
        delete u._pivot_user_id;
        delete u._pivot_group_id;
      });

      return attribs;
    }
  },
  {
    permittedOptions: function permittedOptions(methodName) {
      let options = base.permittedOptions();

      let validOptions = {
        findOne: ["withRelated"]
      };

      if (validOptions[methodName]) {
        options = options.concat(validOptions[methodName]);
      }

      return options;
    },

    findOne: function findOne(data, options) {
      options = options || {};
      options = this.filterOptions(options, "findOne");

      return base.findOne.call(this, data, options);
    }
  }
);

let Groups = registry.Collection.extend({
  model: Group
});

module.exports = {
  Group: registry.model("Group", Group),
  Groups: registry.collection("Groups", Groups)
};
