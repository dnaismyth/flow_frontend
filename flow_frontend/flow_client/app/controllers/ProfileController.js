/**
 * Created by DN on 2016-10-02.
 */
/**
 * Controller corresponding to the user profile view which will
 * include the user's workouts and user information (avatar, name, location etc..)
 */
(function(){
    'use strict';

    angular.module('flowApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['UserService', 'WorkoutService', '$rootScope'];
    function ProfileController( UserService, WorkoutService, $rootScope){
        var vm = this;
        vm.GetUsersQuests = GetUsersQuests;
        vm.GetAllUsersWorkouts = GetAllUsersWorkouts;

        // get the current user's id to be used in query
        var userId = $rootScope.userInfo;

        // Return the current user's quests
        function GetUsersQuests(){
            UserService.GetCurrentUserQuests(userId).then(function(response){
                vm.userQuests = response.data;
            });
        }

        // Return all of the workouts created by the current logged in user to be displayed
        // on their profile page.
        // TODO: change page + size, use as testing for now
        function GetAllUsersWorkouts(){
            WorkoutService.GetAllWorkoutsByUser(0, 5, userId).then(function(response){
               vm.userWorkouts = response.data;
            });
        };
    }
})();