const _ = require('lodash');
const base = require('./base').base;
const registry = require('./base').registry;

let Flag = base.extend({
    tableName: 'flags',
 
    defaults: function defaults() {
        let baseDefaults = base.prototype.defaults.call(this);

        return _.merge({
            active: false
        }, baseDefaults);
    },

    toJSON: function toJSON(options) {
        options = options || {};
        let attribs = base.prototype.toJSON.call(this, options);

        attribs.active = !!attribs.active;

        return attribs;
    }
}, {
    
});

let Flags = registry.Collection.extend({
    model: Flag
});

module.exports = {
    Flag: registry.model('Flag', Flag),
    Flags: registry.collection('Flags', Flags)
};