(function(){
    'use strict';

    angular
        .module('flowApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$Inject = ['$http', '$httpParamSerializer', '$cookies', '$rootScope'];
    function AuthenticationService($http, $httpParamSerializer, $cookies, $rootScope){
        var service = {};

        service.Login = Login;
        service.ClearCredentials = ClearCredentials;
        service.SignUp = SignUp;

        return service;

        // User login
        function Login(username, password, callback){

            $rootScope.data = {
                grant_type:"password",
                username:username,
                password:password,
                client_id:"mediacenter"
            };
            $rootScope.encoded = btoa("mediacenter:secret");

            var req = {
                method: 'POST',
                url: "http://localhost:8080/api/oauth/token",
                headers: {
                    "Authorization": "Basic " + $rootScope.encoded,
                    "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                },
                data: $httpParamSerializer($rootScope.data)
            };

            $http(req).success(function(data, response){
                $rootScope.token = data.access_token;
                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        token: $rootScope.token
                    }
                };
                $http.defaults.headers.common.Authorization =
                    'Bearer ' + data.access_token;
                $cookies.put("access_token", $rootScope.token);
                $cookies.put('globals', $rootScope.globals);
                callback(response);
            });
        }

        // New user signup
        function SignUp(username, email, password, name, callback){
            $rootScope.signUpRequest = {
                username: username,
                name: name,
                email : email,
                password : password
            }

            var req = {
                method: 'POST',
                url: "http://localhost:8080/api/register",
                data: $rootScope.signUpRequest
            };
            $http(req).success(function(signUpRequest, response){
                // $rootScope.token = signUpRequest.access_token;
                // $rootScope.globals = {
                //     currentUser: {
                //         username: username,
                //         token: $rootScope.token
                //     }
                // };
                // $http.defaults.headers.common.Authorization =
                //     'Bearer ' + data.access_token;
                // $cookies.put("access_token", $rootScope.token);
                // $cookies.put('globals', $rootScope.globals);
                // callback(response);
            }).error(function(response){
                callback(response);
            });


        }

        function ClearCredentials(){
            $rootScope.globals = {};
            $cookies.remove('globals')
            $http.defaults.headers.common.Authorization = 'Bearer ';
        }
    }
})();
