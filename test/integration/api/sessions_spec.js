const Promise = require('bluebird');
const should = require('should');
const utilities = require('../../utilities');
const fixtures = utilities.fixtures;
const api = require('../../../server/api');
const config = require('../../../server/config');
const errors = require('../../../server/errors');
const jwt = require('jsonwebtoken');
const jwtVerifyAsync = Promise.promisify(jwt.verify);

describe('Sessions API', () => {
    before(utilities.initModels);

    beforeEach(utilities.teardownDb);
    beforeEach(utilities.initDb);
    beforeEach(utilities.runApiInit);
    
    afterEach(utilities.teardownDb);

    describe('Log in', () => {
        it('returns a json web token', done => {
            // Create a user to make a session for
            api.users.create(fixtures.user).then(user => {
                // Make the session
                api.sessions.create(fixtures.user).then(authResponse => {
                    should.exist(authResponse.token);
                    
                    // Verify the token is a JWT token
                    jwtVerifyAsync(authResponse.token, config.get('auth').secret).then(decoded => {
                        decoded.user.email.should.equal(fixtures.user.email);

                        done();
                    }).catch(done);
                }).catch(done);
            }).catch(done);
        });

        it('throws error if password is incorrect', done => {
            api.users.create(fixtures.user).then(user => {
                const incorrectPasswordUser = {
                    email: fixtures.user.email,
                    password: 'incorrect'
                };

                api.sessions.create(incorrectPasswordUser).should.be.rejected().then(err => {
                    err.should.be.instanceOf(errors.ForbiddenError);
                    err.message.should.equal('incorrect password');

                    done();
                });
            }).catch(done);
        });

        it('throws error if email is incorrect', done => {
            api.users.create(fixtures.user).then(user => {
                const incorrectPasswordUser = {
                    email: 'wrong@vintus.com',
                    password: fixtures.user.password
                };

                api.sessions.create(incorrectPasswordUser).should.be.rejected().then(err => {
                    err.should.be.instanceOf(errors.NotFoundError);
                    err.message.should.equal('user not found');

                    done();
                });
            }).catch(done);
        });
    });
});