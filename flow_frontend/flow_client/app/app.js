
var flowApp = angular.module('flowApp', ['ngResource','ui.router','ngCookies']);

flowApp.config(function ($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /main (feed)
    $urlRouterProvider.otherwise('/')

        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl:'views/main.html',
                controller: 'secondController'
            })
            .state('login', {
                url: '/',
                templateUrl:'views/login.html',
                controller:'secureCtrl'
            })
            .state('profile', {
                url:'/profile',
                templateUrl:'views/profile.html',
                controller:'secondController'
            })
            .state('settings', {
                url:'/settings',
                templateUrl:'views/settings.html',
                controller:'secondController'
            })
    // .when('/', {
    //         templateUrl: 'views/login.html',
    //         controller:  'secureCtrl'
    // }).when('/settings',{
    //         templateUrl: 'views/settings.html',
    //         controller: 'secondController'
    // }).when('/main', {
    //         templateUrl: 'views/main.html',
    //         controller: 'secondController'
    // }).when('/profile', {
    //         templateUrl: 'views/profile.html',
    //         controller: 'secondController'
    // });
});

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
            client_id: "mediacenter"
        };
        $scope.encoded = btoa("mediacenter:secret");
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
                window.location.href="#/main";  // after login, enter into main feed
            });
        }
    });

flowApp.controller('firstController', ['$scope', '$log', function($scope, $log){

}]);

flowApp.controller('secondController', ['$scope', '$log', function($scope, $log){

}]);
