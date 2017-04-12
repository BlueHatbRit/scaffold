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
                // If the user is the first one created, then we add them to the
                // group created on system start up called "staff". This group
                // is created if no groups exist to ensure the first user can
                // administrate the system during setup.
                let userShouldBeStaff;

                return models.User.count().then(count => {
                    // Technically this will create a potential concurrency issue.
                    // The issue is recognised and ignored for now.
                    userShouldBeStaff = (count === 0);

                    return models.User.add(object);
                }).then(user => {
                    if (userShouldBeStaff) {
                        // Add the user to the staff group
                        return models.Group.findOne({name: 'staff'}).then(group => {
                            return modelUtils.attach(models.User, user.id, 'groups', [group]);
                        }).then(() => {
                            return models.User.findOne({id: user.id});
                        });
                    } else {
                        // Just return the user
                        return Promise.resolve(user);
                    }

                }).then(user => {
                    return user.toJSON();
                });
            }
        });
    }
};

module.exports = users;