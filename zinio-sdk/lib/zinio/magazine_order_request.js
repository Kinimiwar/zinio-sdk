var MagazineOrderRequest, DEFAULT_VERSION, ErrorResponse, Util, deprecate, exceptions, md5;


Util = require('./util').Util;

md5 = require('md5');

exceptions = require('./exceptions');


DEFAULT_VERSION = 2;

MagazineOrderRequest = (function(_super) {

  //__extends(MagazineOrderRequest, _super);

  function MagazineOrderRequest(gateway) {
    this.gateway = gateway;
    this.config = this.gateway.config;
  }

  MagazineOrderRequest.prototype.send = function(params, callback) {
    var err, responseHandler;
    if (params == null) {
      params = {};
    }
    //params = Object.assign(params, {operation: 'pinrequest'});

    params = Object.assign(params, {grant_type: 'client_credentials'});
    err = this.validateParams(params);
    if (err) return callback(err, null);
    responseHandler = this.responseHandler(callback);
    var request_url = 'http://api' + this.config.mode + '.zinio.com/v1/users/self/orders';
    var headers = {
      'Authorization': "Bearer " + params.access_token,
      'X-ZNO-NEWSSTAND': this.config.newsstand
    };
    var prepayersReceipt = md5(params.amount + "|" + params.client_id + "|" + params.user_id + "|" + params.client_secret + "|" + params.externalRefId);
    var request_params = {
      "currency": this.config.currency,
      "orderItems": [
        {
          "type": params.order_type,
          "price": params.amount,
          "quantity": params.quantity,
          "systemType": params.systemType,
          "sku": {
            "id": params.issue_id
          }
        }
      ],
      "payments": [
        {
          "type": params.payment_type,
          "amount": params.amount,
          "prepayersReceipt": prepayersReceipt
        }
      ],
      "refund": params.refund,
      "tax": params.tax,
      "total": params.amount,
      "externalRefId": params.externalRefId
    };
    return this.gateway.http.post(request_url, headers, request_params, responseHandler);
  };

  MagazineOrderRequest.prototype.validateParams = function(params) {
    var options, invalidOptions = [];
    options = ["access_token", "amount", "quantity", "client_id", "client_secret", "user_id", "externalRefId", "order_type", "systemType", "issue_id", "payment_type"];
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

  MagazineOrderRequest.prototype.responseHandler = function(callback) {
    return function(err, response) {
      if (err)
        return callback(err, response);
      else
        return callback(null, response);

    };
  };

  return MagazineOrderRequest;

})();
exports.MagazineOrderRequest = MagazineOrderRequest;
