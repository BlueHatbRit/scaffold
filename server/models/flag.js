const _ = require('lodash');
const base = require('./base').base;
const registry = require('./base').registry;
const modelUtils = require('./utils');
const errors = require('../errors');

let Flag = base.extend({
    tableName: 'flags',
 
    defaults: function defaults() {
        let baseDefaults = base.prototype.defaults.call(this);

        return _.merge({
            active: false
        }, baseDefaults);
    },

    groups: function groups() {
        return this.belongsToMany('Group');
    },

    onDestroying: function onDestroying(model, options) {
        let relatedGroups = this.related('groups').toJSON();
        
        return modelUtils.detach(Flag, this.toJSON().id, 'groups', relatedGroups);
    },

    toJSON: function toJSON(options) {
        options = options || {};
        let attribs = base.prototype.toJSON.call(this, options);

        attribs.active = !!attribs.active;

        attribs.groups = this.related('groups').toJSON();
        attribs.groups.forEach((g) => {
            delete g.created_at;
            delete g.updated_at;
            delete g._pivot_flag_id;
            delete g._pivot_group_id;
        });

        return attribs;
    }
}, {
    permittedOptions: function permittedOptions(methodName) {
        let options = base.permittedOptions();

        let validOptions = {
            findOne: ['withRelated']
        };

        if (validOptions[methodName]) {
            options = options.concat(validOptions[methodName]);
        }

        return options;
    },

    findOne: function findOne(data, options) {
        options = options || {};
        options = this.filterOptions(options, 'findOne');

        return base.findOne.call(this, data, options);
    },

    edit: function edit(data, options) {
        let self = this;
        let flagId;
        let listedGroups;

        if (data.groups) {
            listedGroups = data.groups;
            delete data.groups;
        }

        options = options || {};
        options.withRelated = _.union(options.withRelated, options.include);
        
        return base.edit.call(this, data, options).then(function then(flag) {
            if (!listedGroups) {
                return flag;
            }

            // For returning the model after
            flagId = flag.id;

            return flag.groups().fetch().then(function then(currentGroups) {
                let groupsToAdd = _.difference(listedGroups, currentGroups);

                return modelUtils.attach(Flag, flag.id, 'groups', groupsToAdd, options);
            }).then(function then() {
                return self.findOne({id: flagId}, options);
            });
        }).catch(errors.NotFoundError, notFoundError => {
            throw new errors.NotFoundError({message: 'flag not found'});
        });
    }
});

let Flags = registry.Collection.extend({
    model: Flag
});

module.exports = {
    Flag: registry.model('Flag', Flag),
    Flags: registry.collection('Flags', Flags)
};