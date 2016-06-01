(function ()
{
    'use strict';

    angular
        .module('app.navigation')
        .controller('NavigationController', NavigationController);

    /** @ngInject */
    function NavigationController($scope, $rootScope, $state)
    {
        var vm = this;

        // Data
        vm.bodyEl = angular.element('body');
        vm.folded = false;
        vm.msScrollOptions = {
            suppressScrollX: true
        };
        // console.log(" in navigation controller");

        // Methods
        vm.toggleMsNavigationFolded = toggleMsNavigationFolded;
        vm.hideConditionsForSideNav = hideConditionsForSideNav;

        //////////

        /**
         * Toggle folded status
         */
        function toggleMsNavigationFolded()
        {
            vm.folded = !vm.folded;
        }

        // Close the mobile menu on $stateChangeSuccess
        $scope.$on('$stateChangeSuccess', function ()
        {
            vm.bodyEl.removeClass('ms-navigation-horizontal-mobile-menu-active');
        });

        /**
         * Hide Conditions
         */
        function hideConditionsForSideNav()
        {
            // console.log("in hideConditions",$state.current.name);
            if( $state.current.name == ('app.scrumboard.boards') )
              return true;
            else {
                return false;
            }
        }
    }

})();
