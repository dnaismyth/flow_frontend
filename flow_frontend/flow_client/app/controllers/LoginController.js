/**
 * The purpose of this controller is to be used for initial login to the
 * application which the user will then receive a token to continue access.
 */
(function(){
    'use strict';

    angular.module('flowApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$rootScope', 'AuthenticationService', 'FlashService', 'UserService', 'ResourceService'];
    function LoginController($location, $rootScope, AuthenticationService, FlashService, UserService, ResourceService){
        var vm = this;
        vm.login = login;

        (function initController(){
            AuthenticationService.ClearCredentials();
        })();

        function login(){
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function(response){
                if(response === 200){   // if OK, redirect to main feed
                    UserService.GetMyProfile().then(function(res){
                        $rootScope.userInfo = res;  // store result
                        $location.path('/main');
                    });
                    // Get a temporary s3 token for a user once they have logged in
                    ResourceService.GetS3Token().then(function(res){
                        $rootScope.s3Credentials = {    // store credentials for current session
                            access_key : res.credentials.awsaccessKeyId,
                            secret_key : res.credentials.awssecretKey,
                            session_token : res.credentials.sessionToken,
                            bucket : ""
                        };
                    });
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };

    }
})();