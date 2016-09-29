
var flowApp = angular.module('flowApp', ['ngResource', 'ngRoute', 'ngCookies']);

flowApp.controller('Hello', function($scope, $http) {
    $http.get('http://localhost:8080/api/register/hello').
    then(function(response) {
        $scope.user = response.data;
    });
});

flowApp.controller('secureCtrl',
    function($scope, $resource, $http, $httpParamSerializer, $cookies) {

        $scope.data = {
            grant_type:"password",
            username: "",
            password: "",
            client_id: "clientIdPassword"
        };
        $scope.encoded = btoa("clientIdPassword:secret");
        $scope.login = function() {
            var req = {
                method: 'POST',
                url: "http://localhost:8080/api/oauth/token",
                headers: {
                    "Authorization": "Basic " + $scope.encoded,
                    "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                },
                data: $httpParamSerializer($scope.data)
            };
            $http(req).then(function(data){
                $http.defaults.headers.common.Authorization =
                    'Bearer ' + data.data.access_token;
                $cookies.put("access_token", data.data.access_token);
                window.location.href="www.google.ca";
            });
        }
    });
