const Promise = require('bluebird');
const base = require('./base').base;
const registry = require('./base').registry;
const modelUtils = require('./utils');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const bcryptGenerateSalt = Promise.promisify(bcrypt.genSalt);
const bcryptHash = Promise.promisify(bcrypt.hash);
const bcryptCompare = Promise.promisify(bcrypt.compare);
const errors = require('../errors');

let User = base.extend({
    tableName: 'users',

    groups: function groups() {
        return this.belongsToMany('Group');
    },

    onSaving: function onSaving(user, data, options) {
        let self = this;

        if (self.isNew() || self.hasChanged('password')) {
            // Account for passwords which are all numeric which can
            // sometimes cause problems.
            self.set('password', String(self.get('password')));

            // Gen the salt
            return bcryptGenerateSalt().then(salt => {
                // Hash the password
                return bcryptHash(self.get('password'), salt);
            }).then(hash => {
                // Set password as the hashed value
                self.set('password', hash);
            });
        }
    },

    toJSON: function toJSON(options) {
        options = options || {};
        let attributes = base.prototype.toJSON.call(this, options);

        delete attributes.password;

        // Attach the groups as properties, removing some data for cosmetic
        attributes.groups = this.related('groups').toJSON();
        attributes.groups.forEach((g) => {
            delete g.created_at;
            delete g.updated_at;
            delete g._pivot_user_id;
            delete g._pivot_group_id;
        });

        attributes.is_maintainer = !!attributes.is_maintainer;
        attributes.is_owner = !!attributes.is_owner;

        return attributes;
    }
}, {
    add: function add(dataToClone, options) {
        let self = this;
        let data = _.cloneDeep(dataToClone);
        let userData = data;
        options = options || {};
        options.withRelated = _.union(options.withRelated, options.include);

        let groups = data.groups;
        delete data.groups;

        return base.add.call(self, userData, options).then(function then(addedUser) {
            userData = addedUser;

            return modelUtils.attach(User, userData.id, 'groups', groups, options);
        }).then(function then() {
            return self.findOne({id: userData.id}, options);
        });
    },

    edit: function edit(data, options) {
        let self = this;
        let userId;
        let listedGroups;

        if (data.groups) {
            listedGroups = data.groups;
            delete data.groups;
        }

        options = options || {};
        options.withRelated = _.union(options.withRelated, options.include);
        
        return base.edit.call(this, data, options).then(function then(user) {
            if (!listedGroups) {
                return user;
            }

            // For returning the model after
            userId = user.id;

            return user.groups().fetch().then(function then(currentGroups) {
                let groupsToAdd = _.difference(listedGroups, currentGroups);

                return modelUtils.attach(User, user.id, 'groups', groupsToAdd, options);
            });
        }).then(function() {
            return self.findOne({id: userId}, options);
        });
    },

    passwordIsCorrect: function passwordIsCorrect(plainPassword, hashedPassword) {
        if (!hashedPassword || !plainPassword) {
            // TODO: Replace this with a decent error system
            Promise.reject(new Error('A user password is required'));
        }

        return bcryptCompare(plainPassword, hashedPassword);
    },

    findByEmail: function findByEmail(email) {
            return User.findOne({ email: email }).then(user => {
                if (user === null) {
                    throw new errors.NotFoundError({message: 'user not found'});
                }
                return user;
            }).catch(User.NotFoundError, () => {
                throw new errors.NotFoundError({message: 'user not found'});
            });
    },

    verify: function verify(object) {
        let self = this;

        return this.findByEmail(object.email).then(user => {
            let pass = object.password;
            let hashedPass = user.get('password');

            return self.passwordIsCorrect(pass, hashedPass).then(isMatch => {
                if (isMatch) {
                    return user;
                }

                throw new errors.ForbiddenError({message: 'incorrect password'});
            });
        });
    },

    findOne: function findOne(data, options) {
        options = options || {};
        // Always get the user groups
        options.withRelated = ['groups'];

        return base.findOne.call(this, data, options);
    }
});

let Users = registry.Collection.extend({
    model: User
});

module.exports = {
    User: registry.model('User', User),
    Users: registry.collection('Users', Users)
};