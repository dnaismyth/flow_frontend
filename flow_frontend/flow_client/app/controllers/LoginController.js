/**
 * The purpose of this controller is to be used for initial login to the
 * application which the user will then receive a token to continue access.
 */
(function(){
    'use strict';

    angular.module('flowApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$rootScope', 'AuthenticationService', 'FlashService', 'UserService'];
    function LoginController($location, $rootScope, AuthenticationService, FlashService, UserService){
        var vm = this;
        vm.login = login;
        vm.NewUserSignUp = NewUserSignUp;
        vm.signUp = true;
        vm.signuUpSuccess = false;

        // Background image used for login screen only
        vm.bgImage = {
            background: 'url(assets/img/login_bg.png)'
        };

        (function initController(){
            if(!vm.signUp)
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
                    UserService.GetS3Token().then(function(res){
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

        function NewUserSignUp(){
            vm.dataLoading = true;
            AuthenticationService.SignUp(vm.newUsername, vm.newEmail, vm.newPassword, vm.newName, function(response){
                if(response === 200){
                    vm.signupSuccess = true;
                } else {
                    //
                }
            });
        }

    }
})();