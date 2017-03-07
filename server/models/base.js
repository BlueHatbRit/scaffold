const db = require('../data/db');
const schema = require('../data/schema').schema;
const bookshelf = require('bookshelf')(db.knex);
const ObjectId = require('bson-objectid');
const _ = require('lodash');

let BaseModel = require('bookshelf-modelbase')(bookshelf);

// Registry plugin to find models easily
bookshelf.plugin('registry');

bookshelf.plugin(require('bookshelf-modelbase').pluggable);

// Add some custom elements to our BaseModel
BaseModel = BaseModel.extend({
    permittedAttributes: function permittedAttributes() {
        return _.keys(schema[this.tableName]);
    },

    defaults: function defaults() {
        return {};
    },

    initialize: function initialize() {
        let self = this;

        // Create event hooks for 'onSaving, onSave, onCreating' etc.
        // Add hook options as required to the string array.
        // If the function doesn't exist on the current model, it'll be
        // skipped.
        ['creating', 'saving'].forEach(eventName => {
            let functionName = 'on' + eventName[0].toUpperCase() + eventName.slice(1);
            
            if (!self[functionName]) {
                return;
            }
            
            self.on(eventName, function eventTriggered() {
                return this[functionName].apply(this, arguments);
            });
        });
    },

    onCreating: function onCreating(newObj, attr, options) {
        if (_.isUndefined(newObj.id) || _.isNull(newObj.id)) {
            newObj.setId();
        }
    },

    onSaving: function onSaving(newObj, attr, options) {
        // Remove any properties which don't belong on the model
        this.attributes = this.pick(this.permittedAttributes());
    },

    setId: function setId() {
        this.set('id', ObjectId.generate());
    }
}, {
    permittedOptions: function permittedOptions() {
        return ['withRelated'];
    },

    filterOptions: function filterOptions(options, methodName) {
        let permittedOptions = this.permittedOptions(methodName);
        let filteredOptions = _.pick(options, permittedOptions);

        return filteredOptions;
    },

    filterData: function filterData(data) {
        let permittedAttributes = this.prototype.permittedAttributes();
        let filteredData = _.pick(data, permittedAttributes);

        return filteredData;
    },

    add: function add(data, options) {
        options = options || {};
        const model = this.forge(data);

        // We auto-gen id's so we need to tell bookshelf we're doing an insert.
        options.method = 'insert';
        return model.save(null, options);
    },

    edit: function edit(data, options) {
        const id = options.id;
        const model = this.forge({id: id});

        return model.fetch(options).then(function then(object) {
            if (object) {
                return object.save(data, options);
            }
        });
    },

    findOne: function findOne(data, options) {
        data = this.filterData(data);
        options = this.filterOptions(options, 'findOne');
        
        return this.forge(data).fetch(options);
    }
});

module.exports = {
    registry: bookshelf,
    base: BaseModel
};