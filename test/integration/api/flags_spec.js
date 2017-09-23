const should = require("should");
const utilities = require("../../utilities");
const api = require("../../../server/api");
const fixtures = utilities.fixtures;

describe("Flags API", () => {
  before(utilities.initModels);

  beforeEach(utilities.teardownDb);
  beforeEach(utilities.initDb);

  afterEach(utilities.teardownDb);

  describe("Index", () => {
    it("returns an array of results", done => {
      // Create two flags
      api.flags
        .create(fixtures.nonActiveFlag)
        .then(flag => {
          return api.flags.create(fixtures.activeFlag);
        })
        .then(flagTwo => {
          // Index all flags
          return api.flags.index();
        })
        .then(allFlags => {
          allFlags.should.be.instanceof(Array).and.have.lengthOf(2);

          done();
        })
        .catch(done);
    });

    it("returns an empty array if none exist", done => {
      api.flags
        .index()
        .then(allFlags => {
          allFlags.should.be.instanceof(Array).and.have.lengthOf(0);

          done();
        })
        .catch(done);
    });
  });

  describe("Show", () => {
    it("if a record exists then return it", done => {
      let options;

      api.flags
        .create(fixtures.nonActiveFlag)
        .then(flag => {
          options = {
            id: flag.id
          };

          return api.flags.show(options);
        })
        .then(flag => {
          should.exist(flag);
          should.exist(flag.created_at);
          should.exist(flag.updated_at);

          flag.id.should.equal(options.id);
          flag.name.should.equal(fixtures.nonActiveFlag.name);
          flag.description.should.equal(fixtures.nonActiveFlag.description);

          done();
        })
        .catch(done);
    });

    it("returns not found error if record does not exist", done => {
      const options = {
        id: "12345"
      };

      api.flags
        .show(options)
        .should.be.rejected()
        .then(err => {
          err.statusCode.should.equal(404);
          err.errorType.should.equal("NotFoundError");
          err.message.should.equal("flag not found");

          done();
        });
    });
  });

  // The following are all of the access tests,
  // they're quite complex and describe the accessibility
  // of a flag dependant on a user.
  describe("Show Access", () => {
    it("should return flag object with accessible field", done => {
      // Create a user
      let user;
      fixtures.create
        .user(fixtures.user)
        .then(newUser => {
          user = newUser;

          // Create a flag
          return fixtures.create.flag(fixtures.nonActiveFlag);
        })
        .then(flag => {
          // When requesting access, pass the user
          // and flag
          const object = {
            id: flag.id,
            user: user
          };

          return api.flags.showAccess(object);
        })
        .then(flag => {
          flag.id.should.be.a.String();
          flag.name.should.equal(flag.name);
          flag.description.should.equal(flag.description);
          flag.accessible.should.be.a.Boolean();
          should.exist(flag.created_at);
          should.exist(flag.updated_at);

          done();
        })
        .catch(done);
    });

    it("should return false when flag is not active", done => {
      let user;
      fixtures.create
        .user(fixtures.user)
        .then(newUser => {
          user = newUser; // need the id
          return fixtures.create.flag(fixtures.nonActiveFlag);
        })
        .then(flag => {
          // When requesting access, pass the user
          // and flag
          const object = {
            id: flag.id,
            user: user
          };

          return api.flags.showAccess(object);
        })
        .then(flag => {
          flag.accessible.should.be.false();

          done();
        })
        .catch(done);
    });

    it("should return false when not active, despite group access", done => {
      let flag;
      let group;
      // The flag will NOT be active
      fixtures.create
        .flagWithGroup(fixtures.nonActiveFlag, fixtures.group)
        .then(newFlag => {
          flag = newFlag;
          group = newFlag.groups[0];

          // Create a user
          return fixtures.create.user(fixtures.user);
        })
        .then(user => {
          const obj = {
            email: user.email,
            group_id: group.id
          };

          // Put the user in the group
          return api.groups.users.create(obj);
        })
        .then(user => {
          // Check users access to the deactivated flag
          const obj = {
            name: flag.name,
            user: user
          };

          return api.flags.showAccess(obj);
        })
        .then(flagWithAccess => {
          // Flag access is false despite having access via the group
          flagWithAccess.accessible.should.be.false();

          done();
        })
        .catch(done);
    });

    it("should return true when active and user has group access", done => {
      let flag;
      let group;

      // The flag WILL be active
      fixtures.create
        .flagWithGroup(fixtures.activeFlag, fixtures.group)
        .then(newFlag => {
          flag = newFlag;
          group = newFlag.groups[0];

          // Create a user
          return fixtures.create.user(fixtures.user);
        })
        .then(user => {
          const obj = {
            email: user.email,
            group_id: group.id
          };

          // Put the user in the group
          return api.groups.users.create(obj);
        })
        .then(user => {
          // Check users access to the deactivated flag
          const obj = {
            name: flag.name,
            user: user
          };

          return api.flags.showAccess(obj);
        })
        .then(flagWithAccess => {
          // Flag access is false despite having access via the group
          flagWithAccess.accessible.should.be.true();

          done();
        });
    });

    it("should return false when active and user does not have group access", done => {
      let flag;
      let group;
      fixtures.create
        .flagWithGroup(fixtures.nonActiveFlag, fixtures.group)
        .then(newFlag => {
          flag = newFlag;
          group = newFlag.groups[0];

          return fixtures.create.user(fixtures.user);
        })
        .then(user => {
          const obj = {
            name: flag.name,
            user: user
          };

          // Check users access to the flag
          return api.flags.showAccess(obj);
        })
        .then(flagWithAccess => {
          // Flag access is false because the user is not in the group.
          flagWithAccess.accessible.should.be.false();

          done();
        })
        .catch(done);
    });
  });

  describe("Grant group access", () => {
    it("returns the flag and related group", done => {
      let flag;
      let group;
      fixtures.create
        .flag(fixtures.nonActiveFlag)
        .then(newFlag => {
          flag = newFlag;

          return fixtures.create.group(fixtures.group);
        })
        .then(newGroup => {
          group = newGroup;

          // Grant the access
          const obj = {
            id: flag.id,
            group_name: group.name
          };
          const options = {
            withRelated: ["groups"]
          };
          return api.flags.groups.create(obj, options);
        })
        .then(flagWithGroup => {
          flagWithGroup.id.should.equal(flag.id);

          flagWithGroup.groups.length.should.equal(1);
          flagWithGroup.groups[0].id.should.equal(group.id);
          flagWithGroup.groups[0].name.should.equal(group.name);
          flagWithGroup.groups[0].description.should.equal(group.description);

          done();
        })
        .catch(done);
    });
  });

  describe("Create", () => {
    it("should return the flag object", done => {
      const flagToCreate = fixtures.nonActiveFlag;

      api.flags
        .create(flagToCreate)
        .then(flag => {
          flag.id.should.be.a.String();
          flag.name.should.equal(flagToCreate.name);
          flag.description.should.equal(flagToCreate.description);

          flag.active.should.be.a.Boolean();
          flag.active.should.equal(flagToCreate.active);

          flag.population_percentage.should.be.a.Number();
          flag.population_percentage.should.equal(
            flagToCreate.population_percentage
          );

          should.exist(flag.created_at);
          should.exist(flag.updated_at);

          done();
        })
        .catch(done);
    });
  });
});
