(function(){
//var flowApp = angular.module('flowApp', ['ngResource','ui.router','ngCookies', 'ngStorage']);
angular
    .module('flowApp', ['ngRoute', 'ngCookies', 'ngResource', 'ngStorage'])
    .config(config)
    .run(run);


config.$inject = ['$routeProvider', '$locationProvider'];
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


