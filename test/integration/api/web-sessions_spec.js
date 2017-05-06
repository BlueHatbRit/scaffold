const should = require('should');
const utilities = require('../../utilities');
const fixtures = utilities.fixtures;
const api = require('../../../server/api');
const errors = require('../../../server/errors');

describe('Web Sessions API', () => {
    before(utilities.initModels);

    beforeEach(utilities.teardownDb);
    beforeEach(utilities.initDb);
    
    afterEach(utilities.teardownDb);

    describe('Log in', () => {
        it('Returns the session details status', done => {
            // Create a user account to log in with
            api.users.create(fixtures.user).then(user => {

                // Create a web-session
                api.webSession.create(fixtures.user).then(userData => {
                    should.exist(userData.userId);
                    userData.userId.should.be.a.String();

                    should.exist(userData.isOwner);
                    userData.isOwner.should.be.a.Boolean();

                    should.exist(userData.isMaintainer);
                    userData.isMaintainer.should.be.a.Boolean();

                    done();
                }).catch(done);
            }).catch(done);
        });

        it('Throws error if password is incorrect', done => {
            api.users.create(fixtures.user).then(user => {
                const incorrectPasswordUser = {
                    email: fixtures.user.email,
                    password: 'incorrect'
                };

                api.webSession.create(incorrectPasswordUser).should.be.rejected().then(err => {
                    err.should.be.instanceOf(errors.ForbiddenError);
                    err.message.should.equal('incorrect password');

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

                api.webSession.create(incorrectPasswordUser).should.be.rejected().then(err => {
                    err.message.should.equal('user not found');

                    done();
                });
            }).done();
        });
    });
});