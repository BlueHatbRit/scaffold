const _ = require('lodash');
const util = require('util');

// ES6 class doesn't work well for my tomfoolery below this function
function ScaffoldError(options) {
  options = options || {};
  let self = this;

  if (_.isString(options)) {
    throw new Error('ScaffoldError must be instantiated using the options pattern');
  }

  Error.call(this);
  Error.captureStackTrace(this, ScaffoldError);

  // Defaults
  this.statusCode = 500;
  this.errorType = 'InternalServerError';
  this.target = null;

  // Overrides
  this.statusCode = options.statusCode || this.statusCode;
  this.errorType = this.name = options.errorType || this.errorType;
  this.target = options.target;

  this.message = options.message;
  this.hideStack = options.hideStack;

  // Add inheriting error...
  if (options.err) {
    if (_.isString(options.err)) {
      options.err = new Error(options.err); // Some developers suck
    }

    // TODO: Copy over Error obj properties and stack trace
  }
}

// Custom API errors to throw around the place
let errors = {
  NotFoundError: function NotFoundError(options) {
    ScaffoldError.call(this, _.merge({
      statusCode: 404,
      errorType: 'NotFoundError'
    }, options));
  },
  ValidationError: function ValidationError(options) {
    ScaffoldError.call(this, _.merge({
      statusCode: 400,
      errorType: 'ValidationError'
    }, options));
  },
  UnauthorizedError: function UnauthorizedError(options) {
    ScaffoldError.call(this, _.merge({
      statusCode: 401,
      errorType: 'UnauthorizedError'
    }, options));
  },
  ForbiddenError: function ForbiddenError(options) {
    ScaffoldError.call(this, _.merge({
      statusCode: 403,
      errorType: 'ForbiddenError'
    }, options));
  },
  ConflictError: function ConflictError(options) {
    ScaffoldError.call(this, _.merge({
      statusCode: 409,
      errorType: 'ConflictError'
    }, options));
  }
};

// ES6 class doesn't work well for the object merge or the context forcing
// which we really need.
// TODO: Figure out a nice way to put this into an ES6 inherited class instead.
util.inherits(ScaffoldError, Error);
_.each(errors, function (error) {
  util.inherits(error, ScaffoldError);
});

module.exports = errors;
module.exports.ScaffoldError = ScaffoldError; // just in case we need a custom error.