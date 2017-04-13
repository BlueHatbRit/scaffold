const hbs = require('express-hbs');

module.exports.load = function load() {
    hbs.registerHelper('length', require('./length'));
    hbs.registerHelper('boolToCheckbox', require('./boolToCheckbox'));
};