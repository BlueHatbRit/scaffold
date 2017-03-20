const Promise = require('bluebird');
const _ = require('lodash');
const models = require('../models');

const webSession = {
    create: (object, options) => {
        // Todo: Validate Object

        // Verify the user
        return models.User.verify(object).then(user => {

            const userJson = user.toJSON();
            
            const groups = _.map(userJson.groups, 'name');
            const isStaff = _.includes(groups, 'staff');

            return {
                userId: user.id,
                isStaff: isStaff
            };
        });
    }
};

module.exports = webSession;