const should = require("should");
const utilities = require("../../utilities");
const fixtures = utilities.fixtures;
const models = require("../../../server/models");

describe("User Model", () => {
  before(utilities.initModels);

  beforeEach(utilities.initDb);
  afterEach(utilities.teardownDb);

  describe("Creation", () => {
    it("hashes password", done => {
      models.User
        .create(fixtures.user)
        .then(user => {
          user.attributes.password.should.not.equal(
            fixtures.user.password,
            "password was hashed"
          );

          done();
        })
        .catch(done);
    });

    it("saves user", done => {
      let startingCount;

      models.User
        .count()
        .then(count => {
          startingCount = count;

          return models.User.create(fixtures.user);
        })
        .then(user => {
          return models.User.count();
        })
        .then(count => {
          count.should.equal(startingCount + 1, "user saved");

          done();
        })
        .catch(done);
    });
  });

  describe("to JSON", () => {
    it("doesn't include password", done => {
      models.User.create(fixtures.user).then(user => {
        const userAsJson = user.toJSON();
        should.not.exist(userAsJson.password, "password was removed");

        done();
      });
    });
  });

  describe("Verify", () => {
    it("succeeds when given correct password", done => {
      models.User
        .create(fixtures.user)
        .then(user => {
          return models.User.verify(fixtures.user);
        })
        .then(user => {
          user.attributes.email.should.equal(fixtures.user.email);

          done();
        })
        .catch(done);
    });

    it("fails when given incorrect password", done => {
      const incorrectUser = {
        email: fixtures.user,
        password: "anincorrectpassword"
      };

      models.User
        .create(fixtures.user)
        .then(user => {
          models.User
            .verify(incorrectUser)
            .should.be.rejected()
            .then(err => {
              // TODO: Add some assertions to the err
              done();
            });
        })
        .catch(done);
    });

    it("fails when given incorrect email", done => {
      const incorrectUser = {
        email: "incorrect@vintus.com",
        password: fixtures.user.password
      };

      models.User
        .create(fixtures.user)
        .then(user => {
          models.User
            .verify(incorrectUser)
            .should.be.rejected()
            .then(err => {
              // TODO: Add some assertions to the err
              done();
            });
        })
        .catch(done);
    });
  });
});
