/**
 * Created by DN on 2016-10-02.
 */
(function(){
    'use strict';

    angular.module('flowApp')
        .controller('FeedController', FeedController);

    FeedController.$inject = ['WorkoutFeedService'];
    function FeedController( WorkoutFeedService){
        var vm = this;
        vm.GetUserFeed = GetUserFeed;

        // Return the workouts in the current logged in user feed
        // TODO: change page and size
        function GetUserFeed(){
            WorkoutFeedService.GetUserFeed(0,10).then(function(response){
                vm.workout = response;
            });
        };

        /* Call to retrieve workouts*/
        vm.GetUserFeed();
    }
})();