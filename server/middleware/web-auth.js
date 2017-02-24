const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('../config');

module.exports = function() {
    let sessionOptions = {
        store: new RedisStore(config.get('session').store),
        secret: config.get('session').secret,
        resave: !!config.get('session').store,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year I think?
            secure: false // Not using https right now
        }
    };

    const sessionMiddleware = session(sessionOptions);

    return sessionMiddleware;
}