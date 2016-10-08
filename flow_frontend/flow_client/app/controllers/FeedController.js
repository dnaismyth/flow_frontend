/**
 * Created by DN on 2016-10-02.
 */
/**
 * The purpose of this controller is to provide functionality to the
 * Main.html view which will show a workout feed, workout create,
 * trending users, nearby events.
 */
(function(){
    'use strict';

    angular.module('flowApp')
        .controller('FeedController', FeedController);

    FeedController.$inject = ['WorkoutFeedService', 'EventService', 'WorkoutService', 'MediaService'];
    function FeedController( WorkoutFeedService, EventService, WorkoutService, MediaService){
        var vm = this;
        vm.GetUserFeed = GetUserFeed;
        vm.AddEventToInterests = AddEventToInterests;
        vm.CreateWorkout = CreateWorkout;

        // Return the workouts in the current logged in user feed
        // TODO: change page and size, use for testing for now
        function GetUserFeed(){
            WorkoutFeedService.GetUserFeed(0,10).then(function(response){
                vm.workout = response;
            });
        };

        // Add an event to user's interests
        function AddEventToInterests(){
            EventService.AddEventToInterests(6).then(function(response){
                vm.added = response;
            })
        };

        // Basic create workout
        function CreateWorkout(){
            // Media model
            MediaService.Create(vm.media).then(function(response){
                vm.workout.media = response.data;
            }).then(function(){
               WorkoutService.Create(vm.workout)
            });
        }

        /* Call to retrieve workouts*/
        vm.GetUserFeed();
    }
})();