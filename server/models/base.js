const db = require('../data/db');
const bookshelf = require('bookshelf')(db.knex);
const schema = require('../data/schema');

// Registry plugin to find models easily
bookshelf.plugin('registry');

// Setup and create our base object using bookshelf-modelbase
// as this gives us a lot of utility I used to write by hand.
let ModelBase = require('bookshelf-modelbase')(bookshelf);
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

module.exports = {
    ModelBase: ModelBase,
    registry: bookshelf
};