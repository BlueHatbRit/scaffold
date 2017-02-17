const express = require('express');
const config = require('./config');

module.exports = function constructScraffold() {
    const app = express();

    app.get('/', (req, res, next) => {
        res.sendStatus(200).end();
    });

    // Mount the API
    app.use('/api/v1.0', require('./api/app')());
    console.log('api initialised');

    // Mount the web console
    app.use('/', require('./web-console')());
    console.log('web-console initialised');

    const port = config.get('port');
    app.listen(port, () => {
        console.log('listening on port:', port);
    });

    return app;
};