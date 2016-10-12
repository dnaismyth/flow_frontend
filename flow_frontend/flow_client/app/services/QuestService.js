/**
 * Created by DN on 2016-10-11.
 */
(function(){
    'use strict';
    angular
        .module('flowApp')
        .factory('QuestService', QuestService);

    QuestService.$inject = ['$http'];
    function QuestService($http) {
        var service = {}
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetCurrentUserQuests = GetCurrentUserQuests;
        return service;

        // Get a quest by provided id
        function GetById(id){
            return $http.get('http://localhost:8080/api/quests/' + id).then(handleSuccess, handleError('Error getting quest by id'));
        }

        // Create a new quest (admin service)
        function Create(quest){
            return $http.post('http://localhost:8080/api/quests', quest).then(handleSuccess, handleError('Error creating new quest.'));
        }

        // Update a quest (admin service)
        function Update(quest){
            return $http.put('http://localhost:8080/api/quests', quest).then(handleSuccess, handleError('Error updating quest.'));
        }

        // Delete a workout if the current user is the owner or the user is admin
        function Delete(id) {
            return $http.delete('http://localhost:8080/api/quests/' + id).then(handleSuccess, handleError('Error deleting quest.'));
        }

        // Find the quests a user is currently participating in
        function GetCurrentUserQuests(id){
            return $http.get('http://localhost:8080/api/quests/users/' + id).then(handleSuccess, handleError('Error finding current quests for user.'));
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