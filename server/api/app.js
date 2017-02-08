const express = require('express');
const bodyParser = require('body-parser');
const api = require('../api');

function initRoutes() {
    const router = express.Router();

    router.get('/status', (req, res) => {
        res.send({ status: 'operational' }).end();
    });

    router.get('/user/:id', api.http(api.user.show));
    router.post('/user', api.http(api.user.create));

    return router;
}

module.exports = function() {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(initRoutes());
    return app;
};