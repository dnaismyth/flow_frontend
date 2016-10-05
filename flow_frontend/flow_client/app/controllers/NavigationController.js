/**
 * Created by DN on 2016-10-03.
 */
/**
 * The purpose of this controller will be for the main navigation
 * and searching (users)
 */
(function(){
    'use strict';

    angular.module('flowApp')
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['UserService'];
    function NavigationController(UserService){
        var vm = this;
        vm.SearchUsers = SearchUsers;
        vm.users = null;

        // Search for users by name
        function SearchUsers(){
            UserService.Search(0, 5, vm.name).then(function(response){
                    vm.users = response;
            });
        };

    }
})();