const express = require('express');
const controllers = require('./controllers');
const middleware = require('../middleware');

function redirect(newLocation) {
    let handleRedirect = function handleRedirect(req, res) {
        res.redirect(newLocation);
    };

    return handleRedirect;
}

const frontendRoutes = function frontendRoutes() {
    let router = express.Router();

    //Use regex here?
    router.get('/signup', controllers.users.new);
    router.post('/signup', controllers.users.create);

    router.get('/users', middleware.webAuth.staffOnly, controllers.users.index); // Staff only
    router.get('/users/new', redirect('/signup'));
    router.get('/users/:id/edit', middleware.webAuth.staffOnly, controllers.users.edit);

    router.get('/login', controllers.sessions.new);
    router.post('/login', controllers.sessions.create);

    router.get('/logout', controllers.sessions.destroy); // Not restful but easier for a browser

    router.get('/flags', middleware.webAuth.staffOnly, controllers.flags.index);
    router.post('/flags', middleware.webAuth.staffOnly, controllers.flags.create);
    router.get('/flags/new', middleware.webAuth.staffOnly, controllers.flags.new);
    router.get('/flags/:id/edit', middleware.webAuth.staffOnly, controllers.flags.edit);
    router.post('/flags/:id', middleware.webAuth.staffOnly, controllers.flags.update);

    router.get('/', controllers.infoPages.index);

    return router;
};

module.exports = frontendRoutes;