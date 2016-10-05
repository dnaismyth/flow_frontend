/**
 * Created by DN on 2016-10-02.
 */
/**
 * Controller corresponding to the user profile view which will
 * include the user's workouts and user information (avatar, name, location etc..)
 */
(function(){
    'use strict';

    angular.module('flowApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['UserService', '$scope'];
    function ProfileController( UserService, $scope){
        var vm = this;
        vm.user = null;


        var init = function GetMyProfile(){
            UserService.GetMyProfile().then(function(response){
                    vm.user = response;
            });
        };

        init();
    }
})();