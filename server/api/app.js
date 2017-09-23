const express = require("express");
const bodyParser = require("body-parser");
const errorHandlers = require("../middleware").errorHandlers;
const auth = require("../middleware").auth;
const api = require("../api");

function initRoutes() {
  const router = express.Router();

  router.get("/status", (req, res, next) => {
    res.send({ status: "operational" }).end();
  });

  router.post("/users", api.http(api.users.create));

  router.post("/sessions", api.http(api.sessions.create));

  router.get("/flags/:name", auth, api.http(api.flags.showAccess));
  router.get("/flags", auth, api.http(api.flags.indexAccess));

  router.get("/settings", api.http(api.settings.index));

  return router;
}

module.exports = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(initRoutes());

  // Error handling
  app.use(errorHandlers.pageNotFound);
  app.use(errorHandlers.handleJSONResponse);

  return app;
};
