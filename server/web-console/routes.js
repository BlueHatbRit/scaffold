const express = require('express');
const controllers = require('./controllers');

const frontendRoutes = function frontendRoutes() {
    let router = express.Router();

    // Used for front-end css, js, etc
    //router.get('/static/', express.static('./static'));

    //Broken regex = /^\signup\/$/
    router.get('/signup', controllers.user.registration);

    router.get('/', (req, res, next) => {
        res.sendStatus(200);
    });

    return router;
};

module.exports = frontendRoutes;