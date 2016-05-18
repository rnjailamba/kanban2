// app.factory('socket', ['$rootScope', function($rootScope) {
//   var socket = io.connect();
//
//   return {
//     on: function(eventName, callback){
//       socket.on(eventName, callback);
//     },
//     emit: function(eventName, data) {
//       socket.emit(eventName, data);
//     }
//   };
// }]);


(function ()
{
    'use strict';

    angular
        .module('app.scrumboard')
        .factory('socket', socket);

    console.log("in socket");

    /** @ngInject */
    function socket($rootScope)
    {

        var socket = io.connect();

        return {
          on: function(eventName, callback){
            socket.on(eventName, callback);
          },
          emit: function(eventName, data) {
            socket.emit(eventName, data);
          }
        };

    }
})();
