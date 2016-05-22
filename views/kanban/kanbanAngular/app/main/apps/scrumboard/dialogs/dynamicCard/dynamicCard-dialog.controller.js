(function ()
{
    'use strict';

    angular
        .module('app.scrumboard')
        .controller('ScrumboardDynamicCardDialogController', ScrumboardDynamicCardDialogController);

    /** @ngInject */
    function ScrumboardDynamicCardDialogController($document, $mdDialog, fuseTheming, fuseGenerator, msUtils,
                                                      BoardService, cardId, $mdToast)
    {
        var vm = this;

        // ******************************
        // Template methods
        // ******************************
        vm.cancel = function($event) {
          $mdDialog.cancel();
        };
        vm.finish = function($event) {
          // console.log(vm.searchText,"attempt to shut");
          var checkSelect = checkSelectEntry();
          if(checkSelect){
            $mdDialog.hide();
          }
          else{
            var el = angular.element(document.getElementById('toastBounds'));
            if(!checkSelect){
              console.log("enter select",checkSelect);
              $timeout(function(){
                vm.showTooltip1  = true;
              }, 500);
            }


          }
        };

        function checkSelectEntry(){
          var select1 = vm.size1;
          var select2 = vm.selectedToppings;
          console.log("in checkSelectEntry",select1,select2);
          if(select1 && select2){
            return true;
          }
          else {
            return false;
          }
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
