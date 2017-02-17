const Promise = require('bluebird');
const base = require('./base').base;
const registry = require('./base').registry;

let Group = base.extend({
    tableName: 'groups',

    users: function users() {
        return this.belongsToMany('User');
    }
}, {
    createDefault: function createDefault() {
        return this.count().then(numOfGroups => {
            if (numOfGroups >= 1) {
                return;
            }

            // No groups, lets create the staff group
            let defaultGroup = require('../data/schema/default-group');
            console.log('default');
            console.log(defaultGroup);
            
            return Group.forge(defaultGroup).save();
        });
    }
});

let Groups = registry.Collection.extend({
    model: Group
});

module.exports = {
    Group: registry.model('Group', Group),
    Groups: registry.collection('Groups', Groups)
};