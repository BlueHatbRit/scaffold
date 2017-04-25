process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const KnexMigrator = require('knex-migrator');
const migrator = new KnexMigrator();
const server = require('./server');

migrator.isDatabaseOK().then(() => {
    return server.start();
}).catch((err) => {
    //console.error(err.code);
    if (err.code == 'MIGRATION_TABLE_IS_MISSING') {
        console.error('Database is not initialised run:');
        console.error('npm run db-init');
    } else {
        console.error('Error starting Scaffold');
        console.error(err);
    }
});
