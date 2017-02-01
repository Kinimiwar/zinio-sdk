 //Sorry for poor documentation

 var zinio = require("./zinio-sdk");
 var api_mode = 'stg'; //for live, please keep it blank
 var zinio_service = zinio.connect({mode: api_mode});
 var params = {
     "client_id": "................",
     "client_secret": "................",
     "auth_data": {
         "touchTech": {
             "id": "1233",
             "emailAddress": "email@example.com"
         }
     }
 };
zinio_service.userAuthorizationRequest.send(params, user_authorization_completed);


function user_authorization_completed(err, response)
{
    console.log('zinio user_authorization_request returned');
    console.log(err);
    console.log(response);
}


var zinio_service = zinio.connect({mode: api_mode});
var params = {
    "client_id": "................",
    "client_secret": "................"
};
console.log(zinio_service.clientAuthorizationRequest.send(params, request_returned));

function request_returned(err, response)
{
    console.log('zinio request_returned returned');
    console.log(err);
    console.log(response);
}


var zinio_service = zinio.connect({mode: api_mode});
var params = {
    "magazine_id": "mag_id_value", //please give accurate value
    "access_token": "...." //returned from client_authorization
};
zinio_service.magazineRequest.send(params, request_returned);

function request_returned(err, response)
{
    console.log('zinio magazineRequest returned');
    console.log(err);
    console.log(response);
}


var zinio_service = zinio.connect({mode: api_mode});
var params = {
    "cat_id": "cat2366496", //zinio magazine category id
    "access_token": "...." //returned from client_authorization
};
zinio_service.magazineCategoryRequest.send(params, request_returned);

function request_returned(err, response)
{
    console.log('zinio magazineRequest returned');
    console.log(err);
    console.log(response);
}


var zinio_service = zinio.connect({mode: api_mode});
var params = {
    "access_token": "...." //returned from client_authorization
};
zinio_service.magazineIssuesRequest.send(params, request_returned);



//please make user_authorization first

var zinio_service = zinio.connect({mode: api_mode});
var params = {
    "access_token": "....", //returned from user_authorization
    "amount": 19.99,
    "quantity": 1, // >1 for subscription if multiple issues available
    "client_id": ".....",
    "client_secret": ".....",
    "user_id": "....",//returned from user_authorization
    "externalRefId": "unique_id", // may be order id or any random invoice no.
    "order_type": "subscription", // "subscription" or "single",
    "systemType": "ZINIO_SALE",
    "issue_id": "...", //magazine issue id
    "payment_type": "prePaid",
    "refund": false,
    "tax": 0.00,
};
zinio_service.magazineOrderRequest.send(params, request_returned);

function request_returned(err, response)
{
    console.log('zinio magazineOrderRequest returned');
    console.log(err);
    console.log(response);
}
