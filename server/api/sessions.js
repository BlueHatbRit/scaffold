const Promise = require('bluebird');
const models = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');

const sessions = {
    create: (object, options) => {
        // Verify the user
        return models.User.verify(object).then(user => {

            const token = jwt.sign({user: user}, config.get('auth').secret);
            return token;
        });
    }
};

module.exports = sessions;