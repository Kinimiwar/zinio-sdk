var UserAuthorizationRequest, DEFAULT_VERSION, ErrorResponse, Util, deprecate, exceptions;



Util = require('./util').Util;

exceptions = require('./exceptions');


DEFAULT_VERSION = 2;

UserAuthorizationRequest = (function(_super) {

  //__extends(UserAuthorizationRequest, _super);

  function UserAuthorizationRequest(gateway) {
    this.gateway = gateway;
    this.config = this.gateway.config;
  }

  UserAuthorizationRequest.prototype.send = function(params, callback) {
    var err, responseHandler;
    if (params == null) {
      params = {};
    }
    //params = Object.assign(params, {operation: 'pinrequest'});

    params = Object.assign(params, {grant_type: 'third_party'});
    err = this.validateParams(params);
    if (err) return callback(err, null);
    responseHandler = this.responseHandler(callback);
    var request_url = 'http://auth' + this.config.mode + '.zinio.com/v1/authenticate';
    var headers = {};
    return this.gateway.http.post(request_url, headers, params, responseHandler);
  };

  UserAuthorizationRequest.prototype.validateParams = function(params) {
    var options, invalidOptions = [];
    options = ["client_id", "client_secret", "auth_data"];
    for(var i = 0; i < options.length; i++)
    {
      if(!params[options[i]])
        invalidOptions.push(options[i]);
    }


    if(invalidOptions.length > 0)
      return exceptions.UnexpectedError("Invalid keys: " + invalidOptions.join(', '));
    else
      return null;
  };

  UserAuthorizationRequest.prototype.responseHandler = function(callback) {
    return function(err, response) {
      if (err)
        return callback(err, response);
      else
        return callback(null, response);

    };
  };

  return UserAuthorizationRequest;

})();
exports.UserAuthorizationRequest = UserAuthorizationRequest;
