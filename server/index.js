const express = require('express');
const models = require('./models');
const config = require('./config');

function start() {
    let app = express();

    models.init();
    console.log('models loaded');

    app.get('/', (req, res, next) => {
        res.sendStatus(200).end();
    });

    const port = config.get('port');
    app.listen(port, () => {
        console.log('listening on port:', port);
    });

    return app;
}

module.exports.start = start;