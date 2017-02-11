const KnexMigrator = new require('knex-migrator');
let migrator = new KnexMigrator();

let initDb = function setup(done) {
    if (done) {
        migrator.init().then(() => {
            done();
        }).catch(done);
    } else {
        return migrator.init();
    }
};

let teardownDb = function teardown(done) {
    if (done) {
        migrator.reset().then(() => {
            done();
        }).catch(done);
    } else {
        return migrator.reset();
    }
};

module.exports = {
    initDb: initDb,
    teardownDb: teardownDb
};