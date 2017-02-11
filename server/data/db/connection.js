let knex = require('knex');
let config = require('../../config');
let db = config.get('database');
let knexInstance;

if (!knexInstance) {
  knexInstance = knex(db);
}

module.exports = knexInstance;
