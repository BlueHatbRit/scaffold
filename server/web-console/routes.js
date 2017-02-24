const express = require('express');
const controllers = require('./controllers');

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

    //router.get('/users', controllers.users.index); // Staff only
    router.get('/users/new', redirect('/signup'));
    //router.get('/users/:id', controllers.users.show);

    router.get('/login', controllers.sessions.new);
    router.post('/login', controllers.sessions.create);

    router.get('/logout', controllers.sessions.destroy); // Not restful but easier for a browser

    router.get('/sessions/new', redirect('/login'));
    router.get('/sessions/destroy', redirect('/logout')); // Not restful but easier for a browser

    router.get('/flags/new', controllers.flags.new);

    // All groups routes are staff only
    //router.get('/groups', controllers.groups.index);
    //router.get('/groups/new', controllers.groups.new); // Won't use to ensure only Staff group to start with
    //router.post('/groups', controllers.groups.create); // Won't use to ensure only Staff group to start with
    //router.get('/groups/:id, controllers.groups.show);
    //router.put('/groups/:id, controllers.groups.edit); // For adding users only to start with?
    //router.del('/groups/:id, controllers.groups.destroy); // Won't use to ensure only Staff group to start with

    // All flag routes are staff only
    //router.get('/flags', controllers.flags.index);
    //router.get('/flags/new, controllers.flags.new);
    //router.put('/flags', controllers.flags.create);
    //router.get('/flags/:id, controllers.flags.show);
    //router.put('/flags/:id, controllers.flags.edit);
    //router.del('/flags/:id, controllers.flags.destroy);

    router.get('/', controllers.infoPages.index);

    return router;
};

module.exports = frontendRoutes;