(function ()
{
    'use strict';

    angular
        .module('app.scrumboard')
        .controller('ScrumboardDynamicCardDialogController', ScrumboardDynamicCardDialogController);

    /** @ngInject */
    function ScrumboardDynamicCardDialogController($document, $mdDialog, fuseTheming, fuseGenerator, msUtils,
                                                      BoardService, cardId)
    {
        var vm = this;
        // list of `state` value/display objects
        vm.states        = loadAll();
        vm.querySearch   = querySearch;


        // ******************************
        // Template methods
        // ******************************
        vm.cancel = function($event) {
          $mdDialog.cancel();
        };
        vm.finish = function($event) {
          // console.log(vm.searchText,"attempt to shut");
          var checkAuto = checkAutocompleteEntry();
          var checkSelect = checkSelectEntry();
          console.log(checkAuto);
          if(checkAuto.bool && checkSelect){
            $mdDialog.hide();
          }
          else{
            var el = angular.element(document.getElementById('toastBounds'));
            showCustomToastBelowButton(el,checkAuto.msg);
            if(!checkAuto.bool){
              $timeout(function(){
                vm.showTooltip = true;
              }, 500);
            }

            if(!checkSelect){
              console.log("enter select",checkSelect);
              $timeout(function(){
                vm.showTooltip1  = true;
              }, 500);
            }


          }
        };

        function checkSelectEntry(){
          var select1 = "";//sharedProperties.getProperty1();
          var select2 = "";//sharedProperties.getProperty2();
          if(select1 && select2){
            return true;
          }
          else {
            return false;
          }
        }

        function showCustomToastBelowButton(el,msg) {
          var toast = $mdToast.simple()
            .content("There were issues in filling the form.Please click ok to see the issues")
            .action('OK')
            .highlightAction(true)
            .hideDelay(0)
            .position('right')
            .parent($document[0].querySelector('#toastBounds1'));

          $mdToast.show(toast);
        };

        function checkAutocompleteEntry(){

          var array = (vm.states);
          var returnMsg = {};
          returnMsg.bool = false;
          for (var i = array.length - 1; i >= 0; i--) {
            if( (vm.searchText == array[i].value) || (vm.searchText == array[i].display) ){
              returnMsg.bool = true;
              returnMsg.msg = "you have entered something from the list";
            }
          };
          if( returnMsg.bool == false ){
              returnMsg.bool = false;
              returnMsg.msg = "you have NOT entered something from the list";
          }
          return returnMsg;

        }
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch (query) {
          return query ? vm.states.filter( createFilterFor(query) ) : vm.states;
        }
        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
          var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
                  Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
                  Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
                  Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
                  North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
                  South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
                  Wisconsin, Wyoming';
          return allStates.split(/, +/g).map( function (state) {
            var x  = {
              value: state.toLowerCase(),
              display: state
            };
            // console.log(x);
            return x;
          });
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);
          return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
          };
        }

        // ******************************
        // All the selection logic
        // ******************************

        vm.sizes = [
          "meat",
          "veg"

        ];
        vm.toppings = [
          { category: 'meat', name: 'Pepperoni' },
          { category: 'meat', name: 'Sausage' },
          { category: 'meat', name: 'Ground Beef' },
          { category: 'meat', name: 'Bacon' },
          { category: 'veg', name: 'Mushrooms' },
          { category: 'veg', name: 'Onion' },
          { category: 'veg', name: 'Green Pepper' },
          { category: 'veg', name: 'Green Olives' }
        ];

        vm.sizes1 = [
          { category: 'meat', name: 'Pepperoni' },
          { category: 'meat', name: 'Sausage' },
          { category: 'meat', name: 'Ground Beef' },
          { category: 'meat', name: 'Bacon' },
          { category: 'veg', name: 'Mushrooms' },
          { category: 'veg', name: 'Onion' },
          { category: 'veg', name: 'Green Pepper' },
          { category: 'veg', name: 'Green Olives' }
        ];
        vm.selectedToppings = '';
        vm.size1 = '';
        vm.clearValue = function() {
          vm.size1 = undefined;
          vm.selectedToppings = undefined;
        };

        // console.log(sharedProperties.getProperty1()," get the prop1");


        vm.selectChanged1 = function(){
          console.log("in selectChanged1",vm.size1);
          // sharedProperties.setProperty1(vm.size1);
        };
        vm.selectChanged2 = function(){
          console.log("in selectChanged2",vm.selectedToppings);
          // sharedProperties.setProperty2(vm.selectedToppings);
        };
    }
})();
