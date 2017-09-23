const api = require("../api");

module.exports = function() {
  return function(req, res, next) {
    res.locals.isLoggedIn = !!req.session.userId;

    // Owners can access everything a maintainer can
    res.locals.isOwner = req.session.isOwner;
    res.locals.isMaintainer = req.session.isMaintainer || req.session.isOwner;

    next();
  };
};
