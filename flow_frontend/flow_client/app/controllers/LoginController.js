(function(){
    'use strict';

    angular.module('flowApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService){
        var vm = this;
        vm.login = login;

        (function initController(){
            AuthenticationService.ClearCredentials();
        })();

        function login(){
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function(response){
                if(response === 200){   // if OK, redirect to main feed
                    $location.path('/main');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }
})();