const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const config = require("../config");
const errors = require("../errors");

const sessionCookies = function() {
  let sessionOptions = {
    store: new RedisStore(config.get("session").store),
    secret: config.get("session").secret,
    resave: !!config.get("session").store,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
      secure: false // Not using https right now
    }
  };

  const sessionMiddleware = session(sessionOptions);

  return sessionMiddleware;
};

const maintainerOnly = (req, res, next) => {
  let hasSession = !!req.session.id;
  // Owners can access everything maintainers can
  let hasAccess = req.session.isMaintainer || req.session.isOwner;

  if (!hasSession || !hasAccess) {
    throw new errors.NotFoundError({ message: "resource not found" });
  } else {
    next();
  }
};

const ownersOnly = (req, res, next) => {
  let hasSession = !!req.session.id;
  let hasAccess = req.session.isOwner;

  if (!hasSession || !hasAccess) {
    throw new errors.NotFoundError({ message: "resource not found" });
  } else {
    next();
  }
};

module.exports = {
  sessionCookies: sessionCookies,
  maintainerOnly: maintainerOnly,
  ownersOnly: ownersOnly
};
