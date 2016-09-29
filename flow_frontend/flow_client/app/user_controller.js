// Controllers for user

// Load in app module
$.getScript('app.js', function()
{

    flowApp.controller('Hello', function($scope, $http) {
        $http.get('http://localhost:8080/api/register/hello').
        then(function(response) {
            $scope.user = response.data;
        });
    });

});