(function(){
//var flowApp = angular.module('flowApp', ['ngResource','ui.router','ngCookies', 'ngStorage']);
angular
    .module('flowApp', ['ngRoute', 'ngCookies', 'ngResource', 'ngStorage'])
    .config(config)
    .run(run);


config.$inject = ['$routeProvider', '$locationProvider', '$controllerProvider'];
function config ($routeProvider, $locationProvider){


        $routeProvider
            .when('/main', {
                templateUrl:'views/main.html',
                controller:'FeedController',
                controllerAs: 'vm'
            })
            .when('/', {
                templateUrl:'views/login.html',
                controller:'LoginController',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl:'views/profile.html',
                controllerAs: 'vm',
                controller:'ProfileController'
            })
            .when('/settings', {
                templateUrl:'views/settings.html',
                //controllerAs:'vm'
               // controller:'secondController'
            }).otherwise({redirectTo: '/'});
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http){

        $rootScope.globals = $cookies.get('globals') || {};
        if($rootScope.globals.currentUser){
            $http.defaults.headers.common.Authorization =
                'Bearer ' + $rootScope.globals.currentUser.token;
        }

        $rootScope.$on('$locationChangeStart', function(event, next, current){
            var restrictedPage = $.inArray($location.path(), ['/']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if(restrictedPage && !loggedIn){
                $location.path('/');
            }
        });

    }
})();
// flowApp.controller('Hello', function($scope, $http) {
//     $http.get('http://localhost:8080/api/register/hello').
//     then(function(response) {
//         $scope.user = response.data;
//     });
// });
//
// flowApp.controller('secureCtrl',
//     function($scope, $resource, $http, $httpParamSerializer, $cookies, $rootScope) {
//
//         $scope.data = {
//             grant_type:"password",
//             username: "",
//             password: "",
//             client_id: "mediacenter"
//         };
//         $scope.encoded = btoa("mediacenter:secret");
//         $scope.login = function() {
//             var req = {
//                 method: 'POST',
//                 url: "http://localhost:8080/api/oauth/token",
//                 headers: {
//                     "Authorization": "Basic " + $scope.encoded,
//                     "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
//                 },
//                 data: $httpParamSerializer($scope.data)
//             };
//             $http(req).then(function(data){
//
//                 $rootScope.globals = {
//                     currentUser: {
//                         username : data.username,
//                         encoded : encoded
//                     }
//                 };
//                 $http.defaults.headers.common.Authorization =
//                     'Bearer ' + data.data.access_token;
//                 $cookies.put("access_token", data.data.access_token);
//                 $cookies.put('globals', $rootScope.globals)
//                 window.location.href="#/main";  // after login, enter into main feed
//             });
//
//            function clearCredentials(){
//                $rootScope.globals = {};
//                $cookies.remove('globals')
//                $http.defaults.headers.common.Authorization = 'Bearer ';
//            }
//         }
//
//     });
//
// flowApp.controller('firstController', ['$scope', '$log', function($scope, $log){
//
// }]);
//
//
// // Temp controllers for testing purposes
// flowApp.controller('secondController', ['$scope', '$log', function($scope, $log){
//
// }]);
//
//
// // Get the current logged in user
// flowApp.controller('profile', function($scope, $http, $localStorage){
//     $http.get('http://localhost:8080/api/me').
//     then(function(response){
//         $localStorage.user = response.data;
//         console.log($localStorage.user.username);
//     });
//     $scope.data = $localStorage.user;
//     // $http.get('http://localhost:8080/api/me').
//     //     then(function(response){
//     //         //$scope.user = response.data;
//     //         //$localStorage.user = response.data;
//     //         //console.log($localStorage.user.username);
//     //         //console.log($rootScope.user.username);
//     //         //$cookies.put("user", $rootScope.user);  // store the current user into a cookie
//     // });
//
//        // $scope.data = $localStorage.user;
//         //console.log("This is the current user: " + $localStorage.user.username);
//
// });

