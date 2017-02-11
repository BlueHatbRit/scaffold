let Promise = require('bluebird');
let schema = require('../../schema');
let commands = schema.commands;
let tables = Object.keys(schema.schema);

module.exports = function createTables(options) {
    let transacting = options.transacting;

    // Create all tables within the schema
    return Promise.mapSeries(tables, (table) => {
        return commands.createTable(table, transacting);
    });
}