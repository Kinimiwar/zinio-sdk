var MagazineIssuesRequest, DEFAULT_VERSION, ErrorResponse, Util, deprecate, exceptions;


Util = require('./util').Util;

exceptions = require('./exceptions');


DEFAULT_VERSION = 2;

MagazineIssuesRequest = (function(_super) {

  //__extends(MagazineIssuesRequest, _super);

  function MagazineIssuesRequest(gateway) {
    this.gateway = gateway;
    this.config = this.gateway.config;
  }

  MagazineIssuesRequest.prototype.send = function(params, callback) {
    var err, responseHandler;
    if (params == null) {
      params = {};
    }
    //params = Object.assign(params, {operation: 'pinrequest'});

    params = Object.assign(params, {grant_type: 'client_credentials'});
    err = this.validateParams(params);
    if (err) return callback(err, null);
    responseHandler = this.responseHandler(callback);
    var request_url = 'http://api' + this.config.mode + '.zinio.com/v1/issues';
    var headers = {
      'Authorization': "Bearer " + params.access_token,
      'X-ZNO-NEWSSTAND': this.config.newsstand
    };
    return this.gateway.http.get(request_url, headers, responseHandler);
  };

  MagazineIssuesRequest.prototype.validateParams = function(params) {
    var options, invalidOptions = [];
    options = ["access_token"];
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

  MagazineIssuesRequest.prototype.responseHandler = function(callback) {
    return function(err, response) {
      if (err)
        return callback(err, response);
      else
        return callback(null, response);

    };
  };

  return MagazineIssuesRequest;

})();
exports.MagazineIssuesRequest = MagazineIssuesRequest;
