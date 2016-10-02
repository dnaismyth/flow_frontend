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

        return service;

        function Search(page, size, name){
            return $http.get('/api/users?page='+page+'&size='+size+'&name='+name).then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id){
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetMyProfile(){
            return $http.get('/api/me').then(handleSuccess, handleError('Error getting user profile.'));
        }

        function Update(user){
            return $http.put('/api/me', user).then(handleSuccess, handleError('Error updating user profile.'));
        }

        function Delete() {
            return $http.delete('/api/me').then(handleSuccess, handleError('Error deleting user'));
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