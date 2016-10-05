/**
 * Created by DN on 2016-10-02.
 */
/**
 * Services corresponding to user made Events
 */
(function() {
    'use strict';
    angular
        .module('flowApp')
        .factory('EventService', EventService);

    EventService.$inject = ['$http'];
    function EventService($http) {
        var service = {}
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.AddEventToInterests = AddEventToInterests;

        return service;

        // Get an event by the provided id
        function GetById(id) {
            return $http.get('http://localhost:8080/api/events/' + id).then(handleSuccess, handleError('Error getting event by id.'));
        }

        // Create a new event
        function Create(event){
            return $http.post('http://localhost:8080/api/events', event).then(handleSuccess, handleError('Error creating new event.'));
        }

        // Update an existing event if the current user is the owner or the user is an admin
        function Update(id, event){
            return $http.put('http://localhost:8080/api/events/' + id, event).then(handleSuccess, handleError('Error updating event.'));
        }

        // Delete the event with provided id if the current user is the owner or the user is an admin
        function Delete(id){
            return $http.delete('http://localhost:8080/api/events/' + id).then(handleSuccess, handleError('Error deleting event.'));
        }

        // Allow for the user to add an event to their interests
        function AddEventToInterests(id){
            return $http.post('http://localhost:8080/api/events/'+id+'/interests').then(handleSuccess, handleError('Error adding event to interests'));
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