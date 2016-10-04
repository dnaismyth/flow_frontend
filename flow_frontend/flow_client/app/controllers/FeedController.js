/**
 * Created by DN on 2016-10-02.
 */
(function(){
    'use strict';

    angular.module('flowApp')
        .controller('FeedController', FeedController);

    FeedController.$inject = ['UserService'];
    function FeedController( UserService, $scope){
        var vm = this;
        vm.user = null;

        function GetMyProfile(){
            UserService.GetMyProfile().then(function(response){
                vm.user = response;
            });
        };

        init();
    }
})();