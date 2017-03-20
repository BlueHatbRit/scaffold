const should = require('should');
const utilities = require('../../utilities');
const api = require('../../../server/api');
const fixtures = utilities.fixtures;

describe('Flags API', () => {
    before(utilities.initModels);

    beforeEach(utilities.teardownDb);
    beforeEach(utilities.initDb);
    beforeEach(utilities.runApiInit);

    afterEach(utilities.teardownDb);

    describe('Index', () => {
        it('returns an array of results', done => {
            // Create two flags
            api.flags.create(fixtures.flag).then(flag => {
                return api.flags.create(fixtures.flagTwo);
            }).then(flagTwo => {

                // Index all flags
                return api.flags.index();
            }).then(allFlags => {
                allFlags.should.be.instanceof(Array).and.have.lengthOf(2);

                done();
            }).catch(done);
        });

        it('returns an empty array if none exist', done => {
            api.flags.index().then(allFlags => {
                allFlags.should.be.instanceof(Array).and.have.lengthOf(0);

                done();
            }).catch(done);
        });
    });

    describe('Show', () => {
        it('if a record exists then return it', done => {
            let options;

            api.flags.create(fixtures.flag).then(flag => {
                options =  {
                    id: flag.id
                };

                return api.flags.show(options);
            }).then(flag => {
                should.exist(flag);
                should.exist(flag.created_at);
                should.exist(flag.updated_at);

                flag.id.should.equal(options.id);
                flag.name.should.equal(fixtures.flag.name);
                flag.description.should.equal(fixtures.flag.description);
                
                done();
            }).catch(done);
        });

        it('returns not found error if record does not exist', done => {
            const options = {
                id: '12345'
            };

            api.flags.show(options).should.be.rejected().then(err => {
                err.statusCode.should.equal(404);
                err.errorType.should.equal('NotFoundError');
                err.message.should.equal('flag not found');

                done();
            });
        });
    });

    describe('Show Access', () => {
        it('should return false when flag is not active', done => {
            // Create a flag
            api.flags.create(fixtures.flag).then(flag => {
                
                // Check flag access is denied
                api.flags.showAccess({id: flag.id}).then(flagAccess => {
                    flagAccess.accessible.should.be.false();

                    done();
                }).catch(done);
            }).catch(done);
        });

        it('should return true when flag is active', done => {
            let newFlag = fixtures.flag;
            newFlag.active = true;

            // Create a flag
            api.flags.create(newFlag).then(flag => {
                
                // Check flag access is denied
                api.flags.showAccess({id: flag.id}).then(flagAccess => {
                    flagAccess.accessible.should.be.true();

                    done();
                }).catch(done);
            }).catch(done);
        });
    });

    describe('Create', () => {
        
    })
});