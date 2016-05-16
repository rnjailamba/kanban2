var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var config = require('../config/config.js');//require all modules that are shared by all controllers
var appConfig = require('../config/appConfig'); // configure service api urls in dev/prod/beta
var redisClient = require('../helpers/exporters/export_redisClient').redisClient;
var loginMiddleWare = require("../helpers/login/api.js");
var path = require("path");


// PING
// ==============================================
router.get('/ping', function(req, res){

    res.status(200).send("ok");

});


// GETPROJECTS
// ==============================================
router.get('/getProjects', function(req, res, next) {

  console.log("in get projects");
  var allProjects = {
                        "data": [
                            {
                                "name": "Project1",
                                "uri": "acme-frontend-application",
                                "id": "32gfhaf2"
                            },
                            {
                                "name": "Project 2",
                                "uri": "acme-backend-application",
                                "id": "27cfcbe1"
                            }
                        ]
                    };
    res.status(200).send(allProjects);

});


// ALL
// ==============================================
router.get('/*', function(req, res){

  res.sendFile(path.join(__dirname + '/../views/kanban/kanbanAngular/kanban.html'));

});




var justPrintSomething = function(){
    console.log("print something");
}

module.exports.router = router;
