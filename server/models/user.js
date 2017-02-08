const Promise = require('bluebird');
const base = require('./base').base;
const registry = require('./base').registry;
const bcrypt = require('bcrypt');
const bcryptGenerateSalt = Promise.promisify(bcrypt.genSalt);
const bcryptHash = Promise.promisify(bcrypt.hash);
const bcryptCompare = Promise.promisify(bcrypt.compare);

let User = base.extend({
    tableName: 'users',

    /*validate: {
        email: Joi.string().email().max(254),
        password: Joi.string().min(8).max(60)
    }*/

    onSaving: function onSaving(user, data, options) {
        let self = this;

        if (self.isNew()) {
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

        return attributes;
    }
}, {
    passwordIsCorrect: function passwordIsCorrect(plainPassword, hashedPassword) {
        if (!hashedPassword || !plainPassword) {
            // TODO: Replace this with a decent error system
            Promise.reject(new Error('A user password is required'));
        }

        return bcryptCompare(plainPassword, hashedPassword);
    },

    findByEmail: function findByEmail(email) {
        return new Promise((resolve, reject) => {
            User.findOne({ email: email }).then(user => {
                resolve(user);
            }).catch(User.NotFoundError, () => {
                reject(new Error('User not found'));
            });
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

                // Passwords don't match so return a 401 thing
                let err = new Error('password incorrect');
                return Promise.reject(err);
            }).catch(err => {
                return Promise.reject(err);
            });
        }).catch(err => {
            return Promise.reject(err);
        });
    }
});

module.exports = {
    User: registry.model('User', User)
};