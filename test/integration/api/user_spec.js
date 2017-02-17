const should = require('should');
const utils = require('../../utils');
const api = require('../../../server/api');

describe('User API', () => {
    before(utils.initModels);

    beforeEach(utils.initDb);
    afterEach(utils.teardownDb);

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

            api.user.create(firstUser).then(userOne => {
                
                api.user.create(secondUser).should.be.rejected().then((err) => {
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

            api.user.create(newUser).then(user => {
                should.not.exist(user.password, 'password was removed');

                done();
            });
        });
    });
});