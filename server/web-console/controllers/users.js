const api = require("../../api");
const errors = require("../../errors");
const settings = require("../../settings").cache;

function convertCheckboxToBool(active) {
  return active !== "undefined" && active === "on";
}

const usersController = {
  index: (req, res, next) => {
    api.users
      .index()
      .then(users => {
        res.render("users/index", {
          users: users
        });
      })
      .catch(next);
  },

  show: (req, res, next) => {
    const options = { id: req.params.id };

    api.users
      .show(options)
      .then(user => {
        res.render("users/show", user);
      })
      .catch(next);
  },

  new: (req, res) => {
    const termsExist = !!settings.get("terms");
    res.render("signup", { termsExist: termsExist });
  },

  create: (req, res, next) => {
    const newUser = req.body;

    if (newUser.password !== newUser.confirmPassword) {
      // Reject as the passwords are different
      req.flash("error", "Passwords don't match");

      return res.redirect("/signup");
    }

    delete newUser.confirmPassword;
    return api.users
      .create(newUser)
      .then(user => {
        req.flash("success", "Account created, you can now log in");

        res.redirect("/");
      })
      .catch(errors.ConflictError, err => {
        req.flash("error", "It seems that email is already in use");

        res.redirect("/signup");
      })
      .catch(next);
  },

  update: (req, res, next) => {
    const updatedUser = req.body;
    updatedUser.id = req.params.id;

    updatedUser.is_owner = convertCheckboxToBool(updatedUser.is_owner);
    updatedUser.is_maintainer = convertCheckboxToBool(
      updatedUser.is_maintainer
    );

    return api.users
      .update(updatedUser, { id: updatedUser.id })
      .then(user => {
        // Update the session
        req.session.isMaintainer = user.is_maintainer;
        req.session.isOwner = user.is_owner;

        req.flash("success", "User successfuly updated");
        return res.redirect(`/users/${user.id}`);
      })
      .catch(next);
  }
};

module.exports = usersController;
