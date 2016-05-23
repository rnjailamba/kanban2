(function ()
{
    'use strict';

    angular
        .module('app.scrumboard')
        .controller('ScrumboardDynamicCardDialogController', ScrumboardDynamicCardDialogController);

    /** @ngInject */
    function ScrumboardDynamicCardDialogController($document, $mdDialog, fuseTheming, fuseGenerator, msUtils,
                                                      BoardService, cardId, $mdToast, $scope, DialogService)
    {
        var vm = this;
        vm.dynamicCardTabIndex = 0;
        vm.toppings = '';

        activate();

        ////////////

        function activate() {
            return DialogService.getDropdownData().then(function(data) {
                vm.toppings = data["data"];
            });
        }

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
        vm.model4 = {};
        vm.schema =
                        {
                          "type": "object",
                          "title": "Comment",
                          "properties": {
                            "name": {
                              "title": "Name",
                              "type": "string"
                            },
                            "email": {
                              "title": "Email",
                              "type": "string",
                              "pattern": "^\\S+@\\S+$",
                              "description": "Email will be used for evil."
                            },
                            "comment": {
                              "title": "Comment",
                              "type": "string",
                              "maxLength": 20,
                              "validationMessage": "Don't be greedy!"
                            }
                          },
                          "required": [
                            "name",
                            "email",
                            "comment"
                          ]
                        };

        vm.form =
            [
              {
                "type": "help",
                "helpvalue": "<div class=\"alert alert-info\">Grid it up with bootstrap</div>"
              },
              {
                "type": "section",
                "htmlClass": "row",
                "items": [
                  {
                    "type": "section",
                    "htmlClass": "col-xs-6",
                    "items": [
                      "name"
                    ]
                  },
                  {
                    "type": "section",
                    "htmlClass": "col-xs-6",
                    "items": [
                      "email"
                    ]
                  }
                ]
              },
              {
                "key": "comment",
                "type": "textarea",
                "placeholder": "Make a comment"
              }
              // ,{
              //   "type": "submit",
              //   "style": "btn-info",
              //   "title": "OK"
              // }
            ]  ;


        // ASSIGN FUNCTION
        // ==============================================
        vm.clearValue = clearValue;
        vm.cancel = cancel;
        vm.next = next;
        vm.clearValue = clearValue;
        vm.selectChanged1 = selectChanged1;
        vm.selectChanged2 = selectChanged2;
        vm.onSubmit = onSubmit;

        // ON SUBMIT
        // ==============================================
        function onSubmit(form) {
          // First we broadcast an event so all fields validate themselves
          $scope.$broadcast('schemaFormValidate');
          console.log("The form is submitted");

          // Then we check if the form is valid
          if (form.$valid) {
            // ... do whatever you need to do with your data.
            console.log("form is valid");
            return true;

          }
          else{
            console.log("form is invalid");
            return false;
          }
        }


        // CANCEL
        // ==============================================
        function cancel($event) {
          $mdDialog.cancel();
        };


        // NEXT/FINISH
        // ==============================================
        function next(form) {
          // console.log(vm.searchText,"attempt to shut");
          var myEl = angular.element( document.querySelector( '#dynamicCardNext' ) );
          // if( onSubmit(form) ){
          //   $mdDialog.hide();
          // }
          // else{
          //
          // }
          var checkSelect = checkSelectEntry();
          if(checkSelect){
            if( vm.dynamicCardTabIndex == 1){
              if( onSubmit(form) ){
                $mdDialog.hide();
              }
              else{

              }
            }
            else{
              vm.dynamicCardTabIndex = 1;
              myEl.text("Finish");
            }

          }
          else{
            var el = angular.element(document.getElementById('toastBounds'));
            console.log("enter select",checkSelect);
            $timeout(function(){
              vm.showTooltip1  = true;
            }, 500);
          }
        };


        // CHECK SELECT ENTRY
        // ==============================================
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


        // CLEAR VALUES
        // ==============================================
        function clearValue() {
          vm.size1 = undefined;
          vm.selectedToppings = undefined;
        };


        // SELECT CHANGED1
        // ==============================================
        function selectChanged1(){
          console.log("in selectChanged1",vm.size1);
          // sharedProperties.setProperty1(vm.size1);
        };


        // SELECT CHANGED2
        // ==============================================
        function selectChanged2(){
          console.log("in selectChanged2",vm.selectedToppings);
          // sharedProperties.setProperty2(vm.selectedToppings);
        };
    }
})();
