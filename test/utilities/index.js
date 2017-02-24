const KnexMigrator = new require('knex-migrator');
const models = require('../../server/models');
let migrator = new KnexMigrator();

let initModels = function initModels(done) {
    models.init();

    done();
};

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

let runApiInit = function runApiInit(done) {
    if (done) {
        models.Group.createDefault().then(() => {
            done();
        }).catch(done);
    } else {
        return models.Group.createDefault();
    }
}

module.exports = {
    initModels: initModels,
    initDb: initDb,
    teardownDb: teardownDb,
    runApiInit: runApiInit,
    fixtures: require('./fixtures')
};