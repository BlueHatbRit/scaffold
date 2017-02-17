const express = require('express');
const controllers = require('./controllers');

const frontendRoutes = function frontendRoutes() {
    let router = express.Router();

    // Used for front-end css, js, etc
    //router.get('/static/', express.static('./static'));

    //Broken regex = /^\signup\/$/
    //router.get('/signup', controllers.user.registration);

    //router.get('/users', controllers.user.index); // Staff only
    //router.get('/users/new', controllers.user.new);
    //router.post('/users', controller.user.create);
    //router.get('/users/:id', controller.user.show); // Staff only

    // All groups routes are staff only
    //router.get('/groups', controllers.groups.index);
    //router.get('/groups/new', controllers.groups.new); // Won't use to ensure only Staff group to start with
    //router.post('/groups', controllers.groups.create); // Won't use to ensure only Staff group to start with
    //router.get('/groups/:id, controllers.groups.show);
    //router.put('/groups/:id, controller.groups.edit); // For adding users only to start with?
    //router.del('/groups/:id, controller.groups.destroy); // Won't use to ensure only Staff group to start with

    // All flag routes are staff only
    //router.get('/flags', controllers.flags.index);
    //router.get('/flags/new, controllers.flags.new);
    //router.put('/flags', controllers.flags.create);
    //router.get('/flags/:id, controllers.flags.show);
    //router.put('/flags/:id, controllers.flags.edit);
    //router.del('/flags/:id, controllers.flags.destroy);

    router.get('/', (req, res, next) => {
        res.sendStatus(200);
    });

    return router;
};

module.exports = frontendRoutes;