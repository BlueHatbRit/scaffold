const express = require('express');
const controllers = require('./controllers');
const middleware = require('../middleware');
const staffOnly = middleware.webAuth.staffOnly;

const frontendRoutes = function frontendRoutes() {
    let router = express.Router();
    
    router.get('/signup', controllers.users.new);
    router.post('/signup', controllers.users.create);

    router.get('/users', staffOnly, controllers.users.index); // Staff only
    router.get('/users/:id', staffOnly, controllers.users.show);

    router.get('/login', controllers.sessions.new);
    router.post('/login', controllers.sessions.create);

    router.get('/logout', controllers.sessions.destroy); // Not restful but easier for a browser

    router.get('/settings', staffOnly, controllers.settings.index);
    router.put('/settings', staffOnly, controllers.settings.update);

    router.get('/groups', staffOnly, controllers.groups.index);
    router.get('/groups/:id', staffOnly, controllers.groups.show);
    router.get('/groups/:id/users/new', staffOnly, controllers.groups.users.new);
    router.post('/groups/:id/users', staffOnly, controllers.groups.users.create);

    router.get('/flags', staffOnly, controllers.flags.index);
    router.post('/flags', staffOnly, controllers.flags.create);
    router.get('/flags/new', staffOnly, controllers.flags.new);
    router.get('/flags/:id/edit', staffOnly, controllers.flags.edit);
    router.post('/flags/:id', staffOnly, controllers.flags.update);
    router.get('/flags/:id/groups/new', staffOnly, controllers.flags.groups.new);
    router.post('/flags/:id/groups', staffOnly, controllers.flags.groups.create);

    router.get('/terms', controllers.infoPages.terms);
    router.get('/', controllers.infoPages.index);

    return router;
};

module.exports = frontendRoutes;