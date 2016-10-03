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

        return service;


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

        function ClearCredentials(){
            $rootScope.globals = {};
            $cookies.remove('globals')
            $http.defaults.headers.common.Authorization = 'Bearer ';
        }
    }
})();
