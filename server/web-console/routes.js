const express = require('express');
const controllers = require('./controllers');
const middleware = require('../middleware');

const frontendRoutes = function frontendRoutes() {
    let router = express.Router();

    //Use regex here?
    router.get('/signup', controllers.users.new);
    router.post('/signup', controllers.users.create);

    router.get('/users', middleware.webAuth.staffOnly, controllers.users.index); // Staff only
    router.get('/users/:id', middleware.webAuth.staffOnly, controllers.users.show);

    router.get('/login', controllers.sessions.new);
    router.post('/login', controllers.sessions.create);

    router.get('/logout', controllers.sessions.destroy); // Not restful but easier for a browser

    router.get('/groups', middleware.webAuth.staffOnly, controllers.groups.index);
    router.get('/groups/:id', middleware.webAuth.staffOnly, controllers.groups.show);
    router.get('/groups/:id/users/new', middleware.webAuth.staffOnly, controllers.groups.users.new);
    router.post('/groups/:id/users', middleware.webAuth.staffOnly, controllers.groups.users.create);

    router.get('/flags', middleware.webAuth.staffOnly, controllers.flags.index);
    router.post('/flags', middleware.webAuth.staffOnly, controllers.flags.create);
    router.get('/flags/new', middleware.webAuth.staffOnly, controllers.flags.new);
    router.get('/flags/:id/edit', middleware.webAuth.staffOnly, controllers.flags.edit);
    router.post('/flags/:id', middleware.webAuth.staffOnly, controllers.flags.update);
    router.get('/flags/:id/groups/new', middleware.webAuth.staffOnly, controllers.flags.groups.new);
    router.post('/flags/:id/groups', middleware.webAuth.staffOnly, controllers.flags.groups.create);

    router.get('/', controllers.infoPages.index);

    return router;
};

module.exports = frontendRoutes;