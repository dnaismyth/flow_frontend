/**
 * Provide service for media which will be added to workouts upon
 * creation.
 */
(function(){
    'use strict';
    angular
        .module('flowApp')
        .factory('MediaService', MediaService);

    MediaService.$inject = ['$http'];
    function MediaService($http){
        var service = {}
        service.GetById = GetById;
        service.Update = Update;
        service.Delete = Delete;
        service.Create = Create;

        return service;

        // Get media by provided id
        function GetById(id){
            return $http.get('http://localhost:8080/api/media/' + id).then(handleSuccess, handleError('Error getting media by id'));
        }

        // Create new media to be added to a workout
        function Create(media){
            var created = $http.post('http://localhost:8080/api/media', media).then(handleSuccess, handleError('Error creating new media.'));
            return created;
        }

        // Update existing media
        function Update(media){
            return $http.put('http://localhost:8080/api/media', media).then(handleSuccess, handleError('Error updating media.'));
        }

        // Delete media by id
        function Delete(id) {
            return $http.delete('http://localhost:8080/api/media/' + id).then(handleSuccess, handleError('Error deleting media'));
        }

        // private functions
        function handleSuccess(res){
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
})();
