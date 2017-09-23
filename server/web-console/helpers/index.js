const hbs = require("express-hbs");

module.exports.load = function load() {
  hbs.registerHelper("length", require("./length"));
  hbs.registerHelper("boolToCheckbox", require("./bool-to-checkbox"));
  hbs.registerHelper("siteName", require("./site-name"));
  hbs.registerHelper("injectHtml", require("./inject-html"));
};
