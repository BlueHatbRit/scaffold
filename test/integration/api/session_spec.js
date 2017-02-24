const Promise = require('bluebird');
const should = require('should');
const utilities = require('../../utilities');
const fixtures = utilities.fixtures;
const api = require('../../../server/api');
const config = require('../../../server/config');
const jwt = require('jsonwebtoken');
const jwtVerifyAsync = Promise.promisify(jwt.verify);

describe('Session API', () => {
    before(utilities.initModels);

    beforeEach(utilities.teardownDb);
    beforeEach(utilities.initDb);
    beforeEach(utilities.runApiInit);
    
    afterEach(utilities.teardownDb);

    describe('Log in', () => {
        it('Returns a json web token', done => {
            // Create a user to make a session for
            api.users.create(fixtures.user).then(user => {
                // Make the session
                api.sessions.create(fixtures.user).then(token => {

                    // Verify the token is a JWT token
                    jwtVerifyAsync(token, config.get('auth').secret).then(decoded => {
                        decoded.user.email.should.equal(fixtures.user.email);

                        done();
                    }).catch(done);
                }).catch(done);
            }).catch(done);
        });

        it('Throws error if password is incorrect', done => {
            api.users.create(fixtures.user).then(user => {
                const incorrectPasswordUser = {
                    email: fixtures.user.email,
                    password: 'incorrect'
                };

                api.sessions.create(incorrectPasswordUser).should.be.rejected().then(err => {
                    err.message.should.equal('password incorrect');

                    done();
                });
            }).done();
        });

        it('Throws error if email is incorrect', done => {
            api.users.create(fixtures.user).then(user => {
                const incorrectPasswordUser = {
                    email: 'wrong@vintus.com',
                    password: fixtures.user.password
                };

                api.sessions.create(incorrectPasswordUser).should.be.rejected().then(err => {
                    err.message.should.equal('User not found');

                    done();
                });
            }).done();
        });
    });
});