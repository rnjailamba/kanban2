var modules = require('../../controllers/setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var redisClient = require('../exporters/export_redisClient').redisClient;

module.exports.functions = {

  getAllProjectsPromise:function(){
    return new Promise(function(resolve, reject){
        var allProjectsPromise = getAllProjectsPromise();
        allProjectsPromise.then(function(data) {
          resolve(data);
        }).catch(function(error){
          reject(error);
        });
    });
  },
  getSingleProjectsPromise:function(){
    return new Promise(function(resolve, reject){
        var singleProjectsPromise = getSingleProjectsPromise();
        singleProjectsPromise.then(function(data) {
          resolve(data);
        }).catch(function(error){
          reject(error);
        });
    });
  },
  getDropdownDataPromise:function(){
    return new Promise(function(resolve, reject){
        var dropdownDataPromise = getDropdownDataPromise();
        dropdownDataPromise.then(function(data) {
          resolve(data);
        }).catch(function(error){
          reject(error);
        });
    });
  }

};


// GET DROPDOWN DATA PROMISE
// ==============================================
var getDropdownDataPromise = function(){

  var x = {

        "data":[
                  { category: 'meat', name: 'Pepperoni' },
                  { category: 'meat', name: 'Sausage' },
                  { category: 'meat', name: 'Ground Beef' },
                  { category: 'meat', name: 'Bacon' },
                  { category: 'veg', name: 'Mushrooms' },
                  { category: 'veg', name: 'Onion' },
                  { category: 'veg', name: 'Green Pepper' },
                  { category: 'veg', name: 'Green Olives' }
                ]
    };

  return new Promise(function(resolve, reject){

    if( x ){
      resolve(x);
    }
    else{
      reject("error");
    }

  });

}

// GET SINGLE PROJECT DATA
// ==============================================
var getSingleProjectsPromise = function(){

  var x =
      {
          "data": {
              "id": "27cfcbe1",
              "name": "ACME Backend Application",
              "uri": "acme-backend-application",
              "settings": {
                  "color": "blue-grey",
                  "subscribed": false,
                  "cardCoverImages": true
              },
              "lists": [
                  {
                      "id": "56027cf5a2ca3839a5d36103",
                      "name": "Designs",
                      "idCards": [
                          "5603a2a3cab0c8300f6096b3"
                      ]
                  },
                  {
                      "id": "56127cf2a2ca3539g7d36103",
                      "name": "Development",
                      "idCards": [
                          "5637273da9b93bb84743a0f9"
                      ]
                  }
              ],
              "cards": [
                  {
                      "id": "5603a2a3cab0c8300f6096b3",
                      "name": "Calendar App Design",
                      "description": "",
                      "idAttachmentCover": "56027cfcbe1b72ecf1fc452a",
                      "idMembers": [
                          "56027c1930450d8bf7b10758",
                          "36027j1930450d8bf7b10158"
                      ],
                      "idLabels": [
                          "56027e4119ad3a5dc28b36cd",
                          "5640635e19ad3a5dc21416b2"
                      ],
                      "attachments": [
                          {
                              "id": "56027cfcbe1b72ecf1fc452a",
                              "name": "calendar-app-design.jpg",
                              "src": "assets/images/scrumboard/calendar-app-design.jpg",
                              "time": "Added Nov 1 at 12:34PM",
                              "type": "image"
                          },
                          {
                              "id": "67027cahbe3b52ecf2dc631c",
                              "url": "assets/images/scrumboard/calendar-app-design.jpg",
                              "time": "Added Nov 3 at 15:22AM",
                              "type": "link"
                          }
                      ],
                      "subscribed": true,
                      "checklists": [
                          {
                              "id": "63021cfdbe1x72wcf1fc451v",
                              "name": "Checklist",
                              "checkItemsChecked": 1,
                              "checkItems": [
                                  {
                                      "name": "Implement a calendar library",
                                      "checked": false
                                  },
                                  {
                                      "name": "Replace event colors with Material Design colors",
                                      "checked": true
                                  },
                                  {
                                      "name": "Replace icons with Material Design icons",
                                      "checked": false
                                  },
                                  {
                                      "name": "Use moment.js",
                                      "checked": false
                                  }
                              ]
                          },
                          {
                              "name": "Checklist 2",
                              "id": "74031cfdbe1x72wcz1dc166z",
                              "checkItemsChecked": 1,
                              "checkItems": [
                                  {
                                      "name": "Replace event colors with Material Design colors",
                                      "checked": true
                                  },
                                  {
                                      "name": "Replace icons with Material Design icons",
                                      "checked": false
                                  },
                                  {
                                      "name": "Use moment.js",
                                      "checked": false
                                  }
                              ]
                          }
                      ],
                      "checkItems": 7,
                      "checkItemsChecked": 2,
                      "comments": [
                          {
                              "idMember": "56027c1930450d8bf7b10758",
                              "message": "We should be able to add moment.js without any problems",
                              "time": "12 mins. ago"
                          },
                          {
                              "idMember": "36027j1930450d8bf7b10158",
                              "message": "I added a link for a page that might help us deciding the colors",
                              "time": "30 mins. ago"
                          }
                      ],
                      "activities": [
                          {
                              "idMember": "56027c1930450d8bf7b10758",
                              "message": "added a comment",
                              "time": "12 mins. ago"
                          },
                          {
                              "idMember": "36027j1930450d8bf7b10158",
                              "message": "added a comment",
                              "time": "30 mins. ago"
                          },
                          {
                              "idMember": "36027j1930450d8bf7b10158",
                              "message": "attached a link",
                              "time": "45 mins. ago"
                          }
                      ],
                      "due": null
                  },
                  {
                      "id": "5637273da9b93bb84743a0f9",
                      "name": "Fix Splash Screen bugs",
                      "description": "",
                      "idAttachmentCover": "5603a2ae2bbd55bb2db57478",
                      "idMembers": [
                          "56027c1930450d8bf7b10758"
                      ],
                      "idLabels": [],
                      "attachments": [
                          {
                              "id": "5603a2ae2bbd55bb2db57478",
                              "name": "mail-app-design.jpg",
                              "src": "assets/images/scrumboard/mail-app-design.jpg",
                              "time": "Added Nov 1 at 12:34PM",
                              "type": "image"
                          }
                      ],
                      "subscribed": true,
                      "checklists": [],
                      "checkItems": 0,
                      "checkItemsChecked": 0,
                      "comments": [],
                      "activities": [],
                      "due": null
                  }
              ],
              "members": [
                  {
                      "id": "56027c1930450d8bf7b10758",
                      "name": "Alice Freeman",
                      "avatar": "assets/images/avatars/alice.jpg"
                  },
                  {
                      "id": "26027s1930450d8bf7b10828",
                      "name": "Danielle Obrien",
                      "avatar": "assets/images/avatars/danielle.jpg"
                  },
                  {
                      "id": "76027g1930450d8bf7b10958",
                      "name": "James Lewis",
                      "avatar": "assets/images/avatars/james.jpg"
                  },
                  {
                      "id": "36027j1930450d8bf7b10158",
                      "name": "Vincent Munoz",
                      "avatar": "assets/images/avatars/vincent.jpg"
                  }
              ],
              "labels": [
                  {
                      "id": "56027e4119ad3a5dc28b36cd",
                      "name": "Design",
                      "color": "red"
                  },
                  {
                      "id": "5640635e19ad3a5dc21416b2",
                      "name": "App",
                      "color": "blue"
                  },
                  {
                      "id": "6540635g19ad3s5dc31412b2",
                      "name": "Feature",
                      "color": "green"
                  }
              ]
          }
      };
      return new Promise(function(resolve, reject){

        if( x ){
          resolve(x);
        }
        else{
          reject("error");
        }

      });}


// GET ALL PROJECT DATA
// ==============================================
var getAllProjectsPromise = function(){

  var x =
    {
      "data": [
          {
              "name": "Project1",
              "uri": "acme-frontend-application",
              "id": "32gfhaf2"
          },
          {
              "name": "Project1",
              "uri": "acme-frontend-application",
              "id": "32gfhaf2"
          },
          {
              "name": "Project1",
              "uri": "acme-frontend-application",
              "id": "32gfhaf2"
          },
          {
              "name": "Project1",
              "uri": "acme-frontend-application",
              "id": "32gfhaf2"
          },
          {
              "name": "Project1",
              "uri": "acme-frontend-application",
              "id": "32gfhaf2"
          },
          {
              "name": "Project1",
              "uri": "acme-frontend-application",
              "id": "32gfhaf2"
          },
          {
              "name": "Project1",
              "uri": "acme-frontend-application",
              "id": "32gfhaf2"
          },
          {
              "name": "Project1",
              "uri": "acme-frontend-application",
              "id": "32gfhaf2"
          },
          {
              "name": "Project1",
              "uri": "acme-frontend-application",
              "id": "32gfhaf2"
          },
          {
              "name": "Project 2",
              "uri": "acme-backend-application",
              "id": "27cfcbe1"
          },
          {
              "name": "Project 2",
              "uri": "acme-backend-application",
              "id": "27cfcbe1"
          }
      ]
  };
  return new Promise(function(resolve, reject){

    if( x ){
      resolve(x);
    }
    else{
      reject("error");
    }

  });

}



// IS LOGGED IN
// ==============================================
router.get('/isLoggedIn', function(req, res, next) {
    isLoggedIn(req,res);
});


// GET CUSOMTER ID
// ==============================================
router.get('/getCustomerId', function(req, res, next) {
    getCustomerId();
});


module.exports.router = router;
