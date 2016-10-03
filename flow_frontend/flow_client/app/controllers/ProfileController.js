/**
 * Created by DN on 2016-10-02.
 */
/**
 * Controller corresponding to the user profile view
 */
(function(){
    'use strict';

    angular.module('flowApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['UserService', '$scope'];
    function ProfileController( UserService, $scope){
        var vm = this;
        $scope.user = null;

        var init = function GetMyProfile(){
            UserService.GetMyProfile().then(function(response){
                    $scope.user = response;
            });
        };

        init();
    }
})();