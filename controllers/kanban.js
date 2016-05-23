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

  console.log("in get project",req.params.id);
  var singleProject = kanbanApi.functions.getSingleProjectData();
  // console.log(singleProject);
  res.status(200).send(singleProject);

});


// GETPROJECT
// ==============================================
router.get('/getDynamicForm', function(req, res, next) {

  console.log("in getDynamicForm");
  var dynamicForm = kanbanApi.functions.getDynamicForm();
  res.status(200).send(dynamicForm);

});


// GETPROJECT
// ==============================================
router.get('/getDropdownData', function(req, res, next) {

  console.log("in getDropdownData");
  var dropdownData = kanbanApi.functions.getDropdownData();
  res.status(200).send(dropdownData);

});


// ALL
// ==============================================
router.get('/*', function(req, res){

  res.sendFile(path.join(__dirname + '/../views/kanban/kanbanAngular/kanban.html'));

});


module.exports.router = router;
