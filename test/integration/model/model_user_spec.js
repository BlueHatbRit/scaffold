const should = require('should');
const utils = require('../../utils');
const models = require('../../../server/models');

describe('User Model', () => {
    before(models.init);

    beforeEach(utils.initDb);
    afterEach(utils.teardownDb);

    describe('Registration', () => {
        it('password hashed on creation', (done) => {
            let newUser = {
                email: 'test@vintus.com',
                password: 'supersecretpassword'
            };

            models.User.create(newUser).then((user) => {
                user.attributes.password.should.not.equal(newUser.password, 'password was hashed');

                done();
            }).catch(done);
        });

        it('saves user', (done) => {
            let newUser = {
                email: 'test@vintus.com',
                password: 'supersecretpassword'
            };
            let startingCount;

            models.User.count().then(count => {
                startingCount = count;

                return models.User.create(newUser);
            }).then(user => {
                return models.User.count();
            }).then(count => {
                count.should.equal(startingCount + 1, 'user saved');

                done();
            }).catch(done);
        })
    })
});