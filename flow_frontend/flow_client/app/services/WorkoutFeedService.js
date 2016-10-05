/**
 * Created by DN on 2016-10-04.
 */
(function(){
    'use strict';
    angular
        .module('flowApp')
        .factory('WorkoutFeedService', WorkoutFeedService);

    WorkoutFeedService.$inject = ['$http'];
    function WorkoutFeedService($http) {
        var service = {}
        service.GetUserFeed = GetUserFeed;
        return service;

        // Get workouts for the current logged in user's feed
        function GetUserFeed(page, size) {
            return $http.get('http://localhost:8080/api/feed?page='+page+'&size='+size).then(handleSuccess, handleError('Error getting feed for user.'));
        }

        // private functions
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return {success: false, message: error};
            };
        }
    }
})();