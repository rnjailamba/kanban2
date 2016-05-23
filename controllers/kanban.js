var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var config = require('../config/config.js');//require all modules that are shared by all controllers
var appConfig = require('../config/appConfig'); // configure service api urls in dev/prod/beta
var redisClient = require('../helpers/exporters/export_redisClient').redisClient;
var kanbanApi = require("../helpers/kanban/api.js");
var path = require("path");

// PING
// ==============================================
router.get('/ping', function(req, res){

    res.status(200).send("ok");

});


// GETPROJECTS
// ==============================================
router.get('/getProjects', function(req, res, next) {

  var allProjectsPromise = kanbanApi.functions.getAllProjectsPromise();
  allProjectsPromise.then(function(data) {
      res.status(200).send(data);
  }).catch(function(error){
    reject(error);
  });

});


// GETPROJECT
// ==============================================
router.get('/getProject/:id', function(req, res, next) {

  var singleProjectsPromise = kanbanApi.functions.getSingleProjectsPromise();
  singleProjectsPromise.then(function(data) {
      res.status(200).send(data);
  }).catch(function(error){
    reject(error);
  });

});


// GETPROJECT
// ==============================================
router.get('/getDynamicForm', function(req, res, next) {

  var dynamicFormDataPromise = kanbanApi.functions.getDynamicFormPromise();
  dynamicFormDataPromise.then(function(data) {
      res.status(200).send(data);
  }).catch(function(error){
    reject(error);
  });

});


// GETPROJECT
// ==============================================
router.get('/getDropdownData', function(req, res, next) {

  var dropdownDataPromise = kanbanApi.functions.getDropdownDataPromise();
  dropdownDataPromise.then(function(data) {
      res.status(200).send(data);
  }).catch(function(error){
    reject(error);
  });

});


// ALL
// ==============================================
router.get('/*', function(req, res){

  res.sendFile(path.join(__dirname + '/../views/kanban/kanbanAngular/kanban.html'));

});


module.exports.router = router;
