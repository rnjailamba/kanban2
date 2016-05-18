(function ()
{
    'use strict';

    angular
        .module('app.scrumboard')
        .controller('BoardsViewController', BoardsViewController);

    /** @ngInject */
    function BoardsViewController(BoardList,$scope,socket)
    {
        var vm = this;

        // Data
        vm.boardList = BoardList.data;


        $scope.newCustomers = [];
        $scope.currentCustomer = {};

        $scope.join = function() {
          socket.emit('add-customer', $scope.currentCustomer);
        };

        socket.on('notification', function(data) {
          $scope.$apply(function () {
            $scope.newCustomers.push(data.customer);
          });
        });

        // Methods

        //////////
    }
})();
