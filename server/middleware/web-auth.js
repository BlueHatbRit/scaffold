const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('../config');

module.exports = function() {
    let sessionOptions = {
        secret: config.get('session').secret,
        resave: !!config.get('session').store,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year I think?
            secure: false // Not using https right now
        }
    };

    // If the session store details have been defined, use them.
    // We don't define them for travis.
    if (config.get('session').store) {
        sessionOptions.store = new RedisStore(config.get('session').store);
    }

    const sessionMiddleware = session(sessionOptions);

    return sessionMiddleware;
}