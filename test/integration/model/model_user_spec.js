const should = require('should');
const utils = require('../../utils');
const models = require('../../../server/models');

describe('User Model', () => {
    before(models.init);

    beforeEach(utils.initDb);
    afterEach(utils.teardownDb);

    describe('Creation', () => {
        it('hashes password', (done) => {
            const newUser = {
                email: 'test@vintus.com',
                password: 'supersecretpassword'
            };

            models.User.create(newUser).then((user) => {
                user.attributes.password.should.not.equal(newUser.password, 'password was hashed');

                done();
            }).catch(done);
        });

        it('saves user', (done) => {
            const newUser = {
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
        });
    });

    describe('to JSON', () => {
        it("doesn't include password", done => {
            const newUser = {
                email: 'test@vintus.com',
                password: 'supersecretpassword'
            };

            models.User.create(newUser).then(user => {
                const userAsJson = user.toJSON();
                should.not.exist(userAsJson.password, 'password was removed');

                done();
            });
        });
    });

    describe('Verify', () => {
        it('succeeds when given correct password', done => {
            const newUser = {
                email: 'test@vintus.com',
                password: 'supersecretpassword'
            };

            models.User.create(newUser).then(user => {

                return models.User.verify(newUser);
            }).then(user => {
                user.attributes.email.should.equal(newUser.email);

                done();
            }).catch(done);
        });

        it('fails when given incorrect password', done => {
            const newUser = {
                email: 'test@vintus.com',
                password: 'supersecretpassword'
            };

            const incorrectUser = {
                email: newUser.email,
                password: 'anincorrectpassword'
            };

            models.User.create(newUser).then(user => {
                
                models.User.verify(incorrectUser).should.be.rejected().then(err => {
                    // TODO: Add some assertions to the err
                    done();
                });
            }).catch(done);
        });

        it('fails when given incorrect email', done => {
            const newUser = {
                email: 'test@vintus.com',
                password: 'supersecretpassword'
            };

            const incorrectUser = {
                email: 'incorrect@vintus.com',
                password: newUser.password
            };

            models.User.create(newUser).then(user => {
                
                models.User.verify(incorrectUser).should.be.rejected().then(err => {
                    // TODO: Add some assertions to the err
                    done();
                });
            }).catch(done);
        });
    });
});