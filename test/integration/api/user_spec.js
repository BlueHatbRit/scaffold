const should = require('should');
const utilities = require('../../utilities');
const api = require('../../../server/api');

describe('User API', () => {
    before(utilities.initModels);

    beforeEach(utilities.teardownDb);
    beforeEach(utilities.initDb);
    beforeEach(utilities.runApiInit);

    afterEach(utilities.teardownDb);

    describe('Registration', () => {
        it('email must be unique', done => {
            const email = 'test@vintus.com';
            let firstUser = {
                email: email,
                password: 'password123456'
            };

            let secondUser = {
                email: email,
                password: 'supersecretpassword'
            };

            api.users.create(firstUser).then(userOne => {
                
                api.users.create(secondUser).should.be.rejected().then((err) => {
                    // TODO: Add some assertions to the err
                    done();
                });
            }).catch(done);
        });

        it("doesn't return the password", done => {
            let newUser = {
                email: 'test@vintus.com',
                password: 'supersecretpassword'
            };

            api.users.create(newUser).then(user => {
                should.not.exist(user.password, 'password was removed');

                done();
            }).catch(done);
        });

        it('if first user, add to staff group', done => {
            let newUser = {
                email: 'test@vintus.com',
                password: 'supersecretpassword'
            };

            api.users.create(newUser).then(user => {
                should.exist(user.groups);
                user.groups.should.be.an.Array();
                user.groups[0].name.should.equal('staff');

                done();
            }).catch(done);
        });

        it('if not first user, do not add to any groups', done => {
            let firstUser = {
                email: 'test@vintus.com',
                password: 'supersecretpassword'
            };

            let secondUser = {
                email: 'test2@vintus.com',
                password: 'pa55word'
            };

            api.users.create(firstUser).then(user => {
                return api.users.create(secondUser);
            }).then(user => {
                should.exist(user.groups);
                user.groups.should.be.an.Array();
                user.groups.should.have.length(0, 'user has no groups');

                done();
            }).catch(done);
        });
    });
});