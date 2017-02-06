const base = require('./base').ModelBase;
const registry = require('./base').registry;

let User = base.extend({
    tableName: 'users'
});

module.exports = {
    User: registry.model('User', User)
};