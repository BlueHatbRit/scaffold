const express = require("express");
const hbs = require("express-hbs");
const bodyPareser = require("body-parser");
const flash = require("express-flash");
const path = require("path");
const webAuth = require("../middleware").webAuth;
const locals = require("../middleware").locals;
const errorHandlers = require("../middleware").errorHandlers;
const helpers = require("./helpers");
const favicon = require("serve-favicon");

module.exports = () => {
  const app = express();

  app.use(bodyPareser.json());
  app.use(bodyPareser.urlencoded({ extended: true }));

  app.use(webAuth.sessionCookies());
  app.use(flash());
  app.use(locals());

  app.engine(
    "hbs",
    hbs.express4({
      partialsDir: __dirname + "/views/partials"
    })
  );
  app.set("view engine", "hbs");
  app.set("views", __dirname + "/views");

  // Load helpers
  helpers.load();

  // Favicon
  app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

  // Used for front-end css, js, etc
  app.use("/static", express.static(path.join(__dirname, "static")));

  // Add the routes
  app.use(require("./routes")());

  // Error handling
  app.use(errorHandlers.pageNotFound);
  app.use(errorHandlers.handleHTMLResponse);

  return app;
};
