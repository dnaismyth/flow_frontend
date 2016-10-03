/**
 * Created by DN on 2016-10-02.
 */
(function(){
    'use strict';

    angular.module('flowApp')
        .controller('UserController', UserController);

    UserController.$inject = ['$location', 'UserService', '$cookies'];
    function UserController($location, UserService, $cookies){
        var vm = this;
        vm.GetMyProfile = GetMyProfile;

        function GetMyProfile(){
            UserService.GetMyProfile().then(function(response){
                if(response.username === vm.username ){        // check that the response username === current username
                    $location.path('/profile');             // direct to profile
                } else {
                    FlashService.Error(response.message);
                }
            });
            // vm.dataLoading = true;
            // AuthenticationService.Login(vm.username, vm.password, function(response){
            //     if(response === 200){   // if OK, redirect to main feed
            //         $location.path('/main');
            //     } else {
            //         FlashService.Error(response.message);
            //         vm.dataLoading = false;
            //     }
            // });
        };
    }
})();