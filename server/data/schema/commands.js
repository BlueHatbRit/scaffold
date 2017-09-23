const db = require("../db");
const schema = require("./schema");

function addTableColumn(tableName, table, columnName) {
  let column;
  let columnSpec = schema[tableName][columnName];

  // creation distinguishes between text with fieldtype, string with maxlength and all others
  if (columnSpec.type === "text" && columnSpec.hasOwnProperty("fieldtype")) {
    column = table[columnSpec.type](columnName, columnSpec.fieldtype);
  } else if (columnSpec.type === "string") {
    if (columnSpec.hasOwnProperty("maxlength")) {
      column = table[columnSpec.type](columnName, columnSpec.maxlength);
    } else {
      column = table[columnSpec.type](columnName, 191);
    }
  } else {
    column = table[columnSpec.type](columnName);
  }

  if (columnSpec.hasOwnProperty("nullable") && columnSpec.nullable === true) {
    column.nullable();
  } else {
    column.nullable(false);
  }

  if (columnSpec.hasOwnProperty("primary") && columnSpec.primary === true) {
    column.primary();
  }

  if (columnSpec.hasOwnProperty("unique") && columnSpec.unique) {
    column.unique();
  }

  if (columnSpec.hasOwnProperty("unsigned") && columnSpec.unsigned) {
    column.unsigned();
  }

  if (columnSpec.hasOwnProperty("references")) {
    column.references(columnSpec.references);
  }

  if (columnSpec.hasOwnProperty("defaultTo")) {
    column.defaultTo(columnSpec.defaultTo);
  }
}

function createTable(table, transaction) {
  return (transaction || db.knex).schema.hasTable(table).then(exists => {
    if (exists) {
      return;
    }

    return (transaction || db.knex).schema.createTable(table, t => {
      var columnKeys = Object.keys(schema[table]);

      columnKeys.forEach(column => {
        return addTableColumn(table, t, column);
      });
    });
  });
}

function deleteTable(table, transaction) {
  return (transaction || db.knex).schema.dropTableIfExists(table);
}

module.exports = {
  createTable: createTable,
  deleteTable: deleteTable
};
