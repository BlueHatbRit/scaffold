const Promise = require('bluebird');
const models = require('../models');

const user = {
    create: (object, options) => {
        return models.User.count().then((count) => {
            // If this is our first user created, make it a "staff" account
            // otherwise default to non-staff.
            if (count <= 0) {
                object.isStaff = true;
            } else {
                object.isStaff = false;
            }

            return models.User.create(object);
        });
    }
};

module.exports = user;