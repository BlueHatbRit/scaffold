const Promise = require('bluebird');
const models = require('../models');
const modelUtils = require('../models/utils');
const errors = require('../errors');

const users = {
    index: (options) => {
        return models.User.fetchAll().then(users => {
            return users.toJSON();
        });
    },

    show: (options) => {
        return models.User.findOne(options).then(user => {
            return user.toJSON();
        });
    },

    create: (object, options) => {
        // Check if the email is already reigstered
        return models.User.findOne({email: object.email}).then(userAlreadyExists => {
            if (userAlreadyExists) {
                throw new errors.ConflictError({message: 'email already in use'});
            } else {

                return models.User.count().then(count => {
                    // If this is the first user then we'll make them a maintainer
                    // and owner automatically for easy setup.
                    if (count === 0) {
                        object.is_owner = true;
                        object.is_maintainer = true;
                    }

                    return models.User.add(object);
                }).then(user => {
                    return user.toJSON();
                });
            }
        });
    },

    update: function(object, options) {
        return models.User.edit(object, options).then(user => {
            return user.toJSON();
        });
    }
};

module.exports = users;