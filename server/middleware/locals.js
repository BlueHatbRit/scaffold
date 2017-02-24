const api = require('../api');

module.exports = function() {
    return function(req, res, next) {
        res.locals.isLoggedIn = !!req.session.userId;
        res.locals.isStaff = !!req.session.isStaff;

        next();
    };
}