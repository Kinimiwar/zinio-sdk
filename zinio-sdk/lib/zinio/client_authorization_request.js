var ClientAuthorizationRequest, DEFAULT_VERSION, ErrorResponse, Util, deprecate, exceptions;


Util = require('./util').Util;

exceptions = require('./exceptions');


DEFAULT_VERSION = 2;

ClientAuthorizationRequest = (function(_super) {

  //__extends(ClientAuthorizationRequest, _super);

  function ClientAuthorizationRequest(gateway) {
    this.gateway = gateway;
    this.config = this.gateway.config;
  }

  ClientAuthorizationRequest.prototype.send = function(params, callback) {
    var err, responseHandler;
    if (params == null) {
      params = {};
    }
    //params = Object.assign(params, {operation: 'pinrequest'});

    params = Object.assign(params, {grant_type: 'client_credentials'});
    err = this.validateParams(params);
    if (err) return callback(err, null);
    responseHandler = this.responseHandler(callback);
    var request_url = 'http://auth' + this.config.mode + '.zinio.com/v1/authenticate';
    var headers = {};
    return this.gateway.http.post(request_url, headers, params, responseHandler);
  };

  ClientAuthorizationRequest.prototype.validateParams = function(params) {
    var options, invalidOptions = [];
    options = ["client_id", "client_secret"];
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

  ClientAuthorizationRequest.prototype.responseHandler = function(callback) {
    return function(err, response) {
      if (err)
        return callback(err, response);
      else
        return callback(null, response);

    };
  };

  return ClientAuthorizationRequest;

})();
exports.ClientAuthorizationRequest = ClientAuthorizationRequest;
