const api = require('../../../server/api');

const user = {
    email: 'test@vintus.com',
    password: 'pa55word'
};

const userTwo = {
    email: 'test2@vintus.com',
    password: 'supersecret'
};

const nonActiveFlag = {
    name: 'secret-feature',
    description: 'A secret feature no one should have access to yet',
    active: false,
    population_percentage: 0
};

const activeFlag = {
    name: 'in-dev-feature',
    description: "A feature that's currently in development",
    active: true,
    population_percentage: 0
};

const group = {
    name: 'beta-testers',
    description: 'Our beta testing pool'
};

const create = {
    user: function user(fixture, options) {
        return api.users.create(fixture, options);
    },

    flag: function flag(fixture, options) {
        return api.flags.create(fixture, options);
    },

    group: function group(fixture, options) {
        return api.groups.create(fixture, options);
    },

    flagWithGroup: function flagWithGroup(flag, group) {
        const options = {
            withRelated: ['groups']
        };

        let createdFlag;
        return create.flag(flag, options).then(newFlag => {
            createdFlag = newFlag;

            return create.group(group);
        }).then(newGroup => {
            let obj = {
                id: createdFlag.id,
                group_name: newGroup.name
            };

            return api.flags.groups.create(obj, options);
        });
    }
};

module.exports = {
    user: user,
    userTwo: userTwo,
    nonActiveFlag: nonActiveFlag,
    activeFlag: activeFlag,
    group: group,
    create: create
};