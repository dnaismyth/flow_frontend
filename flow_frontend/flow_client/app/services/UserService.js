/**
 * Service for all user related controls
 */
(function(){
    'use strict';
    angular
        .module('flowApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http){
        var service = {}
        service.Search = Search;
        service.GetById = GetById;
        service.GetMyProfile = GetMyProfile;
        service.Update = Update;
        service.Delete = Delete;
        service.GetTrendingUsers = GetTrendingUsers;
        service.FindUsersInQuest = FindUsersInQuest;
        service.GetS3Token = GetS3Token;
        service.FindNotificationsForUser = FindNotificationsForUser;
        return service;

        // Search for a user by name, or return all users if name param is empty
        function Search(page, size, name){
            return $http.get('http://localhost:8080/api/users?page='+page+'&size='+size+'&name='+name).then(handleSuccess, handleError('Error getting all users'));
        }

        // Get a user by provided id
        function GetById(id){
            return $http.get('http://localhost:8080/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        // Return the current user's profile information
        function GetMyProfile(){
            return $http.get('http://localhost:8080/api/me').then(handleSuccess, handleError('Error getting user profile.'));
        }

        // Update the current logged in user information
        function Update(user){
            return $http.put('http://localhost:8080/api/me', user).then(handleSuccess, handleError('Error updating user profile.'));
        }

        // Delete the current logged in user
        function Delete() {
            return $http.delete('http://localhost:8080/api/me').then(handleSuccess, handleError('Error deleting user'));
        }

        // Find notifications for the current logged in user
        function FindNotificationsForUser(){
            return $http.get('http://localhost:8080/api/me/notifications').then(handleSuccess, handleError('Error finding notifications for user.'));
        }

        // Used to retrieve a temporary token for the user to upload media during their logged in session
        function GetS3Token(){
            return $http.get('http://localhost:8080/api/me/s3token').then(handleSuccess, handleError('Error retrieving s3 token.'));
        }

        // Get top 5 trending users
        function GetTrendingUsers(){
            return $http.get('http://localhost:8080/api/users/trending').then(handleSuccess, handleError('Error finding trending users'));
        }

        // Return all of the users participating in the provided quest (corresponding to the id input)
        function FindUsersInQuest(id){
            return $http.get('http://localhost:8080/api/users/quests/' + id).then(handleSuccess, handleError('Error finding users participating in this quest.'));
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