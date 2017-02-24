const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('../middleware');
const api = require('../api');

function initRoutes() {
    const router = express.Router();

    router.get('/status', /*middleware.auth,*/ (req, res) => {
        res.send({ status: 'operational' }).end();
    });

    router.post('/users', api.http(api.users.create));
    
    router.post('/sessions', api.http(api.sessions.create));

    return router;
}

module.exports = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(initRoutes());
    return app;
};