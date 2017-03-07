const _ = require('lodash');
const users = require('./users');
const sessions = require('./sessions');
const webSession = require('./web-session');
const flags = require('./flags');

/*
Public: A wrapper for API functions that handles the HTTP api. This
means that API functions do not need to consider any aspect of
HTTP request or response.

apiFunction - A function which expects two parameters, object and options
              and must return a promise.

Returns a HTTP function with the "req, res, and next" parameters.
*/
function http(apiFunction) {
  return function httpHandler(req, res, next) {
    let object = req.body;
    let options = _.extend({}, req.query, req.params);
    
    // GET and DELETE don't have a body, instead their objects
    // are passed as query / params.
    // POST, PUT, and PATCH do contain a body, so we take any
    // query and params and treat them as options with the body
    // as the main object.
    if (_.isEmpty(object)) {
      object = options;
      options = {};
    }

    return apiFunction(object, options).then((response) => {
      if (req.method === 'DELETE') {
        // Successful DELETE response is 204 with no body so terminate here
        return res.sendStatus(204);
      } else if (req.method === 'POST') {
        // Successful POST response is 201 with a body
        res.status(201);
      } else if (req.method === 'PUT') {
        // Successful PUT response is 202 with a body
        res.status(202);
      }

      res.json(response || {});
    }).catch((err) => {
      next(err);
    });
  };
}

module.exports = {
  http: http,
  users: users,
  sessions: sessions,
  webSession: webSession,
  flags: flags
};
