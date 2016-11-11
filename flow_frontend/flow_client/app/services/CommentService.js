/**
 * Created by DN on 2016-11-11.
 */
/**
 * Created by DN on 2016-10-02.
 */
/**
 * Service for workout comments
 */
(function() {
    'use strict';
    angular
        .module('flowApp')
        .factory('CommentService', CommentService);

    CommentService.$inject = ['$http'];
    function CommentService($http) {
        var service = {}
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetAllByWorkoutId = GetAllByWorkoutId;
        return service;

        // Create a new event
        function Create(comment, workoutId){
            return $http.post('http://localhost:8080/api/comments/workout/' + workoutId, comment).then(handleSuccess, handleError('Error creating new comment for workout.'));
        }

        // Update an existing event if the current user is the owner or the user is an admin
        function Update(id, comment){
            return $http.put('http://localhost:8080/api/comments/' + id, comment).then(handleSuccess, handleError('Error updating comment.'));
        }

        // Delete the event with provided id if the current user is the owner or the user is an admin
        function Delete(id){
            return $http.delete('http://localhost:8080/api/comments/' + id).then(handleSuccess, handleError('Error deleting comment.'));
        }

        // Allow for the user to add an event to their interests
        function GetAllByWorkoutId(workoutId){
            return $http.post('http://localhost:8080/api/comments/workout/' +workoutId).then(handleSuccess, handleError('Error retrieving all comments for workout.'));
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