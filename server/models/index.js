const _ = require('lodash');
var exports = module.exports;

const models = [
    'user',
    'group',
    'flag',
    'setting'
];

exports.init = function() {
    // Base model
    exports.Base = require('./base');

    // All concrete models
    models.forEach((name) => {
        _.extend(exports, require('./' + name));
    });
};