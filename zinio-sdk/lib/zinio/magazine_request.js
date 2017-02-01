var MagazineRequest, DEFAULT_VERSION, ErrorResponse, Util, deprecate, exceptions;


Util = require('./util').Util;

exceptions = require('./exceptions');


DEFAULT_VERSION = 2;

MagazineRequest = (function(_super) {

  //__extends(MagazineRequest, _super);

  function MagazineRequest(gateway) {
    this.gateway = gateway;
    this.config = this.gateway.config;
  }

  MagazineRequest.prototype.send = function(params, callback) {
    var err, responseHandler;
    if (params == null) {
      params = {};
    }
    //params = Object.assign(params, {operation: 'pinrequest'});

    params = Object.assign(params, {grant_type: 'client_credentials'});
    err = this.validateParams(params);
    if (err) return callback(err, null);
    responseHandler = this.responseHandler(callback);
    var specific_fields= "";
    if(params.fields){
      specific_fields = "?fields="+ params.fields;
    }
    var request_url = 'http://api' + this.config.mode + '.zinio.com/v1/magazines/' + params.magazine_id + specific_fields;
    var headers = {
      'Authorization': "Bearer " + params.access_token,
      'X-ZNO-NEWSSTAND': this.config.newsstand
    };
    return this.gateway.http.get(request_url, headers, responseHandler);
  };

  MagazineRequest.prototype.validateParams = function(params) {
    var options, invalidOptions = [];
    options = ["magazine_id", "access_token"];
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

  MagazineRequest.prototype.responseHandler = function(callback) {
    return function(err, response) {
      if (err)
        return callback(err, response);
      else
        return callback(null, response);

    };
  };

  return MagazineRequest;

})();
exports.MagazineRequest = MagazineRequest;
