const _ = require("lodash");
const Promise = require("bluebird");
const ObjectId = require("bson-objectid");
const errors = require("../../errors");

const attach = function attach(
  Model,
  effectedModelId,
  relation,
  modelsToAttach,
  options
) {
  options = options || {};

  let fetchedModel;
  let localOptions = { transacting: options.transacting };

  return Model.forge({ id: effectedModelId })
    .fetch(localOptions)
    .then(function successfulFetch(_fetchedModel) {
      fetchedModel = _fetchedModel;

      if (!fetchedModel) {
        throw new errors.NotFoundError({
          message: "model to attach not found"
        });
      }

      // Ensure the link table entries get ID's
      fetchedModel.related(relation).on("creating", (collection, data) => {
        data.id = ObjectId.generate();
      });

      return Promise.resolve(modelsToAttach).then(function then(models) {
        models = _.map(models, function mapper(model) {
          if (model.id) {
            return model.id;
          } else if (!_.isObject(model)) {
            return model.toString();
          } else {
            return model;
          }
        });

        return fetchedModel.related(relation).attach(models, localOptions);
      });
    })
    .finally(() => {
      if (!fetchedModel) {
        return;
      }

      fetchedModel.related(relation).off("creating");
    });
};

const detach = function detach(
  Model,
  effectedModelId,
  relation,
  modelsToDetach,
  options
) {
  options = options || {};

  let fetchedModel;
  let localOptions = { transacting: options.transacting };

  return Model.forge({ id: effectedModelId })
    .fetch(localOptions)
    .then(function successfulFetch(_fetchedModel) {
      fetchedModel = _fetchedModel;

      if (!fetchedModel) {
        throw new errors.NotFoundError({
          message: "model to detatch not found"
        });
      }

      return Promise.resolve(modelsToDetach).then(function then(models) {
        models = _.map(models, function mapper(model) {
          if (model.id) {
            return model.id;
          } else if (!_.isObject(model)) {
            return model.toString();
          } else {
            return model;
          }
        });

        return fetchedModel.related(relation).detach(models, localOptions);
      });
    })
    .finally(() => {
      if (!fetchedModel) {
        return;
      }
    });
};

module.exports = {
  attach: attach,
  detach: detach
};
