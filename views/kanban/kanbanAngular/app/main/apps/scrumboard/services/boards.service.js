(function ()
{
    'use strict';

    angular
        .module('app.scrumboard')
        .factory('BoardsService', BoardsService);

    /** @ngInject */
    function BoardsService($q, msApi)
    {
        var service = {
            data        : {},
            getBoardsData : getBoardsData
        };

        /**
         * Get boards data from the server
         *
         * @param {}
         * @returns {*}
         */
        function getBoardsData()
        {
            // Create a new deferred object
            var deferred = $q.defer();

            msApi.request('scrumboard.boardList@get',{},

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
