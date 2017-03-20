const should = require('should');
const utilities = require('../../utilities');
const fixtures = utilities.fixtures;
const api = require('../../../server/api');

describe('Web Sessions API', () => {
    before(utilities.initModels);

    beforeEach(utilities.teardownDb);
    beforeEach(utilities.initDb);
    beforeEach(utilities.runApiInit);
    
    afterEach(utilities.teardownDb);

    describe('Log in', () => {
        it('Returns the userId and isStaff status', done => {
            // Create a user account to log in with
            api.users.create(fixtures.user).then(user => {

                // Create a web-session
                api.webSession.create(fixtures.user).then(userData => {
                    should.exist(userData.userId);
                    userData.userId.should.be.a.String();

                    should.exist(userData.isStaff);
                    userData.isStaff.should.be.a.Boolean();

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

                api.webSession.create(incorrectPasswordUser).should.be.rejected().then(err => {
                    err.message.should.equal('User not found');

                    done();
                });
            }).done();
        });
    });
});