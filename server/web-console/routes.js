const express = require("express");
const controllers = require("./controllers");
const middleware = require("../middleware");

const maintainerOnly = middleware.webAuth.maintainerOnly;
const ownerOnly = middleware.webAuth.ownersOnly;

const frontendRoutes = function frontendRoutes() {
  let router = express.Router();

  router.get("/signup", controllers.users.new);
  router.post("/signup", controllers.users.create);
  router.get("/login", controllers.sessions.new);
  router.post("/login", controllers.sessions.create);

  router.get("/users", maintainerOnly, controllers.users.index);
  router.get("/users/:id", maintainerOnly, controllers.users.show);
  router.post("/users/:id", maintainerOnly, controllers.users.update);

  router.get("/logout", controllers.sessions.destroy);

  router.get("/settings", ownerOnly, controllers.settings.index);
  router.put("/settings", ownerOnly, controllers.settings.update);

  router.delete(
    "/groups/:group_id/users/:user_id",
    maintainerOnly,
    controllers.groups.users.destroy
  );
  router.get(
    "/groups/:id/users/new",
    maintainerOnly,
    controllers.groups.users.new
  );
  router.post(
    "/groups/:id/users",
    maintainerOnly,
    controllers.groups.users.create
  );
  router.get("/groups/new", maintainerOnly, controllers.groups.new);
  router.get("/groups/:id", maintainerOnly, controllers.groups.show);
  router.delete("/groups/:id", maintainerOnly, controllers.groups.destroy);
  router.post("/groups", maintainerOnly, controllers.groups.create);
  router.get("/groups", maintainerOnly, controllers.groups.index);

  router.get("/flags", maintainerOnly, controllers.flags.index);
  router.post("/flags", maintainerOnly, controllers.flags.create);
  router.get("/flags/new", maintainerOnly, controllers.flags.new);
  router.get("/flags/:id/edit", maintainerOnly, controllers.flags.edit);
  router.post("/flags/:id", maintainerOnly, controllers.flags.update);
  router.get(
    "/flags/:id/groups/new",
    maintainerOnly,
    controllers.flags.groups.new
  );
  router.post(
    "/flags/:id/groups",
    maintainerOnly,
    controllers.flags.groups.create
  );
  router.delete("/flags/:name", maintainerOnly, controllers.flags.destroy);

  router.get("/terms", controllers.infoPages.terms);
  router.get("/", controllers.infoPages.index);

  return router;
};

module.exports = frontendRoutes;
