var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var config = require('../config/config.js');//require all modules that are shared by all controllers
var appConfig = require('../config/appConfig'); // configure service api urls in dev/prod/beta
var redisClient = require('../helpers/exporters/export_redisClient').redisClient;
var loginMiddleWare = require("../helpers/login/api.js");

// PING
// ==============================================
router.get('/ping', function(req, res){

    res.render('index/ping', { title: 'Express' });
 
});


// INDEX
// ==============================================
router.get('/', function(req, res){

  	loginMiddleWare.functions.isLoggedInWithRender(req,res,redisClient,'index/landing',null);

});


// NOT LOGGED IN
// ==============================================
router.get('/notLoggedIn', function(req, res){

    res.render('index/notLoggedIn', { title: 'Express' });

});


// KANBAN WHOAMI
// ==============================================
router.get('/whoami', function(req, res){

    res.status(200).send({"first_name":"Rnjai","last_name":"Lamba","created_at":"2016-04-24T03:49:08+00:00","account":{"active":true,"pk":25090,"created":"2016-04-24T03:49:08+00:00"},"email":"rnjailamba12@gmail.com","last_login":"2016-04-24T03:49:33+00:00","id":45493});

});


// KANBAN PRODUCTS
// ==============================================
router.get('/products', function(req, res){

    res.status(200).send([{"archived":false,"name":"My First Product","admin":true,"created_at":"2016-04-24T03:49:09+00:00","webhook":"https://sprint.ly/product/41091/commits/wahWatuWeHmJEDXX3JdD3bULbLXVd8BQ","email":{"tests":"tests-41091@items.sprint.ly","tasks":"tasks-41091@items.sprint.ly","stories":"stories-41091@items.sprint.ly","defects":"defects-41091@items.sprint.ly","backlog":"backlog-41091@items.sprint.ly"},"id":41091},{"archived":false,"name":"My first product","admin":true,"created_at":"2016-04-27T16:10:02+00:00","webhook":"https://sprint.ly/product/41161/commits/p9au6MQu4ge8trU3beNjSxqmfDbTTBtj","email":{"tests":"tests-41161@items.sprint.ly","tasks":"tasks-41161@items.sprint.ly","stories":"stories-41161@items.sprint.ly","defects":"defects-41161@items.sprint.ly","backlog":"backlog-41161@items.sprint.ly"},"id":41161}]);

});


var justPrintSomething = function(){
    console.log("print something");
}

module.exports.router = router;
