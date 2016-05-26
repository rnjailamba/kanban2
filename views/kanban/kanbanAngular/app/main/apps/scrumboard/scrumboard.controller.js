(function ()
{
    'use strict';

    angular
        .module('app.scrumboard')
        .controller('ScrumboardController', ScrumboardController);

    /** @ngInject */
    function ScrumboardController($mdSidenav, BoardService, BoardList, CardFilters, $cookies)
    {
        var vm = this;

        // Data
        vm.currentView = 'board';
        vm.board = BoardService.data;
        vm.boardList = BoardList.data;
        vm.boardSelectorVisible = false;

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.updateBoardUri = updateBoardUri;
        vm.clearFilters = CardFilters.clear;
        vm.filteringIsOn = CardFilters.isOn;

        ////////
        // $cookies.get('tab');
        $cookies.put('tab', "fdfdfd");
        // console.log($cookies.get('tab'));


        /**
         * Update Board Uri
         *
         * Once you connect your app to your server,
         * you would do this on your API server.
         */
        function updateBoardUri()
        {
            if ( vm.boardList.getById(vm.board.id) )
            {
                console.log("updateBoardUri");
                vm.boardList.getById(vm.board.id).name = vm.board.name;
                vm.boardList.getById(vm.board.id).uri = vm.board.uri = encodeURIComponent(vm.board.name).replace(/%20/g, '-').toLowerCase();
            }
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Array prototype
         *
         * Get by id
         *
         * @param value
         * @returns {T}
         */
        Array.prototype.getById = function (value)
        {
            return this.filter(function (x)
            {
                return x.id === value;
            })[0];
        };

        /**
         * Array prototype
         *
         * Get by name
         *
         * @param value
         * @returns {T}
         */
        Array.prototype.getByName = function (value)
        {
          console.log("in get by name",value,this);

            return this.filter(function (x)
            {
                return x.name === value;
            })[0];
        };

    }
})();
