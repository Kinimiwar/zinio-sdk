var ZinioService, UserAuthorizationRequest, ClientAuthorizationRequest, MagazineCategoryRequest, MagazineIssuesRequest,
    MagazineOrderRequest, Http;

Http = require('./http').Http;

UserAuthorizationRequest = require("./user_authorization_request").UserAuthorizationRequest;
ClientAuthorizationRequest = require("./client_authorization_request").ClientAuthorizationRequest;
MagazineRequest = require("./magazine_request").MagazineRequest;
MagazineCategoryRequest = require("./magazine_category_request").MagazineCategoryRequest;
MagazineIssuesRequest = require("./magazine_issues_request").MagazineIssuesRequest;
MagazineOrderRequest = require("./magazine_order_request").MagazineOrderRequest;

ZinioService = (function() {

  function ZinioService(config) {
    this.config 			  = config;
    this.http 				  = new Http(this.config);
    this.userAuthorizationRequest = new UserAuthorizationRequest(this);
    this.clientAuthorizationRequest = new ClientAuthorizationRequest(this);
    this.magazineRequest = new MagazineRequest(this);
    this.magazineCategoryRequest = new MagazineCategoryRequest(this);
    this.magazineIssuesRequest = new MagazineIssuesRequest(this);
    this.magazineOrderRequest = new MagazineOrderRequest(this);
  }

  return ZinioService;

})();

exports.ZinioService = ZinioService;