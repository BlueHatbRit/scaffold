const express = require('express');
const hbs = require('express-hbs');
const bodyPareser = require('body-parser');
const path = require('path');

module.exports = () => {
    const app = express();

    app.use(bodyPareser.json());
    app.use(bodyPareser.urlencoded({extended: true}));

    app.engine('hbs', hbs.express4({
        partialsDir: __dirname + '/views/partials'
    }));
    app.set('view engine', 'hbs');
    app.set('views', __dirname + '/views');

    // Used for front-end css, js, etc
    app.use('/static', express.static(path.join(__dirname, 'static')));

    // Add the routes
    app.use(require('./routes')());
    
    return app;
};