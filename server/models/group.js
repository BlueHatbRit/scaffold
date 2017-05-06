const Promise = require('bluebird');
const base = require('./base').base;
const registry = require('./base').registry;

let Group = base.extend({
    tableName: 'groups',

    users: function users() {
        return this.belongsToMany('User');
    }
}, {
    findOne: function findOne(data, options) {
        options = options || {};

        if (options.withUsers) {
            // Get the users within the group
            options.withRelated = ['users'];
        }
        
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