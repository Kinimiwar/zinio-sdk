var MagazineCategoryRequest, DEFAULT_VERSION, ErrorResponse, Util, deprecate, exceptions;


Util = require('./util').Util;

exceptions = require('./exceptions');


DEFAULT_VERSION = 2;

MagazineCategoryRequest = (function(_super) {

  //__extends(MagazineCategoryRequest, _super);

  function MagazineCategoryRequest(gateway) {
    this.gateway = gateway;
    this.config = this.gateway.config;
  }

  MagazineCategoryRequest.prototype.send = function(params, callback) {
    var err, responseHandler;
    if (params == null) {
      params = {};
    }
    //params = Object.assign(params, {operation: 'pinrequest'});

    params = Object.assign(params, {grant_type: 'client_credentials'});
    err = this.validateParams(params);
    if (err) return callback(err, null);
    responseHandler = this.responseHandler(callback);
    var request_url = 'http://api' + this.config.mode + '.zinio.com/v1/categories/' + params.cat_id;
    var headers = {
      'Authorization': "Bearer " + params.access_token,
      'X-ZNO-NEWSSTAND': this.config.newsstand
    };
    return this.gateway.http.get(request_url, headers, responseHandler);
  };

  MagazineCategoryRequest.prototype.validateParams = function(params) {
    var options, invalidOptions = [];
    options = ["cat_id", "access_token"];
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

  MagazineCategoryRequest.prototype.responseHandler = function(callback) {
    return function(err, response) {
      if (err)
        return callback(err, response);
      else
        return callback(null, response);

    };
  };

  return MagazineCategoryRequest;

})();
exports.MagazineCategoryRequest = MagazineCategoryRequest;
