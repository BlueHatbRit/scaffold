const Promise = require('bluebird');
const models = require('../models');

const user = {
    create: (object, options) => {
        return models.User.count().then((count) => {
            if (count <= 0) {
                // Create "staff" group and add user to it
            }

            return models.User.create(object);
        }).then(user => {
            return user.toJSON();
        });
    }
};

module.exports = user;