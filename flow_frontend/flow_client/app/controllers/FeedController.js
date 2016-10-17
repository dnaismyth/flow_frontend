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

    FeedController.$inject = ['$rootScope', '$scope','WorkoutFeedService', 'EventService', 'WorkoutService', 'MediaService', 'UserService'];
    function FeedController($rootScope, $scope, WorkoutFeedService, EventService, WorkoutService, MediaService, UserService){
        var vm = this;
        vm.GetUserFeed = GetUserFeed;
        vm.AddEventToInterests = AddEventToInterests;
        vm.CreateWorkout = CreateWorkout;
        vm.GetTrendingUsers = GetTrendingUsers;

        // Return the workouts in the current logged in user feed
        // TODO: change page and size, use for testing for now
        function GetUserFeed(){
            WorkoutFeedService.GetUserFeed(0,10).then(function(response){
                vm.feedWorkout = response.page.content;
            });
        };

        // Return a list of the top 5 currently trending users
        function GetTrendingUsers(){
            UserService.GetTrendingUsers().then(function(response){
                vm.trendingUsers = response.data;
            });
        }

        // Add an event to user's interests
        function AddEventToInterests(){
            EventService.AddEventToInterests(6).then(function(response){
                vm.added = response;
            })
        };

        // Basic create workout
        function CreateWorkout(){

            // Configure AWS for upload
            AWS.config.update({
                accessKeyId: $rootScope.s3Credentials.access_key,
                secretAccessKey: $rootScope.s3Credentials.secret_key,
                sessionToken: $rootScope.s3Credentials.session_token
            });
            
            // Set bucket for uploading to
            var bucket = new AWS.S3({ params: { Bucket: $rootScope.s3Credentials.bucket } });

            //TODO: change file name to make unique for user, check size of file first before uploading.
            // Check file exists and try to upload to bucket
            vm.media.fileName = $scope.file.name;
            if($scope.file) {
                var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

                bucket.putObject(params, function(err, data) {
                    if (err) {
                        // There Was An Error With Your S3 Config
                        alert(err.message);
                        return false;
                    }
                });
            }
            MediaService.Create(vm.media).then(function(response){
                vm.workout.media = response.data;
            }).then(function(){
               WorkoutService.Create(vm.workout)
            });
        }

        /* Call to retrieve workouts*/
        vm.GetUserFeed();

        /* Call to retrieve trending users */
        vm.GetTrendingUsers();
    }
})();