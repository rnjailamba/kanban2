(function ()
{
    'use strict';

    angular
        .module('app.scrumboard')
        .factory('DialogService', DialogService);

    /** @ngInject */
    function DialogService($mdDialog, $document, $q, msApi)
    {
        var service = {
          openCardDialog: openCardDialog,
          openDynamicCardDialog: openDynamicCardDialog,
          getDropdownData: getDropdownData
        };

        //////////

        /**
         * Open card dialog
         *
         * @param ev
         * @param cardId
         */
        function openCardDialog(ev, cardId)
        {
            $mdDialog.show({
                templateUrl        : 'app/main/apps/scrumboard/dialogs/card/card-dialog.html',
                controller         : 'ScrumboardCardDialogController',
                controllerAs       : 'vm',
                parent             : $document.find('#scrumboard'),
                targetEvent        : ev,
                clickOutsideToClose: true,
                escapeToClose      : true,
                locals             : {
                    cardId: cardId
                }
            });
        }

        /**
         * Open dynamcic card dialog
         *
         * @param ev
         * @param cardId
         */
        function openDynamicCardDialog(ev, cardId)
        {
            console.log("opening the dynamcic dialog",cardId);
            $mdDialog.show({
                templateUrl        : 'app/main/apps/scrumboard/dialogs/dynamicCard/dynamicCard-dialog.html',
                controller         : 'ScrumboardDynamicCardDialogController',
                controllerAs       : 'vm',
                parent             : $document.find('#scrumboard'),
                targetEvent        : ev,
                clickOutsideToClose: true,
                escapeToClose      : true,
                locals             : {
                    cardId: cardId
                }
            });
        }

        /**
         * Open dynamcic card dialog
         *
         * @param ev
         * @param cardId
         */
        function getDropdownData()
        {
            console.log("in getDropdownData");
            // Create a new deferred object
            var deferred = $q.defer();

            msApi.request('scrumboard.boards.board.getDropdownData@get',{},

                // SUCCESS
                function (response)
                {
                    // Attach the data
                    service.data = response.data;

                    // Resolve the promise
                    deferred.resolve(response);
                },

                // ERROR
                function (response)
                {
                    // Reject the promise
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        return service;
    }
})();
