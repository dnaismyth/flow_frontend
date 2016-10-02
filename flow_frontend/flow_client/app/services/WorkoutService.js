/**
 * Created by DN on 2016-10-02.
 */
(function(){
    'use strict';
    angular
        .module('flowApp')
        .factory('WorkoutService', WorkoutService);

    WorkoutService.$inject = ['$http'];
    function WorkoutService($http) {
        var service = {}
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        // Get a workout by the provided id
        function GetById(id){
            return $http.get('/api/workouts/' + id).then(handleSuccess, handleError('Error getting workout by id.'));
        }

        // Create a new workout
        function Create(workout){
            return $http.post('/api/workouts', workout).then(handleSuccess, handleError('Error creating new workout.'));
        }

        // Update a workout if the current user is the owner or the user is admin
        function Update(workout){
            return $http.put('/api/workouts', workout).then(handleSuccess, handleError('Error updating workout.'));
        }

        // Delete a workout if the current user is the owner or the user is admin
        function Delete(id) {
            return $http.delete('/api/workouts/' + id).then(handleSuccess, handleError('Error deleting workout.'));
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