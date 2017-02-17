const models = require('./models');

function start() {
    models.init();
    console.log('models loaded');

    return models.Group.createDefault().then(group => {
        return app = require('./app')();
    });
}

module.exports.start = start;