const db = require('../data/db');
const bookshelf = require('bookshelf')(db.knex);

let BaseModel = require('bookshelf-modelbase')(bookshelf);

// Registry plugin to find models easily
bookshelf.plugin('registry');

bookshelf.plugin(require('bookshelf-modelbase').pluggable);

// Add some custom elements to our BaseModel
BaseModel = BaseModel.extend({
    initialize: function initialize() {
        let self = this;

        // Create event hooks for 'onSaving, onSave, onCreating' etc.
        // Add hook options as required to the string array.
        // If the function doesn't exist on the current model, it'll be
        // skipped.
        ['saving'].forEach(eventName => {
            let functionName = 'on' + eventName[0].toUpperCase() + eventName.slice(1);
            
            if (!self[functionName]) {
                return;
            }
            
            self.on(eventName, function eventTriggered() {
                return this[functionName].apply(this, arguments);
            });
        })
    }
});

module.exports = {
    registry: bookshelf,
    base: BaseModel
};