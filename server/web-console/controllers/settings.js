const api = require("../../api");

const settings = {
  index: (req, res, next) => {
    return api.settings
      .index()
      .then(settings => {
        res.render("settings", settings);
      })
      .catch(next);
  },

  // Call via ajax
  update: (req, res, next) => {
    let object = req.body;
    if (object.settings) object = object.settings;

    return api.settings
      .update(object)
      .then(settings => {
        res.status(200).json(settings);
      })
      .catch(next);
  }
};

module.exports = settings;
