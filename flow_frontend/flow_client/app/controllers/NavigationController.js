/**
 * Created by DN on 2016-10-03.
 */
(function(){
    'use strict';

    angular.module('flowApp')
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['UserService', '$scope'];
    function NavigationController(UserService, $scope){
        var vm = this;
        vm.SearchUsers = SearchUsers;
        vm.users = null;

        // Search for users by name
        function SearchUsers(){
            UserService.Search(0, 5, name).then(function(response){
                    vm.users = response; // fix this to return data, use now for testing
            });
        };

    }
})();