const Promise = require('bluebird');
const base = require('./base').base;
const registry = require('./base').registry;
const modelUtils = require('./utils');

let Group = base.extend({
    tableName: 'groups',

    users: function users() {
        return this.belongsToMany('User');
    },

    onDestroying: function onDestroying(model, options) {
        let relatedUsers = this.related('users').toJSON();

        return modelUtils.detach(Group, this.toJSON().id, 'users', relatedUsers);
    },

    toJSON: function toJSON(options) {
        options = options || {};
        let attribs = base.prototype.toJSON.call(this, options);
        
        attribs.users = this.related('users').toJSON();
        attribs.users.forEach((u) => {
            delete u.created_at;
            delete u.updated_at;
            delete u.groups;
            delete u._pivot_user_id;
            delete u._pivot_group_id;
        });

        return attribs;
    }
}, {
    findOne: function findOne(data, options) {
        options = options || {};
        
        return base.findOne.call(this, data, options);
    }
});

let Groups = registry.Collection.extend({
    model: Group
});

module.exports = {
    Group: registry.model('Group', Group),
    Groups: registry.collection('Groups', Groups)
};